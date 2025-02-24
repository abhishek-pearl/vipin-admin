import { useState } from "react";

export default function TaglineCRUD() {
    const [items, setItems] = useState([]);
    const [heading, setHeading] = useState("");
    const [paragraph, setParagraph] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setHeading("");
        setParagraph("");
        setEditingIndex(null);
    };

    const handleAdd = () => {
        if (heading.trim() && paragraph.trim()) {
            if (editingIndex !== null) {
                const updatedItems = [...items];
                updatedItems[editingIndex] = { heading, paragraph };
                setItems(updatedItems);
            } else {
                setItems([...items, { heading, paragraph }]);
            }
            closeModal();
        }
    };

    const handleEdit = (index) => {
        setHeading(items[index].heading);
        setParagraph(items[index].paragraph);
        setEditingIndex(index);
        openModal();
    };

    const handleDelete = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    return (
        <div className="p-6 max-w-2xl mx-auto space-y-6 pt-14">
            <h1 className="text-3xl font-bold text-center text-gray-800">Taline Data Management</h1>
            <button
                onClick={openModal}
                className="px-5 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            >
                Add Data
            </button>
            <div className="space-y-6">
                {items?.length > 0 ? items.map((item, index) => (
                    <div key={index} className="p-6 border border-gray-300 rounded-lg shadow-lg bg-white flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">{item.heading}</h2>
                            <p className="text-gray-600 mt-1">{item.paragraph}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEdit(index)}
                                className="px-4 py-2 border border-gray-500 rounded-lg text-gray-700 hover:bg-gray-200 transition"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(index)}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )) : <div className="grid place-items-center max-w-5xl h-60 bg-slate-200/90 rounded-md">No Data</div>}
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl w-96">
                        <h2 className="text-2xl font-bold mb-4 text-gray-900">{editingIndex !== null ? "Update Data" : "Add Data"}</h2>
                        <input
                            type="text"
                            placeholder="Enter heading"
                            value={heading}
                            onChange={(e) => setHeading(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring focus:ring-blue-300"
                        />
                        <textarea
                            placeholder="Enter paragraph"
                            value={paragraph}
                            onChange={(e) => setParagraph(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring focus:ring-blue-300"
                        ></textarea>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 border border-gray-500 rounded-lg text-gray-700 hover:bg-gray-200 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAdd}
                                className={`px-4 py-2 rounded-lg text-white transition ${editingIndex !== null ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}`}
                            >
                                {editingIndex !== null ? "Update Data" : "Add Data"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
