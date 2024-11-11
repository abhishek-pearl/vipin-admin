

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'

export default function AddTestimonial() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { register, handleSubmit, control, formState: { errors } } = useForm()

    const onSubmit = async (data) => {
        setIsSubmitting(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log(data)
        setIsSubmitting(false)
        alert("Testimonial submitted successfully!")
    }

    return (
        <div className='grid place-items-center min-h-screen'>
            <div className="max-w-xl mx-auto mt-8 p-6 w-full bg-white rounded-lg shadow-md -translate-y-10">
                <h2 className="text-2xl font-bold mb-6 text-center">Submit Your Testimonial</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                        <input
                            id="name"
                            type="text"
                            {...register('name', { required: "Name is required", minLength: { value: 2, message: "Name must be at least 2 characters" } })}
                            className={`w-full p-2 text-base border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="role" className="block text-sm font-medium mb-1">Role</label>
                        <input
                            id="role"
                            type="text"
                            {...register('role', { required: "Role is required", minLength: { value: 2, message: "Role must be at least 2 characters" } })}
                            className={`w-full p-2 text-base border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.role ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="testimonial" className="block text-sm font-medium mb-1">Testimonial</label>
                        <textarea
                            id="testimonial"
                            {...register('testimonial', { required: "Testimonial is required", minLength: { value: 10, message: "Testimonial must be at least 10 characters" } })}
                            className={`w-full p-2 text-base border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px] ${errors.testimonial ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.testimonial && <p className="mt-1 text-xs text-red-500">{errors.testimonial.message}</p>}
                    </div>

                    <div>
                        <span className="block text-sm font-medium mb-2">Rating</span>
                        <Controller
                            name="rating"
                            control={control}
                            rules={{ required: "Please select a rating" }}
                            render={({ field }) => (
                                <div className="flex space-x-4">
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <div key={value} className="flex items-center">
                                            <input
                                                type="radio"
                                                id={`rating-${value}`}
                                                value={value.toString()}
                                                checked={field.value === value.toString()}
                                                onChange={(e) => field.onChange(e.target.value)}
                                                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                            />
                                            <label htmlFor={`rating-${value}`} className="ml-1 text-sm">{value}</label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        />
                        {errors.rating && <p className="mt-1 text-xs text-red-500">{errors.rating.message}</p>}
                    </div>


                    <button
                        type="submit"
                        className="w-full py-2 px-4 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
                    </button>
                </form>
            </div>
        </div>
    )
}