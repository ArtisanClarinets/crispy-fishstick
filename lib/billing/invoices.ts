import { prisma } from "@/lib/prisma";

/**
 * Generates the next invoice number for a tenant.
 * Uses atomic updates on InvoiceSequence model to ensure uniqueness and gap-free (mostly) sequencing.
 * 
 * Format: INV-{TENANT_SLUG}-{YEAR}-{SEQ}
 * Example: INV-ACME-2024-0001
 */
export async function generateInvoiceNumber(tenantId: string, year: number = new Date().getFullYear()) {
  // Fetch tenant slug first
  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
    select: { slug: true },
  });
  
  if (!tenant) {
    throw new Error(`Tenant with ID ${tenantId} not found`);
  }

  // Atomically increment the sequence for this tenant/year
  const sequence = await prisma.invoiceSequence.upsert({
    where: {
      tenantId_year: {
        tenantId,
        year,
      },
    },
    create: {
      tenantId,
      year,
      lastSeq: 1,
    },
    update: {
      lastSeq: {
        increment: 1,
      },
    },
  });

  const seqStr = sequence.lastSeq.toString().padStart(4, "0");
  const slugStr = tenant.slug.toUpperCase();
  const number = `INV-${slugStr}-${year}-${seqStr}`;
  
  return {
    number,
    sequence: sequence.lastSeq,
    year,
  };
}
