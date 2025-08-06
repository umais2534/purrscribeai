// Placeholder dialog for showing transcription details
const TranscriptionDetailDialog = ({ open, onClose, transcription, onEdit, onShare }) => {
  if (!open) return null; // If it's not open, show nothing (component is hidden)

  return (
    <div className="bg-white shadow p-6 rounded">
      <h2>{transcription.title}</h2>     {/* Show the title of the transcription */}
      <p>{transcription.content}</p>     {/* Show the content of the transcription */}
      
      <button onClick={onEdit}>Edit</button>    {/* Trigger edit when clicked */}
      <button onClick={onShare}>Share</button>  {/* Trigger share when clicked */}
      <button onClick={onClose}>Close</button>  {/* Close the dialog */}
    </div>
  );
};

export default TranscriptionDetailDialog;
