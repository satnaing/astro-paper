---
title: "CI/CD Scenario"
tags:
  - untagged
date_created: 2015-06-18
author: "Pascal Andy"
description: "no_description"
ogImage: "https://s3.amazonaws.com/g00000017_001/2016/Jun/ombre_sur_container_130-1466968864108.JPG"
---
## Scenario

Pascal is the owner of the application

Pascal defines one requirement per card in Trello

Those cards have ID (i.g 'B321 xyz')

This ID must appears in every commit Phil provides

## Visible vs Invisible

Each requirement must be actionnable. The work is visible.

If it's invisible, it means the contractor is not sharing what he does.

Invisibe work in a remote setup not acceptable

## dev (branch)

Phil, a developer,

He works on a branch 'B322 xyz' on his local machine. Life is good.

Phil wants to see his work online.

Phil commit (merge) to the branch 'B322 xyz' to 'dev1'

**MAIN REQUIREMENTS A**

Require the system to know in real time a change happened in the branch 'dev1'

On branch dev1, we don't track version. It would be overkill.

Require the system to update the server dev1.website.com

Why dev1 ? It's because each developers has their own dev environment. How cool !?

Require the system to reboot Ghost

Require the system to do some tests to ensure it's live! Let's define the tests that must happen !

Require the system to log into a txt-file what happen at the server level (not git level, it's already tracked)

Require this log to be available online. dev1.website.com/ci-cd.txt or HTML

Require the log to be push to a Slack #channel 'tbd'

Phil see the notification in Slack (or via the log)

1Phil can there is no errors

Phil goes to dev1.website.com an check his work

Phil is happy with the feature he worked on

Phil do a merge request (commit) from 'B322 xyz' to 'master'

Phil ask Pascal for his sign off in Trello saying checkout and by using a Label (to sign-off).

Pascal is the owner of the application

Pascal go to dev1.website.com an check to work

If there is as issue, Pascal goes to the Trello card and comment about it.

## master (branch)

If it's a Go, Pascal goes to the Trello card simply says 'accepted' or even 'acc'

Pascal update the card status in Trello (label, move it the the appropriate list )

Pascal accept the merge request 'B322 xyz' to 'master

Life is good

## staging (branch)

A few hours later, Phil has shipped many requirements

Pascal have merged them into master

Pascal decided to push a release

Pascal creates a Trello cards like it's a requirements. It's called staging1 1.3.22

Pascal or Phil, create a new branch 'staging1 1.3.22' from 'master'

**MAIN REQUIREMENTS B**

Require the system to know in real time a change happened in the branch 'staging1'

Req the system to monitor any new branch container the word staging 1 'staging1 x-x-x-x' whatever the version. This was not neccessary with 'dev1'

Require the system to update the server staging1.website.com

Why staging1 ? It's the default one. We may need more staging in the future.

Require the system to reboot Ghost

Require the system to do some tests to ensure it's live

! Let's define the tests that must happen !

Require the system to log into a txt-file what happen at the server level (not git level, it's already tracked)

Require this log to be available online. staging1.website.com/ci-cd.txt or HTML

Require the log to be push to a Slack #channel 'tbd'

staging1 is the default one. We may need more staging in the future.

Phil or Pascal (PorP) see the notification in Slack (or via the log)

PorP can see there is no errors

PorP goes to staging1.website.com an check the release

PorP are validate everything sticks together.

Pascal provide his sign off in the Trello card

## prod-asterix (branch)

PorP do a merge request (commit) from 'staging1 1.3.22' to 'prod-asterix 1.3.22'

PorP have to track all commits included in this release to the trello card and in this commit.

**MAIN REQUIREMENTS C**

Require the system to know in real time a change happened in the branch 'prod-asterix'

Req the system to monitor any new branch container the word staging 1 'prod-asterix x-x-x-x' whatever the version.

At 3h30AM ... not in real time ...

Require the system to update the servers flagged as 'prod-asterix'

Require the system to reboot Ghost

Require the system to do some tests to ensure it's live

! Let's define the tests that must happen !

Require the system to log into a txt-file what happen at the server level (not git level, it's already tracked)

Require to know the log for each sites updated 5% of all our prod

Require this log to be available online. website.com/ci-cd.txt or HTML

Require the log to be push to a Slack #channel 'tbd'

The next morning, PorP verify if everything run smoothly on sites 'prod-asterix'

Life is good.

Repeat for prod-bento :)