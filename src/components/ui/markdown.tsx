"use client";

import { ReactNode } from "react";

interface MarkdownProps {
  content: string;
}

export function Markdown({ content }: MarkdownProps) {
  // Simple markdown-like rendering for basic formatting
  // In production, you might want to use a library like react-markdown
  
  const renderContent = (text: string): ReactNode => {
    // Split by newlines and process each line
    const lines = text.split('\n');
    
    return lines.map((line, index) => {
      // Handle bold text **text**
      let processedLine = line;
      const boldRegex = /\*\*(.+?)\*\*/g;
      const parts: (string | ReactNode)[] = [];
      let lastIndex = 0;
      let match;
      
      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        parts.push(
          <strong key={`bold-${match.index}`} className="font-semibold">
            {match[1]}
          </strong>
        );
        lastIndex = match.index + match[0].length;
      }
      
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }
      
      // Handle code blocks `code`
      const codeRegex = /`(.+?)`/g;
      const finalParts: (string | ReactNode)[] = [];
      let codeLastIndex = 0;
      let codeMatch;
      const lineText = parts.length > 1 ? line : parts[0] as string;
      
      if (typeof lineText === 'string') {
        while ((codeMatch = codeRegex.exec(lineText)) !== null) {
          if (codeMatch.index > codeLastIndex) {
            finalParts.push(lineText.substring(codeLastIndex, codeMatch.index));
          }
          finalParts.push(
            <code
              key={`code-${codeMatch.index}`}
              className="px-1.5 py-0.5 bg-muted rounded text-sm font-mono"
            >
              {codeMatch[1]}
            </code>
          );
          codeLastIndex = codeMatch.index + codeMatch[0].length;
        }
        
        if (codeLastIndex < lineText.length) {
          finalParts.push(lineText.substring(codeLastIndex));
        }
      } else {
        finalParts.push(...parts);
      }
      
      if (line.trim() === '') {
        return <br key={index} />;
      }
      
      return (
        <p key={index} className="mb-2 last:mb-0">
          {finalParts.length > 0 ? finalParts : line}
        </p>
      );
    });
  };
  
  return <div className="markdown-content">{renderContent(content)}</div>;
}

