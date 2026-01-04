"use client";

import { Settings } from "lucide-react";

export function SettingsHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
        <Settings className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your profile, workspace, security, and API keys
        </p>
      </div>
    </div>
  );
}

