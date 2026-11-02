import Link from "next/link";
import { Info } from "@/components/ui/Icons";

/**
 * Site-wide honesty banner. Kept above the sticky header so it scrolls away
 * while the navigation stays available.
 */
export function DemoNotice() {
  return (
    <div className="border-b border-signal-600/20 bg-signal-950/60">
      <div className="shell flex items-start gap-2 py-2 sm:items-center">
        <Info className="mt-0.5 h-3.5 w-3.5 text-signal-400 sm:mt-0" />
        <p className="text-[0.68rem] leading-relaxed text-signal-200/85 sm:text-xs">
          Demo build — market prices, chat conversations, and contact delivery
          are simulated.{" "}
          <Link
            href="/about#disclaimer"
            className="font-medium text-signal-300 underline decoration-signal-600/60 underline-offset-2 hover:text-white"
          >
            Read the disclaimer
          </Link>
        </p>
      </div>
    </div>
  );
}
