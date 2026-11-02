import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  /** Applied to the heading so sections can use aria-labelledby. */
  id?: string;
  action?: ReactNode;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={[
        "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className="section-title mt-2.5">
          {title}
        </h2>
        {description ? (
          <p className="section-lead mt-3">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
