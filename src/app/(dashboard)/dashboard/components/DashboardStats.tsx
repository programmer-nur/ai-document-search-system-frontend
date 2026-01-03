"use client";

import { FileText, Search, MessageSquare, Database } from "lucide-react";
import { StatsCard } from "@/components/dashboard";

interface DashboardStatsProps {
  stats: {
    totalDocuments: number;
    processedDocuments: number;
    totalQueries: number;
    totalStorage: number;
    aiQuestionsCount: number;
  };
  isLoading: boolean;
  isLoadingQueries: boolean;
}

export function DashboardStats({
  stats,
  isLoading,
  isLoadingQueries,
}: DashboardStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Documents"
        value={stats.totalDocuments}
        icon={FileText}
        description={`${stats.processedDocuments} processed`}
        isLoading={isLoading}
      />
      <StatsCard
        title="Total Queries"
        value={stats.totalQueries}
        icon={Search}
        description="Searches and questions"
        isLoading={isLoadingQueries}
      />
      <StatsCard
        title="AI Questions"
        value={stats.aiQuestionsCount}
        icon={MessageSquare}
        description="Questions answered"
        isLoading={isLoadingQueries}
      />
      <StatsCard
        title="Storage Used"
        value={
          stats.totalStorage > 0
            ? `${(stats.totalStorage / 1024 / 1024).toFixed(2)} MB`
            : "0 MB"
        }
        icon={Database}
        description="Total document size"
        isLoading={isLoading}
      />
    </div>
  );
}

