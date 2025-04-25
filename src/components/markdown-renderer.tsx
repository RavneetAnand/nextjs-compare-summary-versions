"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
    content: string;
    className?: string;
}

export default function MarkdownRenderer({
    content,
    className,
}: MarkdownRendererProps) {
    return (
        <div className={cn("prose max-w-none dark:prose-invert", className)}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ node, ...props }) => (
                        <h1
                            className="text-2xl font-bold mt-6 mb-4"
                            {...props}
                        />
                    ),
                    h2: ({ node, ...props }) => (
                        <h2
                            className="text-xl font-bold mt-5 mb-3"
                            {...props}
                        />
                    ),
                    h3: ({ node, ...props }) => (
                        <h3
                            className="text-lg font-bold mt-4 mb-2"
                            {...props}
                        />
                    ),
                    ul: ({ node, ...props }) => (
                        <ul className="list-disc pl-6 my-4" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                        <ol className="list-decimal pl-6 my-4" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                        <li className="my-1" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                        <p className="my-3" {...props} />
                    ),
                    a: ({ node, ...props }) => (
                        <a className="text-primary underline" {...props} />
                    ),
                    blockquote: ({ node, ...props }) => (
                        <blockquote
                            className="border-l-4 border-muted pl-4 italic my-4"
                            {...props}
                        />
                    ),
                    code: ({
                        node,
                        inline,
                        ...props
                    }: {
                        node?: any;
                        inline?: boolean;
                        [key: string]: any;
                    }) =>
                        inline ? (
                            <code
                                className="bg-muted px-1 py-0.5 rounded text-sm"
                                {...props}
                            />
                        ) : (
                            <code
                                className="block bg-muted p-3 rounded-md text-sm overflow-x-auto my-4"
                                {...props}
                            />
                        ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
