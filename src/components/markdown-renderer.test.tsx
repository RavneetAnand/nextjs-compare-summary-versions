import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MarkdownRenderer from "@/components/markdown-renderer";

// Mock react-markdown
vi.mock("react-markdown", () => ({
    default: ({ children, components }: any) => {
        // Simple mock that renders h1, p, and code elements
        const content = typeof children === "string" ? children : "";

        if (content.includes("# Heading")) {
            return components.h1({ children: ["Heading"] });
        }

        if (content.includes("`code`")) {
            return components.code({ children: ["code"], inline: true });
        }

        if (content.includes("```")) {
            return components.code({ children: ["code block"], inline: false });
        }

        return components.p({ children: [content] });
    },
}));

// Mock remark-gfm
vi.mock("remark-gfm", () => ({
    default: vi.fn(),
}));

describe("MarkdownRenderer", () => {
    it("renders paragraph text correctly", () => {
        render(<MarkdownRenderer content="This is a paragraph" />);
        expect(screen.getByText("This is a paragraph")).toBeInTheDocument();
    });

    it("renders headings with proper styling", () => {
        render(<MarkdownRenderer content="# Heading" />);
        const heading = screen.getByText("Heading");
        expect(heading).toBeInTheDocument();
        expect(heading.tagName).toBe("H1");
        expect(heading).toHaveClass("text-2xl", "font-bold");
    });

    it("renders inline code with proper styling", () => {
        render(<MarkdownRenderer content="`code`" />);
        const code = screen.getByText("code");
        expect(code).toBeInTheDocument();
        expect(code.tagName).toBe("CODE");
        expect(code).toHaveClass(
            "bg-muted",
            "px-1",
            "py-0.5",
            "rounded",
            "text-sm"
        );
    });

    it("renders code blocks with proper styling", () => {
        render(<MarkdownRenderer content="```\ncode block\n```" />);
        const codeBlock = screen.getByText("code block");
        expect(codeBlock).toBeInTheDocument();
        expect(codeBlock.tagName).toBe("CODE");
        expect(codeBlock).toHaveClass(
            "block",
            "bg-muted",
            "p-3",
            "rounded-md",
            "text-sm"
        );
    });
});
