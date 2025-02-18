import { useForm, useFieldArray } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import {toast} from "sonner";
import { instance } from "../../services/axiosInterceptor";
export default function AddAd() {
    const navigate = useNavigate();
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      fields: [{ image: null, url: "" }],
    },
  })

  const { fields, append } = useFieldArray({
    control,
    name: "fields",
  })

  async function add_ads(payload)
  {
       const response = await instance.post(`/ad`,payload,{
        
       });

       if(response?.data?.success)
       {
        navigate('/ads');
       }
    
  }

  const onSubmit = (data) => {
    console.log(data);
    const urls = data?.fields?.map((el)=> el.url);
    const banner = data?.fields?.map((el)=> el.image);

    const form = new FormData();
    form.append('urls',JSON.stringify(urls));
    banner.forEach(element => {
        form.append('banner',element?.[0]);
    });
   
    add_ads(form) ;
    // Handle form submission here
  }

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-2xl font-bold mb-4 p-2">Ads Section </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-2">
            <div>
              <label htmlFor={`fields.${index}.image`} className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <input
                type="file"
                {...register(`fields.${index}.image`)}
                className="mt-1 block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100"
              />
            </div>
            <div>
              <label htmlFor={`fields.${index}.url`} className="block text-sm font-medium text-gray-700">
                URL
              </label>
              <input
                type="url"
                {...register(`fields.${index}.url`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="https://example.com"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>{  if(fields?.length == 4){
            toast.error("At Max You Can Have Only 4 Section !!");
            return;
          }else{
            append({ image: null, url: "" });
          } }}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Add More
        </button>
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

