"use client";

import { useState } from "react";
import { useGetCurrentUserQuery } from "@/features/auth/services";
import { AdminHeader } from "./AdminHeader";
import { UserManagementTab } from "./UserManagementTab";
import { UsageMetricsTab } from "./UsageMetricsTab";
import { DocumentLimitsTab } from "./DocumentLimitsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Users, BarChart3, FileText, AlertCircle } from "lucide-react";
import { UserRole } from "@/types/user.types";
import { Skeleton } from "@/components/ui/skeleton";

export function AdminContent() {
  const [activeTab, setActiveTab] = useState("users");
  const { data: currentUserData, isLoading } = useGetCurrentUserQuery();
  const currentUser = currentUserData?.data;

  const isAdmin =
    currentUser?.role === UserRole.ADMIN ||
    currentUser?.role === UserRole.SUPER_ADMIN;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-16 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="space-y-6">
        <AdminHeader />
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-12">
            <Shield className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
            <p className="text-muted-foreground text-center max-w-md">
              You do not have permission to access the admin panel. This area
              is restricted to administrators only.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminHeader />

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          You are viewing the admin panel. Use caution when making changes to
          user accounts, roles, and system settings.
        </AlertDescription>
      </Alert>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-3xl grid-cols-3">
          <TabsTrigger value="users">
            <Users className="h-4 w-4 mr-2" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="metrics">
            <BarChart3 className="h-4 w-4 mr-2" />
            Usage Metrics
          </TabsTrigger>
          <TabsTrigger value="limits">
            <FileText className="h-4 w-4 mr-2" />
            Document Limits
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-6">
          <UserManagementTab />
        </TabsContent>

        <TabsContent value="metrics" className="mt-6">
          <UsageMetricsTab />
        </TabsContent>

        <TabsContent value="limits" className="mt-6">
          <DocumentLimitsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

