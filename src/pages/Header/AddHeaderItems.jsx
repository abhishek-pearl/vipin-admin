

import { useState } from 'react'
import { useForm } from 'react-hook-form'


export default function AddHeaderItems() {
    const [isSuccess, setIsSuccess] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm()

    const onSubmit = async (data) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('Form submitted:', data)
        setIsSuccess(true)
        reset()
        // Reset success message after 3 seconds
        setTimeout(() => setIsSuccess(false), 3000)
    }

    return (
        <div className='grid place-items-center min-h-screen'>
            <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md border-2 w-full">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Header Item</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Header Item Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            {...register('name', {
                                required: 'Name is required',
                                minLength: { value: 2, message: 'Name must be at least 2 characters long' }
                            })}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="e.g., About Us"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                            URL
                        </label>
                        <input
                            id="url"
                            type="text"
                            {...register('url', {
                                required: 'URL is required',
                                pattern: {
                                    value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                                    message: 'Please enter a valid URL'
                                }
                            })}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.url ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="https://example.com/about"
                        />
                        {errors.url && (
                            <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {isSubmitting ? 'Adding...' : 'Add Header Item'}
                    </button>
                </form>

                {isSuccess && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-500 rounded-md">
                        <p className="text-green-700 text-sm flex items-center">
                            <svg className="h-4 w-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M5 13l4 4L19 7"></path>
                            </svg>
                            Header item added successfully!
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}