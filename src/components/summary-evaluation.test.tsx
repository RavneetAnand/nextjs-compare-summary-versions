import { render, screen } from "@testing-library/react";
import SummaryEvaluation from "./summary-evaluation";
import { EvaluationResult } from "./summary-comparison-view";
import { describe, it, expect } from "vitest";

describe("SummaryEvaluation", () => {
    it("renders an error alert when error is provided", () => {
        render(
            <SummaryEvaluation error="Test error" evaluationResult={null} />
        );

        expect(screen.getByText("Error")).toBeInTheDocument();
        expect(screen.getByText("Test error")).toBeInTheDocument();
    });

    it("renders nothing when evaluationResult is null and no error is provided", () => {
        const { container } = render(
            <SummaryEvaluation error={null} evaluationResult={null} />
        );

        expect(container.firstChild).toBeNull();
    });

    it("renders evaluation results correctly", () => {
        const mockEvaluationResult: EvaluationResult = {
            overall: {
                better: "v1",
                reasoning: "Version 1 is more concise.",
            },
            clarity: {
                better: "v2",
                reasoning: "Version 2 is easier to understand.",
            },
        };

        render(
            <SummaryEvaluation
                error={null}
                evaluationResult={mockEvaluationResult}
            />
        );

        expect(screen.getByText("Evaluation Results")).toBeInTheDocument();
        expect(screen.getByText("Overall recommendation:")).toBeInTheDocument();
        expect(
            screen.getByText("Summary Version 1 is better")
        ).toBeInTheDocument();
        expect(screen.getByText("Summary Version 2")).toBeInTheDocument();
        expect(screen.getByText("is better in clarity")).toBeInTheDocument();
        expect(
            screen.getByText("Version 2 is easier to understand.")
        ).toBeInTheDocument();
    });
});
