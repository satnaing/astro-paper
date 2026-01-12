I'm in the process of importing old posts from my previous ghost blog. 
As you can imagine, it's a bit messy as I had to export all my sites using JSON and then convert it back in Markdown, so little glitches can happen. 

- List all file by file name, pick a file in alphabetic order
- then move file to src/data/blog/

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
original tags are:
Crypto In Montreal, Technologie, Repost, Crypto, Random, Startups, 
Emplois, Du Fond Des Tripes, Biographie, Consultation, Personnel, 
Musique, Deck Cassette, HiFi

If you feel it's relevant, you can create new tags as well. 

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

wait for users approval (go)

commit

then pick the next post that we should fix (loop)