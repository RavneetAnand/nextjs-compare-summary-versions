import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MeetingSummaryTool from "@/components/meeting-summary-tool";
import { Sidebar } from "lucide-react";
import { SidebarProvider } from "./ui/sidebar";

// Mock the child components
vi.mock("@/components/meeting-sidebar", () => ({
    MeetingSidebar: () => (
        <div data-testid="meeting-sidebar">Sidebar Component</div>
    ),
}));

vi.mock("@/components/meeting-header", () => ({
    MeetingHeader: () => (
        <div data-testid="meeting-header">Header Component</div>
    ),
}));

vi.mock("@/components/summary-comparison-view", () => ({
    SummaryComparisonView: () => (
        <div data-testid="summary-comparison">Summary Comparison Component</div>
    ),
}));

vi.mock("@/components/transcript-view", () => ({
    TranscriptView: () => (
        <div data-testid="transcript-view">Transcript View Component</div>
    ),
}));

vi.mock("@/components/notes-view", () => ({
    NotesView: () => <div data-testid="notes-view">Notes View Component</div>,
}));

// Mock the data
vi.mock("@/data/meetings", () => ({
    data: [
        {
            id: 1,
            title: "Test Meeting",
            date: "2023-05-15",
            summaryV1: "Summary 1",
            summaryV2: "Summary 2",
            transcript: "Transcript",
            notes: "Notes",
        },
    ],
}));

describe("MeetingSummaryTool", () => {
    it("renders the main components", () => {
        render(
            <SidebarProvider>
                <MeetingSummaryTool />
            </SidebarProvider>
        );

        expect(screen.getByTestId("meeting-sidebar")).toBeInTheDocument();
        expect(screen.getByTestId("meeting-header")).toBeInTheDocument();
        expect(screen.getByTestId("summary-comparison")).toBeInTheDocument();
    });

    it("renders the tab navigation", () => {
        render(
            <SidebarProvider>
                <MeetingSummaryTool />
            </SidebarProvider>
        );

        expect(
            screen.getByRole("tab", { name: "Summaries" })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("tab", { name: "Transcript" })
        ).toBeInTheDocument();
        expect(screen.getByRole("tab", { name: "Notes" })).toBeInTheDocument();
    });

    it("shows the summaries tab by default", () => {
        render(
            <SidebarProvider>
                <MeetingSummaryTool />
            </SidebarProvider>
        );

        // The summaries tab should be selected by default
        expect(screen.getByRole("tab", { name: "Summaries" })).toHaveAttribute(
            "data-state",
            "active"
        );

        // The summary comparison component should be visible
        expect(screen.getByTestId("summary-comparison")).toBeInTheDocument();
    });
});
