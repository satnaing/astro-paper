#!/usr/bin/env python3
# /// script
# requires-python = ">=3.11"
# dependencies = ["pyyaml"]
# ///
"""
Convert frontmatter from old Ghost/custom format to AstroPaper format.

Usage:
    uv run scripts/convert_frontmatter.py --dry-run     # Preview changes
    uv run scripts/convert_frontmatter.py               # Execute conversion

Mapping:
    OLD FORMAT                  NEW FORMAT
    ──────────────────────────────────────────────────
    title                   →   title
    meta_description        →   description
    tags: ["a", "b"]        →   tags:\n  - a\n  - b
    published: false        →   draft: true
    featured                →   featured
    feature_image           →   ogImage
    author                  →   author
    publication_date        →   date_created
    creation_date           →   (dropped)
    updated_date            →   (dropped)
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

import yaml


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Convert frontmatter from old format to AstroPaper format",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Preview changes without writing files",
    )
    parser.add_argument(
        "--input-dir",
        type=Path,
        default=Path("to_import/exported_posts"),
        help="Directory containing source markdown files (default: to_import/exported_posts)",
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=Path("src/data/blog"),
        help="Directory for converted files (default: src/data/blog)",
    )
    parser.add_argument(
        "--verbose",
        "-v",
        action="store_true",
        help="Show detailed output for each file",
    )
    return parser.parse_args()


def extract_frontmatter(content: str) -> tuple[dict | None, str]:
    """Extract YAML frontmatter and body from markdown content."""
    pattern = r"^---\s*\n(.*?)\n---\s*\n(.*)$"
    match = re.match(pattern, content, re.DOTALL)
    if not match:
        return None, content
    try:
        frontmatter = yaml.safe_load(match.group(1))
        body = match.group(2)
        return frontmatter, body
    except yaml.YAMLError:
        return None, content


def convert_frontmatter(old: dict, filename: str = "") -> tuple[dict, list[str]]:
    """Convert old frontmatter format to AstroPaper format.

    Returns:
        tuple: (converted frontmatter dict, list of warnings)
    """
    new = {}
    warnings = []

    # Direct mappings
    if "title" in old and old["title"]:
        new["title"] = old["title"]
    else:
        # Use filename as fallback title
        new["title"] = filename.replace("-", " ").replace(".md", "").title()
        warnings.append("title: using filename as fallback")

    # Description - use placeholder if empty
    if "meta_description" in old and old["meta_description"]:
        new["description"] = old["meta_description"]
    else:
        new["description"] = "no_description"
        warnings.append("description: set to 'no_description'")

    if "author" in old and old["author"]:
        new["author"] = old["author"]
    else:
        new["author"] = "Pascal Andy"
        warnings.append("author: defaulted to 'Pascal Andy'")

    # Tags - use placeholder if empty
    if "tags" in old and old["tags"]:
        tags = old["tags"]
        if isinstance(tags, list) and len(tags) > 0:
            new["tags"] = tags
        elif isinstance(tags, str) and tags.strip():
            new["tags"] = [tags]
        else:
            new["tags"] = ["untagged"]
            warnings.append("tags: set to ['untagged']")
    else:
        new["tags"] = ["untagged"]
        warnings.append("tags: set to ['untagged']")

    # Date mapping: publication_date → date_created
    if "publication_date" in old:
        new["date_created"] = old["publication_date"]
    elif "creation_date" in old:
        # Fallback to creation_date if no publication_date
        new["date_created"] = old["creation_date"]
        warnings.append("date_created: using creation_date as fallback")

    # published: false → draft: true
    if "published" in old and old["published"] is False:
        new["draft"] = True

    # featured stays featured
    if "featured" in old and old["featured"] is True:
        new["featured"] = True

    # feature_image → ogImage
    if "feature_image" in old and old["feature_image"]:
        new["ogImage"] = old["feature_image"]

    return new, warnings


def format_yaml_with_bullet_tags(frontmatter: dict) -> str:
    """Format frontmatter as YAML with tags as bullet points."""
    lines = []

    # Define field order to match schema convention (see frontmatter-schema.md)
    field_order = [
        "title",
        "tags",
        "date_created",
        "author",
        "description",
        "featured",
        "draft",
        "ogImage",
    ]

    for field in field_order:
        if field not in frontmatter:
            continue

        value = frontmatter[field]

        if field == "tags" and isinstance(value, list):
            lines.append("tags:")
            for tag in value:
                lines.append(f"  - {tag}")
        elif field == "date_created":
            # Format date as YYYY-MM-DD
            if hasattr(value, "strftime"):
                lines.append(f"date_created: {value.strftime('%Y-%m-%d')}")
            else:
                lines.append(f"date_created: {value}")
        elif isinstance(value, bool):
            lines.append(f"{field}: {str(value).lower()}")
        elif isinstance(value, str):
            # Always quote strings to avoid YAML parsing issues
            # (colons, hashes, brackets, quotes, etc. all need escaping)
            escaped = value.replace("\\", "\\\\").replace('"', '\\"')
            lines.append(f'{field}: "{escaped}"')
        else:
            lines.append(f"{field}: {value}")

    return "\n".join(lines)


def process_file(
    input_path: Path,
    output_path: Path,
    dry_run: bool,
    verbose: bool,
) -> tuple[bool, str, list[str]]:
    """Process a single markdown file. Returns (success, message, warnings)."""
    try:
        content = input_path.read_text(encoding="utf-8")
    except Exception as e:
        return False, f"Error reading file: {e}", []

    old_frontmatter, body = extract_frontmatter(content)

    if old_frontmatter is None:
        return False, "No valid frontmatter found", []

    new_frontmatter, warnings = convert_frontmatter(old_frontmatter, input_path.name)

    # Validate required fields
    missing = []
    for required in ["title", "description", "author", "date_created", "tags"]:
        if required not in new_frontmatter:
            missing.append(required)

    if missing:
        return False, f"Missing required fields: {', '.join(missing)}", warnings

    # Format the new content
    yaml_str = format_yaml_with_bullet_tags(new_frontmatter)
    new_content = f"---\n{yaml_str}\n---\n{body}"

    if dry_run:
        if verbose:
            return True, f"Would write to {output_path}\n{yaml_str}", warnings
        return True, f"Would write to {output_path}", warnings

    # Write the file
    try:
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_text(new_content, encoding="utf-8")
        return True, f"Written to {output_path}", warnings
    except Exception as e:
        return False, f"Error writing file: {e}", warnings


def main() -> int:
    args = parse_args()

    if not args.input_dir.exists():
        print(f"Error: Input directory not found: {args.input_dir}", file=sys.stderr)
        return 1

    md_files = list(args.input_dir.glob("*.md"))
    if not md_files:
        print(f"No markdown files found in {args.input_dir}", file=sys.stderr)
        return 1

    print(f"{'[DRY RUN] ' if args.dry_run else ''}Processing {len(md_files)} files...")
    print(f"  Input:  {args.input_dir}")
    print(f"  Output: {args.output_dir}")
    print()

    success_count = 0
    error_count = 0
    errors = []

    for input_path in sorted(md_files):
        output_path = args.output_dir / input_path.name

        success, message, warnings = process_file(
            input_path,
            output_path,
            args.dry_run,
            args.verbose,
        )

        if success:
            success_count += 1
            if args.verbose:
                print(f"  [OK] {input_path.name}")
                if warnings:
                    for w in warnings:
                        print(f"       [WARN] {w}")
                if args.dry_run and args.verbose:
                    # Show the converted frontmatter
                    print(f"       {message}")
        else:
            error_count += 1
            errors.append((input_path.name, message))
            if args.verbose:
                print(f"  [ERR] {input_path.name}: {message}")

    # Summary
    print()
    print("=" * 60)
    print(f"{'[DRY RUN] ' if args.dry_run else ''}Summary:")
    print(f"  Success: {success_count}")
    print(f"  Errors:  {error_count}")

    if errors and not args.verbose:
        print()
        print("Files with errors:")
        for filename, message in errors[:10]:
            print(f"  - {filename}: {message}")
        if len(errors) > 10:
            print(f"  ... and {len(errors) - 10} more")

    if args.dry_run:
        print()
        print("Run without --dry-run to execute the conversion.")

    return 0 if error_count == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
