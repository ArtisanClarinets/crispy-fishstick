export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/guards";
import { createAuditLog } from "@/lib/admin/audit";
import { assertSameOrigin } from "@/lib/security/origin";
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

export async function POST(req: NextRequest) {
  try {
    // CSRF protection
    try {
      assertSameOrigin(req);
    } catch (_error) {
      return new NextResponse("Forbidden", { status: 403, headers: { "Cache-Control": "no-store" } });
    }

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

    return NextResponse.json(contract, {
      status: 201,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (_error) {
    if (_error instanceof z.ZodError) {
      return NextResponse.json(
        { errors: _error.errors },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }
    if (_error instanceof Error && _error.message === "Unauthorized") {
      return new NextResponse("Unauthorized", { status: 401, headers: { "Cache-Control": "no-store" } });
    }
    if (_error instanceof Error && _error.message === "Forbidden") {
      return new NextResponse("Forbidden", { status: 403, headers: { "Cache-Control": "no-store" } });
    }
    console.error("Failed to create contract:", _error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
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
    
    return NextResponse.json(contracts, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return new NextResponse("Unauthorized", { status: 401, headers: { "Cache-Control": "no-store" } });
    }
    if (error instanceof Error && error.message === "Forbidden") {
      return new NextResponse("Forbidden", { status: 403, headers: { "Cache-Control": "no-store" } });
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
