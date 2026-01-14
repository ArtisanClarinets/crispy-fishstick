export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { adminMutation } from "@/shared/lib/admin/route";
import { z } from "zod";

const signContractSchema = z.object({
  provider: z.enum(["docusign", "hellosign"]).default("docusign"),
  signerEmail: z.string().email(),
  signerName: z.string().min(1),
});

/**
 * POST /api/admin/contracts/[id]/sign
 * Initiate e-signature workflow
 */
export const POST = adminMutation(
  {
    permissions: ["contracts.write"],
    audit: { resource: "contract", action: "initiate_signature" },
  },
  async (req, { user: _user, params }: any) => {
    const { id } = params;
    const body = await req.json();
    const { provider, signerEmail: _signerEmail, signerName: _signerName } = signContractSchema.parse(body);
    
    const contract = await prisma.contract.findUnique({
      where: { id, deletedAt: null },
      include: { Tenant: true },
    });
    
    if (!contract) {
      return NextResponse.json({ error: "Contract not found" }, { status: 404 });
    }
    
    if (contract.signatureStatus === "signed") {
      return NextResponse.json(
        { error: "Contract already signed" },
        { status: 400 }
      );
    }
    
    // In production, this would call actual e-signature provider API
    // For now, we simulate the creation of an envelope
    const envelopeId = `env_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Update contract with e-signature metadata
    const updated = await prisma.contract.update({
      where: { id },
      data: {
        signatureProvider: provider,
        signatureEnvelopeId: envelopeId,
        signatureStatus: "pending",
        // Clear old fake signature fields
        signedBy: null,
        signedAt: null,
        signatureUrl: null,
      },
      include: {
        Tenant: true,
      },
    });
    
    // In production, return the signing URL from provider
    const mockSigningUrl = `https://sign.example.com/${envelopeId}`;
    
    return NextResponse.json({
      contract: updated,
      signingUrl: mockSigningUrl,
      message: "E-signature initiated. In production, this would return the actual provider signing URL.",
    });
  }
);
