export type Category =
  | 'time'
  | 'procrastination'
  | 'tired'
  | 'motivation'
  | 'difficulty'
  | 'fear'
  | 'external'
  | 'health'
  | 'affirmative'
  | 'greeting'
  | 'help'
  | 'generic'

interface Pattern {
  category: Category
  regex: RegExp
}

// Order matters: more specific categories are checked first.
const PATTERNS: Pattern[] = [
  { category: 'greeting', regex: /^\s*(hi|hey|hello|yo|sup|hiya)\b/i },
  { category: 'help', regex: /\b(help|what can you do|how does this work|instructions)\b/i },
  {
    category: 'affirmative',
    regex:
      /^\s*(ok(ay)?|fine|alright|you'?re right|fair( enough)?|i('| a)?ll do it|i('m| am) doing it|done|got it|sure|yeah( okay)?)\s*[.!]*\s*$/i,
  },
  {
    category: 'health',
    regex: /\b(sick|ill|headache|migraine|fever|not feeling well|throwing up|injured|hurt)\b/i,
  },
  {
    category: 'fear',
    regex:
      /\b(scared|afraid|anxious|nervous|what if i fail|not ready|not good enough|imposter|too perfect|has to be perfect|might mess up|might fail|worried)\b/i,
  },
  {
    category: 'tired',
    regex: /\b(tired|exhausted|no energy|sleepy|worn out|drained|burnt? out)\b/i,
  },
  {
    category: 'motivation',
    regex:
      /\b(not in the mood|don'?t feel like|no motivation|unmotivated|don'?t want to|can'?t be bothered|meh|lazy)\b/i,
  },
  {
    category: 'difficulty',
    regex:
      /\b(too hard|too difficult|complicated|don'?t know how|confusing|no idea where to start|overwhelming|overwhelmed)\b/i,
  },
  {
    category: 'external',
    regex:
      /\b(because of (him|her|them|my|the)|it'?s not my fault|they made me|someone else|my (boss|partner|kids|family|roommate))\b/i,
  },
  {
    category: 'procrastination',
    regex:
      /\b(tomorrow|later|next week|eventually|someday|soon|not now|another time|when i have time|when i'?m ready)\b/i,
  },
  {
    category: 'time',
    regex:
      /\b(no time|not enough time|too busy|so busy|swamped|slammed|don'?t have time|running out of time)\b/i,
  },
]

const RESPONSES: Record<Category, string[]> = {
  greeting: [
    "Hey. I'm Buster — I'm here to catch your excuses and hand them back to you. What have you been putting off?",
    "Hi there. Tell me the thing you've been avoiding. I promise I won't let you off easy.",
    "Welcome. Drop your best excuse on me — I've heard them all, and I'm still not buying it.",
  ],
  help: [
    "Simple: tell me what you're avoiding and why. I'll poke holes in the 'why', then push you toward one small next step. When you commit, say something like \"I'll do it by 6pm\" and I'll log it. Come back and mark it done for a win.",
  ],
  affirmative: [
    "That's what I like to hear. Go do the thing — I'll be right here when you're back.",
    "Good. Don't overthink it, just start. Report back when it's done.",
    "That's the move. Momentum beats motivation every time — go.",
  ],
  health: [
    "Okay, that one's real — rest counts as productive when you're actually unwell. But be honest with yourself: is this today's reason, or is it becoming every day's reason?",
    "Fair. Take care of yourself first. Just don't let a real reason quietly turn into a permanent one — what's the smallest check-in you can do once you're up for it?",
  ],
  fear: [
    "So the real excuse isn't time or energy — it's fear of doing it badly. Good news: badly is allowed. Perfect was never the bar, done is.",
    "Ah, the fear of getting it wrong. It's not going to feel ready. Nothing ever does. Do the worst possible version of it first — you can fix it later.",
    "You're not stuck, you're scared. That's normal. The fix isn't confidence, it's action — confidence shows up after you start, not before.",
  ],
  tired: [
    "Tired is real, but tired usually means 'I don't want to,' not 'I physically cannot.' Give me 5 minutes of effort — you can quit after that if it's still bad.",
    "Everyone's tired. The people who ship things anyway are tired too — they just moved first and rested after.",
    "You don't need full energy to start, you need a tiny amount to begin. Momentum will loan you the rest.",
  ],
  motivation: [
    "Motivation isn't coming — it never does before you start. Action creates motivation, not the other way around. Start ugly, feel motivated in 5 minutes.",
    "You're waiting to *feel* like it. That feeling shows up after the first two minutes of work, not before. So do the first two minutes.",
    "'Don't feel like it' is true for basically everyone, basically every day. Do it anyway — that's the whole skill.",
  ],
  difficulty: [
    "It feels complicated because you're trying to do the whole thing in your head at once. Shrink it: what's step one, the tiny boring first move?",
    "You don't need to know how to do the whole thing — you need to know the next 10 minutes of it. What's that one step?",
    "Confusing usually means 'I haven't started yet.' Clarity comes from doing, not from more thinking. Take one small swing at it.",
  ],
  external: [
    "Maybe other people are a factor — but the part that's still yours is what you do in the next hour. What's the one piece only you control?",
    "I hear you, other people are messy. But this excuse hands your whole day to someone else. Take back 10 minutes of it — what can you move on your own?",
  ],
  procrastination: [
    "'Later' is where good intentions go to die. What's stopping you from doing 5 minutes of it right now, this exact minute?",
    "Tomorrow-you has the same excuses as today-you, just with less time left. Start now, even small.",
    "Someday isn't on the calendar. Pick an actual time today — not 'later,' an actual time — and tell me what it is.",
  ],
  time: [
    "Busy is the easiest excuse there is because it's almost always true and almost never the real reason. Everyone's busy — the difference is what people protect 5 minutes for. Can you protect 5 minutes?",
    "You don't need more time, you need less scope. What's a 5-minute version of this you could do before your next meeting?",
    "Time didn't disappear — it went to something you decided mattered more. Fair enough. Does this matter enough for 10 minutes today?",
  ],
  generic: [
    "That's an excuse, and we both know it. What's the real reason underneath it?",
    "I'm not going to let that one slide. What's one small thing you could do about this in the next 10 minutes?",
    "Noted — and busted. Give me one tiny, concrete step you'll take today.",
    "Sounds like a story you're telling yourself. What would doing it scared/tired/unready look like, right now, small?",
  ],
}

const FOLLOWUPS: Partial<Record<Category, string[]>> = {
  time: [
    'What time today can you protect, even 5 minutes, for this?',
    "Name the smallest version of this you could finish before tonight.",
  ],
  procrastination: ['Give me an exact time today — not "later."', 'What can you do in the next 10 minutes, right now?'],
  tired: ['What is the smallest possible version of this — 5 minutes, no more?'],
  motivation: ['What is the two-minute starter move here?'],
  difficulty: ['What is step one — the boring, tiny, obvious first move?'],
  fear: ['What would the worst-but-finished version of this look like?'],
  external: ['What is the one piece of this that is fully in your control?'],
  generic: ['What is one small, concrete step you will take today?'],
}

const recentByCategory = new Map<Category, string>()

function pick(list: string[], avoid?: string): string {
  const pool = avoid && list.length > 1 ? list.filter((l) => l !== avoid) : list
  return pool[Math.floor(Math.random() * pool.length)]
}

export function detectCategory(text: string): Category {
  for (const { category, regex } of PATTERNS) {
    if (regex.test(text)) return category
  }
  return 'generic'
}

export interface BustResult {
  category: Category
  reply: string
  followUp?: string
}

export function bustExcuse(text: string): BustResult {
  const category = detectCategory(text)
  const pool = RESPONSES[category]
  const last = recentByCategory.get(category)
  const reply = pick(pool, last)
  recentByCategory.set(category, reply)

  const followUpPool = FOLLOWUPS[category]
  const followUp = followUpPool && category !== 'greeting' && category !== 'help' && category !== 'affirmative'
    ? pick(followUpPool)
    : undefined

  return { category, reply, followUp }
}

const COMMITMENT_REGEX =
  /\b(i('| wi)?ll|i am going to|i'?m gonna|i promise( to)?|i will)\b\s+(.+)/i

export interface ParsedCommitment {
  task: string
  when?: string
}

const WHEN_REGEX =
  /\b((by|at) \d{1,2}(:\d{2})?\s?(am|pm)?|(by|at) (tonight|noon|midnight|end of day|eod)|in \d+ (minutes?|mins?|hours?|hrs?)|tonight|tomorrow( morning| afternoon| night)?|this (morning|afternoon|evening)|today|right now|now)\b/i

export function tryParseCommitment(text: string): ParsedCommitment | null {
  const match = text.match(COMMITMENT_REGEX)
  if (!match) return null
  const rest = match[match.length - 1].trim()
  if (!rest || rest.length < 2) return null
  const whenMatch = rest.match(WHEN_REGEX)
  return {
    task: rest,
    when: whenMatch ? whenMatch[0] : undefined,
  }
}
