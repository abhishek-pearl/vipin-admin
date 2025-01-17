import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { instance } from "../../services/axiosInterceptor";

const Payments = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentHistories, setPaymentHistories] = useState([]);

  const getPaymentHistories = () => {
    setIsLoading(true);
    instance
      .get(`/payment/payment-histories`)
      .then((res) => {
        setPaymentHistories(res?.data);
        console.table(res?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getPaymentHistories();
  }, []);

 

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPayment(null);
  };
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
          {paymentHistories && (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S.No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 mx-6">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paymentHistories.map((item, idx) => (
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
                    <td className="px-6 py-4">Rs. {item.amount}</td>

                    <td className="px-6 py-4">{item.orderId}</td>

                    <td className="px-1 py-4  rounded-md">
                      <div
                        className={`px-2 py-2 rounded-md text-center ${
                          item.transactionStatus === "SUCCESS"
                            ? "bg-green-400 text-white"
                            : item.transactionStatus === "FAILED"
                            ? "bg-red-400 text-white"
                            : "bg-blue-400 text-white"
                        }`}
                      >
                        {item.transactionStatus}
                      </div>
                    </td>

                    <td className="px-6 py-4 mx-12">
                      <button
                        onClick={() => handleView(item)}
                        className="font-medium text-blue-600  hover:underline bg-green-400 px-4 py-2 rounded-sm"
                      >
                        View
                      </button>
                    </td>

                    {isModalOpen && (
                      <div className="fixed inset-0 bg-white bg-opacity-10  flex items-center justify-center">
                        <div className="bg-blue-200 p-6 rounded-lg shadow-lg max-w-sm w-full">
                          <h2 className="text-xl font-bold mb-4">
                            Payment Details
                          </h2>
                          <p>
                            <strong>Payment ID:</strong>{" "}
                            {selectedPayment.orderId}
                          </p>
                          <p>
                            <strong>Amount:</strong> {selectedPayment.amount}
                          </p>
                          <p>
                            <strong>Role:</strong> {selectedPayment.userType}
                          </p>

                          <p>
                            <strong>Name:</strong> {selectedPayment.name}
                          </p>
                          <p>
                            <strong>Mobile :</strong>
                            {selectedPayment.number}
                          </p>

                          <p>
                            <strong>State:</strong> {selectedPayment.state}
                          </p>
                          <p>
                            <strong>City:</strong> {selectedPayment.city}
                          </p>

                          <p>
                            <strong>Locality:</strong>{" "}
                            {selectedPayment.locality}
                          </p>

                          <p>
                            <strong>Auction Type:</strong>{" "}
                            {selectedPayment.auctionType}
                          </p>

                          <p>
                            <strong>Budget:</strong> {selectedPayment.budget}{" "}
                            lakhs
                          </p>
                          <p>
                            <strong>Status:</strong>{" "}
                            {selectedPayment.transactionStatus}
                          </p>
                          <button
                            onClick={closeModal}
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payments;
