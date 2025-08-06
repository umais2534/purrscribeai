import React from "react";

interface EditTranscriptionDialogProps {
  open: boolean;
  onClose: () => void;
  transcription: { title: string; content: string };
  onSave: (updatedTranscription: { title: string; content: string }) => void;
}

const EditTranscriptionDialog: React.FC<EditTranscriptionDialogProps> = ({
  open,
  onClose,
  transcription,
  onSave,
}) => {
  const [title, setTitle] = React.useState(transcription.title);
  const [content, setContent] = React.useState(transcription.content);

  React.useEffect(() => {
    setTitle(transcription.title);
    setContent(transcription.content);
  }, [transcription]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Transcription</h2>
        <input
          className="border p-2 mb-4 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          className="border p-2 mb-4 w-full"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
          <button
            onClick={() => onSave({ title, content })}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTranscriptionDialog;
