---
title: "About"
description: "Who I am, why I built this site, and what I’m exploring next."
layout: "@/layouts/Layout.astro"
---

# About

Hi, I’m **Prithvi Poreddy** — I work at the intersection of **Identity, Access, and AI systems**.

For most of my career, my writing has lived inside architecture decks, design docs, and long Slack threads.  
This space is different — it’s where I can slow down and think out loud about what I’ve been building, breaking, and learning.

If you’ve followed my posts on LinkedIn, you know I spend a lot of time in the intersection of **Identity & Access Management (IAM)**, **governance systems**, and increasingly, **AI-driven automation**.  
These are the kinds of problems that rarely have clean answers — they evolve with people, incentives, and context.

**pporeddy.com** is my way of capturing that evolution in public — not polished, but intentional.

After years of writing in private docs, I realized the best conversations happen when you share works-in-progress, not just finished solutions.

I wanted a place to:

1. **Own my content** — not tied to any platform’s algorithm  
2. **Go deeper** — share longer-form technical content with context  
3. **Archive my thinking** — document my journey and lessons  
4. **Think out loud** — about design trade-offs, governance friction, and human-centered security systems  

---

Sometimes you’ll find code snippets and experiments like:

```python
def translate_role_name(role_name: str) -> str:
    """What your role names actually mean."""
    translations = {
        "PowerUser": "Admin but we're scared to call it that",
        "SuperUser": "Admin but the CEO has it so we can't remove it",
        "TemporaryAccess": "Permanent access we forgot to revoke in 2019",
        "ReadOnly": "ReadWrite but compliance doesn't audit closely",
        "Developer": "Root access with extra steps",
        "Contractor": "Full admin because onboarding is hard",
        "ServiceAccount_Prod": "We have no idea what this does but we're afraid to touch it",
        "Legacy_Migration": "Created during a migration in 2014, still here, still granting access",
    }
    return translations.get(role_name, "A role someone created at 2am and never documented")
```

Other times, it’ll just be quiet notes about design trade-offs, governance friction, or lessons from working with complex systems.

---

### Topics I’ll write about

- **Identity Security** — IAM patterns, access governance, and the politics of permissions  
- **AI Governance** — How to govern AI systems without killing innovation  
- **Cybersecurity** — Broader lessons from the security trenches  
- **Personal Finance** — Because financial security matters too  
- **Code & Experiments** — Python snippets, tools, and patterns from the field  

---

If there’s one through-line, it’s this:  
**Identity isn’t about access — it’s about accountability, context, and trust.**

> *I think, therefore IAM.*
