import React from "react";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { Mic, FileText } from "lucide-react";
import { CallRecording } from "../services/callService";

const TranscriptionCard: React.FC<{
  call: CallRecording;
  onClick: () => void;
}> = ({ call, onClick }) => {
  return (
    <Card className="p-4 cursor-pointer hover:shadow-lg" onClick={onClick}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">{call.title}</h3>
        {call.format === "audio" ? <Mic size={18} /> : <FileText size={18} />}
      </div>
      <p className="text-sm text-muted-foreground mt-1">{format(new Date(call.date), "PPP")}</p>
    </Card>
  );
};

export default TranscriptionCard;
