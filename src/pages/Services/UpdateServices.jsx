import axios from "axios";
import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../../services/axiosInterceptor";

export default function AddServices() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [icon, setIcon] = useState(null);
  const [stepsToAvailBanner, setSetStepToAvailBanner] = useState(null);
  const [service, setServices] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [featuresImages,setFeatureImages] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      serviceTitle: "",
      description: "",
      serviceIcon: null,
      topSection: {
        miniTitle: "",
        heading: "",
        features: "",
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
          banner: "",
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
        features: [{ description: "", heading: "", icon: "" }],
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
  const fetchData = async () => {
    setIsLoading(true); // Show loading indicator
    try {
      const { data } = await instance.get(
        `${import.meta.env.VITE_API_URL}/services/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Fetched Services", data);
      setServices(data); // Save fetched data
      reset(data);
    } catch (err) {
      setError(err); // Handle errors
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Field arrays
  const { fields, append, remove } = useFieldArray({
    control,
    name: "topSection.features",
  });
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
  const watchIcon = watch("serviceIcon");
  const watchMidSectionBanner = watch("midSection.stepsToAvailLoan.banner");
  // const watchBottomSectionIcon = watch("bottomSection.stepsToAvailLoan.banner");

  useEffect(() => {
    if (watchBanner && typeof watchBanner != typeof {}) {
      setPreviewUrl(watchBanner);
    } else if (watchBanner && watchBanner.length > 0) {
      const file = watchBanner?.[0];
      const fileUrl = URL?.createObjectURL(file);
      setPreviewUrl(fileUrl);
      return () => URL?.revokeObjectURL(fileUrl);
    }

    if (watchIcon && typeof watchIcon != typeof {}) {
      setIcon(watchIcon);
    } else if (watchIcon && watchIcon.length > 0) {
      const file = watchIcon?.[0];
      const fileUrl = URL?.createObjectURL(file);
      setIcon(fileUrl);
      return () => URL?.revokeObjectURL(fileUrl);
    }
    if (watchMidSectionBanner && typeof watchMidSectionBanner != typeof {}) {
      alert(watchMidSectionBanner);
      setSetStepToAvailBanner(watchMidSectionBanner);
    } else if (watchMidSectionBanner && watchMidSectionBanner.length > 0) {
      const file = watchMidSectionBanner?.[0];
      const fileUrl = URL?.createObjectURL(file);
      setSetStepToAvailBanner(fileUrl);
      return () => URL?.revokeObjectURL(fileUrl);
    }
  }, [watchBanner, watchIcon, watchMidSectionBanner]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    
    // console.log("Data",data);
    // return ;
    formData.append("midSection", JSON.stringify(data.midSection));
    formData.append("topSectionImage", data.topSection?.banner[0]);
    formData.append("serviceIcon", data?.topSection?.serviceIcon[0]);
    formData.append(
      "stepsToAvailLoanImage",
      data?.midSection?.stepsToAvailLoan?.banner[0]
    );
    formData.append("serviceTitle", data?.serviceTitle);
    formData.append("description", data?.description);

    data?.bottomSection?.features?.forEach((item) => {
      if(typeof item?.icon != typeof "")
      {
        formData.append(`bottomSectionFeaturesImages`, item?.icon?.[0]);
        delete item.icon;
      }
    });

    formData.append("bottomSection", JSON.stringify(data.bottomSection));
    formData.append("topSection", JSON.stringify(data.topSection));
    

     formData.forEach((key,value)=>{
      console.log(key,value);
     })
    setIsSubmitting(true);
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/services/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/services");
      console.log(response, "service data");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Service Form
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Top Section */}
        <div className="space-y-6">
          <div className="font-medium border-b-2 py-3 border-gray-200 text-gray-700">
            Top Section
          </div>
          <InputField
            label="Mini Title"
            id="miniTitle"
            register={register}
            name="topSection.miniTitle"
            errors={errors}
            required
          />
          <InputField
            label="Heading"
            id="heading"
            register={register}
            name="topSection.heading"
            errors={errors}
            required
          />
          <InputField
            label="Service Title"
            id="serviceTitle"
            register={register}
            name="serviceTitle"
            errors={errors}
            required
          />
          <TextAreaField
            label="Description"
            id="description"
            register={register}
            name="description"
            errors={errors}
            required
          />
          {icon && (
            <div className="mt-2">
              <img
                src={icon || "/placeholder.svg"}
                alt="icon preview"
                className="max-w-full h-auto rounded-md"
              />
            </div>
          )}
          <FileInputField
            label="Service Icon"
            id="serviceIcon"
            register={register}
            name="topSection.serviceIcon"
            errors={errors}
            // required
          />
          <FileInputField
            label="Banner Image"
            id="banner"
            register={register}
            name="topSection.banner"
            errors={errors}
            // required
          />
          {previewUrl && (
            <div className="mt-2">
              <img
                src={previewUrl || "/placeholder.svg"}
                alt="Banner preview"
                className="max-w-full h-auto rounded-md"
              />
            </div>
          )}
          <DynamicFields
            fields={fields}
            register={register}
            remove={remove}
            append={append}
            name="topSection.features"
            label="Features"
          />
        </div>

        {/* Mid Section */}
        <div className="space-y-6">
          <div className="font-medium border-b-2 py-3 border-gray-200 text-gray-700">
            Mid Section
          </div>
          <InputField
            label="Heading"
            id="topContentHeading"
            register={register}
            name="midSection.topContent.heading"
            errors={errors}
            required
          />
          <TextAreaField
            label="Description"
            id="topContentDescription"
            register={register}
            name="midSection.topContent.description"
            errors={errors}
            required
          />
          <InputField
            label="Steps to Avail Loan Heading"
            id="stepsToAvailLoanHeading"
            register={register}
            name="midSection.stepsToAvailLoan.heading"
            errors={errors}
            required
          />
          <DynamicFields
            fields={fields2}
            register={register}
            remove={remove2}
            append={append2}
            name="midSection.stepsToAvailLoan.steps"
            label="Steps"
          />
          {stepsToAvailBanner && (
            <div className="mt-2">
              <img
                src={stepsToAvailBanner || "/placeholder.svg"}
                alt="Banner preview"
                className="max-w-full h-auto rounded-md"
              />
            </div>
          )}
          <FileInputField
            label="Steps To Avail Banner"
            id="stepsToAvailBanner"
            register={register}
            name="midSection.stepsToAvailLoan.banner"
            errors={errors}
            // required
          />
          <DynamicFaqFields
            fields={fields3}
            register={register}
            remove={remove3}
            append={append3}
            name="midSection.faq"
            label="FAQ"
          />
        </div>

        {/* Bottom Section */}
        <div className="space-y-6">
          <div className="font-medium border-b-2 py-3 border-gray-200 text-gray-700">
            Bottom Section
          </div>
          <DynamicFeatureFields
            fields={fields4}
            register={register}
            remove={remove4}
            append={append4}
            name="bottomSection.features"
            label="Features"
            getValues={getValues}
            setValue={setValue}
          />
          <DynamicFaqFields
            fields={fields5}
            register={register}
            remove={remove5}
            append={append5}
            name="bottomSection.faq"
            label="FAQ"
          />
          <DynamicDoAndDontFields
            fields={fields6}
            register={register}
            remove={remove6}
            append={append6}
            name="bottomSection.doAndDont"
            label="Do and Don't"
          />
        </div>

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

// Helper Components

const InputField = ({
  label,
  id,
  register,
  name,
  errors,
  required = false,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      id={id}
      type="text"
      {...register(name, { required: required && `${label} is required` })}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {errors[name.split(".")[0]]?.[name.split(".")[1]] && (
      <p className="mt-1 text-xs text-red-500">
        {errors[name.split(".")[0]][name.split(".")[1]].message}
      </p>
    )}
  </div>
);

const TextAreaField = ({
  label,
  id,
  register,
  name,
  errors,
  required = false,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <textarea
      id={id}
      {...register(name, { required: required && `${label} is required` })}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      rows="4"
    />
    {errors[name.split(".")[0]]?.[name.split(".")[1]] && (
      <p className="mt-1 text-xs text-red-500">
        {errors[name.split(".")[0]][name.split(".")[1]].message}
      </p>
    )}
  </div>
);

const FileInputField = ({
  label,
  id,
  register,
  name,
  errors,
  required = false,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      id={id}
      type="file"
      accept="image/*"
      {...register(name, { required: required && `${label} is required` })}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {errors[name.split(".")[0]]?.[name.split(".")[1]] && (
      <p className="mt-1 text-xs text-red-500">
        {errors[name.split(".")[0]][name.split(".")[1]].message}
      </p>
    )}
  </div>
);

const DynamicFields = ({ fields, register, remove, append, name, label }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    {fields.map((field, index) => (
      <div key={field.id} className="flex items-center mb-2">
        <input
          {...register(`${name}.${index}.title`, {
            required: `${label} title is required`,
          })}
          className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={`${label} title`}
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
      Add {label}
    </button>
  </div>
);

const DynamicFaqFields = ({
  fields,
  register,
  remove,
  append,
  name,
  label,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    {fields.map((field, index) => (
      <div key={field.id} className="flex items-center mb-2">
        <div className="flex w-full space-x-2">
          <input
            {...register(`${name}.${index}.que`, {
              required: "Question is required",
            })}
            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Question"
          />
          <input
            {...register(`${name}.${index}.ans`, {
              required: "Answer is required",
            })}
            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Answer"
          />
        </div>
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
      onClick={() => append({ que: "", ans: "" })}
      className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      Add {label}
    </button>
  </div>
);

const DynamicFeatureFields = ({
  fields,
  register,
  remove,
  append,
  name,
  label,
  getValues,
  setValue,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    {fields.map((field, index) => {
      return (
        <div key={field.id} className="grid items-center mb-2 w-full gap-2">
          <div className="flex items-center w-full">
            <div className="w-full">
              <label
                htmlFor={`${name}.${index}.heading`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Heading
              </label>
              <input
                id={`${name}.${index}.heading`}

                type="text"
                {...register(`${name}.${index}.heading`, {
                  required: "Heading is required",
                 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="button"
              onClick={() => remove(index)}
              className="ml-2 mt-6 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Remove
            </button>
          </div>
          <div>
            <label
              htmlFor={`${name}.${index}.icon`}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Icon
            </label>
            <img
              className="size-16 border-4 border-green-500"
              src={
                getValues(`${name}.${index}.icon`) &&
                (typeof getValues(`${name}.${index}.icon`) == typeof ""
                  ? field.icon
                  : "https://sdlk.in/LogoSDL.png")
              }
              alt={field.name}
              srcset=""
            />

            <input
              id={`${name}.${index}.icon`}
              type="file"
              accept="image/*"
              {...register(`${name}.${index}.icon`, {
                onChange: (e) => {
                  if (e.target.files && e.target.files[0]) {
                    e.target.files[0]._id = field._id
                    console.log("sdfdsfds",e.target.files[0])
                    // fields[index].icon = e.target.files[0];
                    // setFeatureImages((prev)=>{
                    //   const temp = [...prev];
                    //   temp.unshift(e.target.files[0]);

                    //   return [...temp];
                    // })
                    setValue(`${fields}.${index}.icon`, null);
                  }
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor={`${name}.${index}.description`}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id={`${name}.${index}.description`}
              {...register(`${name}.${index}.description`, {
                required: "Description is required",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            ></textarea>
          </div>
        </div>
      );
    })}
    <button
      type="button"
      onClick={() => append({ icon: "", description: "", heading: "" })}
      className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      Add {label}
    </button>
  </div>
);

const DynamicDoAndDontFields = ({
  fields,
  register,
  remove,
  append,
  name,
  label,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    {fields.map((field, index) => (
      <div key={field.id} className="flex items-center mb-2">
        <div className="flex w-full space-x-2">
          <input
            {...register(`${name}.${index}.do`, { required: "Do is required" })}
            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Do"
          />
          <input
            {...register(`${name}.${index}.dont`, {
              required: "Don't is required",
            })}
            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Don't"
          />
        </div>
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
      onClick={() => append({ do: "", dont: "" })}
      className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      Add {label}
    </button>
  </div>
);
