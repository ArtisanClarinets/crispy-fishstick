import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { CaseModePanel } from "@/components/case-mode-panel";
import { ShopifySyncDiagram } from "@/components/mdx/ShopifySyncDiagram";
import { RedactionNote } from "@/components/mdx/RedactionNote";
import { SystemSpec } from "@/components/mdx/SystemSpec";

// Infrastructure Academy Widgets
import { CloudTaxCalculator } from "@/components/infrastructure/academy/cloud-tax-calculator";
import { VcpuCoreExplainer } from "@/components/infrastructure/academy/vcpu-core-explainer";
import { EvidencePanel } from "@/components/infrastructure/academy/evidence-panel";

const root = process.cwd();
const contentRoot = path.resolve(root, "content") + path.sep;

export async function getMdxFiles(dir: string) {
  try {
    const joinedPath = path.resolve(contentRoot, dir);
    const targetPath = path.normalize(joinedPath);

    if (!targetPath.startsWith(contentRoot)) {
      throw new Error("Invalid directory path");
    }

    return fs.readdirSync(targetPath);
  } catch {
    return [];
  }
}

export async function getMdxContent(dir: string, slug: string) {
  const joinedPath = path.resolve(contentRoot, dir, `${slug}.mdx`);
  const filePath = path.normalize(joinedPath);

  if (!filePath.startsWith(contentRoot)) {
    throw new Error("Invalid path specified!");
  }

  const source = fs.readFileSync(filePath, "utf8");

  const mdxComponents = {
    CaseModePanel,
    ShopifySyncDiagram,
    RedactionNote,
    SystemSpec,
    CloudTaxCalculator,
    VcpuCoreExplainer,
    EvidencePanel,
  };

  const { content, frontmatter } = await compileMDX<{
    title: string;
    description: string;
    date: string;
    tags?: string[];
    role?: string;
    timeline?: string;
    outcome?: string;
    image?: string;
    readTime?: string;
  }>({
    source,
    options: { parseFrontmatter: true },
    components: mdxComponents,
  });

  return {
    slug,
    content,
    frontmatter,
  };
}

export async function getAllMdxContent(dir: string) {
  const files = await getMdxFiles(dir);

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      return await getMdxContent(dir, slug);
    })
  );

  return posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date as string).getTime();
    const dateB = new Date(b.frontmatter.date as string).getTime();
    return dateB - dateA;
  });
}
