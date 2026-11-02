const ITEMS = [
  {
    title: "Prices are illustrative",
    body: "Every quote, candle, range, and percentage on this site is generated in the browser from a fixed seed. None of it comes from a market feed, and none of it should be traded on.",
  },
  {
    title: "Chat stays in this tab",
    body: "Threads, participants, and their replies are written into the build. Anything you send is simulated locally and is never transmitted or stored.",
  },
  {
    title: "Company details are provisional",
    body: "Registered name, address, and contact route are placeholders until official information is supplied. Nothing here is a service offer.",
  },
];

export function DisclaimerPanel() {
  return (
    <section
      id="disclaimer"
      aria-labelledby="disclaimer-title"
      className="scroll-mt-24 pt-14 sm:pt-16"
    >
      <div className="border-t border-line pt-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <h2
            id="disclaimer-title"
            className="font-display text-base font-semibold text-mist-100"
          >
            Where this stands
          </h2>
          <p className="label-mono">Read before trading</p>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-3 sm:gap-8">
          {ITEMS.map((item) => (
            <div key={item.title}>
              <h3 className="text-[0.85rem] font-semibold text-mist-200">
                {item.title}
              </h3>
              <p className="mt-2 text-[0.82rem] leading-relaxed text-mist-400">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-3xl border-t border-line pt-5 text-[0.72rem] leading-relaxed text-mist-500">
          Trading foreign exchange on margin carries a high level of risk and may
          not be suitable for every investor. You could lose more than you
          deposit. Super Trading does not provide financial advice.
        </p>
      </div>
    </section>
  );
}
