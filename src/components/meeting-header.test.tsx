import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MeetingHeader } from "@/components/meeting-header";
import { EvalData } from "@/data/meetings";

describe("MeetingHeader", () => {
    const mockMeeting = {
        id: 1,
        user: "Joe Doe",
        title: "Test Meeting",
        summary1: "Summary 1",
        summary2: "Summary 2",
        transcript: "Transcript",
        notes: "Notes",
    } as EvalData;

    it("renders the meeting title", () => {
        render(<MeetingHeader meeting={mockMeeting} />);
        expect(screen.getByText("Test Meeting")).toBeInTheDocument();
    });

    it("renders the meeting user", () => {
        render(<MeetingHeader meeting={mockMeeting} />);
        expect(screen.getByText("Joe Doe")).toBeInTheDocument();
    });
});
