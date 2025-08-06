import React from "react";

interface ShareDialogProps {
  open: boolean;
  onClose: () => void;
  shareLink: string;
  onCopy: () => void;
}

const ShareDialog: React.FC<ShareDialogProps> = ({
  open,
  onClose,
  shareLink,
  onCopy,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Share Transcription</h2>
        <div className="flex items-center border p-2 mb-4 rounded">
          <input
            readOnly
            className="flex-1 mr-2"
            value={shareLink}
          />
          <button onClick={onCopy} className="bg-green-500 text-white px-3 py-1 rounded">
            Copy
          </button>
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareDialog;
