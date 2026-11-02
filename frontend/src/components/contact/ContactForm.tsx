"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, CheckCircle, Send } from "@/components/ui/Icons";
import {
  CONTACT_SUBJECTS,
  emptyContactValues,
  hasErrors,
  MESSAGE_MAX_LENGTH,
  MESSAGE_MIN_LENGTH,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactValues,
} from "@/lib/contact";

type SubmitState = "idle" | "submitting" | "success";

const FIELD_ORDER: ContactField[] = ["name", "email", "subject", "message"];

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p id={id} className="field-error">
      <AlertCircle className="mt-0.5 h-3 w-3" />
      {message}
    </p>
  );
}

export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(emptyContactValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<SubmitState>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "success") successHeadingRef.current?.focus();
  }, [status]);

  const update = (field: ContactField, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => {
      if (!previous[field]) return previous;
      const next = { ...previous };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateContact(values);
    if (hasErrors(nextErrors)) {
      setErrors(nextErrors);
      const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
      if (firstInvalid) {
        formRef.current
          ?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
          ?.focus();
      }
      return;
    }

    setErrors({});
    setStatus("submitting");
    // Simulated delivery. The FastAPI endpoint will replace this in phase 7.
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus("success");
  };

  const resetForm = () => {
    setValues(emptyContactValues);
    setErrors({});
    setStatus("idle");
  };

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="panel border-signal-600/40 bg-signal-950/30 p-6 sm:p-7"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-signal-600/40 bg-signal-500/10">
          <CheckCircle className="h-5 w-5 text-signal-300" />
        </span>
        <h2
          ref={successHeadingRef}
          tabIndex={-1}
          className="mt-4 text-lg font-semibold text-mist-100 outline-none"
        >
          Message accepted
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-mist-400">
          Thanks, {values.name.trim()}. Your message under{" "}
          <span className="text-mist-200">“{values.subject}”</span> passed
          validation and the form returned this state.
        </p>

        <div className="mt-4 rounded-[2px] border border-signal-600/25 bg-terminal-950/40 px-4 py-3">
          <p className="font-mono text-[0.62rem] tracking-[0.18em] text-signal-300 uppercase">
            Not delivered
          </p>
          <p className="mt-1.5 text-[0.8rem] leading-relaxed text-mist-400">
            Nothing was emailed, queued, or stored. Email delivery arrives with
            the backend integration in phase 7.
          </p>
        </div>

        <button
          type="button"
          onClick={resetForm}
          className="btn btn-outline mt-5"
        >
          Send another message
        </button>
      </div>
    );
  }

  const isSubmitting = status === "submitting";
  const messageCount = values.message.trim().length;
  const messageOver = messageCount > MESSAGE_MAX_LENGTH;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="panel p-6 sm:p-7"
      aria-busy={isSubmitting}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-mist-100">
            Send an enquiry
          </h2>
          <p className="mt-1.5 text-xs text-mist-500">
            Fields marked with an asterisk are required.
          </p>
        </div>
        <span className="label-mono">Validated in browser</span>
      </div>

      {hasErrors(errors) ? (
        <div
          role="alert"
          className="mt-5 flex items-start gap-2.5 rounded-[2px] border border-loss-500/40 bg-loss-950/40 px-3.5 py-3"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 text-loss-300" />
          <p className="text-xs leading-relaxed text-loss-300">
            Please fix the highlighted fields and send again.
          </p>
        </div>
      ) : null}

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="field-label">
            Name <span className="text-signal-400">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-required="true"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            placeholder="Alex Morgan"
            className={["input", errors.name ? "input-invalid" : ""].join(" ")}
          />
          <FieldError id="contact-name-error" message={errors.name} />
        </div>

        <div>
          <label htmlFor="contact-email" className="field-label">
            Email <span className="text-signal-400">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            aria-required="true"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            placeholder="you@company.com"
            className={["input", errors.email ? "input-invalid" : ""].join(" ")}
          />
          <FieldError id="contact-email-error" message={errors.email} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-subject" className="field-label">
            Subject <span className="text-signal-400">*</span>
          </label>
          <select
            id="contact-subject"
            name="subject"
            value={values.subject}
            onChange={(event) => update("subject", event.target.value)}
            aria-required="true"
            aria-invalid={errors.subject ? true : undefined}
            aria-describedby={
              errors.subject ? "contact-subject-error" : undefined
            }
            className={[
              "input appearance-none",
              errors.subject ? "input-invalid" : "",
              values.subject ? "text-mist-100" : "text-mist-600",
            ].join(" ")}
          >
            <option value="" disabled>
              Choose a topic
            </option>
            {CONTACT_SUBJECTS.map((subject) => (
              <option key={subject} value={subject} className="text-mist-100">
                {subject}
              </option>
            ))}
          </select>
          <FieldError id="contact-subject-error" message={errors.subject} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="field-label">
            Message <span className="text-signal-400">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            aria-required="true"
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={
              errors.message ? "contact-message-error" : "contact-message-hint"
            }
            placeholder="Tell us what you are looking for, what you would change, or what is missing."
            className={[
              "input resize-y",
              errors.message ? "input-invalid" : "",
            ].join(" ")}
          />
          <div className="mt-1.5 flex items-center justify-between gap-3 text-[0.68rem]">
            <span id="contact-message-hint" className="text-mist-600">
              At least {MESSAGE_MIN_LENGTH} characters.
            </span>
            <span
              className={
                messageOver
                  ? "mono-num text-loss-300"
                  : "mono-num text-mist-600"
              }
            >
              {messageCount}/{MESSAGE_MAX_LENGTH}
            </span>
          </div>
          <FieldError id="contact-message-error" message={errors.message} />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.7rem] leading-relaxed text-mist-600">
          This form validates in your browser. Nothing is transmitted or stored
          yet.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary sm:shrink-0"
        >
          {isSubmitting ? (
            <>
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-terminal-950/30 border-t-terminal-950" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <Send className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
