import React, { useState } from 'react';

const SaveRecordingModal = ({ onSave, onCancel }) => {
    const [fileName, setFileName] = useState('');

    const handleSave = () => {
        if (fileName.trim()) {
            onSave(fileName);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 p-6 rounded-lg w-96">
                <h2 className="text-white text-xl font-bold mb-4">Save Recording</h2>
                <input
                    type="text"
                    placeholder="Enter file name"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                />
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onCancel}
                        className="p-2 bg-gray-600 text-white rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="p-2 bg-green-500 text-white rounded"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SaveRecordingModal;