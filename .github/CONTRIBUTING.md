# How to contribute to AstroPaper

Thank you for your interest in contributing to **AstroPaper**! We appreciate every contribution, whether you're fixing a typo, improving documentation, or adding a new feature.

## Types of Contributions

There are several ways to contribute to **AstroPaper**, and every contribution counts\_ whether it's a PR for a major feature or a small fix.

You can also contribute by leaving review comments on PRs, adding ideas to existing GitHub Issues and Discussions, or helping others by answering questions in GitHub Discussions.

Here’s a summary of the different ways you can contribute:

- [What AstroPaper takes (scope)](#scope)
- [Opening a new issue](#open-a-new-issue)
- [Submitting PRs](#feature-requests)
  - [Solving an existing issue](#solving-an-issue)
  - [Making changes to a blog post](#making-changes-to-a-blog-post)
- [Helping others by answering issues/discussions](#helping-with-github-issuesdiscussions)
- [Reviewing existing PRs](#reviewing-existing-prs)
- [Starting a discussion](#starting-a-discussion)
- [Settled design decisions](#settled-design-decisions)

## Scope

AstroPaper aims to stay minimal and fast. A feature either ships in the base theme or is documented as a recipe in the [wiki](https://github.com/satnaing/astro-paper/wiki). There is no plugin or add-on layer.

Before proposing a feature, ask:

- **Would most blogs use it?** If only some would, it fits better as a wiki recipe.
- **What does it cost readers who don't use it?** Extra JavaScript on every page is a no.
- **Is there already a maintained integration for it?** Then the wiki shows how to use it, and the theme stays as it is.

If you're not sure, [start a discussion](https://github.com/satnaing/astro-paper/discussions/new/choose) before writing code. It saves everyone time.

## Open a new Issue

If you find a bug or problem, first check whether a similar issue already exists. If you don’t find any open issue that addresses the bug/problem you’re facing, feel free to [open a new issue](https://github.com/satnaing/astro-paper/issues/new/choose).

## Feature Requests

If you have an idea for a new feature or enhancement that could improve AstroPaper, we’d love to hear it! Before submitting a new feature request, please:

1. **Check the scope**: Read [Scope](#scope) and [Settled Design Decisions](#settled-design-decisions) to see whether the idea fits the base theme.
2. **Check existing discussions/issues**: Review the [Discussions](https://github.com/satnaing/astro-paper/discussions) or [Issues](https://github.com/satnaing/astro-paper/issues) to see if the feature has already been requested or discussed. You can contribute by adding your thoughts or upvoting existing requests.
3. **Open a new issue**: If you don’t find an existing discussion, you can open a new issue using the [Feature Request Template](https://github.com/satnaing/astro-paper/issues/new?assignees=&labels=enhancement&projects=&template=%E2%9C%A8-feature-request.md&title=%5BFeature+Request%5D%3A+). Be as detailed as possible, describing the problem this feature would solve and how it would benefit AstroPaper users.
4. **Discuss first**: If you’re unsure whether your idea is feasible or fits the project’s goals, feel free to [start a GitHub Discussion](https://github.com/satnaing/astro-paper/discussions/new/choose) to gather feedback from the community.

## Making PRs (Pull Requests)

### Solving an Issue

Browse through the existing issues to find one that interests you. You can use labels to filter the issues. See the [Label](https://github.com/satnaing/astro-paper/labels) section for more information.

### Making Changes to a Blog Post

For small changes like typos, syntax fixes, or broken links, click the "Suggest Changes" link below the title of any blog post. This will take you to the .md file, where you can make your changes and submit a pull request for review. For more significant changes to a blog post, it’s recommended to open a new issue or discussion first.

### Using AI Tools

Using AI tools to write code or docs is fine. However, you are the author of your PR:

- Read, understand, and test every change before opening the PR.
- Be ready to explain your changes and answer review questions yourself.
- Keep the PR focused on one issue or feature, and fill in the PR template.

## Helping with GitHub Issues/Discussions

GitHub Discussions and Issues are great places to help others. Whether you're a long-time user of AstroPaper or just have experience with a specific problem, we encourage you to answer questions or solve issues when possible.

## Reviewing Existing PRs

You can help by reviewing and providing feedback on open PRs. Different perspectives can be very helpful.

Since AstroPaper doesn’t currently have automated testing, it’s especially useful if you can do manual testing on open PRs and provide feedback.

## Starting a Discussion

If you’re unsure whether your issue warrants a fix or if you just want to share ideas and get feedback, feel free to [start a GitHub discussion](https://github.com/satnaing/astro-paper/discussions/new/choose). It’s a great way to engage with the community.

## Settled Design Decisions

Some questions come up again and again. The answers are recorded here, so a PR that goes against one gets a reason. To reopen one, start a discussion that argues with the reasoning below. A PR alone won't change it.

### Publishing is day-granular

A post becomes visible on its `pubDatetime` day, read in `site.timezone` (or the post's own `timezone`). The time part of `pubDatetime` doesn't decide when a post appears, and there is no publish-at-a-time-of-day feature.

Why:

- AstroPaper shows only the date on posts, not the time ([#546](https://github.com/satnaing/astro-paper/pull/546), after [discussion #532](https://github.com/satnaing/astro-paper/discussions/532)). Scheduling to a time readers can't see isn't worth the extra logic.
- Visibility is decided at build time. A static site can only show a new post when a build runs, so a time-of-day promise would depend on each site's deploy setup.

To publish scheduled posts without pushing, see [Scheduled posts](https://github.com/satnaing/astro-paper/wiki/Configuration#scheduled-posts) in the wiki.

Prior rounds: [#233](https://github.com/satnaing/astro-paper/issues/233), [#300](https://github.com/satnaing/astro-paper/issues/300), [#495](https://github.com/satnaing/astro-paper/issues/495), [#663](https://github.com/satnaing/astro-paper/pull/663).

### Mermaid is a wiki recipe

Mermaid diagrams aren't built into the theme. Most blogs never draw a diagram, and Mermaid's client-side JavaScript would land on every post page. The wiki shows how to add it: [Mermaid Diagrams](https://github.com/satnaing/astro-paper/wiki/Integrations#mermaid-diagrams).

Decided in [#571](https://github.com/satnaing/astro-paper/pull/571) and [#326](https://github.com/satnaing/astro-paper/issues/326).
