import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { addDays } from "date-fns";

export const dynamic = "force-dynamic";

export async function GET(_req: Request) {
  try {
    // Secure this endpoint (e.g., with a secret key header)
    // For demo purposes, we'll allow it but log access
    console.log("Running contract expiration check...");

    const today = new Date();
    const thirtyDaysFromNow = addDays(today, 30);

    const expiringContracts = await prisma.contract.findMany({
      where: {
        status: "active",
        endDate: {
          gte: today,
          lte: thirtyDaysFromNow,
        },
      },
      include: {
        Tenant: true,
      },
    });

    const results = [];

    for (const contract of expiringContracts) {
      const emailSent = await sendEmail({
        to: "admin@example.com", // In a real app, this would be contract.Tenant.contactEmail
        subject: `Contract Expiration Warning: ${contract.title}`,
        html: `
          <h1>Contract Expiration Warning</h1>
          <p>The contract "<strong>${contract.title}</strong>" for client ${contract.Tenant.name} is expiring on ${contract.endDate?.toLocaleDateString()}.</p>
          <p>Please take necessary action.</p>
        `,
      });

      results.push({
        contractId: contract.id,
        tenant: contract.Tenant.name,
        expiresAt: contract.endDate,
        status: emailSent ? "reminder_sent" : "failed",
      });
    }

    return NextResponse.json({
      success: true,
      processed: results.length,
      details: results,
    });
  } catch (error) {
    console.error("Failed to check contract expirations:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
