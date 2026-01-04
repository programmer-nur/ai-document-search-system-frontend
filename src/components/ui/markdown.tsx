"use client";

import { ReactNode } from "react";

interface MarkdownProps {
  content: string;
}

export function Markdown({ content }: MarkdownProps) {
  // Simple text rendering with basic formatting support
  // Split by newlines and render as paragraphs
  const lines = content.split("\n").filter((line) => line.trim() !== "");

  if (lines.length === 0) {
    return <p className="text-sm">{content}</p>;
  }

  return (
    <div className="space-y-2">
      {lines.map((line, index) => {
        // Simple bold text support **text**
        const parts: (string | ReactNode)[] = [];
        const boldRegex = /\*\*(.+?)\*\*/g;
        let lastIndex = 0;
        let match;
        let keyCounter = 0;

        while ((match = boldRegex.exec(line)) !== null) {
          if (match.index > lastIndex) {
            parts.push(line.substring(lastIndex, match.index));
          }
          parts.push(
            <strong
              key={`bold-${index}-${keyCounter++}`}
              className="font-semibold"
            >
              {match[1]}
            </strong>
          );
          lastIndex = match.index + match[0].length;
        }

        if (lastIndex < line.length) {
          parts.push(line.substring(lastIndex));
        }

        return (
          <p key={index} className="text-sm leading-relaxed">
            {parts.length > 0 ? parts : line}
          </p>
        );
      })}
    </div>
  );
}
