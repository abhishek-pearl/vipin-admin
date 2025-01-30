import { useRef, useState } from "react";
import { instance } from "../../services/axiosInterceptor";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AddAd = () => {
    const [previewUrls, setPreviewUrls] = useState([]);
    const [fileData, setFileData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length + fileData.length > 4) {
            toast.error("You can upload a maximum of 4 images.", {
                style: {
                    background: "red",
                    color: "white",
                },
            });
            return;
        }

        setFileData((prevFiles) => [...prevFiles, ...files]);

        const newPreviews = files.map((file) => {
            const reader = new FileReader();
            return new Promise((resolve) => {
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });
        });

        Promise.all(newPreviews).then((urls) => {
            setPreviewUrls((prevUrls) => [...prevUrls, ...urls]);
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (fileData.length === 0) {
            toast.error("Please upload at least one image.", {
                style: {
                    background: "red",
                    color: "white",
                },
            });
            return;
        }

        const formData = new FormData();
        setIsLoading(true);

        fileData.forEach((file) => formData.append("banner", file));

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
                toast.error(err.message || "Something went wrong.", {
                    style: {
                        background: "red",
                        color: "white",
                    },
                });
            });
    };

    return (
        <div className="h-screen w-full grid place-items-center">
            <div className="w-full mx-auto text-center space-y-8">
                <h2 className="text-2xl font-medium md:text-5xl">Add Ad</h2>
                <form
                    onSubmit={onSubmit}
                    className="mb-8 p-4 mx-auto bg-gray-100 rounded-lg max-w-3xl w-full"
                >
                    <div className="mb-4">
                        <label
                            htmlFor="adImage"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Upload Ad Images (Max 4)
                        </label>
                        <input
                            type="file"
                            id="adImage"
                            accept="image/*"
                            onChange={handleImageChange}
                            ref={fileInputRef}
                            multiple
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                        />
                    </div>
                    {previewUrls.length > 0 && (
                        <div className="mb-4">
                            <p className="block text-sm font-medium text-gray-700 mb-2">
                                Image Previews
                            </p>
                            <div className="flex flex-wrap gap-6">
                                {previewUrls.map((url, index) => (
                                    <img
                                        key={index}
                                        src={url || "/placeholder.svg"}
                                        alt={`Ad preview ${index + 1}`}
                                        className="object-contain border-2 size-56 rounded-md"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {isLoading ? (
                        <button
                            type="button"
                            className="w-full py-2 px-4 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Loading...
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={previewUrls.length === 0}
                            className="w-full py-2 px-4 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Add New Ad
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AddAd;
