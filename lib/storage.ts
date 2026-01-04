import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export async function saveFileLocally(file: File): Promise<{ key: string; url: string; size: number; mime: string }> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name);
  const key = `${uuidv4()}${ext}`;
  const filePath = path.join(UPLOAD_DIR, key);

  await fs.promises.writeFile(filePath, buffer);

  return {
    key,
    url: `/uploads/${key}`,
    size: file.size,
    mime: file.type,
  };
}

export async function deleteFileLocally(key: string): Promise<void> {
  const filePath = path.join(UPLOAD_DIR, key);
  try {
    await fs.promises.unlink(filePath);
  } catch (error) {
    console.warn(`Failed to delete local file ${filePath}:`, error);
  }
}
