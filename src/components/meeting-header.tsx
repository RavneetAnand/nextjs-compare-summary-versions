import { EvalData } from "@/data/meetings";

interface MeetingHeaderProps {
    meeting: EvalData;
}

export function MeetingHeader({ meeting }: MeetingHeaderProps) {
    return (
        <header className="border-b p-4">
            <h1 className="text-2xl font-bold">{meeting.title}</h1>
            <p className="text-muted-foreground">{meeting.user}</p>
        </header>
    );
}
