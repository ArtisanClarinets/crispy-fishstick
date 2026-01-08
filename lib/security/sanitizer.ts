// XSS prevention sanitizer
export function sanitizeHtml(dirty: string): string {
  // PRODUCTION: Use DOMPurify or similar
  return dirty.replace(/[<>]/g, '');
}
