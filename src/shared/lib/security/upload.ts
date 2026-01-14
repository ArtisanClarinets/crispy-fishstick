import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
];

const fileSchema = z.object({
  name: z.string()
    .min(1)
    .regex(/^[a-zA-Z0-9.-_]+$/, "Filename contains invalid characters"),
  size: z.number().max(MAX_FILE_SIZE, "File size exceeds 5MB limit"),
  type: z.enum(ALLOWED_MIME_TYPES as [string, ...string[]], {
    errorMap: () => ({ message: "File type not allowed" }),
  }),
});

export function validateFile(file: File) {
  return fileSchema.parse({
    name: file.name,
    size: file.size,
    type: file.type,
  });
}
