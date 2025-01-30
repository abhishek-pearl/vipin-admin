import React, { useEffect } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const LeadsDetails = ({ setIsModalOpen, singleLeadData }) => {
    // Function to handle downloading the details as a PDF in tabular form
    const handleDownloadPDF = () => {
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4", // A4 size for the PDF
        });

        // Title
        doc.setFontSize(16);
        doc.text("Lead Details", 14, 15);

        // Add a table using autoTable
        doc.autoTable({
            startY: 20,
            head: [["Field", "Value"]],
            body: [
                ["ID", singleLeadData._id],
                ["Name", singleLeadData?.name],
                ["Email", singleLeadData?.email],
                ["Phone Number", singleLeadData?.mobile],
                ["Message", singleLeadData?.message || "Message Not Found"],
                ["Pincode", singleLeadData?.pincode],
                ["Type Of Loan", singleLeadData?.typeOfLoan],
            ],
        });

        // Save the PDF
        doc.save(`Lead_Details_${singleLeadData._id}.pdf`);
    };
    useEffect(() => {

        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = `${scrollbarWidth}px`;

        return () => {

            document.body.style.overflow = "auto";
            document.body.style.paddingRight = "0";
        };
    }, []);

    return (
        <div className="fixed w-full h-full top-0 right-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white space-y-2 p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-xl font-bold mb-4 flex justify-between">
                    Leads Details{" "}
                    <span
                        className="text-xs text-blue-500 cursor-pointer hover:underline"
                        onClick={handleDownloadPDF}
                    >
                        Download PDF
                    </span>
                </h2>
                <p className="bg-gray-200 px-2 py-1 rounded-md">
                    <strong>ID:</strong> {singleLeadData._id}
                </p>
                <p className="bg-gray-200 px-2 py-1 rounded-md">
                    <strong>Name:</strong> {singleLeadData?.name}
                </p>
                <p className="bg-gray-200 px-2 py-1 rounded-md">
                    <strong>Email:</strong> {singleLeadData?.email}
                </p>
                <p className="bg-gray-200 px-2 py-1 rounded-md">
                    <strong>Phone Number:</strong> {singleLeadData?.mobile}
                </p>
                <p className="bg-gray-200 px-2 py-1 rounded-md flex flex-col">
                    <strong>Message:</strong> {singleLeadData?.message || "Message Not Found"}
                </p>
                <p className="bg-gray-200 px-2 py-1 rounded-md">
                    <strong>Pincode:</strong> {singleLeadData?.pincode}
                </p>
                <p className="bg-gray-200 px-2 py-1 rounded-md">
                    <strong>Type Of Loan:</strong> {singleLeadData?.typeOfLoan}
                </p>

                <button
                    onClick={() => setIsModalOpen(false)}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default LeadsDetails;
