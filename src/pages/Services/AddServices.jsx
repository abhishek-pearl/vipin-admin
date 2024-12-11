import axios from "axios";
import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function AddServices() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      topSection: {
        miniTitle: "Home Loans Simplified",
        heading: "Home Loans Simplified",
        features: [
          { title: "Instant Provisional Sanction" },
          { title: "Digital Application Process" },
          { title: "Minimal Documentation" },
        ],
        serviceTitle: "",
        description: "",
        serviceIcon: null,
      },
      midSection: {
        topContent: {
          heading: "",
          description: "",
        },
        stepsToAvailLoan: {
          heading: "",
          steps: [
            { title: "Instant Provisional Sanction" },
            { title: "Digital Application Process" },
            { title: "Minimal Documentation" },
          ],
        },
        faq: [
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
        features: [{ description: "", heading: "" }],
        doAndDont: [{}],
        faq: [
          {
            que: "",
            ans: "",
          },
        ],
      },
    },
  });

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

  useEffect(() => {
    if (watchBanner && watchBanner.length > 0) {
      const file = watchBanner[0];
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
      return () => URL.revokeObjectURL(fileUrl);
    }
  }, [watchBanner]);

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
      const data = await axios.post(
        `${import.meta.env.VITE_API_URL}/services`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/services");
      console.log(data, "service data");
    } catch (error) {
      setIsSubmitting(false);
      console.log(error, "error");
    } finally {
      setIsSubmitting(false);
    }
    console.log(data);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg ">
      <h2 className="text-2xl font-bold mb-6 text-center">Service Form</h2>
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
            {previewUrl && (
              <div className="mt-2">
                <img
                  src={previewUrl}
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
              <div key={field.id} className="grid items-center mb-2 w-full">
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
                      {...register(`bottomSection.features.${index}.heading`, {
                        required: "Heading Title is required",
                      })}
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
                      {...register(`bottomSection.doAndDont.${index}.do`, {
                        required: "Do is required",
                      })}
                      className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Do"
                    />
                    <input
                      {...register(`bottomSection.doAndDont.${index}.dont`, {
                        required: "Dont is required",
                      })}
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
  );
}
