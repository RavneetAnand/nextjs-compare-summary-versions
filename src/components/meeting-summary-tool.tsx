"use client";

import { useState } from "react";
import {
    SidebarInset,
    SidebarProvider,
    SidebarRail,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { data as meetingsData } from "@/data/meetings";
import { MeetingHeader } from "./meeting-header";
import { MeetingSidebar } from "./meeting-sidebar";
import { NotesView } from "./notes-view";
import { SummaryComparisonView } from "./summary-comparison-view";
import SummaryEvaluation from "./summary-evaluation";
import { TranscriptView } from "./transcript-view";

export default function MeetingSummaryTool() {
    const [selectedMeeting, setSelectedMeeting] = useState(meetingsData[0]);
    const [activeTab, setActiveTab] = useState("summaries");

    const handleEvaluate = () => {
        setActiveTab("evaluation");
    };

    return (
        <div className="flex h-screen w-full">
            <MeetingSidebar
                meetings={meetingsData}
                selectedMeeting={selectedMeeting}
                onSelectMeeting={setSelectedMeeting}
            />
            <SidebarRail />
            <SidebarInset>
                <div className="flex h-full flex-col">
                    <MeetingHeader meeting={selectedMeeting} />
                    <div className="flex-1 p-4">
                        <Tabs
                            value={activeTab}
                            onValueChange={setActiveTab}
                            className="h-full"
                        >
                            <TabsList>
                                <TabsTrigger value="summaries">
                                    Summaries
                                </TabsTrigger>
                                <TabsTrigger value="evaluation">
                                    Evaluation
                                </TabsTrigger>
                                <TabsTrigger value="transcript">
                                    Transcript
                                </TabsTrigger>
                                <TabsTrigger value="notes">Notes</TabsTrigger>
                            </TabsList>

                            <TabsContent
                                value="summaries"
                                className="h-[calc(100%-40px)]"
                            >
                                <SummaryComparisonView
                                    meeting={selectedMeeting}
                                    onEvaluate={handleEvaluate}
                                />
                            </TabsContent>

                            <TabsContent
                                value="evaluation"
                                className="h-[calc(100%-40px)]"
                            >
                                <SummaryEvaluation meeting={selectedMeeting} />
                            </TabsContent>

                            <TabsContent
                                value="transcript"
                                className="h-[calc(100%-40px)]"
                            >
                                <TranscriptView meeting={selectedMeeting} />
                            </TabsContent>

                            <TabsContent
                                value="notes"
                                className="h-[calc(100%-40px)]"
                            >
                                <NotesView meeting={selectedMeeting} />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </SidebarInset>
        </div>
    );
}
