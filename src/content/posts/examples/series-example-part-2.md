---
title: "Series Example: Grouping Related Posts, Part 2"
author: Sat Naing
pubDatetime: 2026-09-02T00:00:00Z
featured: false
draft: false
tags:
  - docs
description: "EXAMPLE POST: The second and final post in a demo series, showing seriesComplete and the series table of contents."
series: series-example
seriesTitle: "Series Example: Grouping Related Posts"
seriesOrder: 2
seriesComplete: true
---

This is the second EXAMPLE POST in the demo series started in [part 1](/posts/examples/series-example-part-1/).

Notice two things this post adds:

- It omits `seriesDescription` — that's only needed once, on the post that should own the series page's summary (part 1, in this case).
- It sets `seriesComplete: true`, since this is the last part. That marks the whole series `[Complete]` on the `/series/` listing page — it doesn't matter which post in the series carries the flag, only that one of them does.

Scroll to the bottom of this post to see the series table of contents, generated from every post sharing the `series-example` slug.
