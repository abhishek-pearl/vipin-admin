import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { instance } from "../../services/axiosInterceptor";

export default function UpdateAd() {
    const navigate = useNavigate();
    const { state: adData } = useLocation();
    const [preview, setPreview] = useState(
        adData.banner.reduce((acc, item, index) => ({ ...acc, [index]: item.secure_url }), {})
    );

    const { register, control, handleSubmit } = useForm({
        defaultValues: {
            fields: adData.banner.map(item => ({ image: null, url: item.ad_url })),
        },
    });

    const { fields, append } = useFieldArray({
        control,
        name: "fields",
    });

    async function update_ads(payload) {
        try {
            const response = await instance.put(`/ad/${adData._id}`, payload);
            if (response?.data?.success) {
                toast.success("Ad updated successfully");
                navigate('/ads');
            }
        } catch (error) {
            toast.error("Failed to update ad");
        }
    }

    const onSubmit = (data) => {
        console.log(data, "data")
        const urls = data?.fields?.map(el => el.url);
        const banner = data?.fields?.map(el => el.image);

        const form = new FormData();
        form.append('urls', JSON.stringify(urls));
        banner.forEach((element, index) => {
            if (element?.[0]) {
                form.append('banner', element?.[0]);
                setPreview(prev => ({ ...prev, [index]: URL.createObjectURL(element[0]) }));
            }
        });

        // update_ads(form);
    };

    return (
        <div className="container mx-auto p-10">
            <h1 className="text-2xl font-bold mb-4 p-2">Update Ads Section</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {fields.map((field, index) => (
                    <div key={index} className="space-y-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Image</label>
                            <input
                                type="file"
                                {...register(`fields.${index}.image`)}
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                onChange={(e) => {
                                    if (e.target.files.length > 0) {
                                        setPreview(prev => ({ ...prev, [index]: URL.createObjectURL(e.target.files[0]) }));
                                    }
                                }}
                            />
                            {preview[index] && <img src={preview[index]} alt="Preview" className="mt-2 w-40 h-40 object-cover" />}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">URL</label>
                            <input
                                type="url"
                                {...register(`fields.${index}.url`)}
                                defaultValue={field.url}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => {
                        if (fields?.length === 4) {
                            toast.error("At Max You Can Have Only 4 Sections!");
                            return;
                        } else {
                            append({ image: null, url: "" });
                        }
                    }}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                    Add More
                </button>
                <div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}
