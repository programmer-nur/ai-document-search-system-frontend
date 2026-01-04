"use client";

import { Shield, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function AuditLogsTab() {
  // TODO: Implement audit logs API endpoint in backend
  // For now, this is a placeholder that shows admin-only access message

  return (
    <div className="space-y-4">
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Audit logs are only available to administrators. This feature will
          be available once the audit log API endpoint is implemented in the
          backend.
        </AlertDescription>
      </Alert>

      <Card>
        <CardContent className="flex flex-col items-center justify-center p-12">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg font-medium mb-2">Audit Logs</p>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Audit logs provide a detailed record of all actions performed in
            the workspace, including document uploads, deletions, user
            management, and system changes.
          </p>
          <div className="mt-6 p-4 bg-muted rounded-lg w-full max-w-md">
            <p className="text-xs font-medium mb-2">Planned Features:</p>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
              <li>View all workspace actions</li>
              <li>Filter by action type, user, or date</li>
              <li>Export audit logs</li>
              <li>Real-time activity monitoring</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

