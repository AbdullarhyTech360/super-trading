import { Clock, Mail, MapPin, Phone } from "@/components/ui/Icons";

const CHANNELS = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@super-trading.com",
    hint: "Placeholder address",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+00 000 000 000",
    hint: "Placeholder number",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Address to be confirmed",
    hint: "Placeholder location",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Fri · 08:00–17:00 UTC",
    hint: "Placeholder schedule",
  },
];

const DELIVERY_STEPS = [
  "Your input is validated in the browser with the same rules the API will use.",
  "In this demo the request stops there — no email is sent and nothing is stored.",
  "Once the FastAPI backend is live, the same form posts to it and delivery becomes real.",
];

export function ContactDetails() {
  return (
    <div className="space-y-4">
      <div className="panel p-6">
        <h2 className="font-mono text-[0.62rem] tracking-[0.2em] text-mist-500 uppercase">
          Contact details
        </h2>
        <ul className="mt-4 space-y-4">
          {CHANNELS.map((channel) => (
            <li key={channel.label} className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-terminal-850">
                <channel.icon className="h-4 w-4 text-signal-500" />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[0.58rem] tracking-wider text-mist-600 uppercase">
                  {channel.label}
                </p>
                <p className="mt-0.5 text-sm break-words text-mist-200">
                  {channel.value}
                </p>
                <p className="mt-0.5 font-mono text-[0.58rem] tracking-wide text-mist-600 uppercase">
                  {channel.hint}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-5 border-t border-line/70 pt-4 text-[0.72rem] leading-relaxed text-mist-500">
          These details are placeholders. Official contact information will be
          confirmed before the site goes live.
        </p>
      </div>

      <div className="rounded-xl border border-signal-600/25 bg-signal-950/30 p-6">
        <h2 className="font-mono text-[0.62rem] tracking-[0.2em] text-signal-300 uppercase">
          How submission works
        </h2>
        <ol className="mt-4 space-y-3">
          {DELIVERY_STEPS.map((step, index) => (
            <li
              key={step}
              className="flex gap-2.5 text-[0.8rem] leading-relaxed text-mist-400"
            >
              <span className="mono-num mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-signal-600/40 bg-terminal-950/60 text-[0.58rem] text-signal-300">
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
