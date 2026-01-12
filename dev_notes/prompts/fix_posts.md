I'm in the process of importing old posts from my previous ghost blog. 
As you can imagine, it's a bit messy as I had to export all my sites using JSON and then convert it back in Markdown, so little glitches can happen. 

from `./to_import/`
- List all files, find the most recent one using frontmatter `date_created`
- then move this file to: `src/data/blog/`

Fix the following issues:

### 1. BROKEN LINKS
- Extract ALL URLs (internal and external)
- Test external URLs (https://), remove broken ones (404, 500)
- Internal links: ensure /posts/ prefix for blog post links
- Image paths: /content/og-legacy/ → /og-legacy/
- Fix corrupted markdown syntax (malformed []() patterns)
- Check if internal links point to posts that exist (in src/data/blog/) or along posts that we are importing at the moment.

### 2. METADATA FIXES
- Replace description: "no_description" → generate from post content (1 sentence, SEO-friendly)
- Replace tags: - untagged → assign from approved list based on content

Make sure that the front matter follows the schema @src/data/blog/dev_notes/frontmatter-schema.md 

### 3. TAGS

**Official tags (use these exact values):**
- crypto-in-montreal
- technologie
- repost
- crypto
- random
- startups
- emplois
- du-fond-des-tripes
- biographie
- consultation
- personnel
- musique
- deck-cassette
- hifi

If you feel it's relevant, you can create new tags as well (use lowercase-kebab-case). 

### 4. DO NOT CHANGE
- Post body content (keep original text intact)
- Writing style, tone, formatting
- Valid existing links

### 5. OUTPUT FORMAT
For each post with issues, report:
- Filename
- Issues found (with line numbers)
- Proposed fixes
- Ask for confirmation before applying

then, look for obvious things that would look off. 

share with the user what you fixed in a bullet point. 

Get approval, and wait for users approval (go)
- auto-approve for:
  - descriptions imrprovements
  - basic tag typo
- for anything else weird let me know!

then
- Get approval
- commit
- then pick the next post that we should fix (loop)
- do not ask, do it