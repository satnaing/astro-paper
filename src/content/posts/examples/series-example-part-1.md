---
title: "Series Example: Grouping Related Posts, Part 1"
author: Sat Naing
pubDatetime: 2026-09-01T00:00:00Z
featured: false
draft: false
tags:
  - docs
description: "EXAMPLE POST: The first post in a demo series, showing the series frontmatter fields (series, seriesTitle, seriesOrder, seriesDescription)."
series: series-example
seriesTitle: "Series Example: Grouping Related Posts"
seriesOrder: 1
seriesDescription: "A two-part demo of the series feature — set series/seriesTitle/seriesOrder on each post to group them under one series page, with a badge and table of contents on every post in the group."
---

This is an EXAMPLE POST demonstrating AstroPaper's series feature.

Add these fields to any post's frontmatter to place it in a series:

- `series`: a URL slug shared by every post in the group, e.g. `series-example`
- `seriesTitle`: the display name shown on the badge, table of contents, and series page
- `seriesOrder`: this post's 1-indexed position within the series
- `seriesDescription` (optional): a summary for the series' listing page — set it once, typically on the first post
- `seriesComplete` (optional): set to `true` on the final post once the series is finished

Once at least one post declares a series, it appears at `/series/`, and every post in it gets a badge under the title (linking back to the series page) plus a full table of contents near the bottom, linking to every part.

Continue to [part 2](/posts/examples/series-example-part-2/) to see the second post in this series.
