import type { Conversation } from "@/types/chat";

/**
 * Seed threads for the chat route. Participants and messages are invented;
 * the `replies` pools drive the simulated responses in `useChatSession`.
 */
export const conversations: Conversation[] = [
  {
    id: "ava-lindqvist",
    name: "Ava Lindqvist",
    initials: "AL",
    avatarTone: 0,
    role: "Prop desk · Stockholm",
    unread: 3,
    replies: [
      "Looking now — the 1.0830 shelf is holding so far.",
      "Agreed. Nothing to do until we close an hour above the cap.",
      "I'll re-check mine after the London fix.",
      "Keep the markers where they are. The level has not broken.",
    ],
    messages: [
      {
        id: "ava-1",
        author: "them",
        body: "Morning. Did you catch EUR/USD coming off the 1.0830 shelf in the early session?",
        time: "07:58",
      },
      {
        id: "ava-2",
        author: "me",
        body: "Caught it. I left the range markers alone — the 1.0880 cap is still holding.",
        time: "08:04",
      },
      {
        id: "ava-3",
        author: "them",
        body: "Same. I'm not adding anything until we close an hour above it.",
        time: "08:06",
      },
      {
        id: "ava-4",
        author: "them",
        body: "One more thing: the gold spread widened again at the open. Nobody should read that as liquidity.",
        time: "09:12",
      },
      {
        id: "ava-5",
        author: "me",
        body: "Noted. I'll leave XAU out of the morning summary until it tightens back.",
        time: "09:20",
      },
      {
        id: "ava-6",
        author: "them",
        body: "Good call. Talk after the New York crossover.",
        time: "09:21",
      },
    ],
  },
  {
    id: "marcus-osei",
    name: "Marcus Osei",
    initials: "MO",
    avatarTone: 1,
    role: "Retail trader · Accra",
    unread: 0,
    replies: [
      "That helps, thanks.",
      "Right — so the change and the range come from the same window?",
      "Appreciate the quick answer.",
      "Good to know. I'll keep reading the tape that way.",
    ],
    messages: [
      {
        id: "marcus-1",
        author: "them",
        body: "Quick one — the bar under each pair, is that the high and low for the session or for the last 24 hours?",
        time: "10:02",
      },
      {
        id: "marcus-2",
        author: "me",
        body: "Rolling 24 hours, taken from the hourly candles, so it lines up with the change beside it.",
        time: "10:09",
      },
      {
        id: "marcus-3",
        author: "them",
        body: "Understood. And the marker inside the bar is the last price?",
        time: "10:11",
      },
      {
        id: "marcus-4",
        author: "me",
        body: "That's right. Where it sits tells you how much of the range has already been used.",
        time: "10:18",
      },
    ],
  },
  {
    id: "priya-raman",
    name: "Priya Raman",
    initials: "PR",
    avatarTone: 2,
    role: "Quant research · Bengaluru",
    unread: 1,
    replies: [
      "That matches what I get from the hourly series.",
      "Then the daily open should equal the first hourly open of the day.",
      "Happy to write the convention down so nobody re-derives it.",
      "Agreed. Aggregation is the part worth documenting.",
    ],
    messages: [
      {
        id: "priya-1",
        author: "them",
        body: "How is the 4H series aggregated? Open from the first hourly candle, close from the last?",
        time: "11:24",
      },
      {
        id: "priya-2",
        author: "me",
        body: "Yes. The high and low come from the whole window, not just the endpoints.",
        time: "11:31",
      },
      {
        id: "priya-3",
        author: "them",
        body: "Clean. And the daily series reuses the same rule?",
        time: "11:33",
      },
      {
        id: "priya-4",
        author: "me",
        body: "Identical rule all the way up, so a value cannot disagree with itself across timeframes.",
        time: "11:40",
      },
    ],
  },
  {
    id: "tomas-ferreira",
    name: "Tomás Ferreira",
    initials: "TF",
    avatarTone: 3,
    role: "Client support · Lisbon",
    unread: 0,
    replies: [
      "Understood — I'll use that wording.",
      "Thanks, I've updated the saved reply.",
      "Will do. Anything else I should pass on?",
      "Got it.",
    ],
    messages: [
      {
        id: "tomas-1",
        author: "them",
        body: "A visitor asked whether the spread column is fixed or live. What should I tell them?",
        time: "12:06",
      },
      {
        id: "tomas-2",
        author: "me",
        body: "Tell them plainly: the spread shown is typical for the pair, and it widens around news and at the open.",
        time: "12:12",
      },
      {
        id: "tomas-3",
        author: "them",
        body: "Clear. I'll also point them to the risk note before they read anything else.",
        time: "12:14",
      },
    ],
  },
  {
    id: "hannah-cole",
    name: "Hannah Cole",
    initials: "HC",
    avatarTone: 4,
    role: "Risk analyst · Toronto",
    unread: 2,
    replies: [
      "That's the answer I needed — thanks.",
      "Good. Consistency between the two numbers matters more than precision here.",
      "Agreed. I'd keep the note next to the chart.",
      "Noted, I'll add it to the review notes.",
    ],
    messages: [
      {
        id: "hannah-1",
        author: "them",
        body: "One thing on the tape: the percentage change is measured from the first candle of the window, not the previous close?",
        time: "13:15",
      },
      {
        id: "hannah-2",
        author: "me",
        body: "From the previous close at the start of the window, and the range uses the same 24 candles so the two never disagree.",
        time: "13:22",
      },
      {
        id: "hannah-3",
        author: "them",
        body: "Good. Two numbers that contradict each other is how people lose trust in a screen.",
        time: "13:25",
      },
      {
        id: "hannah-4",
        author: "them",
        body: "Also, the footer note reads well. No promises about returns anywhere.",
        time: "13:26",
      },
    ],
  },
  {
    id: "yusuf-karim",
    name: "Yusuf Karim",
    initials: "YK",
    avatarTone: 5,
    role: "Community · Dubai",
    unread: 0,
    replies: [
      "Makes sense. I'll hold off on promising anything.",
      "Fair. Better to ask a question than assume an answer.",
      "Thanks — I'll relay that to the group.",
      "Understood.",
    ],
    messages: [
      {
        id: "yusuf-1",
        author: "them",
        body: "Half the group thinks a green candle here is a signal. Can I tell them otherwise?",
        time: "14:03",
      },
      {
        id: "yusuf-2",
        author: "me",
        body: "Please do. A candle shows where price went, not where it will go, and we never call a direction.",
        time: "14:11",
      },
      {
        id: "yusuf-3",
        author: "them",
        body: "That's the line I needed. I'll keep the wording neutral.",
        time: "14:13",
      },
    ],
  },
];
