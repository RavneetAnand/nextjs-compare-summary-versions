import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MeetingSidebar } from "@/components/meeting-sidebar";
import { SidebarProvider } from "./ui/sidebar";

describe("MeetingSidebar", () => {
    const mockMeetings = [
        {
            id: 1,
            user: "Joe Doe",
            title: "Test Meeting 1",
            summary1: "Summary 1",
            summary2: "Summary 2",
            transcript: "Transcript",
            notes: "Notes",
        },
        {
            id: 2,
            user: "John Smith",
            title: "Test Meeting 2",
            summary1: "Summary 1",
            summary2: "Summary 2",
            transcript: "Transcript",
            notes: "Notes",
        },
    ];

    it("renders the sidebar with meeting list", () => {
        const onSelectMeeting = vi.fn();

        render(
            <SidebarProvider>
                <MeetingSidebar
                    meetings={mockMeetings}
                    selectedMeeting={mockMeetings[0]}
                    onSelectMeeting={onSelectMeeting}
                />
            </SidebarProvider>
        );

        expect(screen.getByText("Meeting Summaries")).toBeInTheDocument();
        expect(screen.getByText("Test Meeting 1")).toBeInTheDocument();
        expect(screen.getByText("Test Meeting 2")).toBeInTheDocument();
    });

    it("calls onSelectMeeting when a meeting is clicked", () => {
        const onSelectMeeting = vi.fn();

        render(
            <SidebarProvider>
                <MeetingSidebar
                    meetings={mockMeetings}
                    selectedMeeting={mockMeetings[0]}
                    onSelectMeeting={onSelectMeeting}
                />
            </SidebarProvider>
        );

        fireEvent.click(screen.getByText("Test Meeting 2"));
        expect(onSelectMeeting).toHaveBeenCalledWith(mockMeetings[1]);
    });
});
