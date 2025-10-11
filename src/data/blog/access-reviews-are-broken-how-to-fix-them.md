---
title: "Access Reviews Are Broken: How to Fix Them"
description: "Why access reviews fail in practice, how human behavior contributes, and how to redesign them for real governance instead of compliance checkboxes."
pubDatetime: 2025-10-11
updatedDatetime: 2025-10-11
tags: ["identity", "governance", "security", "access reviews", "design"]
draft: false
featured: false
---

# Access Reviews Are Broken. How to Fix Them.

Access reviews weren't meant to be painful, tedious, or something people dread seeing in their inbox.

The idea was simple: periodically check who has access to what, and confirm whether they still need it. Remove what's no longer necessary. Reduce risk. Keep auditors happy.

But somewhere along the way, a good security practice became an overloaded checkbox.

The result? Compliance checkbox, not governance. Reviews get bulk-approved. Entitlements pile up. And nobody really trusts the system.

So how did we get here? And how do we make it better?

---

## A Quick History of Access Reviews

Access reviews emerged from a mix of security hygiene and regulatory pressure.

In the early days of centralized directories, reviews were manually done by IT teams or system owners as part of general cleanup. But with regulations like SOX, HIPAA, and GLBA, the stakes changed.

Companies now had to prove control over access to auditors, to regulators, to investors. This gave birth to a new category: Identity Governance tools focused on access certifications.

These tools added automation, workflows, dashboards, and promised to reduce risk while staying compliant.

And they worked… at first.

But then came SaaS. Cloud. DevOps. Contractors. Federated identities. Dynamic roles. AI agents. Suddenly, the "who has access to what" problem exploded in scale — and the old review model started to break down.

---

## Why People Dread Access Reviews

Talk to anyone who's done them, and the frustrations are clear:

- Too much noise. Long lists of entitlements with cryptic names like `ROLE_FNCL_SAP_FI_VW`. No idea what they mean. No usage data. No context.
- Unclear ownership. Managers reviewing access for systems they've never used, for roles they didn't assign.
- No prioritization. Sensitive entitlements and harmless ones get treated the same.
- Disconnection from real behavior. Reviews are scheduled on a calendar, not based on actual changes or risk.
- Fear of breaking things. No one wants to be the person who removes access and breaks production. So they approve everything.
- No feedback loop. You never hear if you missed something risky or removed something stale.

Over time, people stop seeing the point. Reviews become just another task to complete, not a risk-reducing exercise.

---

## The Problem Isn't the People — It's the Design

People aren't lazy. They're responding to a system that's misaligned with how humans actually behave under pressure.

Think about it:

- When we're overwhelmed with data, we default to the path of least resistance.
- If we don't understand the consequences of an action, we avoid taking it.
- If a task feels endless, repetitive, and thankless, it gets pushed to the bottom of the to-do list.
- If the "safe" option is to approve everything and move on, that's what people will do.

This is where small design changes grounded in how people work can improve outcomes in a big way.

---

## Human-Centered Design Principles

Here are real-world ways to make access reviews easier, safer, and more effective — grounded in how people actually think and work.

### Show Less, Focus More

Nobody should have to review 200 entitlements at once. Especially not if 90% haven't changed.

But what if the system is SOX-sensitive? You still need evidence that every access was reviewed. Even for SOX systems, you can:

- **Scope intelligently:** prioritize what changed or looks risky, but surface everything for auditability.
- **Group entitlements logically** so people aren't overwhelmed.
- **Certify in stages** — ten 20-line reviews are better than one 200-line dump.
- **Add usage and peer signals** to reduce ambiguity.

SOX doesn't mandate painful UX — it mandates clear oversight.

---

### Add Simple, Actionable Context

If an access hasn't been used in 90 days, say it.
If 98% of peers don't have that role, highlight it.
If it's tied to financial export or PII, flag it clearly.

The more context you provide, the more likely people are to act.

---

### Start with Self-Review

Instead of asking managers to approve everything, start by asking users: “Do you still need this access?”

People are far more accurate when reviewing their own access — and it builds accountability.

---

## Practical Implementation

### Trigger Reviews at the Right Time

Why review quarterly if nothing changed?

Trigger reviews when a person changes departments, finishes a project, or hasn't used an access in 100 days.
That’s when reviews are most likely to catch real issues — not three months after the fact.

---

### Reframe the Deadline

“Due in 28 days” feels like something to push off.
“Please review **now**” often works better — especially when the task is short and focused.

When something feels urgent and manageable, it gets done.

---

### Make Risk Visible — and Reversal Safe

One reason people over-approve is fear: “What if I remove this and something breaks?”

You can ease that fear by:

- Showing **last use**
- Flagging **safe-to-remove** entitlements
- Offering **temporary removal** or “flag for follow-up” options

It’s not just about giving people data — it’s about giving them confidence.

---

### Show Progress, Close Loops

Ever open a giant review and wonder if you'll ever finish it?

People are more likely to complete a task when they see progress.
Add visual indicators: “6 of 8 critical items reviewed,” or “Only 2 high-risk entitlements left.”

Break up large reviews into manageable chunks.
Show how much is left. Celebrate clean completions.

---

## Measuring Success: Is This Actually Working?

But how do we know if these changes actually work?
Review completion alone isn’t enough. We need better signals.

### What to Measure

**Stale Access Removed**
- % of entitlements removed post-review
- High-risk entitlements revoked as a result of real decisions

**Decision Distribution**
- % approved vs denied vs flagged
- % with comments or justification

**Usage vs Approval**
- How many approvals were for access not used in last 90 days?
- How many stale accesses are approved cycle after cycle?

**Reviewer Behavior Trends**
- Time spent vs number of decisions
- Patterns of bulk approvals with no review

**Risk-Based Outcomes**
- SoD violations flagged or remediated?
- High-risk access removed?

**Downstream Impact**
- Post-review access violations
- Helpdesk tickets from bad removals

If everything gets approved, nothing is truly reviewed.

---

## One More Thing: Not All Access Is Equal

Not everything needs to be reviewed the same way.

Start classifying access:

- **Compliance-only systems:** lightweight reviews, auditable history
- **High-risk apps & admin roles:** detailed review, usage data, exceptions flagged
- **Common roles & widely used apps:** auto-certify based on usage, with oversight

Focus human effort where it actually reduces risk. Let automation handle the rest.

---

## Final Thought: Governance Isn't a Checkbox

Access reviews don’t have to be a compliance checkbox.

When they’re well-designed with context, timing, and focus, they can actually reduce risk, improve accountability, and build trust in the access model.

But for that to happen, we have to stop designing reviews around audit checklists alone and start designing them around how people actually work.

Because the right design doesn’t just make reviews easier.
It makes them meaningful.