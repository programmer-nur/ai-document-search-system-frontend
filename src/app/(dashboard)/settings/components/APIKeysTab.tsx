"use client";

import { Key, AlertCircle, Plus, Copy, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export function APIKeysTab() {
  // TODO: Implement API keys API endpoint in backend
  // For now, this is a placeholder that shows the feature

  const handleCreateKey = () => {
    toast.info("Coming soon", {
      description: "API key management will be available soon.",
    });
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success("Copied", {
      description: "API key copied to clipboard.",
    });
  };

  const handleDeleteKey = (keyId: string) => {
    toast.info("Coming soon", {
      description: "API key deletion will be available soon.",
    });
  };

  // Mock data for demonstration
  const apiKeys: Array<{
    id: string;
    name: string;
    key: string;
    createdAt: string;
    lastUsed: string | null;
  }> = [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage API keys for programmatic access to your workspace
              </CardDescription>
            </div>
            <Button onClick={handleCreateKey}>
              <Plus className="mr-2 h-4 w-4" />
              Create API Key
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              API key management is currently under development. This feature
              will allow you to create, manage, and revoke API keys for
              programmatic access to your workspace.
            </AlertDescription>
          </Alert>

          {apiKeys.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg">
              <Key className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">No API Keys</p>
              <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
                Create an API key to enable programmatic access to your
                workspace resources.
              </p>
              <Button onClick={handleCreateKey}>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First API Key
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {apiKeys.map((apiKey) => (
                <Card key={apiKey.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">{apiKey.name}</h3>
                          <Badge variant="outline">Active</Badge>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <code className="text-xs bg-muted px-2 py-1 rounded">
                            {apiKey.key}
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleCopyKey(apiKey.key)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Created: {new Date(apiKey.createdAt).toLocaleDateString()}</span>
                          {apiKey.lastUsed && (
                            <span>
                              Last used: {new Date(apiKey.lastUsed).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteKey(apiKey.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-2">Planned Features:</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Create and manage multiple API keys</li>
              <li>Set expiration dates for keys</li>
              <li>View usage statistics and logs</li>
              <li>Revoke keys instantly</li>
              <li>Set permissions and scopes per key</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

