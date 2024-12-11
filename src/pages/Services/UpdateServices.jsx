import React, { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import { instance } from "../../services/axiosInterceptor";
import { Toaster, toast } from "sonner";

const UpdateServices = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { state } = useLocation();
  console.log(state, "state 123456");

  //   const { id } = useParams();

  //   const getServices = () => {
  //     // api call here
  //     instance
  //       .get(`/services/${id}`)
  //       .then((res) => {
  //         const result = res?.data;

  //         setService(result);

  //         setIsLoading(false);
  //       })
  //       .catch((err) => {
  //         reset();

  //         setIsLoading(false);
  //         toast.error(err, {
  //           style: {
  //             background: "red",
  //             color: "white",
  //           },
  //         });
  //       });
  //   };

  //   useEffect(() => {
  //     getServices();
  //   }, []);

  //   console.log(service, "set state service");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      topSection: {
        miniTitle: state?.topSection?.miniTitle || "",
        heading: state?.topSection?.heading || "",
        features: state?.topSection?.features || [],

        serviceTitle: state?.serviceTitle || "",
        description: state?.description || "",
        serviceIcon: state?.serviceIcon || "",
      },
      midSection: {
        topContent: {
          heading: state?.midSection?.topContent?.heading || "",
          description: state?.midSection?.topContent?.heading || "",
        },
        stepsToAvailLoan: {
          heading: state?.midSection?.stepsToAvailLoan?.heading || "",
          steps: state?.midSection?.stepsToAvailLoan?.steps || [],
          banner: state?.midSection?.stepsToAvailLoan?.banner || "",
        },
        faq: state?.midSection?.faq || [
          {
            que: "",
            ans: "",
          },
          {
            que: "",
            ans: "",
          },
          {
            que: "",
            ans: "",
          },
        ],
      },
      bottomSection: {
        features: state.bottomSection.features || [
          { description: "", heading: "" },
        ],
        doAndDont: state.bottomSection.doAndDont || [{}],
        faq: state.bottomSection.faq || [
          {
            que: "",
            ans: "",
          },
        ],
      },
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serviceIconPreviewUrl, setServiceIconPreviewUrl] = useState(null);

  const [bannerPreviewUrl, setBannerPreviewUrl] = useState(null);

  const [stepsAvailBannerPreviewUrl, setStepsAvailBannerPreviewUrl] =
    useState(null);

  // top section
  const { fields, append, remove } = useFieldArray({
    control,
    name: "topSection.features",
  });

  // mid section
  const {
    fields: fields2,
    append: append2,
    remove: remove2,
  } = useFieldArray({
    control,
    name: "midSection.stepsToAvailLoan.steps",
  });
  const {
    fields: fields3,
    append: append3,
    remove: remove3,
  } = useFieldArray({
    control,
    name: "midSection.faq",
  });

  // bottom section
  const {
    fields: fields4,
    append: append4,
    remove: remove4,
  } = useFieldArray({
    control,
    name: "bottomSection.features",
  });
  const {
    fields: fields5,
    append: append5,
    remove: remove5,
  } = useFieldArray({
    control,
    name: "bottomSection.faq",
  });
  const {
    fields: fields6,
    append: append6,
    remove: remove6,
  } = useFieldArray({
    control,
    name: "bottomSection.doAndDont",
  });

  const watchBanner = watch("topSection.banner");
  const watchServiceIcon = watch("topSection.serviceIcon");
  const watchStepsBanner = watch("midSection.stepsToAvailLoan.banner");

  useEffect(() => {
    if (state.serviceIcon) {
      setServiceIconPreviewUrl(state.serviceIcon);
    }
  }, []);

  useEffect(() => {
    if (state.topSection.banner) {
      setBannerPreviewUrl(state.topSection.banner);
    }
  }, []);

  useEffect(() => {
    if (state.midSection.stepsToAvailLoan.banner) {
      setStepsAvailBannerPreviewUrl(state.midSection.stepsToAvailLoan.banner);
    }
  }, []);

  // useEffect(() => {
  //   if (watchBanner && watchBanner.length > 0) {
  //     console.log(watchBanner[0], "main banner changed");
  //     const file = watchBanner[0];
  //     const fileUrl = URL.createObjectURL(file);
  //     console.log(fileUrl, "main banner new file url");
  //     setBannerPreviewUrl(fileUrl);
  //     return () => URL.revokeObjectURL(fileUrl);
  //   }
  // }, [watchBanner]);

  // useEffect(() => {
  //   if (watchServiceIcon && watchServiceIcon.length > 0) {
  //     console.log(watchServiceIcon[0], "service icon changed");
  //     const file = watchServiceIcon[0];
  //     const fileUrl = URL.createObjectURL(file);
  //     console.log(fileUrl, "service icon new file url");
  //     setServiceIconPreviewUrl(fileUrl);
  //     return () => URL.revokeObjectURL(fileUrl);
  //   }
  // }, [watchServiceIcon]);

  // useEffect(() => {
  //   if (watchStepsBanner && watchStepsBanner.length > 0) {
  //     console.log(watchStepsBanner[0], "steps to avail loan banner changed");
  //     const file = watchStepsBanner[0];
  //     const fileUrl = URL.createObjectURL(file);
  //     console.log(fileUrl, "steps to avail loan banner new file url");
  //     setStepsAvailBannerPreviewUrl(fileUrl);
  //     return () => URL.revokeObjectURL(fileUrl);
  //   }
  // }, [watchStepsBanner]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("midSection", JSON.stringify(data.midSection));

    console.log(data.bottomSection);
    // media file
    formData.append("topSectionImage", data.topSection?.banner[0]);
    formData.append("serviceIcon", data?.topSection?.serviceIcon[0]);
    formData.append(
      "stepsToAvailLoanImage",
      data?.midSection?.stepsToAvailLoan?.banner[0]
    );
    formData.append("serviceTitle", data?.topSection.serviceTitle);
    formData.append("description", data?.topSection.description);

    data?.bottomSection?.features?.map((item) => {
      formData.append("bottomSectionFeaturesImages", item?.icon[0]);
    });
    data?.bottomSection?.features?.forEach((element) => {
      delete element.icon;
    });
    formData.append("bottomSection", JSON.stringify(data.bottomSection));
    formData.append("topSection", JSON.stringify(data.topSection));

    console.log(data.bottomSection, "data?.bottomSectin");

    setIsSubmitting(true);
    try {
      formData.forEach((element) => {
        console.log(element, "formData");
      });
      const data = await instance.post(
        `${import.meta.env.VITE_API_URL}/services`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data, "service data");
    } catch (error) {
      setIsSubmitting(false);
      console.log(error, "error");
    } finally {
      setIsSubmitting(false);
    }
    console.log(data);
  };

  //   const onSubmit = (data) => {
  //     if (isLoading) return;
  //     setIsLoading(true);
  //     const formData = new FormData();
  //     const { banner, downloads } = data;

  //     if (banner) {
  //       formData.append("banner", banner[0]);
  //     }
  //     if (downloads) {
  //       formData.append("downloads", downloads[0]);
  //     }

  //     formData.append("title", data.title);
  //     formData.append("category", data.category.value);
  //     formData.append("state", data.state);
  //     formData.append("city", data.city);
  //     formData.append("area", data.area);
  //     formData.append("description", data.description);
  //     formData.append("bankName", data.bankName);
  //     formData.append("branch", data.branch);
  //     formData.append("contact", data.contact);
  //     formData.append("reservePrice", data.reservePrice);
  //     formData.append("emd", data.emd);
  //     formData.append("serviceProvider", data.serviceProvider);
  //     formData.append("borrowerName", data.borrowerName);
  //     formData.append("propertyType", data.propertyType);
  //     formData.append("auctionType", data.auctionType);
  //     formData.append("auctionStartDate", data.auctionStartDate);
  //     formData.append("auctionStartTime", data.auctionStartTime);
  //     formData.append("auctionEndDate", data.auctionEndDate);

  //     formData.append("auctionEndTime", data.auctionEndTime);
  //     formData.append(
  //       "applicationSubmissionDate",
  //       data.applicationSubmissionDate
  //     );

  //     // api call here
  //     instance
  //       .post(`/services`, formData)
  //       .then((res) => {
  //         reset();
  //         setIsLoading(false);
  //         toast.success(res.data.message, {
  //           style: {
  //             background: "green",
  //             color: "white",
  //           },
  //         });
  //         window.location.href = "/auctions";
  //       })
  //       .catch((err) => {
  //         reset();

  //         setIsLoading(false);
  //         toast.error(err, {
  //           style: {
  //             background: "red",
  //             color: "white",
  //           },
  //         });
  //       });
  //   };

  //   const temp = watch("banner");

  //   useEffect(() => {
  //     setWatchImageName(temp);
  //   }, [temp]);

  //   const temp2 = watch("downloads");

  //   useEffect(() => {
  //     setWatchFileName(temp2);
  //   }, [temp2]);

  return (
    <div className="p-10">
      <Toaster />
      <div className=" flex justify-center">
        <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
          Update Services
        </h3>
      </div>
      <div className="bg-white rounded-lg shadow p-4 py-6  sm:rounded-lg sm:max-w-5xl mt-8 mx-auto">
        <form
          className="space-y-6 mx-8 sm:mx-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* <div className="">
            <h1 className=""> Top Section </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="font-medium">Mini Title</label>
              <input
                {...register("title", { required: "title is required" })}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.title && (
                <span className="text-red-500">Mini Title is required</span>
              )}
            </div>

            <div>
              <label className="font-medium">Heading</label>
              <input
                {...register("title", { required: "heading is required" })}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.title && (
                <span className="text-red-500">Heading is required</span>
              )}
            </div>

            <div>
              <label className="font-medium">Top Section Banner </label>
              <input
                {...register("title", { required: "heading is required" })}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.title && (
                <span className="text-red-500">
                  Top Section Banner is required
                </span>
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
                {...register("description", {
                  required: "description is required",
                })}
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
                {...register("reservePrice", {
                  required: "Reserve Price is required",
                })}
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
                {...register("serviceProvider", {
                  required: "Service Provider is required",
                })}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.serviceProvider && (
                <span className="text-red-500">
                  Service Provider` is required
                </span>
              )}
            </div>

            <div>
              <label className="font-medium">Borrower Name</label>
              <input
                {...register("borrowerName", {
                  required: "Borrower Name is required",
                })}
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
                {...register("propertyType", {
                  required: "Property Type is required",
                })}
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
                {...register("auctionType", {
                  required: "Auction Type is required",
                })}
                type="text"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.auctionType && (
                <span className="text-red-500">Auction Type is required</span>
              )}
            </div>

            <div>
              <label className="font-medium">Auction Start Date</label>
              <input
                {...register("auctionStartDate", { required: true })}
                type="date"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.auctionStartDate && (
                <span className="text-red-500">
                  Auction Start Date is required
                </span>
              )}
            </div>

            <div>
              <label className="font-medium">Auction Start Time</label>
              <input
                {...register("auctionStartTime", {
                  required: "Auction Start Time is required",
                })}
                type="time"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.auctionStartTime && (
                <span className="text-red-500">
                  Auction Start Time is required
                </span>
              )}
            </div>

            <div>
              <label className="font-medium">Auction End Date</label>
              <input
                {...register("auctionEndDate", { required: true })}
                type="date"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.auctionEndDate && (
                <span className="text-red-500">
                  Auction End Date is required
                </span>
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
                <span className="text-red-500">
                  Auction End Time is required
                </span>
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
                <span className="text-red-500">
                  Application Submission Date is required
                </span>
              )}
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
          </div> */}

          <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg ">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Service Form
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-6">
                <div className="font-medium border-b-2 py-3 border-black">
                  Top Section
                </div>
                {/* Mini Title Field */}
                <div>
                  <label
                    htmlFor="miniTitle"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Mini Title
                  </label>
                  <input
                    id="miniTitle"
                    type="text"
                    {...register("topSection.miniTitle", {
                      required: "Mini Title is required",
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.topSection?.miniTitle && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.topSection.miniTitle.message}
                    </p>
                  )}
                </div>

                {/* Heading Field */}
                <div>
                  <label
                    htmlFor="heading"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Heading
                  </label>
                  <input
                    id="heading"
                    type="text"
                    {...register("topSection.heading", {
                      required: "Heading is required",
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.topSection?.heading && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.topSection.heading.message}
                    </p>
                  )}
                </div>

                {/* Service Title Field */}
                <div>
                  <label
                    htmlFor="serviceTitle"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Service Title
                  </label>
                  <input
                    id="serviceTitle"
                    type="text"
                    {...register("topSection.serviceTitle", {
                      required: "Service Title is required",
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.topSection?.serviceTitle && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.topSection.serviceTitle.message}
                    </p>
                  )}
                </div>

                {/* Description Field */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    {...register("topSection.description", {
                      required: "Description is required",
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                  />
                  {errors.topSection?.description && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.topSection.description.message}
                    </p>
                  )}
                </div>

                {/* Service Icon Field */}
                <div>
                  <label
                    htmlFor="serviceIcon"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Service Icon
                  </label>
                  <input
                    id="serviceIcon"
                    type="file"
                    accept="image/*"
                    {...register("topSection.serviceIcon", {
                      required: "Service icon is required",
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.topSection?.serviceIcon && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.topSection.serviceIcon.message}
                    </p>
                  )}
                  {serviceIconPreviewUrl && (
                    <div className="mt-2">
                      <img
                        src={serviceIconPreviewUrl}
                        alt="Service Icon preview"
                        className="max-w-full h-auto rounded-md"
                      />
                    </div>
                  )}
                </div>

                {/* Banner Field */}
                <div>
                  <label
                    htmlFor="banner"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Banner Image
                  </label>
                  <input
                    id="banner"
                    type="file"
                    accept="image/*"
                    {...register("topSection.banner", {
                      required: "Banner image is required",
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.topSection?.banner && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.topSection.banner.message}
                    </p>
                  )}
                  {bannerPreviewUrl && (
                    <div className="mt-2">
                      <img
                        src={bannerPreviewUrl}
                        alt="Banner preview"
                        className="max-w-full h-auto rounded-md"
                      />
                    </div>
                  )}
                </div>

                {/* Features Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features
                  </label>
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center mb-2">
                      <input
                        {...register(`topSection.features.${index}.title`, {
                          required: "Feature title is required",
                        })}
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Feature title"
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => append({ title: "" })}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Add Feature
                  </button>
                </div>
              </div>
              <div className="space-y-6">
                <div className="font-medium border-b-2 py-3 border-black">
                  Mid Section
                </div>
                <div>
                  <label
                    htmlFor="topContentHeading"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Heading
                  </label>
                  <input
                    id="topContentHeading"
                    type="text"
                    {...register("midSection.topContent.heading", {
                      required: "Heading Title is required",
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.midSection?.topContent?.heading && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.midSection?.topContent?.heading?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    type="text"
                    {...register("midSection.topContent.description", {
                      required: "Description Title is required",
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    cols="30"
                    rows="10"
                  ></textarea>
                  {errors?.midSection?.topContent?.description && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors?.midSection?.topContent?.description?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="stepsToAvailLoanHeading"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Heading
                  </label>
                  <input
                    id="stepsToAvailLoanHeading"
                    type="text"
                    {...register("midSection.stepsToAvailLoan.heading", {
                      required: "Heading Title is required",
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.midSection?.stepsToAvailLoan?.heading && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.midSection?.stepsToAvailLoan?.heading?.message}
                    </p>
                  )}
                </div>
                {/* Features Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Steps
                  </label>
                  {fields2?.map((field, index) => (
                    <div key={field.id} className="flex items-center mb-2">
                      <input
                        {...register(
                          `midSection.stepsToAvailLoan.steps.${index}.title`,
                          { required: "Steps title is required" }
                        )}
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Feature title"
                      />
                      <button
                        type="button"
                        onClick={() => remove2(index)}
                        className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => append2({ title: "" })}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Add Feature
                  </button>
                </div>
                {/* mid section stepsToAvail banner */}
                <div>
                  <label
                    htmlFor="stepsToAvailBanner"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Steps To Avail Banner
                  </label>
                  <input
                    id="stepsToAvailBanner"
                    type="file"
                    accept="image/*"
                    {...register("midSection.stepsToAvailLoan.banner", {
                      required: "Banner is required",
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.midSection?.stepsToAvailLoan?.banner && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors?.midSection?.stepsToAvailLoan?.banner?.message}
                    </p>
                  )}

                  {stepsAvailBannerPreviewUrl && (
                    <div className="mt-2">
                      <img
                        src={stepsAvailBannerPreviewUrl}
                        alt="Steps To Avail Banner preview"
                        className="max-w-full h-auto rounded-md"
                      />
                    </div>
                  )}
                </div>
                {/* Faq Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Faq
                  </label>
                  {fields3?.map((field, index) => (
                    <div key={field.id} className="flex items-center mb-2">
                      <div className="flex w-full space-x-2">
                        <input
                          {...register(`midSection.faq.${index}.que`, {
                            required: "Faq is required",
                          })}
                          className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Question"
                        />
                        <input
                          {...register(`midSection.faq.${index}.ans`, {
                            required: "Faq is required",
                          })}
                          className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Answer"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => remove3(index)}
                        className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => append3({ que: "", ans: "" })}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Add Feature
                  </button>
                </div>
              </div>
              <div className="space-y-6">
                <div className="font-medium border-b-2 py-3 border-black">
                  Bottom Section
                </div>
                {/* Features Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    features
                  </label>
                  {fields4?.map((field, index) => (
                    <div
                      key={field.id}
                      className="grid items-center mb-2 w-full"
                    >
                      <div className="flex items-center  w-full">
                        <div className="w-full">
                          <label
                            htmlFor="topContentHeading"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Heading
                          </label>
                          <input
                            id="topContentHeading"
                            type="text"
                            {...register(
                              `bottomSection.features.${index}.heading`,
                              {
                                required: "Heading Title is required",
                              }
                            )}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => remove4(index)}
                          className="ml-2 mt-6 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          Remove
                        </button>
                      </div>
                      <div>
                        <label
                          htmlFor="bottomSectionFeatureIcon"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Icon
                        </label>
                        <input
                          id="bottomSectionFeatureIcon"
                          type="file"
                          accept="image/*"
                          {...register(`bottomSection.features.${index}.icon`, {
                            required: "Icon is required",
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Description
                        </label>
                        <textarea
                          id="description"
                          type="text"
                          {...register(
                            `bottomSection.features.${index}.description`,
                            { required: "Description is required" }
                          )}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          cols="30"
                          rows="10"
                        ></textarea>
                      </div>
                    </div>
                  ))}
                  {/* Faq Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Faq
                    </label>
                    {fields5?.map((field, index) => (
                      <div key={field.id} className="flex items-center mb-2">
                        <div className="flex w-full space-x-2">
                          <input
                            {...register(`bottomSection.faq.${index}.que`, {
                              required: "Faq is required",
                            })}
                            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Question"
                          />
                          <input
                            {...register(`bottomSection.faq.${index}.ans`, {
                              required: "Faq is required",
                            })}
                            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Answer"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => remove5(index)}
                          className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => append5({ que: "", ans: "" })}
                      className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      Add
                    </button>
                  </div>

                  {/* Do Dont */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Do Dont
                    </label>
                    {fields6?.map((field, index) => (
                      <div key={field.id} className="flex items-center mb-2">
                        <div className="flex w-full space-x-2">
                          <input
                            {...register(
                              `bottomSection.doAndDont.${index}.do`,
                              {
                                required: "Do is required",
                              }
                            )}
                            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Do"
                          />
                          <input
                            {...register(
                              `bottomSection.doAndDont.${index}.dont`,
                              {
                                required: "Dont is required",
                              }
                            )}
                            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Don't"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => remove6(index)}
                          className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => append6({ do: "", dont: "" })}
                      className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      Add
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      append4({ icon: "", description: "", heading: "" })
                    }
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Add Feature
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateServices;
