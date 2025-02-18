import React, { useEffect, useState, useTransition } from "react"
import { useNavigate } from "react-router-dom"
import { instance } from "../../services/axiosInterceptor"
import { toast } from "sonner"

const TableRow = ({ item, handleDelete, handleEdit }) => {
    const [isPending, startTransition] = useTransition()
    return <tr>
        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <p className="whitespace-no-wrap">3</p>
        </td>
        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <div className="flex items-center gap-2">
                {
                    item?.banner?.map(el => {
                        return <a href={el?.ad_url
                            } className="h-20 w-20 flex-shrink-0 rounded border-2 p-1">
                            <img
                                className="h-full w-full "
                                src={`${el?.secure_url}`}
                                alt=""
                            />
                        </a>
                    })
                }


            </div>
        </td>

        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <p className="whitespace-no-wrap">{item?.createdAt}</p>
        </td>
        <td className="bg-white px-5 space-x-2 py-5 text-sm">
            {
                !item?.showBanner ? <span className="rounded-full bg-red-200 px-3 py-1 text-xs font-semibold text-red-900">
                    <button onClick={() => {
                        handleEdit(item)
                    }} type="button">Inactive</button>
                </span> :
                    <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">

                        <button onClick={() => {
                            handleEdit(item)
                        }} type="button">Active</button>
                    </span>
            }
            <span className="rounded-full bg-red-200 px-3 py-1 text-xs font-semibold text-red-900">
                {isPending ? "Deleting..." : <button onClick={() => startTransition(() => {
                    handleDelete(item?._id)
                })} type="button">Delete</button>}
            </span>
        </td>




    </tr>
}

const AdListing = () => {
    const [ads, setAds] = useState([])



    const navigate = useNavigate()
    const handleDelete = async (id) => {
        try {
            const response = await instance.delete(`/ad/${id}`)
            getAllAds()
            console.log(response?.data)
            toast.success(response?.data?.message || "Delted!!")
        } catch (error) {
            toast.error("Error on deleting!!")
            console.log(error)
        }
    }

    const handleEdit = async (item) => {
        try {
            const response = await instance.patch(`/ad/${item?._id}`)
            getAllAds()
            console.log(response?.data)
            toast.success(response?.data?.message || "Updated!!")
        } catch (error) {
            toast.error("Error on Updating!!")
            console.log(error)
        }
    }
    const getAllAds = async () => {
        const response = await instance.get(`/ad`)
        setAds(response?.data?.data)
        console.log(response?.data, "response")
    }

    // hide and unhide ads

    useEffect(() => {
        getAllAds()
    }, [])




    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Ad Listing</h1>

            <div className="mb-6 gap-6 flex justify-center">
                <button
                    onClick={() => navigate('/addAd')}
                    className="py-2 px-4 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors"
                >
                    Add New Ad
                </button>

            </div>

            <div className="mx-auto max-w-screen-lg border-2 px-4 py-8 sm:px-8">

                <div className="overflow-y-hidden rounded-lg border">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                                    <th className="px-5 py-3">ID</th>
                                    <th className="px-5 py-3">Images</th>
                                    <th className="px-5 py-3">Created at</th>
                                    <th className="px-5 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-500">{
                                ads?.map(item => {
                                    return <TableRow item={item} handleDelete={handleDelete} handleEdit={handleEdit} />
                                })
                            }



                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default AdListing

