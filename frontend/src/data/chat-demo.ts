import type { Conversation } from "@/types/chat";

/**
 * DEMO ONLY — every participant, message, and timestamp below is fictional.
 * Nothing is persisted and nothing is transmitted; sending a message only
 * updates local component state for the current page view.
 */
export const demoConversations: Conversation[] = [
  {
    id: "ava-lindqvist",
    name: "Ava Lindqvist",
    initials: "AL",
    avatarTone: 0,
    role: "Prop desk · Stockholm",
    unread: 3,
    messages: [
      {
        id: "ava-1",
        author: "them",
        body: "Morning! Did the session notes go out before the London open?",
        time: "07:58",
      },
      {
        id: "ava-2",
        author: "me",
        body: "They did. I kept the summary to the three pairs we are actually watching.",
        time: "08:04",
      },
      {
        id: "ava-3",
        author: "them",
        body: "Perfect. The EUR/USD range from yesterday is still holding, so I left my levels untouched.",
        time: "08:06",
      },
      {
        id: "ava-4",
        author: "them",
        body: "Can you add the volatility note to the shared sheet when you get a minute?",
        time: "09:12",
      },
      {
        id: "ava-5",
        author: "me",
        body: "Added it. I also flagged the gold spread so nobody assumes the same execution as FX.",
        time: "09:20",
      },
      {
        id: "ava-6",
        author: "them",
        body: "Nice catch. Talk after the New York crossover.",
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
    messages: [
      {
        id: "marcus-1",
        author: "them",
        body: "I like the new chart page. Being able to switch timeframes without reloading is a big win.",
        time: "10:02",
      },
      {
        id: "marcus-2",
        author: "me",
        body: "Glad it feels faster. It is still demo data, so the candles are generated locally.",
        time: "10:09",
      },
      {
        id: "marcus-3",
        author: "them",
        body: "Understood. Is there a plan to connect a real data provider later?",
        time: "10:11",
      },
      {
        id: "marcus-4",
        author: "me",
        body: "Yes, that is on the roadmap once licensing and access rules are confirmed.",
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
    messages: [
      {
        id: "priya-1",
        author: "them",
        body: "The candlestick component renders well on a phone — no horizontal scroll at 360px.",
        time: "11:24",
      },
      {
        id: "priya-2",
        author: "me",
        body: "That was the main layout constraint. The axis labels move outside the SVG so they stay readable.",
        time: "11:31",
      },
      {
        id: "priya-3",
        author: "them",
        body: "Smart. Do you want me to write a short note on the chart data model for the backend team?",
        time: "11:33",
      },
      {
        id: "priya-4",
        author: "me",
        body: "Please. A one-pager on candle aggregation would save them a day.",
        time: "11:40",
      },
    ],
  },
  {
    id: "tomas-ferreira",
    name: "Tomás Ferreira",
    initials: "TF",
    avatarTone: 3,
    role: "Support · Lisbon",
    unread: 0,
    messages: [
      {
        id: "tomas-1",
        author: "them",
        body: "A visitor asked whether the contact form actually sends email. What should I tell them?",
        time: "12:06",
      },
      {
        id: "tomas-2",
        author: "me",
        body: "Tell them it is simulated for now and that delivery arrives with the backend phase.",
        time: "12:12",
      },
      {
        id: "tomas-3",
        author: "them",
        body: "Clear, thanks. I will also point them to the demo notice in the header.",
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
    messages: [
      {
        id: "hannah-1",
        author: "them",
        body: "One thing on the market cards: the 24h change is calculated from hourly closes, right?",
        time: "13:15",
      },
      {
        id: "hannah-2",
        author: "me",
        body: "Correct, and the range uses the same 24 candle window so the numbers always agree.",
        time: "13:22",
      },
      {
        id: "hannah-3",
        author: "them",
        body: "Good. I would keep the demo badge visible on every surface that shows a price.",
        time: "13:25",
      },
      {
        id: "hannah-4",
        author: "them",
        body: "Also, the footer disclaimer reads well. No promises about returns anywhere.",
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
    messages: [
      {
        id: "yusuf-1",
        author: "them",
        body: "Is the chat meant to become customer support, or trader-to-trader messaging?",
        time: "14:03",
      },
      {
        id: "yusuf-2",
        author: "me",
        body: "Still open. The plan lists it as something to confirm before launch.",
        time: "14:11",
      },
      {
        id: "yusuf-3",
        author: "them",
        body: "Makes sense to keep the demo generic until that is decided.",
        time: "14:13",
      },
    ],
  },
];

export const CHAT_DEMO_NOTICE =
  "Demo chat: every conversation is fictional, messages are not transmitted, and nothing is saved after a refresh.";
