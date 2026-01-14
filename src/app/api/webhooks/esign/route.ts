export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { createAuditLog } from "@/shared/lib/admin/audit";
import { z } from "zod";

const esignWebhookSchema = z.object({
  envelopeId: z.string(),
  event: z.enum(["signed", "declined", "voided"]),
  signedAt: z.string().optional(),
  provider: z.enum(["docusign", "hellosign"]),
});

/**
 * POST /api/webhooks/esign
 * Receive e-signature provider webhooks
 * 
 * Note: skipCsrf is enabled since this is a webhook from external service
 */
export async function POST(req: NextRequest) {
  try {
    // In production, verify webhook signature from provider
    // const signature = req.headers.get("x-signature");
    // verifyWebhookSignature(signature, body);
    
    const body = await req.json();
    const payload = esignWebhookSchema.parse(body);
    
    // Find contract by envelope ID
    const contract = await prisma.contract.findFirst({
      where: {
        signatureEnvelopeId: payload.envelopeId,
        signatureProvider: payload.provider,
      },
    });
    
    if (!contract) {
      console.error("[E-Sign Webhook] Contract not found for envelope:", payload.envelopeId);
      return NextResponse.json({ error: "Contract not found" }, { status: 404 });
    }
    
    // Update contract based on event
    const updates: any = {
      signatureStatus: payload.event,
    };
    
    if (payload.event === "signed" && payload.signedAt) {
      updates.signatureCompletedAt = new Date(payload.signedAt);
      updates.status = "active"; // Move to active status when signed
    }
    
    const updated = await prisma.contract.update({
      where: { id: contract.id },
      data: updates,
    });
    
    // Audit the event
    await createAuditLog({
      action: `signature_${payload.event}`,
      resource: "contract",
      resourceId: contract.id,
      before: contract,
      after: updated,
    });
    
    console.log(`[E-Sign Webhook] Contract ${contract.id} updated: ${payload.event}`);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[E-Sign Webhook] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
