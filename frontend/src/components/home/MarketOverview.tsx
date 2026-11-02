import { PairCard } from "@/components/home/PairCard";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { Info } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DEMO_DATA_NOTICE } from "@/data/market-demo";
import type { ForexPair } from "@/types/market";

interface MarketOverviewProps {
  pairs: ForexPair[];
}

export function MarketOverview({ pairs }: MarketOverviewProps) {
  return (
    <section
      id="markets"
      aria-labelledby="markets-title"
      className="shell scroll-mt-24 pt-16 sm:pt-20"
    >
      <SectionHeading
        id="markets-title"
        eyebrow="Market overview"
        title="Six pairs, one glance"
        description="A compact snapshot of the instruments the workspace follows. Price, 24 hour range, and spread sit together so context arrives before opinion."
        action={<DemoBadge />}
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pairs.map((pair) => (
          <PairCard key={pair.id} pair={pair} />
        ))}
      </div>

      <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-mist-600">
        <Info className="mt-0.5 h-3.5 w-3.5 text-mist-600" />
        {DEMO_DATA_NOTICE}
      </p>
    </section>
  );
}
