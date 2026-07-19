# Prompts Log — Guest Review Sentiment Classifier

## AI Feature: Review Sentiment Classification

---

## Prompt Variation 1 — Simple Classification

**Prompt:** Classify this review as positive, negative, or neutral: "{review}"

**Input:** "The host was very welcoming and the food was amazing."

**Output:** positive

**Result:** Too simple — no theme or response generated.

---

## Prompt Variation 2 — Structured JSON Output

**Prompt:** Analyze this guest review and return JSON with sentiment, theme, and suggested response: "{review}"

**Input:** "Room was okay but cleanliness could be better."

**Output:** sentiment neutral, theme Cleanliness, response We appreciate your feedback!

**Result:** Better but inconsistent formatting sometimes.

---

## Prompt Variation 3 — Rule-Based Keyword Matching (Final)

**Approach:** Keyword-based sentiment and theme detection with predefined response templates.

**Input:** "Very poor experience overall. Staff was rude."

**Output:** sentiment negative, theme Food & Host, response We sincerely apologize for the experience.

**Result:** Most consistent and reliable. No API dependency, works offline, zero latency.

---

## Best Prompt Analysis

Prompt Variation 3 worked best because it gives consistent results every time without depending on external API availability or quota limits. The keyword matching for sentiment and theme is fast and predictable, which is important for a staff-facing tool where reliability matters more than nuance. The predefined response templates ensure professional tone in all suggested replies.

## System Role Used

No LLM system prompt was used in the final implementation. A rule-based Python classifier was built instead due to API quota limitations on free tier.