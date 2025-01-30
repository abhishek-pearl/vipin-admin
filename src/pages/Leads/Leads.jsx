import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { instance } from "../../services/axiosInterceptor";
import LeadsDetails from "./LeadsDetails";

const Leads = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [leads, setLeads] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [singleLeadData, setSingleLeadData] = useState(null);

  const geLeads = () => {
    setIsLoading(true);
    instance
      .get(`contact`)
      .then((res) => {
        setLeads(res?.data);
        // console.table(res?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };


  function deleteItem(id) {
    setIsLoading(true);
    instance
      .delete(`/contact/${id}`)
      .then((res) => {
        geLeads();
        toast.success("Lead Detail Deleted !!")
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    geLeads();
  }, []);


  return (
    <div>
      <Toaster />

      <div className="p-10 ">

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {isLoading && (
            <>
              <Skeleton animation="wave" height={50} />
              <Skeleton animation="wave" height={50} />
              <Skeleton animation="wave" height={50} />
              <Skeleton animation="wave" height={50} />
            </>
          )}
          {leads && (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S.No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Message
                  </th>
                  <th scope="col" colSpan={1} className="text-center px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {leads?.data?.map((item, idx) => (
                  <tr
                    key={item?._id}
                    className="bg-white border-b   hover:bg-gray-50 "
                  >
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                    >
                      <div className="ps-3">{idx + 1}</div>
                    </th>
                    <td className="px-6 py-4">
                      {item.name}
                    </td>
                    <td className="px-6 py-4">
                      {item.email}
                    </td>
                    <td className="px-6 py-4 ">
                      <p className="line-clamp-2">{item.message}</p>
                    </td>




                    <td className=" flex  justify-between gap-2 px-6 py-4 text-center">
                      <button
                        className="font-medium text-red-600  hover:underline"
                        onClick={() => {
                          setSingleLeadData(item)
                          setIsModalOpen(true);
                        }}
                      >
                        View
                      </button>
                      <button
                        className="font-medium text-red-600  hover:underline"
                        onClick={() => {
                          deleteItem(item?._id);
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
          {leads?.length <= 0 && (
            <div className="text-center p-2">No Data Found</div>
          )}
        </div>
        {isModalOpen && (
          <LeadsDetails singleLeadData={singleLeadData} setIsModalOpen={setIsModalOpen} />

        )}

      </div>
    </div>
  );
};

export default Leads;
