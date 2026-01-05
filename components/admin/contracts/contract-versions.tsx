"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ContractVersion {
  id: string;
  version: number;
  status: string;
  changeLog: string | null;
  createdAt: string;
  createdBy: string | null;
}

interface ContractVersionsProps {
  versions: ContractVersion[];
}

export function ContractVersions({ versions }: ContractVersionsProps) {
  if (!versions || versions.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Version History</CardTitle>
        <CardDescription>Previous versions of this contract.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Version</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Change Log</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {versions.map((version) => (
              <TableRow key={version.id}>
                <TableCell>v{version.version}</TableCell>
                <TableCell>{formatDate(version.createdAt)}</TableCell>
                <TableCell>
                  <Badge variant="outline">{version.status}</Badge>
                </TableCell>
                <TableCell>{version.changeLog || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
