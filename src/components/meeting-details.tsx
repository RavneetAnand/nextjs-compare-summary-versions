import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import MarkdownRenderer from "./markdown-renderer";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { EvalData } from "@/data/meetings";

const MeetingDetails = ({ meeting }: { meeting: EvalData }) => {
    const { title, user, summary1, summary2, notes, transcript } = meeting;

    return (
        <Tabs defaultValue="summaries" className="h-full">
            <TabsList>
                <TabsTrigger value="summaries">Summaries</TabsTrigger>
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="summaries" className="h-[calc(100%-40px)]">
                <div className="grid h-full grid-cols-2 gap-4">
                    <Card className="h-full">
                        <CardHeader className="bg-muted/50">
                            <CardTitle>Summary Version 1</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <ScrollArea className="h-[calc(100vh-220px)]">
                                <div className="p-4">
                                    <MarkdownRenderer content={summary1} />
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                    <Card className="h-full">
                        <CardHeader className="bg-muted/50">
                            <CardTitle>Summary Version 2</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <ScrollArea className="h-[calc(100vh-220px)]">
                                <div className="p-4">
                                    <MarkdownRenderer content={summary2} />
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>

            <TabsContent value="transcript" className="h-[calc(100%-40px)]">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>Meeting Transcript</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <ScrollArea className="h-[calc(100vh-220px)]">
                            <div className="p-4">
                                <MarkdownRenderer content={transcript} />
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="notes" className="h-[calc(100%-40px)]">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>Meeting Notes</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <ScrollArea className="h-[calc(100vh-220px)]">
                            <div className="p-4">
                                <MarkdownRenderer content={notes} />
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
};
export default MeetingDetails;
