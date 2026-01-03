"use client";

import { useGetWorkspacesQuery } from "@/features/workspace/services";
import { useGetDocumentsQuery } from "@/features/document/services";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function DocumentLimitsTab() {
  const { data: workspacesData, isLoading: isLoadingWorkspaces } =
    useGetWorkspacesQuery({});
  const workspaceId = workspacesData?.data?.[0]?.id;

  const { data: documentsData, isLoading: isLoadingDocuments } =
    useGetDocumentsQuery(
      workspaceId
        ? {
            workspaceId,
            params: { limit: 1000, page: 1 },
          }
        : { workspaceId: "", params: {} },
      { skip: !workspaceId }
    );

  const isLoading = isLoadingWorkspaces || isLoadingDocuments;

  // Default limits (can be configured per workspace/user)
  const defaultDocumentLimit = 1000;
  const documents = documentsData?.data || [];
  const currentDocumentCount = documents.length;
  const usagePercentage = (currentDocumentCount / defaultDocumentLimit) * 100;

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-64 mt-2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!workspaceId) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-12">
          <p className="text-muted-foreground text-center">
            No workspace found. Please create a workspace first.
          </p>
        </CardContent>
      </Card>
    );
  }

  const isNearLimit = usagePercentage >= 80;
  const isAtLimit = usagePercentage >= 100;

  return (
    <div className="space-y-6">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Document limits help manage storage and processing resources. Limits
          can be configured per workspace or user tier.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Current Workspace Limits</CardTitle>
          <CardDescription>
            Document storage and processing limits for your workspace
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Document Limit</span>
              </div>
              <Badge
                variant={isAtLimit ? "destructive" : isNearLimit ? "secondary" : "default"}
              >
                {isAtLimit ? "At Limit" : isNearLimit ? "Near Limit" : "Within Limit"}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {currentDocumentCount} / {defaultDocumentLimit} documents
                </span>
                <span className="font-medium">
                  {usagePercentage.toFixed(1)}%
                </span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    isAtLimit
                      ? "bg-red-500"
                      : isNearLimit
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
            <div className="space-y-1">
              <p className="text-sm font-medium">Current Usage</p>
              <p className="text-2xl font-bold">{currentDocumentCount}</p>
              <p className="text-xs text-muted-foreground">documents stored</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Limit</p>
              <p className="text-2xl font-bold">{defaultDocumentLimit}</p>
              <p className="text-xs text-muted-foreground">maximum documents</p>
            </div>
          </div>

          {isNearLimit && (
            <Alert variant={isAtLimit ? "destructive" : "default"}>
              {isAtLimit ? (
                <>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    You have reached your document limit. Please delete some
                    documents or upgrade your plan to continue uploading.
                  </AlertDescription>
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    You are approaching your document limit ({usagePercentage.toFixed(1)}% used).
                    Consider upgrading your plan or removing unused documents.
                  </AlertDescription>
                </>
              )}
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Limit Management</CardTitle>
          <CardDescription>
            Configure document limits per workspace or user tier
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">Planned Features:</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Set custom document limits per workspace</li>
                <li>Configure limits based on user tier/plan</li>
                <li>Automatic limit enforcement</li>
                <li>Limit notifications and alerts</li>
                <li>Usage analytics and reporting</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

