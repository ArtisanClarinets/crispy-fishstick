export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { adminMutation } from "@/lib/admin/route";
import { z } from "zod";

const convertSchema = z.object({
  tenantId: z.string().min(1, "Tenant is required"),
  pmUserId: z.string().optional(),
  techLeadUserId: z.string().optional(),
  createMilestones: z.boolean().default(false),
});

/**
 * POST /api/admin/proposals/[id]/convert-to-project
 * Convert accepted proposal to project with baseline budget
 */
export const POST = adminMutation(
  {
    permissions: ["proposals.write", "projects.write"],
    audit: { resource: "proposal", action: "convert_to_project" },
  },
  async (req, { params }: any) => {
    const { id } = params;
    const body = await req.json();
    const { tenantId, pmUserId, techLeadUserId } = convertSchema.parse(body);
    
    const proposal = await prisma.proposal.findUnique({
      where: { id, deletedAt: null },
      include: {
        ProposalItem: {
          include: {
            ProposalComponent: true,
          },
        },
      },
    });
    
    if (!proposal) {
      return NextResponse.json({ error: "Proposal not found" }, { status: 404 });
    }
    
    if (proposal.status !== "approved") {
      return NextResponse.json(
        { error: "Only approved proposals can be converted to projects" },
        { status: 400 }
      );
    }
    
    // Create project with transaction
    const project = await prisma.$transaction(async (tx) => {
      // Create project
      const newProject = await tx.project.create({
        data: {
          name: proposal.title,
          tenantId,
          status: "active",
        },
      });
      
      // Create role assignments for PM and Tech Lead
      const assignments = [];
      
      if (pmUserId) {
        const pmRole = await tx.role.findFirst({
          where: { name: "Project Manager" },
        });
        
        if (pmRole) {
          assignments.push({
            userId: pmUserId,
            roleId: pmRole.id,
            scopeType: "PROJECT",
            scopeId: newProject.id,
          });
        }
      }
      
      if (techLeadUserId) {
        const techLeadRole = await tx.role.findFirst({
          where: { name: "Tech Lead" },
        });
        
        if (techLeadRole) {
          assignments.push({
            userId: techLeadUserId,
            roleId: techLeadRole.id,
            scopeType: "PROJECT",
            scopeId: newProject.id,
          });
        }
      }
      
      if (assignments.length > 0) {
        await tx.roleAssignment.createMany({
          data: assignments,
        });
      }
      
      // Update proposal status
      await tx.proposal.update({
        where: { id },
        data: {
          status: "converted",
        },
      });
      
      return newProject;
    });
    
    return NextResponse.json({
      project,
      message: `Project created successfully. Baseline budget: $${proposal.totalAmount}`,
    }, { status: 201 });
  }
);
