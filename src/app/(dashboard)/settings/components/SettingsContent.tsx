"use client";

import { useState } from "react";
import { SettingsHeader } from "./SettingsHeader";
import { ProfileTab } from "./ProfileTab";
import { WorkspaceTab } from "./WorkspaceTab";
import { SecurityTab } from "./SecurityTab";
import { APIKeysTab } from "./APIKeysTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Building2, Lock, Key } from "lucide-react";

export function SettingsContent() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-6">
      <SettingsHeader />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-2xl grid-cols-4">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="workspace">
            <Building2 className="h-4 w-4 mr-2" />
            Workspace
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="api-keys">
            <Key className="h-4 w-4 mr-2" />
            API Keys
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <ProfileTab />
        </TabsContent>

        <TabsContent value="workspace" className="mt-6">
          <WorkspaceTab />
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <SecurityTab />
        </TabsContent>

        <TabsContent value="api-keys" className="mt-6">
          <APIKeysTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

