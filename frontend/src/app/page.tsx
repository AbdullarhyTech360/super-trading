import { CtaBand } from "@/components/home/CtaBand";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { Hero } from "@/components/home/Hero";
import { MarketOverview } from "@/components/home/MarketOverview";
import { PriceChart } from "@/components/home/PriceChart";
import { PriceTicker } from "@/components/home/PriceTicker";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredPair, marketPairs } from "@/data/market-data";

export default function HomePage() {
  return (
    <>
      <Hero pairs={marketPairs} />
      <PriceTicker pairs={marketPairs} />
      <MarketOverview pairs={marketPairs} />

      <section
        id="chart"
        aria-labelledby="chart-title"
        className="shell scroll-mt-24 pt-20 sm:pt-24"
      >
        <SectionHeading
          id="chart-title"
          eyebrow="02 — Chart workspace"
          title="Candlesticks with the detail in reach"
          description="Switch pairs and timeframes, then hover or tap any candle to read its open, high, low and close. The series runs on a fixed seed, so it is stable between visits."
          action={<span className="label-mono">Simulated series</span>}
        />

        <div className="mt-8">
          <PriceChart pairs={marketPairs} defaultPairId={featuredPair.id} />
        </div>
      </section>

      <FeatureGrid />
      <CtaBand />
    </>
  );
}
