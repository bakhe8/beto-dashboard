import DOMPurify from "dompurify";

// Sanitize HTML to prevent XSS, configured to be safe for <template> elements.
export const sanitize = (html: string) => DOMPurify.sanitize(html, { SAFE_FOR_TEMPLATES: true });