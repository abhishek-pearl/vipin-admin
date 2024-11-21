import React, { useState } from 'react';

const PrivacyPolicy = () => {
    const [policyText, setPolicyText] = useState(
        "This is the privacy policy. Your privacy is important to us."
    );
    const [isEditing, setIsEditing] = useState(false);
    const [draftText, setDraftText] = useState(policyText);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setDraftText(policyText);
        setIsEditing(false);
    };

    const handleSave = () => {
        setPolicyText(draftText);
        setIsEditing(false);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen pt-12">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                {/* Edit Button at the Top */}
                <div className="flex justify-end mb-4">
                    {isEditing ? (
                        <div className="flex gap-4">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            onClick={handleEdit}
                        >
                            Edit
                        </button>
                    )}
                </div>

                {/* Privacy Policy Content */}
                <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
                {isEditing ? (
                    <textarea
                        className="w-full h-48 p-4 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                        value={draftText}
                        onChange={(e) => setDraftText(e.target.value)}
                    />
                ) : (
                    <p className="text-gray-700">{policyText}</p>
                )}
            </div>
        </div>
    );
};

export default PrivacyPolicy;
