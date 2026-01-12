---
title: "Contributing to our Github project"
tags:
  - Startups
date_created: 2019-01-10
author: "Pascal Andy"
description: "no_description"
ogImage: "/og-legacy/2019/01/pascalandy-com_header_2017-04-10_14h46-3.jpg"
---
Please take a moment to review this document to make the contribution process easy and useful for everyone involved!

By contributing to this project, you agree to the [Contributor Code of Conduct on GitHub](/contributor-code-of-conduct-on-github/).

## Using the issue tracker

Use the issues tracker for:

- bug reports
- submitting pull requests

Development issues can be discussed on [Twitter](https://twitter.com/askpascalandy).

We do our best to keep the issue tracker tidy and organized, thus making it useful for everyone. For example, we classify open issues per perceived difficulty, making it easier for developers to contribute.

## Bug reports

A bug is a _demonstrable problem_ caused by the code in the repository. Good bug reports are beneficial - thank you!

Guidelines for bug reports:

1. **Use the GitHub issue search** — check if the issue has already been reported.
2. **Check if the issue has been fixed** — try to reproduce it using the `master` branch in the repository.

3. **Isolate and report the problem** — ideally create a reduced test case.

Please try to be as detailed as possible in your report. Include information about your Operating System, Docker version, docker info, etc. Please provide steps to reproduce the issue as well as the outcome you were expecting! All these details will help developers to fix any potential bugs.

Example:

Short and descriptive example bug report title

A summary of the issue and the environment in which it occurs. If suitable, include the steps required to reproduce the bug.

1. This is the first step
2. This is the second step

3. Further steps, etc.

## Feature requests

Feature requests are welcome and should be discussed by creating an issue. In the title of your issue, include [FEAT] at the beginning of the title. It's up to _you_ to make a strong case to convince the community of the merits of this feature. Please provide as much detail and context as possible.

## Contributing Documentation

Try to keep unnecessary details out of the first paragraph, it's only there to give a user a quick idea of what the documented "thing" does/is.

## Pull requests

Good pull requests - patches, improvements, new features are a fantastic help. They should remain focused in scope and avoid containing unrelated commits.

By submitting a patch, you agree that your work will be licensed under the [license](./LICENCE.md) used by the project.

If you have any large pull request in mind (e.g. implementing features, refactoring code, etc.), **please ask first** via an issue, otherwise you risk spending a lot of time working on something that the project's developers might not want to merge into the project.

Please adhere to the coding conventions in the project (indentation, accurate comments, etc.) and don't forget to add your own tests and documentation. When working with git, we recommend the following process to craft an excellent pull request:

**The process** :

1. [Fork](https://help.github.com/articles/fork-a-repo/) the project, clone your fork, and configure the remotes:

[code]

bash
# Clone your fork of the repo into the current directory
git clone https://github.com/<your-username>/docker-stack-this
# Navigate to the newly cloned directory
cd docker-stack-this
# Assign the original repo to a remote called "upstream"
git remote add upstream https://github.com/pascalandy/docker-stack-this

[/code]

1. If you cloned a while ago, get the latest changes from upstream, and update your fork:

[code]

bash

git checkout master

git pull upstream master

git push

[/code]

1. Create a new topic branch (off of `master`) to contain your feature, change, or fix.

**IMPORTANT** : Making changes in the `master` branch is discouraged. You should always keep your local `master` in sync with the upstream `master` and make your changes in topic branches.
[code]

bash

git checkout -b <topic-branch-name>

[/code]

1. Commit your changes in logical chunks. Keep your commit messages organized, with a short description in the first line and more detailed information on the following lines. Feel free to use Git's [interactive rebase](https://help.github.com/articles/about-git-rebase/) feature to tidy up your commits before making them public.
2. Make sure all the tests are still passing by following your documentation.

3. Push your topic branch up to your fork:

[code]

bash

git push origin <topic-branch-name>

[/code]

1. [Open a Pull Request](https://help.github.com/articles/about-pull-requests/) with a clear title and description.
2. If you haven't updated your pull request for a while, you should consider rebasing on `master` and resolving any conflicts.

**IMPORTANT** : _Never ever_ merge upstream `master` into your branches. You should always `git rebase` on `master` to bring your changes up to date when necessary.
[code]

git checkout master

git pull upstream master

git checkout <your-topic-branch>

git rebase master

[/code]

Thank you for your contributions!