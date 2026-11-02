import { AlertCircle, Info } from "@/components/ui/Icons";

const SIMULATED = [
  "Forex prices, candles, ranges, and percentage changes are generated locally from a fixed seed.",
  "Chat participants, message bodies, and timestamps are fictional.",
  "Contact submissions validate in the browser and are never transmitted or stored.",
];

const NOT_INCLUDED = [
  "Live or delayed market data and any licensed feed.",
  "Trading execution, brokerage integration, or payment processing.",
  "User accounts, authentication, or persistent chat history.",
  "Email delivery from the contact form.",
];

const TO_CONFIRM = [
  "Official company description, branding assets, and legal entity details.",
  "Final contact email, phone number, and office address.",
  "Whether chat is for customer support, trader-to-trader messaging, or both.",
  "Market-data provider, access restrictions, and licensing.",
  "Whether accounts are needed, plus hosting and deployment preferences.",
];

export function DisclaimerPanel() {
  return (
    <section
      id="disclaimer"
      aria-labelledby="disclaimer-title"
      className="scroll-mt-24 pt-14 sm:pt-16"
    >
      <div className="panel overflow-hidden">
        <div className="flex items-start gap-3 border-b border-line bg-signal-950/40 px-5 py-4">
          <AlertCircle className="mt-0.5 h-4 w-4 text-signal-400" />
          <div>
            <h2
              id="disclaimer-title"
              className="text-sm font-semibold text-signal-200"
            >
              This build is a demonstration
            </h2>
            <p className="mt-1 text-[0.8rem] leading-relaxed text-signal-200/75">
              Nothing here is a market feed, a service offer, or investment
              advice. Company details are placeholders until official
              information is supplied.
            </p>
          </div>
        </div>

        <div className="grid gap-6 px-5 py-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="font-mono text-[0.6rem] tracking-[0.2em] text-mist-500 uppercase">
              Simulated
            </h3>
            <ul className="mt-3 space-y-2">
              {SIMULATED.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-[0.8rem] leading-relaxed text-mist-400"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal-500/70" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[0.6rem] tracking-[0.2em] text-mist-500 uppercase">
              Not included yet
            </h3>
            <ul className="mt-3 space-y-2">
              {NOT_INCLUDED.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-[0.8rem] leading-relaxed text-mist-400"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mist-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[0.6rem] tracking-[0.2em] text-mist-500 uppercase">
              To confirm before launch
            </h3>
            <ul className="mt-3 space-y-2">
              {TO_CONFIRM.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-[0.8rem] leading-relaxed text-mist-400"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mist-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-start gap-2 border-t border-line px-5 py-4">
          <Info className="mt-0.5 h-3.5 w-3.5 text-mist-600" />
          <p className="text-[0.72rem] leading-relaxed text-mist-500">
            Trading foreign exchange carries a high level of risk and may not be
            suitable for every investor. This site does not provide financial
            advice.
          </p>
        </div>
      </div>
    </section>
  );
}
