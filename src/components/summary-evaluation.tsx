"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Loader2, AlertCircle } from "lucide-react";

interface SummaryEvaluationProps {
    summary1: string;
    summary2: string;
    transcript: string;
    notes: string;
}

interface EvaluationResult {
    [key: string]: {
        better: string;
        reasoning: string;
    };
    overall: {
        better: string;
        reasoning: string;
    };
}

export default function SummaryEvaluation({
    summary1,
    summary2,
    transcript,
    notes,
}: SummaryEvaluationProps) {
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [evaluationResult, setEvaluationResult] =
        useState<EvaluationResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Clear previous evaluation result when parameters change
    const clearEvaluationResult = () => {
        setEvaluationResult(null);
        setError(null);
    };

    useEffect(() => {
        clearEvaluationResult();
    }, [summary1, summary2, transcript, notes]);

    const evaluateSummaries = async () => {
        setIsEvaluating(true);
        setError(null);

        try {
            const response = await fetch("/api/evaluate-summaries", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    summary1,
                    summary2,
                    transcript,
                    notes,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to evaluate summaries");
            }

            const result = await response.json();
            setEvaluationResult(result);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "An error occurred during evaluation"
            );
        } finally {
            setIsEvaluating(false);
        }
    };

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Evaluate Summaries</CardTitle>
                    <CardDescription>
                        Use AI to evaluate which summary version is better based
                        on criteria such as truthfulness, clarity, conciseness,
                        and relevance.
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button
                        onClick={evaluateSummaries}
                        disabled={isEvaluating}
                        size="lg"
                    >
                        {isEvaluating ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Evaluating...
                            </>
                        ) : (
                            "Evaluate"
                        )}
                    </Button>
                </CardFooter>
            </Card>

            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {evaluationResult && (
                <Card>
                    <CardHeader>
                        <CardTitle>Evaluation Results</CardTitle>
                        <CardDescription>
                            Overall recommendation:{" "}
                            <Badge
                                variant={
                                    evaluationResult.overall.better === "v1"
                                        ? "default"
                                        : "secondary"
                                }
                            >
                                Summary{" "}
                                {evaluationResult.overall.better === "v1"
                                    ? "Version 1"
                                    : "Version 2"}{" "}
                                is better
                            </Badge>
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {Object.entries(evaluationResult).map(
                            ([criterion, data]) => (
                                <div key={criterion} className="space-y-1">
                                    <div className="flex items-center space-x-2">
                                        <Badge
                                            variant={
                                                data.better === "v1"
                                                    ? "default"
                                                    : "secondary"
                                            }
                                            className="text-sm"
                                        >
                                            Summary{" "}
                                            {data.better === "v1"
                                                ? "Version 1"
                                                : "Version 2"}
                                        </Badge>
                                        <span className="text-sm font-medium capitalize">
                                            is better in {criterion}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {data.reasoning}
                                    </p>
                                </div>
                            )
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
