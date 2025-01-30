import { useRef, useState } from "react"
import { instance } from "../../services/axiosInterceptor";
import { toast } from "sonner";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const UpdateAd = () => {
    const [searchParams] = useSearchParams();
    const { state } = useLocation()
    console.log(state, "state")
    const [previewUrl, setPreviewUrl] = useState(state?.banner)
    const [fileData, setFile] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null)
    const navigate = useNavigate()

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setFile(file)
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewUrl(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()


        const formData = new FormData();
        setIsLoading(true)


        formData.append("banner", fileData);
        // api call here
        instance
            .post(`/ad`, formData)
            .then((res) => {
                setIsLoading(false);
                toast.success(res.data.message, {
                    style: {
                        background: "green",
                        color: "white",
                    },
                });
                navigate("/ads");
            })
            .catch((err) => {

                setIsLoading(false);
                toast.error(err, {
                    style: {
                        background: "red",
                        color: "white",
                    },
                });
            });
        console.log(fileData)
    };

    return (
        <div className="h-screen w-full grid place-items-center">
            <div className="w-full mx-auto text-center space-y-8">
                <h2 className="text-2xl font-medium md:text-5xl">Update Ad</h2>
                <form onSubmit={onSubmit} className="mb-8 p-4 mx-auto bg-gray-100 rounded-lg max-w-3xl w-full">
                    <div className="mb-4">
                        <label htmlFor="adImage" className="block text-sm font-medium text-gray-700 mb-2">
                            Upload Ad Image
                        </label>
                        <input
                            type="file"
                            id="adImage"
                            accept="image/*"
                            onChange={handleImageChange}
                            ref={fileInputRef}
                            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
                        />
                    </div>
                    {previewUrl && (
                        <div className="mb-4">
                            <p className="block text-sm font-medium text-gray-700 mb-2">Image Preview</p>
                            <img src={previewUrl || "/placeholder.svg"} alt="Ad preview" className="size-36 object-contain border-2 rounded-md" />
                        </div>
                    )}
                    {
                        isLoading ? <button
                            type="button"
                            className="w-full py-2 px-4 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Loading...
                        </button> : <button
                            type="submit"
                            disabled={!previewUrl}
                            className="w-full py-2 px-4 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Update Ad
                        </button>
                    }
                </form>
            </div>
        </div>
    )
}

export default UpdateAd