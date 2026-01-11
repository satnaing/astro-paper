---
title: "Mermaid Diagram Demo"
date_created: 2026-01-11
tags:
  - dev-notes
mermaid: true
description: "Demonstrating how to show Mermaid diagrams vs raw code"
author: Pascal Andy
---

This post demonstrates the difference between rendering Mermaid diagrams and showing the raw code.

## Raw Code (will NOT render)

Use `text` as the language identifier to show the code:

```text
graph TD
    A[Start] --> B[Process]
    B --> C{Decision}
    C -->|Yes| D[Action]
    C -->|No| E[End]
```

## Rendered Diagram (WILL render)

Use `mermaid` as the language identifier to render the diagram:

```mermaid
graph TD
    A[Start] --> B[Process]
    B --> C{Decision}
    C -->|Yes| D[Action]
    C -->|No| E[End]
```

![Mermaid diagram rendered in the browser](@/assets/images/mermaid-rendering.png)

## Another Example: Sequence Diagram

Raw code:

```text
sequenceDiagram
    Alice->>Bob: Hello Bob!
    Bob-->>Alice: Hi Alice!
```

Rendered:

```mermaid
sequenceDiagram
    Alice->>Bob: Hello Bob!
    Bob-->>Alice: Hi Alice!
```

## Summary

| Language Identifier | Result             |
| ------------------- | ------------------ |
| `mermaid`           | Renders as diagram |
| `text`              | Shows raw code     |
| `plaintext`         | Shows raw code     |
| (none)              | Shows raw code     |
