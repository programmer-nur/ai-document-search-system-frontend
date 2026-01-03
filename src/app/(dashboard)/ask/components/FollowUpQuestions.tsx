"use client";

import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FollowUpQuestionsProps {
  question: string;
  onQuestionClick?: (question: string) => void;
}

const generateFollowUpQuestions = (originalQuestion: string): string[] => {
  // Simple follow-up question generation based on the original question
  // In production, this could be AI-generated or use a predefined set
  const followUps: string[] = [];

  if (originalQuestion.toLowerCase().includes("what")) {
    followUps.push(`Can you provide more details about this?`);
    followUps.push(`What are the key points I should know?`);
  } else if (originalQuestion.toLowerCase().includes("how")) {
    followUps.push(`Can you explain the steps in more detail?`);
    followUps.push(`What are the requirements for this?`);
  } else if (originalQuestion.toLowerCase().includes("why")) {
    followUps.push(`What are the reasons behind this?`);
    followUps.push(`Can you provide examples?`);
  } else {
    followUps.push(`Can you tell me more about this?`);
    followUps.push(`What are the main points?`);
  }

  return followUps.slice(0, 2);
};

export function FollowUpQuestions({
  question,
  onQuestionClick,
}: FollowUpQuestionsProps) {
  const followUps = generateFollowUpQuestions(question);

  if (followUps.length === 0 || !onQuestionClick) {
    return null;
  }

  return (
    <Card className="p-4 bg-muted/50">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-4 w-4 text-muted-foreground" />
        <p className="text-sm font-medium">Suggested follow-ups</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {followUps.map((followUp, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => onQuestionClick(followUp)}
          >
            {followUp}
          </Button>
        ))}
      </div>
    </Card>
  );
}

