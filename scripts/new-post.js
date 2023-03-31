const fs = require('fs')
const { join } = require('path')

if (process.argv.length < 3)
  throw new Error(`new-post.js should has a string argument to run!`)

const author = ``
const title = process.argv[2]
const postSlug = title.replaceAll(' ', '-').toLowerCase()
const fn = `${ postSlug }.md`
const pubDatetime = new Date().toISOString()

const postDir = `../src/content/blog`

const template = `---
author: ${ author }
pubDatetime: ${ pubDatetime }
title: ${ title }
postSlug: ${ postSlug }
featured: false
draft: false
ogImage: ""
tags:
  - release
description: 
---`

fs.writeFileSync(join(__dirname, postDir, fn), template)
