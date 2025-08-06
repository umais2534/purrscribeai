export interface CallRecording {
  id: string;
  title: string;
  date: string;
  format: "audio" | "text";
  content: string;
}

export const getCallRecordings = async (): Promise<CallRecording[]> => {
  return [
    {
      id: "1",
      title: "Client Call A",
      date: "2025-07-30",
      format: "audio",
      content: "Transcript of Client Call A...",
    },
    {
      id: "2",
      title: "Team Meeting",
      date: "2025-07-25",
      format: "text",
      content: "Meeting summary...",
    },
  ];
};

export const transcribeCallRecording = async (id: string): Promise<string> => {
  return "Transcribed text...";
};

export const summarizeTranscription = async (content: string): Promise<string> => {
  return "Summary of transcription...";
};
