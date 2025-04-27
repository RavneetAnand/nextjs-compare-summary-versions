"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import MarkdownRenderer from "./markdown-renderer";
import { EvalData } from "@/data/meetings";
import SummaryEvaluation from "./summary-evaluation";
import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SummaryComparisonViewProps {
    meeting: EvalData;
}

export interface EvaluationResult {
    [key: string]: {
        better: string;
        reasoning: string;
    };
    overall: {
        better: string;
        reasoning: string;
    };
}

export function SummaryComparisonView({ meeting }: SummaryComparisonViewProps) {
    const { summary1, summary2, transcript, notes } = meeting;

    const resultsRef = useRef<HTMLDivElement | null>(null);

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
    }, [meeting]);

    useEffect(() => {
        if (error || evaluationResult) {
            // Scroll to the results section if there is an error
            if (resultsRef.current) {
                resultsRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        }
    }, [error, evaluationResult]);

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
        <ScrollArea className="h-full w-full">
            <div className="flex flex-col space-y-4 pb-8">
                <div className="grid grid-cols-2 gap-4">
                    <Card>
                        <CardHeader className="bg-muted/50">
                            <CardTitle>Summary Version 1</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <ScrollArea className="h-[calc(100vh-300px)]">
                                <div className="p-4">
                                    <MarkdownRenderer content={summary1} />
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="bg-muted/50">
                            <CardTitle>Summary Version 2</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <ScrollArea className="h-[calc(100vh-300px)]">
                                <div className="p-4">
                                    <MarkdownRenderer content={summary2} />
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex justify-center pt-2 pb-2">
                    <Button
                        onClick={evaluateSummaries}
                        disabled={isEvaluating}
                        size="lg"
                    >
                        {isEvaluating ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Comparing...
                            </>
                        ) : (
                            "Compare Summaries"
                        )}
                    </Button>
                </div>

                <AnimatePresence>
                    <motion.div
                        ref={resultsRef}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <SummaryEvaluation
                            error={error}
                            evaluationResult={evaluationResult}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
        </ScrollArea>
    );
}
