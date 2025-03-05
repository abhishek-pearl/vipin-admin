import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

export default function TaglineCRUD() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);  // Store the item being edited
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use react-hook-form to manage form state
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

  // Open the modal for adding or editing
  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setValue("heading", item.heading); // Set form values for editing
      setValue("paragraph", item.paragraph); // Set form values for editing
    } else {
      setEditingItem(null);
      reset(); // Reset the form if adding a new item
    }
    setIsModalOpen(true);
  };

  // Close the modal and reset the form
  const closeModal = () => {
    setIsModalOpen(false);
    reset(); // Reset form on modal close
    setEditingItem(null);
  };

  // Fetch data
  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/tagline");
      setItems(res.data.data);
    } catch (err) {
      console.log(err);
    }
    console.log(items)
  };

  useEffect(() => {
    getData();
  }, []);

  // Add or update data
  const onSubmit = async (data) => {
    try {
      if (editingItem) {
        // Update existing item
        const res = await axios.patch(
          `http://localhost:8000/api/v1/tagline/${editingItem._id}`,
          data
        );
        toast.success("Data updated successfully");
      } else {
        // Add new item
        const res = await axios.post("http://localhost:8000/api/v1/tagline", data);
        toast.success("Data added successfully");
      }
      getData();  // Refresh the data list
      closeModal();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/tagline/${id}`);
      toast.success("Data deleted successfully");
      getData();  // Refresh the data list
    } catch (err) {
      console.log("Error deleting item", err);
      toast.error("Failed to delete data");
    }
  };

  const handleActivate = async (_id) => {
    try {
      const res = await axios.put(`http://localhost:8000/api/v1/tagline/${_id}`);
      console.log(res);
      toast.success("Tagline Activated successfully");
      getData(); 
    } catch (err) {
      console.log("Error in Activating Tagline", err);
      toast.error("Failed to Activate");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6 pt-14">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Tagline Data Management
      </h1>
      <button
        onClick={() => openModal()}
        className="px-5 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Add Data
      </button>
      <div className="space-y-6 mt-6">
        {items?.length > 0 ? (
          items.map((item) => (
            <div
              key={item._id}
              className="p-6 border border-gray-300 rounded-lg shadow-lg bg-white flex justify-between items-center"
            >
              <div>
                {item.isActive && <span className="w-full text-green-700 font-bold items-end">Active</span>}
                <h2 className="text-xl font-semibold text-gray-900">{item.heading}</h2>
                <p className="text-gray-600 mt-1">{item.paragraph}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(item)}
                  className="px-4 py-2 border border-gray-500 rounded-lg text-gray-700 hover:bg-gray-200 active:scale-95 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 active:scale-95 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleActivate(item._id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 active:scale-95 transition"
                >
                  Activate
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="grid place-items-center max-w-5xl h-60 bg-slate-200/90 rounded-md">
            No Data Available
          </div>
        )}
      </div>

      {/* Modal for Add/Update */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              {editingItem ? "Update Data" : "Add Data"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}> {/* Wrap the form submission in a form */}
              <input
                type="text"
                placeholder="Enter heading"
                {...register("heading", { required: "Heading is required" })}
                className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring focus:ring-blue-300"
              />
              {errors.heading && <span className="text-red-500 text-sm">{errors.heading.message}</span>}
              <textarea
                placeholder="Enter paragraph"
                {...register("paragraph", { required: "Paragraph is required" })}
                className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring focus:ring-blue-300"
              ></textarea>
              {errors.paragraph && <span className="text-red-500 text-sm">{errors.paragraph.message}</span>}
              <div className="flex justify-end space-x-2">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-500 rounded-lg text-gray-700 hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-lg text-white transition ${
                    editingItem ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {editingItem ? "Update Data" : "Add Data"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
