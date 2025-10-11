---
title: "Why I Built pporeddy.com"
description: "Turning quiet reflections on IAM, AI, and systems thinking into a public logbook."
pubDatetime: 2025-10-09
updatedDatetime: 2025-10-09
tags: ["identity", "security", "ai", "reflection"]
draft: false
featured: true
---

## Welcome! 👋

For most of my career, my writing has lived inside architecture decks, design docs, and long Slack threads.

This space is different — it's where I can slow down and think out loud about what I've been building, breaking, and learning.

I work at the intersection of security, governance, and systems thinking — but I'm just as interested in the economics, incentives, and human behavior that shape how things actually work.

These are problems that rarely have clean answers. They evolve with people, incentives, and context.

## Why This Blog?

**pporeddy.com** is my way of capturing that evolution in public — not polished, but intentional.

After years of writing in private docs, I realized the best conversations happen when you share works-in-progress, not just finished solutions.

I wanted a place to:

1. **Own my content** - Not tied to any platform's algorithm
2. **Go deeper** - Share longer-form technical content with context
3. **Archive my thinking** - Document my journey and learning
4. **Think out loud** - About design trade-offs, governance friction, and lessons from working with complex systems

## What to Expect

Sometimes you'll find code snippets and experiments like:
```python
def translate_role_name(role_name: str) -> str:
    """
    What your role names actually mean
    """
    translations = {
        "PowerUser": "Admin but we're scared to call it that",
        "SuperUser": "Admin but the CEO has it so we can't remove it",
        "TemporaryAccess": "Permanent access we forgot to revoke in 2019",
        "ReadOnly": "ReadWrite but compliance doesn't audit closely",
        "Developer": "Root access with extra steps",
        "Contractor": "Full admin because onboarding is hard",
        "ServiceAccount_Prod": "We have no idea what this does but we're afraid to touch it",
        "Legacy_Migration": "Created during a migration in 2014, still here, still granting access"
    }
    
    return translations.get(role_name, "A role someone created at 2am and never documented")
```

Other times, it'll just be quiet notes about design trade-offs, governance friction, or lessons from working with complex systems.

### Topics I’ll write about
- **Identity Security** — IAM patterns, access governance, and the politics of permissions  
- **AI Governance** — How to govern AI systems without killing innovation  
- **Cybersecurity** — Broader lessons from the security trenches  
- **Personal Finance** — Because financial security matters too  
- **Code & Experiments** — Python snippets, tools, and patterns from the field  

If there's one through-line, it's this:  
**Identity isn't about access — it's about accountability, context, and trust.**

Or as I like to say:  
> *I think, therefore IAM.*
