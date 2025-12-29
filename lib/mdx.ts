import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { CaseModePanel } from "@/components/case-mode-panel";

const root = process.cwd();
const contentRoot = path.resolve(root, "content") + path.sep;

export async function getMdxFiles(dir: string) {
  try {
    const joinedPath = path.resolve(contentRoot, dir);
    const targetPath = path.normalize(joinedPath);

    // Ensure the resolved path stays within the intended content directory
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

  // Ensure the resulting path is within the intended content directory
  if (!filePath.startsWith(contentRoot)) {
    throw new Error("Invalid path specified!");
  }

  const source = fs.readFileSync(filePath, "utf8");

  // We only parse frontmatter here, but return raw source for the component to handle
  // OR we can compile it here.
  // Given we are using next-mdx-remote/rsc in the page, let's keep it simple:
  // Return the raw source and frontmatter.

  // We use compileMDX just to extract frontmatter easily, but we can also just use it for everything.
  // If we return 'content' (React Element) from here, we can't serialize it easily if this was an API,
  // but since we are in RSC -> RSC, we CAN return the element!

  const mdxComponents = {
    CaseModePanel,
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
    // We can pass components here if we want them available during compilation
    components: mdxComponents,
  });

  return {
    slug,
    content, // This is a React Element
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
