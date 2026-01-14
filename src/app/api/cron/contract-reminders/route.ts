import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { sendEmail } from "@/shared/lib/email";
import { addDays } from "date-fns";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    // Secure this endpoint with CRON_SECRET header
    // Require CRON_SECRET in production; fail closed if missing
    const cronSecret = process.env.CRON_SECRET;
    if (process.env.NODE_ENV === "production" && !cronSecret) {
      console.error("CRON_SECRET is not set. Cron endpoint disabled.");
      return new NextResponse("Forbidden", { status: 403, headers: { "Cache-Control": "no-store" } });
    }

    const authHeader = req.headers.get("authorization");
    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return new NextResponse("Unauthorized", { status: 401, headers: { "Cache-Control": "no-store" } });
    }
    
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
      // Get tenant contact email; derive from tenant or use environment fallback
      const toEmail = contract.Tenant?.contactEmail || process.env.ADMIN_EMAIL || "admin@example.com";
      
      const emailSent = await sendEmail({
        to: toEmail,
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

    return NextResponse.json(
      {
        success: true,
        processed: results.length,
        details: results,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Failed to check contract expirations:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
