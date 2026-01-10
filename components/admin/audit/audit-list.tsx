'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { fetchWithCsrf } from "@/lib/fetchWithCsrf";

interface AuditLog {
  id: string;
  actorEmail: string | null;
  action: string;
  resource: string;
  resourceId: string | null;
  before: string | null;
  after: string | null;
  ip: string | null;
  createdAt: string;
}

export function AuditList() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetchWithCsrf('/api/admin/audit');
        if (res.ok) {
          const data = await res.json();
          setLogs(data);
        }
      } catch (error) {
        console.error("Failed to fetch audit logs", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (isLoading) {
    return <div className="text-center py-10">Loading audit logs...</div>;
  }

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Actor</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No audit logs found
                  </TableCell>
                </TableRow>
              ) : (
                logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">
                        <div className="flex flex-col">
                            <span>{log.actorEmail || 'System'}</span>
                            <span className="text-xs text-muted-foreground">{log.ip}</span>
                        </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{log.action}</Badge>
                    </TableCell>
                    <TableCell>{log.resource}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => setSelectedLog(log)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!selectedLog} onOpenChange={(open) => !open && setSelectedLog(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Audit Log Details</DialogTitle>
            <DialogDescription>
              {selectedLog?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedLog && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Actor</h4>
                  <p className="text-sm text-muted-foreground">{selectedLog.actorEmail || 'System'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">IP Address</h4>
                  <p className="text-sm text-muted-foreground">{selectedLog.ip || 'Unknown'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Action</h4>
                  <p className="text-sm text-muted-foreground">{selectedLog.action}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Resource</h4>
                  <p className="text-sm text-muted-foreground">{selectedLog.resource} ({selectedLog.resourceId})</p>
                </div>
              </div>

              {selectedLog.before && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Before</h4>
                  <pre className="bg-muted p-2 rounded text-xs overflow-auto">
                    {JSON.stringify(JSON.parse(selectedLog.before), null, 2)}
                  </pre>
                </div>
              )}

              {selectedLog.after && (
                <div>
                  <h4 className="text-sm font-medium mb-1">After</h4>
                  <pre className="bg-muted p-2 rounded text-xs overflow-auto">
                    {JSON.stringify(JSON.parse(selectedLog.after), null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
