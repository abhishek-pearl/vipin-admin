import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { instance } from "../../services/axiosInterceptor";
import LeadsDetails from "./LeadsDetails";
import { saveAs } from "file-saver";

const Leads = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [leads, setLeads] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [singleLeadData, setSingleLeadData] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const geLeads = () => {
    setIsLoading(true);
    instance
      .get(`contact`, {
        params: { startDate, endDate },
      })
      .then((res) => {
        setLeads(res?.data);
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
      .then(() => {
        geLeads();
        toast.success("Lead Detail Deleted !!");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    geLeads();
  }, [startDate, endDate]);
  const formatDate = (isoString) => {
    const date = new Date(isoString);

    return date.toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const downloadCSV = () => {
    if (leads?.data?.length > 0) {
      const csvHeader = "S.No,Title,Email,Mobile,Loan Required,Pincode,Type of Loan,Date and Time\n";
      const csvRows = leads?.data?.map(
        (item, idx) => `${idx + 1},${item.name},${item.email},${item.mobile},${item.loanRequired},${item.pincode},${item.typeOfLoan},${formatDate(item?.createdAt)}`
      );
      const csvContent = csvHeader + csvRows.join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, "leads.csv");
    } else {
      console.log("khali h")
    }
  };





  return (
    <div>
      <Toaster />
      <div className="p-10">
        <div className="flex gap-4 mb-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={downloadCSV}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Download CSV
          </button>
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
          {leads && (
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">S.No</th>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Mobile</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads?.data?.map((item, idx) => (
                  <tr key={item?._id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{idx + 1}</td>
                    <td className="px-6 py-4">{item?.name}</td>
                    <td className="px-6 py-4">{item?.email}</td>
                    <td className="px-6 py-4">{item?.mobile}</td>
                    <td className="px-6 py-4">{formatDate(item?.createdAt)}</td>
                    <td className="px-6 py-4 text-center flex gap-2">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => {
                          setSingleLeadData(item);
                          setIsModalOpen(true);
                        }}
                      >
                        View
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => deleteItem(item?._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {leads?.length <= 0 && <div className="text-center p-2">No Data Found</div>}
        </div>
        {isModalOpen && (
          <LeadsDetails singleLeadData={singleLeadData} setIsModalOpen={setIsModalOpen} />
        )}
      </div>
    </div>
  );
};

export default Leads;
