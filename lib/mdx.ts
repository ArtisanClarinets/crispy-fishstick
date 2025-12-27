import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";

const root = process.cwd();

export async function getMdxFiles(dir: string) {
  try {
    const contentDir = path.join(root, "content");
    const joinedPath = path.join(contentDir, dir);
    const targetPath = path.normalize(joinedPath);

    // Ensure the resolved path stays within the intended content directory
    if (!targetPath.startsWith(contentDir)) {
      throw new Error("Invalid directory path");
    }

    return fs.readdirSync(targetPath);
  } catch {
    return [];
  }
}

export async function getMdxContent(dir: string, slug: string) {
  const contentDir = path.join(root, "content");
  const joinedPath = path.join(contentDir, dir, `${slug}.mdx`);
  const filePath = path.normalize(joinedPath);

  // Ensure the resulting path is within the intended content directory
  if (!filePath.startsWith(contentDir)) {
    throw new Error("Invalid path specified!");
  }

  const source = fs.readFileSync(filePath, "utf8");

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
