export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { adminMutation } from "@/lib/admin/route";

/**
 * POST /api/admin/time-entries/[id]/approve
 * Approve a time entry
 */
export const POST = adminMutation(
  {
    permissions: ["time.approve"],
    audit: { resource: "timeEntry", action: "approve" },
  },
  async (_req, { user, params }: any) => {
    const { id } = params;
    
    const timeEntry = await prisma.timeEntry.findUnique({
      where: { id, deletedAt: null },
    });
    
    if (!timeEntry) {
      return NextResponse.json({ error: "Time entry not found" }, { status: 404 });
    }
    
    if (timeEntry.status !== "submitted") {
      return NextResponse.json(
        { error: "Only submitted time entries can be approved" },
        { status: 400 }
      );
    }
    
    const approved = await prisma.timeEntry.update({
      where: { id },
      data: {
        status: "approved",
        approvedBy: user.id,
        approvedAt: new Date(),
      },
      include: {
        User: true,
        Project: true,
      },
    });
    
    return NextResponse.json(approved);
  }
);
