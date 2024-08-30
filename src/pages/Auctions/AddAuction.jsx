import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { instance } from "../../services/axiosInterceptor";
import { Toaster, toast } from "sonner";
import { ClipLoader } from "react-spinners";

const AddAuction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [watchImageName, setWatchImageName] = useState();
  const [watchFileName, setWatchFileName] = useState()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = (data) => {
    if (isLoading) return;
    setIsLoading(true);
    const formData = new FormData();
    const { banner,downloads } = data;
    if (banner) {
      formData.append("banner", banner[0]);
    }
    if (downloads) {
      formData.append("downloads", downloads[0]);
    }

    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("state", data.state);
    formData.append("city", data.city);
    formData.append("area", data.area);
    formData.append("description", data.description);
    formData.append("bankName", data.bankName);
    formData.append("branch", data.branch);
    formData.append("contact", data.contact);
    formData.append("reservePrice", data.reservePrice);
    formData.append("emd", data.emd);
    formData.append("serviceProvider", data.serviceProvider);
    formData.append("borrowerName", data.borrowerName);
    formData.append("propertyType", data.propertyType);
    formData.append("auctionType", data.auctionType);
    formData.append("auctionStartTime", data.auctionStartTime);
    formData.append("auctionEndTime", data.auctionEndTime);
    formData.append("applicationSubmissionDate", data.applicationSubmissionDate);

    // api call here
    instance
      .post(`/auction`, formData)
      .then((res) => {
        reset();
        setIsLoading(false);
        toast.success(res.data.message, {
          style: {
            background: "green",
            color: "white",
          },
        });
        window.location.href = "/auction";
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

  const temp2 =  watch("downloads")
  
  useEffect(() => {
   setWatchFileName(temp2)
  }, [temp2])

  return (
    <div className="p-10">
      <Toaster />
      <div className=" flex justify-center">
        <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
          Add an Auction Property
        </h3>
      </div>
      <div className="bg-white rounded-lg shadow p-4 py-6  sm:rounded-lg sm:max-w-5xl mt-8 mx-auto">
        <form
          className="space-y-6 mx-8 sm:mx-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="font-medium">Title</label>
              <input
                {...register("title", { required: "title is required" })}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.title && (
                <span className="text-red-500">Review Title is required</span>
              )}
            </div>

            <div>
              <label className="font-medium">Category</label>
              <input
                {...register("category", { required: "category is required" })}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.category && (
                <span className="text-red-500">Category is required</span>
              )}
            </div>

            <div>
              <label className="font-medium">State</label>
              <input
                {...register("state", { required: "state is required" })}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.state && (
                <span className="text-red-500">state is required</span>
              )}
            </div>

            <div>
              <label className="font-medium">City</label>
              <input
                {...register("city", { required: "city is required" })}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.city && (
                <span className="text-red-500">city is required</span>
              )}
            </div>

            <div>
              <label className="font-medium">Area</label>
              <input
                {...register("area", { required: "Area is required" })}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.area && (
                <span className="text-red-500">Area is required</span>
              )}
            </div>

            <div>
              <label className="font-medium">Description</label>
              <input
                {...register("description", { required: "description is required" })}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.description && (
                <span className="text-red-500">description is required</span>
              )}
            </div>

            <div>
              <label className="font-medium">Bank Name</label>
              <input
                {...register("bankName", { required: "Bank Name is required" })}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.bankName && (
                <span className="text-red-500">Bank Name is required</span>
              )}
            </div>

            <div>
              <label className="font-medium">Branch</label>
              <input
                {...register("branch", { required: "branch is required" })}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.branch && (
                <span className="text-red-500">branch is required</span>
              )}
            </div>

            <div>
              <label className="font-medium">Contact</label>
              <input
                {...register("contact", { required: "contact is required" })}
                type="number"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.contact && (
                <span className="text-red-500">contact is required</span>
              )}
            </div>

            <div>
              <label className="font-medium">Reserve Price</label>
              <input
                {...register("reservePrice", { required: "Reserve Price is required" })}
                type="number"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.reservePrice && (
                <span className="text-red-500">Reserve Price is required</span>
              )}
            </div>

            <div>
              <label className="font-medium">emd</label>
              <input
                {...register("emd", { required: "emd is required" })}
                type="number"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.emd && (
                <span className="text-red-500">emd is required</span>
              )}
            </div>

            <div>
              <label className="font-medium">Service Provider`</label>
              <input
                {...register("serviceProvider", { required: "Service Provider is required" })}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.serviceProvider && (
                <span className="text-red-500">Service Provider` is required</span>
              )}
            </div>

            <div>
              <label className="font-medium">Borrower Name</label>
              <input
                {...register("borrowerName", { required: "Borrower Name is required" })}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.borrowerName && (
                <span className="text-red-500">Borrower Name is required</span>
              )}
            </div>

            <div>
              <label className="font-medium">Property Type</label>
              <input
                {...register("propertyType", { required: "Property Type is required" })}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.propertyType && (
                <span className="text-red-500">Property Type is required</span>
              )}
            </div>

            <div>
              <label className="font-medium">Auction Type</label>
              <input
                {...register("auctionType", { required: "Auction Type is required" })}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.auctionType && (
                <span className="text-red-500">Auction Type is required</span>
              )}
            </div>

            <div>
              <label className="font-medium">Auction Start Time</label>
              <input
                {...register("auctionStartTime", { required: "Auction Start Time is required" })}
                type="time"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.auctionStartTime && (
                <span className="text-red-500">Auction Start Time is required</span>
              )}
            </div>

            <div>
              <label className="font-medium">Auction End Time</label>
              <input
                {...register("auctionEndTime", { required: true })}
                type="time"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.auctionEndTime && (
                <span className="text-red-500">Auction End Time is required</span>
              )}
            </div>

            <div>
              <label className="font-medium">Application Submission Date</label>
              <input
                {...register("applicationSubmissionDate", { required: true })}
                type="date"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.applicationSubmissionDate && (
                <span className="text-red-500">Application Submission Date is required</span>
              )}
            </div>

            <div className="relative w-full space-y-1">
                <label htmlFor="input" className="font-medium ">
                 Upload File
                </label>
                <div className="items-center justify-center  mx-auto">
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
                      {Array.isArray(Array.from(watchFileName || {})) && Array.from(watchFileName || {}).length > 0 ? watchFileName[0]?.name : 'Drop file to Attach, or '}
                        <span className="text-blue-600 underline ml-[4px]">
                          browse
                        </span>
                      </span>
                    </span>
                    <input
                      type="file"
                      {...register('downloads', { required: true })}
                      className="hidden"
                      accept=".pdf, .doc, .docx"
                      id="input"
                    />
                  </label>
                </div>
                {errors.downloads && (
                  <span className="text-red-500">File is required</span>
                )}
              </div>
            <div className="relative w-full space-y-1">
                <label htmlFor="input" className="font-medium ">
                 Upload Banner
                </label>
                <div className="items-center justify-center  mx-auto">
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
                      {Array.isArray(Array.from(watchImageName || {})) && Array.from(watchImageName || {}).length > 0 ? watchImageName[0]?.name : 'Drop Banner to Attach, or '}
                        <span className="text-blue-600 underline ml-[4px]">
                          browse
                        </span>
                      </span>
                    </span>
                    <input
                      type="file"
                      {...register('banner', { required:true })}
                      className="hidden"
                      accept="image/png,image/jpeg,image/webp"
                      id="input"
                    />
                  </label>
                </div>
                
                {errors.banner && (
                  <span className="text-red-500">Banner is required</span>
                )}
              </div>

          </div>

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

export default AddAuction;

