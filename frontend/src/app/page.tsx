import { CtaBand } from "@/components/home/CtaBand";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { Hero } from "@/components/home/Hero";
import { MarketOverview } from "@/components/home/MarketOverview";
import { PriceChart } from "@/components/home/PriceChart";
import { PriceTicker } from "@/components/home/PriceTicker";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { Info } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DEMO_DATA_NOTICE, demoPairs, featuredPair } from "@/data/market-demo";

export default function HomePage() {
  return (
    <>
      <Hero pairs={demoPairs} />
      <PriceTicker pairs={demoPairs} />
      <MarketOverview pairs={demoPairs} />

      <section
        id="chart"
        aria-labelledby="chart-title"
        className="shell scroll-mt-24 pt-16 sm:pt-20"
      >
        <SectionHeading
          id="chart-title"
          eyebrow="Chart workspace"
          title="Candlesticks with the detail in reach"
          description="Switch pairs and timeframes, then hover or tap any candle to read its open, high, low, and close. The series is generated from a fixed seed, so the chart is stable demo data — not a market feed."
          action={<DemoBadge label="Simulated candles" />}
        />

        <div className="mt-8">
          <PriceChart pairs={demoPairs} defaultPairId={featuredPair.id} />
        </div>

        <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-mist-600">
          <Info className="mt-0.5 h-3.5 w-3.5" />
          {DEMO_DATA_NOTICE}
        </p>
      </section>

      <FeatureGrid />
      <CtaBand />
    </>
  );
}
