import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { instance } from "../../services/axiosInterceptor";
import { Toaster, toast } from "sonner";
import { ClipLoader } from "react-spinners";

const AddAuction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageName, setimageName] = useState({});

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
    const { image } = data;
    if (image) {
      formData.append("image", image[0]);
    }
    formData.append("review", data.review);
    formData.append("title", data.title);
    formData.append("stars", data.stars);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("fromAdmin", true);

    // api call here
    instance
      .post(`/reviews`, formData)
      .then((res) => {
        reset();
        setIsLoading(false);
        toast.success(res.data.message, {
          style: {
            background: "green",
            color: "white",
          },
        });
        window.location.href = "/reviews";
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

  const temp = watch("image");

  useEffect(() => {
    setimageName(temp);
  }, [temp]);

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
              {errors.topic && (
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
              {errors.topic && (
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
              {errors.topic && (
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
              {errors.topic && (
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
              {errors.topic && (
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
              {errors.topic && (
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
              {errors.topic && (
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
              {errors.topic && (
                <span className="text-red-500">branch is required</span>
              )}
            </div>

            <div>
              <label className="font-medium">Contact</label>
              <input
                {...register("contact", { required: "contact is required" })}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.topic && (
                <span className="text-red-500">contact is required</span>
              )}
            </div>

            <div>
              <label className="font-medium">Reserve Price</label>
              <input
                {...register("reservePrice", { required: "Reserve Price is required" })}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.topic && (
                <span className="text-red-500">Reserve Price is required</span>
              )}
            </div>

            <div>
              <label className="font-medium">emd</label>
              <input
                {...register("emd", { required: "emd is required" })}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.topic && (
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
              {errors.topic && (
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
              {errors.topic && (
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
              {errors.topic && (
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
              {errors.topic && (
                <span className="text-red-500">Auction Type is required</span>
              )}
            </div>

            <div>
              <label className="font-medium">Auction Start Time</label>
              <input
                {...register("auctionStartTime", { required: "Auction Start Time is required" })}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.topic && (
                <span className="text-red-500">Auction Start Time is required</span>
              )}
            </div>

            <div>
              <label className="font-medium">Auction End Time</label>
              <input
                {...register("auctionEndTime", { required: "Auction End Time is required" })}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.topic && (
                <span className="text-red-500">Auction End Time is required</span>
              )}
            </div>

            <div>
              <label className="font-medium">Application Submission Date</label>
              <input
                {...register("applicationSubmissionDate", { required: "Application Submission Date is required" })}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.topic && (
                <span className="text-red-500">Application Submission Date is required</span>
              )}
            </div>

            <div>
              <label className="font-medium">Files</label>
              <input
                {...register("state", { required: "state is required" })}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.topic && (
                <span className="text-red-500">state is required</span>
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

// const propertySchema = new mongoose.Schema({
//   category: {
//     type: String,
//     required: [true, "Category is required"],
//   },
//   state: {
//     type: String,
//     required: [true, "State is required"],
//   },
//   city: {
//     type: String,
//     required: [true, "City is required"],
//   },
//   area: {
//     type: String,
//     required: [true, "Area/Town is required"],
//   },
//   description: {
//     type: String,
//     required: [true, "Description is required"],
//   },

//   bankName: {
//     type: String,
//     required: [true, "Bank Name is required"],
//   },
//   branch: {
//     type: String,
//     required: [true, "Branch Name is required"],
//   },
//   contact: {
//     type: String,
//     required: [true, "Mobile Number is required"],
//   },
//   reservePrice: {
//     type: String,
//     required: [true, "Reserve price is required"],
//   },
//   emd: {
//     type: String,
//     required: [true, "Reserve price is required"],
//   },
//   serviceProvider: {
//     type: String,
//     required: [true, "Service Provider is required"],
//   },

//   borrowerName: {
//     type: String,
//     required: [true, "Borrower Name is required"],
//   },
//   propertyType: {
//     type: String,
//     required: [true, "Borrower Name is required"],
//   },
//   auctionType: {
//     type: String,
//     required: [true, "Borrower Name is required"],
//   },
//   auctionStartTime: {
//     type: String,
//     required: [true, "auctionStartTime is required"],
//   },
//   auctionEndTime: {
//     type: String,
//     required: [true, "auctionEndTime is required"],
//   },
//   applicationSubmissionDate: {
//     type: String,
//     required: [true, "applicationSubmissionDate is required"],
//   },
//   downloads: {
//     type: [
//       {
//         name: {
//           type: String,
//           required: [true, "file name is required"],
//         },
//         file: {
//           type: [],
//           required: [true, "file is required"],
//         },
//       },
//     ],
//   },
// });
