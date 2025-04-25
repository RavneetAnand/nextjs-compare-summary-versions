"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import MarkdownRenderer from "./markdown-renderer";
import { EvalData } from "@/data/meetings";

interface SummaryComparisonViewProps {
    meeting: EvalData;
    onEvaluate: () => void;
}

export function SummaryComparisonView({
    meeting,
    onEvaluate,
}: SummaryComparisonViewProps) {
    return (
        <div className="h-full space-y-4">
            <div className="grid h-[calc(100%-70px)] grid-cols-2 gap-4">
                <Card className="h-full">
                    <CardHeader className="bg-muted/50">
                        <CardTitle>Summary Version 1</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <ScrollArea className="h-[calc(100vh-310px)]">
                            <div className="p-4">
                                <MarkdownRenderer content={meeting.summary1} />
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
                <Card className="h-full">
                    <CardHeader className="bg-muted/50">
                        <CardTitle>Summary Version 2</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <ScrollArea className="h-[calc(100vh-310px)]">
                            <div className="p-4">
                                <MarkdownRenderer content={meeting.summary2} />
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-center">
                <Button onClick={onEvaluate} size="lg">
                    Go to Evaluation
                </Button>
            </div>
        </div>
    );
}
