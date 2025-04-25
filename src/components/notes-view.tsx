import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import MarkdownRenderer from "./markdown-renderer";
import { EvalData } from "@/data/meetings";

interface NotesViewProps {
    meeting: EvalData;
}

export function NotesView({ meeting }: NotesViewProps) {
    return (
        <Card className="h-[calc(100%-10px)]">
            <CardHeader>
                <CardTitle>Meeting Notes</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-250px)]">
                    <div className="p-4">
                        <MarkdownRenderer content={meeting.notes} />
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
