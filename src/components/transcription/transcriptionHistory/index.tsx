import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Search, SortAsc, SortDesc } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

import TranscriptionCard from "./components/TranscriptionCard";
import TranscriptionDetailDialog from "./components/TranscriptionDetailDialog";
import EditTranscriptionDialog from "./components/EditTranscriptionDialog";
import ShareDialog from "./components/ShareDialog";

import {
  getCallRecordings,
  transcribeCallRecording,
  summarizeTranscription,
  type CallRecording,
} from "./services/callService";

const TranscriptionHistory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [formatFilter, setFormatFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedTranscription, setSelectedTranscription] = useState<CallRecording | null>(null);
  const [dialogs, setDialogs] = useState({ detail: false, edit: false, share: false });
  const [callRecordings, setCallRecordings] = useState<CallRecording[]>([]);

  useEffect(() => {
    getCallRecordings().then(setCallRecordings);
  }, []);

  const filteredCalls = callRecordings
    .filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(c => formatFilter === "all" || c.format === formatFilter)
    .sort((a, b) => sortOrder === "asc" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date));

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-wrap justify-between gap-4">
        <h1 className="text-2xl font-bold">Transcription History</h1>
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="ghost" onClick={() => setSortOrder(s => s === "asc" ? "desc" : "asc")}>
            {sortOrder === "asc" ? <SortAsc size={20} /> : <SortDesc size={20} />}
          </Button>
        </div>
      </div>

      <Tabs value={formatFilter} onValueChange={setFormatFilter}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredCalls.map(call => (
          <TranscriptionCard
            key={call.id}
            call={call}
            onClick={() => {
              setSelectedTranscription(call);
              setDialogs({ ...dialogs, detail: true });
            }}
          />
        ))}
      </div>

      {selectedTranscription && (
        <>
          <TranscriptionDetailDialog
            open={dialogs.detail}
            onClose={() => setDialogs({ ...dialogs, detail: false })}
            transcription={selectedTranscription}
            onEdit={() => setDialogs({ ...dialogs, edit: true })}
            onShare={() => setDialogs({ ...dialogs, share: true })}
          />
          <EditTranscriptionDialog
                      open={dialogs.edit}
                      onClose={() => setDialogs({ ...dialogs, edit: false })}
                      transcription={selectedTranscription} onSave={function (updatedTranscription: { title: string; content: string; }): void {
                          throw new Error("Function not implemented.");
                      } }          />
          <ShareDialog
                      open={dialogs.share}
                      onClose={() => setDialogs({ ...dialogs, share: false })} shareLink={""} onCopy={function (): void {
                          throw new Error("Function not implemented.");
                      } }          />
        </>
      )}
    </div>
  );
};

export default TranscriptionHistory;
