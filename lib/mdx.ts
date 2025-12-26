import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";

const root = process.cwd();

export async function getMdxFiles(dir: string) {
  try {
    return fs.readdirSync(path.join(root, "content", dir));
  } catch {
    return [];
  }
}

export async function getMdxContent(dir: string, slug: string) {
  const filePath = path.join(root, "content", dir, `${slug}.mdx`);
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
