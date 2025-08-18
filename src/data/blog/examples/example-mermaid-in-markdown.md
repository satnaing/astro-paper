---
title: Example of Mermaid Syntax in Markdown
author: Sat Naing
pubDatetime: 2025-08-18T13:25:00+09:00
slug: example-mermaid-in-markdown
featured: false
draft: false
tags:
  - Astro
  - Mermaid
  - Markdown
description: A guide on how to embed and render diagrams using Mermaid syntax directly in your Markdown files for an Astro project. This post covers the basic setup and provides examples.
---

## Basic Usage Example

One of the best things about Mermaid is how you can create complex diagrams with just a few lines of simple text. Here’s a basic flowchart written in a Markdown file:

```mermaid
graph LR;
    A[Start] --> B(Process);
    B --> C{Decision};
    C -->|Yes| D[End];
    C -->|No| B;
```

It's important to specify the language as `mermaid` right after the three backticks (\`\`\`). If you forget to add the language identifier, the browser won't know to render the diagram. Instead, it will just display it as a plain code block, like this:

```
graph LR;
    A[Start] --> B(Process);
    B --> C{Decision};
    C -->|Yes| D[End];
    C -->|No| B;
```

By simply adding the `mermaid` language tag, you can enable diagrams\!
