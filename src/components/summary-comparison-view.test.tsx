import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SummaryComparisonView } from "./summary-comparison-view";
import { EvalData } from "@/data/meetings";

vi.mock("@/components/markdown-renderer", () => ({
    default: ({ content }: { content: string }) => (
        <div data-testid="markdown">{content}</div>
    ),
}));

// Mock the SummaryEvaluation component
vi.mock("@/components/summary-evaluation", () => ({
    default: () => (
        <div data-testid="summary-evaluation">Evaluation Component</div>
    ),
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock the scrollIntoView function
Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
    value: vi.fn(),
    writable: true,
});

describe("SummaryComparisonView", () => {
    const mockMeeting: EvalData = {
        summary1: "This is summary 1",
        summary2: "This is summary 2",
        transcript: "This is the transcript",
        notes: "These are the notes",
        user: "John Doe",
        title: "Test Meeting",
        id: 1,
    };

    it("renders the summaries and compare button", () => {
        render(<SummaryComparisonView meeting={mockMeeting} />);

        expect(screen.getByText("Summary Version 1")).toBeInTheDocument();
        expect(screen.getByText("Summary Version 2")).toBeInTheDocument();
        expect(screen.getByText("This is summary 1")).toBeInTheDocument();
        expect(screen.getByText("This is summary 2")).toBeInTheDocument();
        expect(screen.getByText("Compare Summaries")).toBeInTheDocument();
    });

    it("displays loading state when comparing summaries", async () => {
        vi.spyOn(global, "fetch").mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                overall: { better: "summary1", reasoning: "Reasoning here" },
            }),
        } as Response);

        render(<SummaryComparisonView meeting={mockMeeting} />);

        const button = screen.getByText("Compare Summaries");
        fireEvent.click(button);

        expect(screen.getByText("Comparing...")).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByText("Comparing...")).not.toBeInTheDocument();
        });

        vi.restoreAllMocks();
    });

    it("displays evaluation results after successful comparison", async () => {
        vi.spyOn(global, "fetch").mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                overall: { better: "summary1", reasoning: "Reasoning here" },
            }),
        } as Response);

        render(<SummaryComparisonView meeting={mockMeeting} />);

        const button = screen.getByText("Compare Summaries");
        fireEvent.click(button);

        await waitFor(() => {
            expect(
                screen.getByText("Evaluation Component")
            ).toBeInTheDocument();
        });

        vi.restoreAllMocks();
    });
});
