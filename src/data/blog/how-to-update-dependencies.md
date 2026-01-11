---
title: How to update dependencies
author: Pascal Andy
date_created: 2023-07-20
tags:
  - dev-notes
description: How to update project dependencies using bun and npm-check-updates.
---

Updating dependencies can be tedious, but neglecting them is not a good idea. Here's how to update dependencies efficiently using bun.

## Updating Package Dependencies

The recommended way is using [npm-check-updates](https://www.npmjs.com/package/npm-check-updates). With bun, you don't need to install it globally - just use `bunx`:

```bash
# Check all available updates
bunx npm-check-updates
```

### Update by severity

**Patch updates** (safe, bug fixes only):

```bash
bunx npm-check-updates -u --target patch
bun install
```

**Minor updates** (new features, usually safe):

```bash
bunx npm-check-updates -i --target minor
bun install
```

**Major updates** (breaking changes, be careful):

```bash
bunx npm-check-updates -i
bun install
```

For major updates, always read the release notes before updating.

### Interactive mode

Use `-i` flag to select which packages to update:

```bash
bunx npm-check-updates -i
```

If no more packages to update, you're done.
