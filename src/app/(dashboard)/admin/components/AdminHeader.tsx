"use client";

import { Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AdminHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">
            Manage users, roles, limits, and view usage metrics
          </p>
        </div>
      </div>
      <Badge variant="outline" className="text-xs">
        Admin Only
      </Badge>
    </div>
  );
}

