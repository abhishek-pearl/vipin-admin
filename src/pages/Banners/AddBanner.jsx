import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { instance } from "../../services/axiosInterceptor";
import { Toaster, toast } from "sonner";
import { ClipLoader } from "react-spinners";

const AddBanner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [watchImageName, setWatchImageName] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = (data) => {
    if (isLoading) return;
    setIsLoading(true);

    const formData = new FormData();
    const { banner } = data;
    if (banner) {
      formData.append("banner", banner[0]);
    }

    // API call here
    instance
      .post(`/banner`, formData)
      .then((res) => {
        reset();
        setIsLoading(false);
        toast.success(res.data.message, {
          style: {
            background: "green",
            color: "white",
          },
        });
        window.location.href = "/banners";
      })
      .catch((err) => {
        reset();
        setIsLoading(false);
        toast.error(err, {
          style: {
            background: "red",
            color: "white",
          },
        });
      });
  };

  const temp = watch("banner");

  useEffect(() => {
    setWatchImageName(temp);
  }, [temp]);

  return (
    <div className="p-10">
      <Toaster />
      <div className="flex justify-center">
        <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
          Add Banner
        </h3>
      </div>
      <div className="bg-white rounded-lg shadow p-4 py-6 sm:rounded-lg sm:max-w-5xl mt-8 mx-auto">
        <form
          className="space-y-6 mx-8 sm:mx-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* File Input Section */}
          <div className="relative w-full space-y-1">
            <label htmlFor="input" className="font-medium">
              Select Banner <span className="text-gray-500 text-sm">(Recommended Size: 1920x620px)</span>
            </label>
            <div className="items-center justify-center mx-auto">
              <label
                className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
                id="drop"
              >
                <span className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <span className="font-medium text-gray-600">
                    {Array.isArray(Array.from(watchImageName || {})) &&
                      Array.from(watchImageName || {}).length > 0
                      ? watchImageName[0]?.name
                      : "Drop Banner to Attach, or "}
                    <span className="text-blue-600 underline ml-[4px]">browse</span>
                  </span>
                </span>
                <input
                  type="file"
                  {...register("banner", { required: true })}
                  className="hidden"
                  accept="image/png,image/jpeg,image/webp"
                  id="input"
                />
              </label>
            </div>

            {/* Error Message */}
            {errors.banner && (
              <span className="text-red-500">Banner is required</span>
            )}

            {/* Banner Size Guidelines */}
            <p className="text-sm text-gray-500">
              Please upload an image with a recommended size of <strong>1920x620px</strong> and a maximum file size of <strong>2MB</strong>.
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-2">
            <button className="w-1/2 text-white rounded-md p-2 bg-blue-500 hover:bg-blue-700 transition duration-300">
              {isLoading ? <ClipLoader color="#c4c2c2" /> : <>Save</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBanner;
