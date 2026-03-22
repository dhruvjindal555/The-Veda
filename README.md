# The Veda — Indian Mythology Chatbot

A purpose-built chatbot trained on the knowledge of Indian mythology,
Vedic philosophy, and the great epics.

Live demo: [https://the-veda.vercel.app](https://the-veda.vercel.app/)

---

## What I built

The Veda is a scholarly chatbot that lets users explore Indian mythology
as a living philosophical tradition — not just a collection of stories.
The bot is trained on a deep knowledge base covering the four Vedas,
the Upanishads, the Mahabharata, the Bhagavad Gita, the Ramayana, the
Trimurti, the Dashavatara, the 18 Mahapuranas, Hindu cosmology, and the
six schools of Vedantic philosophy.

The persona is "The Rishi" — a Vedic seer who responds in flowing,
scholarly prose, always grounding answers in philosophical and symbolic
context, not just narrative.

---

## Why Indian mythology

Indian mythology is one of the richest and most philosophically dense
knowledge traditions in the world — but most people's exposure to it is
surface-level. I wanted to build something that treats it seriously as
a subject of learning, not trivia. The depth of the knowledge base and
the scholarly tone of the bot are deliberate — this should feel like
talking to someone who has actually read the texts.

---

## Technical decisions

**Stack**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Gemini 2.5 Flash (main responses)
- Gemini 2.0 Flash (follow-up question generation — faster model)

**Architecture**
- `src/types/` — shared TypeScript types
- `src/hooks/` — useChatHistory hook (localStorage persistence)
- `src/lib/` — suggestions, polish options, constants
- `src/components/chat/` — Sidebar, ChatMessages, ChatInput,
  FollowUpSuggestions, PromptPolisher
- `src/app/api/chat/` — API route handling both chat and follow-up modes

**Key product decisions**
- Two separate Gemini calls per turn — one for the main response,
  one for generating contextual follow-up questions. The follow-up
  call uses the faster 2.0 Flash model so it doesn't block the UI.
- Chat history persisted in localStorage — full session history
  survives page refresh, no database needed.
- Prompt polisher — four refinement options (elaborate, simplify,
  philosophical, story) that transform the last sent message and
  resend it.
- Error handling — all Gemini API errors (429 rate limit, 403 bad key,
  503 overload, safety blocks) are caught and shown as clean,
  human-readable messages.

**Design**
- Swiss design principles — strict grid, disciplined typography,
  generous whitespace, minimal color
- EB Garamond for all body text — chosen deliberately for its
  editorial, ancient-manuscript quality
- Color palette: deep crimson sidebar, saffron accents, parchment
  backgrounds — warm, sacred, temple-like without being decorative
- Landing page: single large heading, one CTA, nothing else

---

## Running locally

1. Clone the repo
2. Install dependencies — `npm install`
3. Create `.env.local` with your Gemini API key:
   `GEMINI_API_KEY=your_key_here`
4. Run — `npm run dev`
5. Open `http://localhost:3000`

Get a free Gemini API key at https://aistudio.google.com
