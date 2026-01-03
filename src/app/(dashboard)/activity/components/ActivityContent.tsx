"use client";

import { useState } from "react";
import { useGetCurrentUserQuery } from "@/features/auth/services";
import { ActivityHeader } from "./ActivityHeader";
import { QueryHistoryTab } from "./QueryHistoryTab";
import { AuditLogsTab } from "./AuditLogsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History, Shield } from "lucide-react";
import { UserRole } from "@/types/user.types";

export function ActivityContent() {
  const [activeTab, setActiveTab] = useState("history");

  const { data: currentUserData } = useGetCurrentUserQuery();
  const currentUser = currentUserData?.data;
  const isAdmin =
    currentUser?.role === UserRole.ADMIN ||
    currentUser?.role === UserRole.SUPER_ADMIN;

  return (
    <div className="space-y-6">
      <ActivityHeader />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="history">
            <History className="h-4 w-4 mr-2" />
            Query History
          </TabsTrigger>
          {isAdmin && (
            <TabsTrigger value="audit">
              <Shield className="h-4 w-4 mr-2" />
              Audit Logs
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="history" className="mt-6">
          <QueryHistoryTab />
        </TabsContent>

        {isAdmin && (
          <TabsContent value="audit" className="mt-6">
            <AuditLogsTab />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}

