"use client";

import { FileText } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { EvalData } from "@/data/meetings";

interface MeetingSidebarProps {
    meetings: EvalData[];
    selectedMeeting: EvalData;
    onSelectMeeting: (meeting: EvalData) => void;
}

export function MeetingSidebar({
    meetings,
    selectedMeeting,
    onSelectMeeting,
}: MeetingSidebarProps) {
    return (
        <Sidebar>
            <SidebarHeader className="border-b">
                <div className="p-2">
                    <h2 className="text-lg font-semibold">Meeting Summaries</h2>
                    <p className="text-sm text-muted-foreground">
                        Compare summary versions
                    </p>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Meetings</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {meetings.map((meeting) => (
                                <SidebarMenuItem key={meeting.id}>
                                    <SidebarMenuButton
                                        isActive={
                                            selectedMeeting.id === meeting.id
                                        }
                                        onClick={() => onSelectMeeting(meeting)}
                                    >
                                        <FileText className="h-4 w-4" />
                                        <span>{meeting.title}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
