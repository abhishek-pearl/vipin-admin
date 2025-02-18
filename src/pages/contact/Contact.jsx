import axios from "axios";
import { useEffect, useState } from "react";
import { instance } from "../../services/axiosInterceptor";

export default function ContactCRUD() {
    const [contacts, setContacts] = useState([{ name: "Abhishek Bahuguna", phone: "9876543210", email: "abhishek@pearlorganisation", address: "hello" }]);
    const [form, setForm] = useState({ name: "", phone: "", email: "", address: "" });
    const [editingIndex, setEditingIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getContactData = async () => {
        try {
            const { data } = await instance.get(`/adminContact`);
            console.log(data, "data");
            setContacts(data?.data);
        } catch (error) {
            console.error("Error fetching contact data:", error?.response?.data || error.message);
        }
    };

    const postContactData = async (data) => {
        try {
            const response = await instance.post(`/adminContact`, data);
            console.log(response, "response");
            getContactData();
        } catch (error) {
            console.error("Error posting contact data:", error?.response?.data || error.message);
        }
    };

    const updateAdminContact = async (data) => {
        try {
            const response = await instance.patch(`/adminContact/${data?._id}`, data);
            console.log(response, "Response");
            getContactData();
        } catch (error) {
            console.error("Error updating contact data:", error?.response?.data || error.message);
        }
    };
    const activateAdminContact = async (id) => {
        try {
            const response = await instance.patch(`/adminContact/active/${id}`);
            console.log(response, "Response");
            getContactData();
        } catch (error) {
            console.error("Error updating contact data:", error?.response?.data || error.message);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingIndex !== null) {
            updateAdminContact(form)
        } else {
            console.log(form, "form")
            postContactData(form)
            // setContacts([...contacts, form]);
        }
        setForm({ name: "", phone: "", email: "", address: "" });
        setIsModalOpen(false);
    };

    const handleEdit = (index) => {
        setForm(contacts[index]);
        setEditingIndex(index);
        setIsModalOpen(true);
    };

    const handleDelete = (index) => {
        setContacts(contacts.filter((_, i) => i !== index));
    };

    useEffect(() => {
        getContactData()
    }, [])


    return (
        <div className="w-full mx-auto p-8 bg-white shadow-xl rounded-xl min-h-screen flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-700">Contact List</h2>
            <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg mb-6 shadow-md">Add Contact</button>
            <ul className="space-y-4 w-full">
                {contacts.map((contact, index) => (
                    <li key={index} className="p-5 bg-gray-100 rounded-lg flex justify-between items-center shadow">
                        <div>
                            <p className="text-lg font-semibold text-gray-800">{contact.name}</p>
                            <p className="text-gray-600">{contact.phone}</p>
                            <p className="text-gray-600">{contact.email}</p>
                            <p className="text-gray-600">{contact.address}</p>
                        </div>
                        <div className="space-x-3">
                            <button onClick={() => activateAdminContact(contact?._id)} className={`${contact?.activeAddress ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'} text-white px-3 py-1 rounded shadow`}>Active</button>
                            <button onClick={() => handleEdit(index)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded shadow">Edit</button>
                            <button onClick={() => handleDelete(index)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-5 text-gray-700">{editingIndex !== null ? "Update Contact" : "Add Contact"}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Company Name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone"
                                value={form.phone}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="E-Mail"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                                required
                            />
                            <textarea
                                name="address"
                                placeholder="Address"
                                value={form.address}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                                required
                            />
                            <div className="flex justify-end space-x-3">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg">Cancel</button>
                                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow">{editingIndex !== null ? "Update" : "Add"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
