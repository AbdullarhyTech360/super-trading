/**
 * Contact form model and validation.
 *
 * Validation lives here (not inside the component) so the future FastAPI
 * endpoint can share the same rules conceptually and so it is unit-testable.
 */

export interface ContactValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactField = keyof ContactValues;

export type ContactErrors = Partial<Record<ContactField, string>>;

export const CONTACT_SUBJECTS = [
  "General enquiry",
  "Platform and features",
  "Market data access",
  "Partnership",
  "Technical support",
] as const;

export const MESSAGE_MIN_LENGTH = 20;
export const MESSAGE_MAX_LENGTH = 1000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export const emptyContactValues: ContactValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length < 2) {
    errors.name = "Your name needs at least 2 characters.";
  } else if (name.length > 80) {
    errors.name = "Please keep your name under 80 characters.";
  }

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid address, for example you@company.com.";
  }

  if (!values.subject) {
    errors.subject = "Choose a topic so we can route your message.";
  }

  if (!message) {
    errors.message = "Please add a message.";
  } else if (message.length < MESSAGE_MIN_LENGTH) {
    errors.message = `Add a little more detail (at least ${MESSAGE_MIN_LENGTH} characters).`;
  } else if (message.length > MESSAGE_MAX_LENGTH) {
    errors.message = `Please keep the message under ${MESSAGE_MAX_LENGTH} characters.`;
  }

  return errors;
}

export function hasErrors(errors: ContactErrors): boolean {
  return Object.keys(errors).length > 0;
}
