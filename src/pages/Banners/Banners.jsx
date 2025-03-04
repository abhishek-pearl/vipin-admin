import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { instance } from "../../services/axiosInterceptor";

const Banners = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [banners, setBanners] = useState([]);

  const getBanners = () => {
    setIsLoading(true);
    instance
      .get(`/banner`)
      .then((res) => {
        setBanners(res?.data);
        // console.table(res?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getBanners();
  }, []);

  const deleteItem = (item) => {
    if (window.confirm(`Are you sure you want to delete the banner`)) {
      instance
        .delete(`${import.meta.env.VITE_API_URL}/banner/${item._id}`)
        .then((res) => {
          toast.success(res.data.message, {
            style: {
              background: "green",
              color: "white",
            },
          });
          getBanners();
        })
        .catch((err) => {
          console.log(err);
          toast.error("There was some issue deleting the banner", {
            style: {
              background: "red",
              color: "white",
            },
          });
        });
    }
  };
  return (
    <div>
      <Toaster />

      <div className="p-10 ">
        <div className="flex items-center justify-end flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-8 bg-white ">
          <Link
            to="/banner/add"
            className="bg-blue-600 rounded-md text-white px-3 py-1 font-semibold "
          >
            Add
          </Link>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {isLoading && (
            <>
              <Skeleton animation="wave" height={50} />
              <Skeleton animation="wave" height={50} />
              <Skeleton animation="wave" height={50} />
              <Skeleton animation="wave" height={50} />
            </>
          )}
          {banners && (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S.No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" colSpan={1} className="text-center px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {banners?.data?.map((item, idx) => (
                  <tr
                    key={idx}
                    className="bg-white border-b   hover:bg-gray-50 "
                  >
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                    >
                      <div className="ps-3">{idx + 1}</div>
                    </th>
                    <td className="px-6 py-4">
                      <img
                        src={item.banner}
                        alt="Banner"
                        className="w-56 h-56"
                      />
                    </td>

                    {/* <td className="px-6 py-4">
                        <Link
                          to={`/news/update/${item?._id}`}
                          className="font-medium text-blue-600  hover:underline"
                        >
                          Edit
                        </Link>
                      </td> */}
                    <td className="px-6 py-4 text-center">
                      <button
                        className="font-medium text-red-600  hover:underline"
                        onClick={() => {
                          deleteItem(item);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {banners?.length <= 0 && (
            <div className="text-center p-2">No Banners Found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banners;