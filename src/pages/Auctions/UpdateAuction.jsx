import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../../services/axiosInterceptor";
import { Toaster, toast } from "sonner";
import { ClipLoader } from "react-spinners";
import { State, City } from "country-state-city";

const UpdateAuction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [watchImageName, setWatchImageName] = useState();
  const [watchFileName, setWatchFileName] = useState();
  const [defaultCategory, setDefaultCategory] = useState({
    value: "",
    label: "",
  });
  const [existingBanner, setExistingBanner] = useState(null);
  const [existingFile, setExistingFile] = useState(null);

  const [stateLists, setStateLists] = useState([]);
  const [cityList, setCityLists] = useState([]);
  const stateRef = useRef()
  const cityRef = useRef()

  const navigate = useNavigate()

  const { id } = useParams();

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

  const processJSDate = (val) => {
    const dt = new Date(val);
    const day = ("0" + dt.getDate()).slice(-2);
    const month = ("0" + (dt.getMonth() + 1)).slice(-2);
    const date = dt.getFullYear() + "-" + month + "-" + day;
    return date;
  };

  const getAuction = () => {
    // api call here
    instance
      .get(`/auction/${id}`)
      .then((res) => {
        const result = res?.data?.result;

        console.log(result, "my result");

        setDefaultCategory({
          value: result?.category,
          label: result?.category,
        });

        console.log(defaultCategory, "my default category");

        setExistingBanner(result?.banner[0]?.secure_url);

        console.log(existingBanner, "my banner");

        setExistingFile(result?.downloads[0]?.secure_url);

        console.log(existingFile, "my exist file");
        reset({
          title: result?.title,
          auctionId: result?.auctionId,
          category: { value: result?.category, label: result?.category },
          state: result?.state,
          city: result?.city,
          area: result?.area,
          description: result?.description,
          bankName: result?.bankName,
          branch: result?.branch,
          contact: result?.contact,
          reservePrice: result?.reservePrice,
          emd: result?.emd,
          serviceProvider: result?.serviceProvider,
          borrowerName: result?.borrowerName,
          propertyType: result?.propertyType,
          auctionType: result?.auctionType,
          auctionStartDate: processJSDate(result?.auctionStartDate),
          auctionStartTime: result?.auctionStartTime,
          auctionEndDate: processJSDate(result?.auctionEndDate),
          auctionEndTime: result?.auctionEndTime,
          applicationSubmissionDate: result?.applicationSubmissionDate,
        });

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err, "my shubham error");
        reset();

        setIsLoading(false);
        toast.error(err.message, {
          style: {
            background: "red",
            color: "white",
          },
        });
      });
  };

  useEffect(() => {
    getAuction();
  }, []);

  // This block of code is used to set Indian states dropdown Values.
  useEffect(() => {
    const states = State.getStatesOfCountry("IN");
    if (states?.length > 0) {
      setStateLists(
        states.map((state) => {
          return {
            label: state?.name,
            value: state?.isoCode,
          };
        })
      );
    }
  }, []);

  const fetchCitiesList = (state) => {
    const citiesList = City.getCitiesOfState("IN", state?.value);
    setCityLists(
      citiesList.map((city) => {
        return {
          label: city?.name,
          value: city?.name,
        };
      })
    );
  };

  const categories = [
    { value: "Commercial", label: "Commercial" },
    { value: "Gold Auctions", label: "Gold Auctions" },
    { value: "Industrials", label: "Industrials" },
    { value: "Others", label: "Others" },
    { value: "Residential", label: "Residential" },
    { value: "Scrap, Plant & Machinery", label: "Scrap, Plant & Machinery" },
    { value: "Vehicle Auctions", label: "Vehicle Auctions" },
  ];

  const onSubmit = (data) => {
    if (isLoading) return;
    setIsLoading(true);
    const formData = new FormData();
    const { banner, downloads } = data;

    if (banner) {
      formData.append("banner", banner[0]);
    }
    if (downloads) {
      formData.append("downloads", downloads[0]);
    }

    formData.append("title", data?.title);
    formData.append("auctionId", data?.auctionId);
    formData.append("category", data?.category?.value);
    formData.append("state", data?.state);
    formData.append("city", data?.city);
    formData.append("area", data?.area);
    formData.append("description", data?.description);
    formData.append("bankName", data?.bankName);
    formData.append("branch", data?.branch);
    formData.append("contact", data?.contact);
    formData.append("reservePrice", data?.reservePrice || 0);
    formData.append("emd", data?.emd || 0);
    formData.append("serviceProvider", data?.serviceProvider);
    formData.append("borrowerName", data?.borrowerName);
    formData.append("propertyType", data?.propertyType);
    formData.append("auctionType", data?.auctionType);
    formData.append("auctionStartDate", data?.auctionStartDate);
    formData.append("auctionStartTime", data?.auctionStartTime);
    formData.append("auctionEndDate", data?.auctionEndDate);
    formData.append("auctionEndTime", data?.auctionEndTime);
    formData.append("applicationSubmissionDate", data?.applicationSubmissionDate);


    // api call here
    instance
      .patch(`/auction/${id}`, formData)
      .then((res) => {
        reset();
        setIsLoading(false);
        toast.success(res.data.message, {
          style: {
            background: "green",
            color: "white",
          },
        });
        navigate("/auctions")
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

  const temp2 = watch("downloads");

  useEffect(() => {
    setWatchFileName(temp2);
  }, [temp2]);

  return (
    <div className="p-10">
      <Toaster />
      <div className=" flex justify-center">
        <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
          Update Auction Property
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
              <label className="font-medium">Auction Id</label>
              <input
                {...register("auctionId", { required: "Auction Id is required" })}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.auctionId && (
                <span className="text-red-500">Auction Id required</span>
              )}
            </div>

            <div className="flex flex-col justify-center">
              <label className="font-medium mb-2">Category</label>
              <Controller
                name="category"
                control={control}
                defaultValue={defaultCategory}
                render={({ field }) => (
                  <Select {...field} options={categories} required />
                )}
              />
              {errors.category && (
                <span className="text-red-500">Category is required</span>
              )}
            </div>

            <div>
              <label className="font-medium">State</label>
              <input
                {...register("state")}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />

            </div>

            <div>
              <label className="font-medium">City</label>
              <input
                {...register("city")}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />

            </div>

            <div>
              <label className="font-medium">Area</label>
              <input
                {...register("area")}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />

            </div>

            <div>
              <label className="font-medium">Description</label>
              <input
                {...register("description")}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />

            </div>

            <div>
              <label className="font-medium">Bank Name</label>
              <input
                {...register("bankName",)}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />

            </div>

            <div>
              <label className="font-medium">Branch</label>
              <input
                {...register("branch")}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />

            </div>

            <div>
              <label className="font-medium">Contact</label>
              <input
                {...register("contact")}
                type="number"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />

            </div>

            <div>
              <label className="font-medium">Reserve Price</label>
              <input
                {...register("reservePrice")}
                type="number"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />

            </div>

            <div>
              <label className="font-medium">emd</label>
              <input
                {...register("emd")}
                type="number"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />

            </div>

            <div>
              <label className="font-medium">Service Provider`</label>
              <input
                {...register("serviceProvider")}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />

            </div>

            <div>
              <label className="font-medium">Borrower Name</label>
              <input
                {...register("borrowerName")}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />

            </div>

            <div>
              <label className="font-medium">Property Type</label>
              <input
                {...register("propertyType")}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />

            </div>

            <div>
              <label className="font-medium">Auction Type</label>
              <input
                {...register("auctionType",)}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />

            </div>

            <div>
              <label className="font-medium">Auction Start Date</label>
              <input
                {...register("auctionStartDate",)}
                type="date"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />

            </div>

            <div>
              <label className="font-medium">Auction Start Time</label>
              <input
                {...register("auctionStartTime",)}
                type="time"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />

            </div>

            <div>
              <label className="font-medium">Auction End Date</label>
              <input
                {...register("auctionEndDate",)}
                type="date"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />

            </div>

            <div>
              <label className="font-medium">Auction End Time</label>
              <input
                {...register("auctionEndTime",)}
                type="time"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />

            </div>

            <div>
              <label className="font-medium">Application Submission Date</label>
              <input
                {...register("applicationSubmissionDate",)}
                type="date"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />

            </div>
            <div className="relative w-full space-y-1">
              <label htmlFor="input" className="font-medium ">
                Old File
              </label>
              <div className="items-center justify-center  mx-auto flex flex-col">
                <a
                  href={existingFile}
                  className="text-blue-500 hover:text-blue-700 hover:underline"
                >
                  Click here to preview old file.
                </a>
              </div>
            </div>
            <div className="relative w-full space-y-1">
              <label htmlFor="input" className="font-medium ">
                Select New File
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
                      {Array.isArray(Array.from(watchFileName || {})) &&
                        Array.from(watchFileName || {}).length > 0
                        ? watchFileName[0]?.name
                        : "Drop file to Attach, or "}
                      <span className="text-blue-600 underline ml-[4px]">
                        browse
                      </span>
                    </span>
                  </span>
                  <input
                    type="file"
                    {...register("downloads", { required: false })}
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
                Old Banner
              </label>
              <div className="items-center justify-center  mx-auto">
                <img src={existingBanner} alt="" className="object-contain" />
              </div>
            </div>
            <div className="relative w-full space-y-1">
              <label htmlFor="input" className="font-medium ">
                Select New Banner
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
                      {Array.isArray(Array.from(watchImageName || {})) &&
                        Array.from(watchImageName || {}).length > 0
                        ? watchImageName[0]?.name
                        : "Drop Banner to Attach, or "}
                      <span className="text-blue-600 underline ml-[4px]">
                        browse
                      </span>
                    </span>
                  </span>
                  <input
                    type="file"
                    {...register("banner", { required: false })}
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

export default UpdateAuction;
