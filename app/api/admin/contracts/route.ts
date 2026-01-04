export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/guards";
import { createAuditLog } from "@/lib/admin/audit";
import { z } from "zod";

const createContractSchema = z.object({
  title: z.string().min(1, "Title is required"),
  tenantId: z.string().min(1, "Tenant is required"),
  status: z.string().default("draft"),
  startDate: z.string().transform((str) => new Date(str)),
  endDate: z.string().optional().nullable().transform((str) => str ? new Date(str) : null),
  value: z.number().min(0).default(0),
  content: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const user = await requireAdmin({ permissions: ["contracts.write"] });
    const body = await req.json();
    const validatedData = createContractSchema.parse(body);

    const contract = await prisma.contract.create({
      data: validatedData,
    });

    await createAuditLog({
      action: "create_contract",
      resource: "contract",
      resourceId: contract.id,
      actorId: user.id,
      actorEmail: user.email,
      after: contract,
    });

    return NextResponse.json(contract, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    if (error instanceof Error && error.message === "Unauthorized") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
      return new NextResponse("Forbidden", { status: 403 });
    }
    console.error("Failed to create contract:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await requireAdmin({ permissions: ["contracts.read"] });
    
    const contracts = await prisma.contract.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        Tenant: true,
      },
    });
    
    return NextResponse.json(contracts);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
        return new NextResponse("Forbidden", { status: 403 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
