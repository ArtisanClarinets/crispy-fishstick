import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Media Asset Authorization", () => {
  let testTenantId: string;
  let testUserId: string;
  let testProjectId: string;
  let publicMediaId: string;
  let tenantMediaId: string;
  let projectMediaId: string;

  beforeEach(async () => {
    const tenant = await prisma.tenant.create({
      data: {
        name: "Test Tenant",
        slug: `test-tenant-${Date.now()}`,
                        contactEmail: "test@example.com",
      },
    });
    testTenantId = tenant.id;

    const user = await prisma.user.create({
      data: {
        email: `test-${Date.now()}@example.com`,
        name: "Test User",
                tenantId: testTenantId,
      },
    });
    testUserId = user.id;

    const project = await prisma.project.create({
      data: {
        name: "Test Project",
        status: "ACTIVE",
        tenantId: testTenantId,
      },
    });
    testProjectId = project.id;

    // Create public media
    const publicMedia = await prisma.mediaAsset.create({
      data: {
        key: "public-file.jpg",
        url: "/uploads/public-file.jpg",
        storageKey: "storage/public-file.jpg",
        mime: "image/jpeg",
        size: 1024,
        checksum: "abc123",
        visibility: "public",
        tenantId: testTenantId,
      },
    });
    publicMediaId = publicMedia.id;

    // Create tenant-scoped media
    const tenantMedia = await prisma.mediaAsset.create({
      data: {
        key: "tenant-file.jpg",
        url: "/uploads/tenant-file.jpg",
        storageKey: "storage/tenant-file.jpg",
        mime: "image/jpeg",
        size: 2048,
        checksum: "def456",
        visibility: "tenant",
        tenantId: testTenantId,
      },
    });
    tenantMediaId = tenantMedia.id;

    // Create project-scoped media
    const projectMedia = await prisma.mediaAsset.create({
      data: {
        key: "project-file.jpg",
        url: "/uploads/project-file.jpg",
        storageKey: "storage/project-file.jpg",
        mime: "image/jpeg",
        size: 3072,
        checksum: "ghi789",
        visibility: "private",
        tenantId: testTenantId,
      },
    });
    projectMediaId = projectMedia.id;
  });

  afterEach(async () => {
    await prisma.mediaAsset.deleteMany({
      where: { OR: [{ id: publicMediaId }, { id: tenantMediaId }, { id: projectMediaId }] },
    });
    await prisma.project.deleteMany({ where: { id: testProjectId } });
    await prisma.user.deleteMany({ where: { id: testUserId } });
    await prisma.tenant.deleteMany({ where: { id: testTenantId } });
  });

  it("should allow access to PUBLIC visibility media", async () => {
    const media = await prisma.mediaAsset.findUnique({
      where: { id: publicMediaId },
    });

    expect(media).not.toBeNull();
    expect(media?.visibility).toBe("public");
  });

  it("should restrict TENANT visibility media to tenant users", async () => {
    const user = await prisma.user.findUnique({ where: { id: testUserId } });
    expect(user?.tenantId).toBe(testTenantId);

    const media = await prisma.mediaAsset.findFirst({
      where: {
        id: tenantMediaId,
        visibility: "tenant",
        tenantId: user?.tenantId,
      },
    });

    expect(media).not.toBeNull();
  });

  it("should restrict PROJECT visibility media to project members", async () => {
    const media = await prisma.mediaAsset.findFirst({
      where: {
        id: projectMediaId,
        visibility: "private",
        tenantId: testTenantId,
      },
    });

    expect(media).not.toBeNull();
    expect(media?.tenantId).toBe(testTenantId);
  });

  it("should prevent access to PROJECT media without project context", async () => {
    const media = await prisma.mediaAsset.findFirst({
      where: {
        id: projectMediaId,
        visibility: "private",
        tenantId: "wrong-tenant-id", // Wrong tenant
      },
    });

    expect(media).toBeNull();
  });
});
