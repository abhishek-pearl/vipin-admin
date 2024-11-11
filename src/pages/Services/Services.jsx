import { Link } from "react-router-dom";

export default function Services() {
    const testimonials = [
        {
            id: 1,
            name: "John Doe",
            role: "CEO, TechCorp",
            testimonial: "This product has revolutionized our workflow. Highly recommended!",
            rating: 5,
            image: "/placeholder.svg?height=60&width=60"
        },
        {
            id: 2,
            name: "Jane Smith",
            role: "Designer, CreativeCo",
            testimonial: "Intuitive and powerful. It's been a game-changer for our team.",
            rating: 4,
            image: "/placeholder.svg?height=60&width=60"
        },
        {
            id: 3,
            name: "Mike Johnson",
            role: "Freelancer",
            testimonial: "I've tried many similar products, but this one stands out. It's simply the best.",
            rating: 5,
            image: "/placeholder.svg?height=60&width=60"
        },
        {
            id: 4,
            name: "Emily Brown",
            role: "Marketing Manager, BrandInc",
            testimonial: "Great features and excellent customer support. Very satisfied!",
            rating: 4,
            image: "/placeholder.svg?height=60&width=60"
        },
    ];

    const handleEdit = (id) => {
        // Implement edit functionality
        console.log(`Edit testimonial with id: ${id}`);
    };

    const handleDelete = (id) => {
        // Implement delete functionality
        console.log(`Delete testimonial with id: ${id}`);
    };

    return (
        <div className="container mx-auto p-6 mt-10 space-y-4">
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold mb-4">Customer Services</h2>
                <Link to='/createServices'>
                    <button className="px-6 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors" type="button">Add</button>
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-4 text-left">Image</th>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Role</th>
                            <th className="py-3 px-4 text-left">Testimonial</th>
                            <th className="py-3 px-4 text-left">Rating</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testimonials.map((item) => (
                            <tr key={item.id} className="even:bg-gray-50 odd:bg-white hover:bg-gray-100">
                                <td className="py-4 px-4 border-b">
                                    <img
                                        src={item.image}
                                        alt={`${item.name}'s avatar`}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                </td>
                                <td className="py-4 px-4 border-b">{item.name}</td>
                                <td className="py-4 px-4 border-b text-gray-500">{item.role}</td>
                                <td className="py-4 px-4 border-b">{item.testimonial}</td>
                                <td className="py-4 px-4 border-b">
                                    <div className="flex">
                                        {[...Array(item.rating)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                            </svg>
                                        ))}
                                    </div>
                                </td>
                                <td className="py-4 px-4 border-b">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEdit(item.id)}
                                            className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded hover:bg-green-600 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

