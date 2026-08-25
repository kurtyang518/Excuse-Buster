# Excuse Buster

A chat app where you tell your buddy "Buster" why you haven't done something yet, and it
calls out the excuse and pushes you toward one small next step.

## What it does

- **Chat with Buster.** Type an excuse ("I don't have time", "I'm too tired", "I'll do it
  tomorrow"...) and Buster recognizes the pattern and fires back a pointed rebuttal plus a
  follow-up question that pushes you toward a tiny, concrete next step.
- **Make it a commitment.** Say something like `I'll write the report by 5pm` and Buster logs
  it to the commitments board on the right ("on the hook") instead of just replying.
- **Track it.** Mark a commitment done to log a win and grow your streak. Stats (excuses
  busted, commitments kept, streak) live in the header.
- **Everything is local.** No account, no server, no API keys — the excuse-detection and
  chat logic run entirely in the browser, and your chat/commitments/stats persist in
  `localStorage` on your device.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

Other scripts:

```bash
npm run build    # production build to dist/
npm run preview  # preview the production build
npm run lint     # oxlint
```

## How the excuse-busting works

`src/engine/excuseEngine.ts` matches your message against a set of excuse categories (no
time, procrastination, tiredness, low motivation, "it's too hard", fear/perfectionism,
blaming external factors, health, plus greetings/help/affirmatives) and picks a rebuttal +
follow-up from a pool for that category, avoiding immediate repeats. It also detects
commitment-shaped messages ("I'll...", "I'm going to...", "I promise to...") and pulls out
a task and, if present, a time/deadline phrase ("by 5pm", "tonight", "in 20 minutes", ...).

## Tech stack

React + TypeScript + Vite, styled with Tailwind CSS v4. No backend.
