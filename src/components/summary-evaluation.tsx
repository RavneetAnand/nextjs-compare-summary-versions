"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
import { EvaluationResult } from "./summary-comparison-view";

interface SummaryEvaluationProps {
    error: string | null;
    evaluationResult: EvaluationResult | null;
}

export default function SummaryEvaluation({
    error,
    evaluationResult,
}: SummaryEvaluationProps) {
    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    if (evaluationResult === null) {
        return;
    }

    return (
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
                {Object.entries(evaluationResult).map(([criterion, data]) => (
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
                ))}
            </CardContent>
        </Card>
    );
}
