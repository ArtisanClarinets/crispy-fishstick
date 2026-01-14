
import { z } from "zod";

const emailSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  html: z.string().min(1),
  from: z.string().email().optional(),
});

export type EmailOptions = z.infer<typeof emailSchema>;

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const validatedOptions = emailSchema.parse(options);
    
    // In a real application, this would use a service like Resend, SendGrid, or AWS SES
    // For this enterprise codebase, we'll log the email to the console to simulate sending
    // and potentially could log to a database table for audit purposes.
    
    if (process.env.NODE_ENV === "development") {
      console.log(`
        --- [MOCK EMAIL SENT] ---
        From: ${validatedOptions.from || "system@crispy-fishstick.com"}
        To: ${validatedOptions.to.replace(/(?<=^.{3}).*@/, "***@")}
        Subject: ${validatedOptions.subject}
        
        ${validatedOptions.html.replace(/<[^>]*>?/gm, '')} // Strip HTML for console log readability
        -------------------------
      `);
    } else {
       console.log(`[Email Sent] To: ${validatedOptions.to.replace(/(?<=^.{3}).*@/, "***@")}, Subject: ${validatedOptions.subject}`);
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}
