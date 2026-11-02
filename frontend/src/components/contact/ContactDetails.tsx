const CHANNELS = [
  { label: "Email", value: "hello@super-trading.com" },
  { label: "Phone", value: "+00 000 000 000" },
  { label: "Office", value: "Address to be confirmed" },
  { label: "Hours", value: "Mon–Fri · 08:00–17:00 UTC" },
];

const DELIVERY_STEPS = [
  "Each field is checked as you leave it, and errors appear beside the input rather than after a page reload.",
  "Sending is simulated: your message stays in this tab and is not transmitted anywhere.",
  "When the desk's mailbox is connected, the same form will deliver for real.",
];

export function ContactDetails() {
  return (
    <div>
      <h2 className="label-mono">Contact details</h2>

      <dl className="mt-4 border-t border-line">
        {CHANNELS.map((channel) => (
          <div
            key={channel.label}
            className="flex items-baseline justify-between gap-4 border-b border-line py-3"
          >
            <dt className="font-mono text-[0.58rem] tracking-[0.18em] text-mist-600 uppercase">
              {channel.label}
            </dt>
            <dd className="text-right text-sm text-mist-200">{channel.value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 text-[0.72rem] leading-relaxed text-mist-500">
        These details are provisional. Official contact information is confirmed
        before the site goes live.
      </p>

      <div className="mt-10 border-t border-line pt-6">
        <h2 className="label-mono">What happens when you send</h2>
        <ol className="mt-4 space-y-3">
          {DELIVERY_STEPS.map((step, index) => (
            <li key={step} className="flex gap-3">
              <span className="mono-num shrink-0 font-mono text-[0.58rem] text-signal-300">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-[0.82rem] leading-relaxed text-mist-400">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
