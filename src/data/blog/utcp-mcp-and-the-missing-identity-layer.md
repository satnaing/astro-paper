---
title: "UTCP, MCP, and the Missing Identity Layer"
description: "Why both UTCP and MCP overlook the hardest part of AI infrastructure—identity and trust."
pubDatetime: 2025-10-10
updatedDatetime: 2025-10-10
tags: ["UTCP", "MCP", "AI Agents", "Governance", "IAM", "Cybersecurity", "AI"]
draft: false
featured: false
---

*Tool calling is easy. Trust isn’t.*

Every new wave of infrastructure brings its own version of the “simpler protocol.”

With AI agents, that moment arrived fast — the Universal Tool Calling Protocol (UTCP) has started making noise as the next big thing.

Its promise sounds familiar: no wrapper servers, no middleware, no proxy hops.

Agents can “just call” APIs, CLIs, or services directly using a JSON manual.

Elegant. Minimal. Free of the heavy machinery that came with the Model Context Protocol (MCP).

If you’ve read the LinkedIn posts, you’ve seen the comparisons:

> “Will UTCP be to MCP what REST was to SOA?”

It’s a clever line — REST won by stripping away complexity. But this time, that comparison misses something fundamental.

Because what’s at stake here isn’t syntax or latency. It’s identity.

---

## MCP: A Coordination Layer Without a True Identity Model

Let’s start with MCP.

To its credit, MCP gives agents structure — a way to discover, describe, and invoke tools through a consistent interface. It adds governance, routing, and visibility. It feels mature.

But MCP doesn’t actually solve *identity* — it borrows it.

It authenticates through the same human-oriented tokens and sessions that have always existed: OAuth flows, API keys, IDE credentials. It assumes the “caller” is a person sitting behind a client, not an autonomous, evolving entity acting on its own behalf.

That’s fine for early IDE integrations and single-user workflows.

But in multi-tenant, high-throughput environments — where agents spin up, branch, and die in milliseconds — MCP’s concept of identity simply runs out of oxygen.

MCP gives coordination without provenance. It knows what an agent called, but not who that agent actually is or under what context it’s acting.

That “extra hop” many call overhead isn’t bureaucracy — it’s the **boundary**.

It’s where intent meets accountability, and where authority can still be traced, revoked, or corrected. Systems that remove that boundary don’t become freer — they just lose the ability to prove who did what.

---

## UTCP: Elegant Plumbing, but a Vacuum of Governance

UTCP arrives swinging the pendulum in the opposite direction.

It’s lighter, direct, and protocol-flexible. Instead of a broker or wrapper server, a tool simply publishes a **manual** — a JSON description of its interface, inputs, and auth model.

Agents discover it, read it, and call the tool natively. No middleware, no extra hops. And if you’re tired of standing up wrapper servers, that feels like liberation.

But every time we remove a layer that enforces order, the complexity doesn’t vanish — it migrates. The same policies, secrets, and controls still exist; they’re just scattered across tools and clients instead of anchored in one place.

It looks simpler on paper, but becomes harder to reason about in practice. UTCP assumes governance can live “elsewhere.” Secrets stay with clients. Policies live in existing IAM systems. Access control, observability, and auditing — all deferred to the edges.

That sounds neat until you realize the edges are where visibility goes to die.

Systems like Okta, Vault, or Identity security tools don’t magically adapt to non-deterministic agents. They were built for humans and stable workloads — not code that writes code, or ephemeral agents that spawn and mutate mid-session.

When every agent holds its own credentials, the trust anchor dissolves. You can’t guarantee revocation. You can’t trace accountability. You’ve replaced a “control plane” with a million tiny control fragments scattered across clients.

The irony? The “extra hop” that UTCP removes is the same place where identity, policy, and audit used to meet.

---

## The REST Analogy Misses the Point

A lot of UTCP advocates lean on the REST vs SOA story. SOA was heavy; REST was simple. REST won. Therefore, UTCP (lightweight) will replace MCP (heavy).

That’s not how it happened.

REST simplified how we called APIs, but it didn’t eliminate how we governed them.

Behind every “simple REST API” sits an API gateway, identity broker, and policy layer — AWS API Gateway, Okta, Apigee, Kong. REST didn’t remove governance. It just pushed it closer to the API, where it belonged.

Every simplification cycle follows the same arc: centralize for control, decentralize for speed, then rediscover the need for balance.

UTCP is simply the next turn of that wheel.

---

## The Real Problem: Neither MCP nor UTCP Solves Identity for Agents

This is the uncomfortable truth:

MCP centralizes control, but keeps pretending the caller is human. UTCP decentralizes control, and pretends that humans and agents can be governed the same way.

Both are built on assumptions from a world where identity is static, predictable, and slow.

But agents aren’t people. They’re dynamic, context-driven, and often non-deterministic.

They’ll fork, self-compose, or spawn specialized subagents in milliseconds — each requiring some level of authority, visibility, and containment.

Our IAM systems were built for long-lived entities — users, services, machines with names and lifecycles. Agents don’t work like that. They appear, act, and disappear before governance can catch its breath.

Both MCP and UTCP rely on identity models that assume persistence and predictability — assumptions that collapse when the actors themselves are transient.

Neither protocol answers basic security questions:

- Who issued this agent’s credentials?
- What scope of data or tools can it access?
- Can we trace or revoke its actions after it terminates?
- What happens when it spawns another agent?

We can’t solve those by rearranging network hops. We need a new kind of identity layer built for non-human actors.

---

## Trust Is the Real Design Constraint

Both MCP and UTCP are solving integration problems. The harder problem — and the one neither addresses — is trust integration.

How an agent earns, uses, and loses trust should be a first-class design question, not an afterthought. The middle layer isn’t just about routing calls or formatting payloads.

It’s where trust lives — where identities are verified, policies enforced, and actions recorded with context. Without that, you don’t get decentralization; you get diffusion.

---

## The Missing Layer: Machine-Native Identity and Context

What’s really needed is a **machine-first identity fabric** — one that can:

1. Issue and verify ephemeral, scoped credentials for agents in real time.
2. Maintain behavioral lineage — who created this agent, what context it inherited.
3. Support continuous authorization, not just login-time checks.
4. Enable instant revocation — one control point that can invalidate a rogue agent anywhere in the system.

That layer doesn’t exist yet in MCP or UTCP. And it won’t magically appear through IAM retrofits or clever JSON manuals.

Until we build it, every “direct call” is really just a leap of faith.

---

## The Pragmatic Middle Ground

The right architecture isn’t choosing one over the other — it’s aligning them correctly.

- **UTCP** can be the *wire protocol* — the clean, open standard for execution.
- **MCP** (or something like it) can remain the *coordination plane* — managing sessions, routing, and observability.
- And a new **identity layer** must emerge between them — anchoring who an agent is, what it’s allowed to do, and how that trust can be withdrawn.

The goal isn’t to flatten architecture — it’s to align it. Each layer should know what kind of trust it’s responsible for: identity, policy, or execution.

The problem with both MCP and UTCP is that they confuse speed with safety, collapsing roles that should stay distinct.

This isn’t bureaucracy. It’s how we make autonomy auditable.

---

## Closing Thoughts: Stop Mistaking Plumbing for Trust

Every generation of engineers rediscovers the same trade-off: control versus convenience.

UTCP is a clever simplification. MCP is a useful intermediary.

But neither fixes the foundation. The future of agent-tool interaction isn’t fewer layers — it’s the right layers, designed for non-human actors.

Until we have that, we’re arguing about plumbing when the real challenge is trust.
