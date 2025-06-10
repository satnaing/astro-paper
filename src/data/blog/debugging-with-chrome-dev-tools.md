---
author: Govinda Bhandari
pubDatetime: 2025-06-10T07:49:32.928Z
modDatetime: 2025-06-10T07:49:32.928Z
title: Debugging with chrome dev tools
slug: debugging-with-chrome-dev-tools
featured: true
draft: false
tags:
  - docs
  - tech
description:
    Some tips on debugging annoying things that is hard to do, but made easy with right tools in chrome dev tools.
---

Here are some of the tools I found useful in debugging annoying stuffs with the website

## Unwanted DOM manipulation

You have unwanted changes in the DOM or changes you want but have no idea where it is being changed. `break on` tool is here to help

You can select from the `break on` option on which things to point on
- Subtree modifications
- attribute Modification
- Node removal

Now you can see where the DOM is being manipulated and from where.

You just right click on the element you want to `break on` and viola

<img src="/assets/break-on-devtool.png" class="sm:w-1/2 mx-auto" alt="Break on dev tools" />

## Disappearing element

You want to debug an element of the DOM, but as soon as click on the dev tools it disappears. Worry not `Emulate a focused page` is here to help

Follow the steps
- Go to `Rendering` tab for chrome dev tools. (or press ctrl + p [cmd + p for mac] and select `Show Rendering`)
- In the tab fine the options `Emulate a focused page`

Now when you go to the dev tools to inspect element it won't disappear.

<img src="/assets/emulate-focused-page.gif" alt="Emulate focused page" />

## Screen shots

Want to take a screen shot of a particular element or the entire webpage.

Dev tools is here to help.
- Right click on any node (body, div, ul, li, etc)
- Click `Capture Node screenshot`
or, if you want full size screen shot of webpage
- open command pallet (ctrl + p [cmd + p for mac])
- and select `Capture full size screen shot`

## CSS Animations

Find animations hard? `Animations` tab is here to help. Just go to animations tab in chrome dev tools.

This can be toggled by going in to more tools or by using command pallet.

You can play around with the animations, or copy some animations form other websites as well.

