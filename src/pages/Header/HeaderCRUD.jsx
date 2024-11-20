'use client'

import { useState } from 'react'
import { Link } from 'react-router-dom'



export default function HeaderCRUD() {
    const [headerItems, setHeaderItems] = useState([
        { id: 1, name: 'Home', url: '/' },
        { id: 2, name: 'About', url: '/about' },
        { id: 3, name: 'Services', url: '/services' },
        { id: 4, name: 'Contact', url: '/contact' },
    ])

    const [editingId, setEditingId] = useState(null)
    const [editName, setEditName] = useState('')
    const [editUrl, setEditUrl] = useState('')
    const [newName, setNewName] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const [isAdding, setIsAdding] = useState(false)

    const handleEdit = (item) => {
        setEditingId(item.id)
        setEditName(item.name)
        setEditUrl(item.url)
    }

    const handleSave = (id) => {
        setHeaderItems(headerItems.map(item =>
            item.id === id ? { ...item, name: editName, url: editUrl } : item
        ))
        setEditingId(null)
    }

    const handleDelete = (id) => {
        setHeaderItems(headerItems.filter(item => item.id !== id))
    }

    const handleAdd = () => {
        if (newName && newUrl) {
            const newId = Math.max(...headerItems.map(item => item.id), 0) + 1
            setHeaderItems([...headerItems, { id: newId, name: newName, url: newUrl }])
            setNewName('')
            setNewUrl('')
            setIsAdding(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Header Items</h1>
            <div className="mb-4">
                {isAdding ? (
                    <div className="flex flex-wrap gap-2 items-end">
                        <div>
                            <label htmlFor="newName" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                id="newName"
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="New item name"
                            />
                        </div>
                        <div>
                            <label htmlFor="newUrl" className="block text-sm font-medium text-gray-700">URL</label>
                            <input
                                id="newUrl"
                                type="text"
                                value={newUrl}
                                onChange={(e) => setNewUrl(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="New item URL"
                            />
                        </div>
                        <button
                            onClick={handleAdd}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200"
                        >
                            Add Item
                        </button>
                        <button
                            onClick={() => setIsAdding(false)}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <Link to='/addHeader'>
                        <button
                            onClick={() => setIsAdding(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
                        >
                            Add New Item
                        </button>
                    </Link>
                )}
            </div>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {headerItems.map(item => (
                            <tr key={item.id}>
                                <td className="py-4 px-4 whitespace-nowrap">
                                    {editingId === item.id ? (
                                        <input
                                            type="text"
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            className="w-full px-2 py-1 border rounded"
                                        />
                                    ) : (
                                        <span className="text-sm font-medium text-gray-900">{item.name}</span>
                                    )}
                                </td>
                                <td className="py-4 px-4">
                                    {editingId === item.id ? (
                                        <input
                                            type="text"
                                            value={editUrl}
                                            onChange={(e) => setEditUrl(e.target.value)}
                                            className="w-full px-2 py-1 border rounded"
                                        />
                                    ) : (
                                        <span className="text-sm text-gray-500 break-all">{item.url}</span>
                                    )}
                                </td>
                                <td className="py-4 px-4 text-sm font-medium">
                                    <div className="flex flex-wrap gap-2">
                                        {editingId === item.id ? (
                                            <button
                                                onClick={() => handleSave(item.id)}
                                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors duration-200"
                                            >
                                                Save
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors duration-200"
                                            >
                                                Edit
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-200"
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
    )
}