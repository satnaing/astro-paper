#!/usr/bin/env node

import fs from "fs";
import prompts from "prompts";
import { slug as slugger } from "github-slugger";
import kleur from "kleur";
import { SITE } from "../config.js";

const currentDatetime = new Date().toISOString();
let newFileName = `${currentDatetime.replace(/\:|\./g, "-")}.md`;
let content = getContent();

async function welcome() {
  console.log(`Welcome to ${kleur
    .bold()
    .italic()
    .cyan("AstroPaper")} command line!
  `);
}

async function askQuestions() {
  const { fileName, title, slug, desc, featured, draft } = await prompts(
    [
      {
        type: "text",
        name: "fileName",
        message: "Enter your new file name: ",
        initial: newFileName,
      },
      {
        type: "text",
        name: "title",
        message: "Enter post title: ",
      },
      {
        type: "text",
        name: "slug",
        message: "Enter post slug ",
        initial: prev => slugger(prev),
      },
      {
        type: "text",
        name: "desc",
        message: "Enter OG description: ",
      },
      {
        type: "toggle",
        name: "featured",
        message: "Featured: ",
        initial: false,
        active: "true",
        inactive: "false",
      },
      {
        type: "toggle",
        name: "draft",
        message: "Draft: ",
        initial: false,
        active: "true",
        inactive: "false",
      },
    ],
    {
      onCancel,
    }
  );

  console.log(`Hello ${fileName}`);

  newFileName = `${fileName}.md`;

  content = getContent(title, slug, desc, featured, draft);
}

function getContent(
  title = "",
  slug = "",
  desc = "",
  featured = false,
  draft = false
) {
  return `---
author: ${SITE.author}
datetime: ${currentDatetime}
title: ${title ? title : "# Your_Post_Title"}
slug: ${slug ? slug : "# Your_Post_Slug"}
featured: ${featured}
draft: ${draft}
tags:
  - example
  - tags
ogImage: ""
description: ${desc ? desc : "# A_brief_description_about_your_new_article"}
---

<!-- Write your brief intro here -->

## Table of contents

<!-- Write your post content here -->
`;
}

async function generateFile() {
  fs.writeFile(`./src/contents/${newFileName}`, content, function (err) {
    if (err) throw err;
    console.log("File is created successfully.");
  });
}

function onCancel() {
  console.log(`\n${kleur.dim("⚠️  Oops! Operation cancelled.")}`);
  process.exit(0);
}

// Invoke functions for script
await welcome();
!process.argv[2] && process.argv[2] !== "-y" && (await askQuestions());
await generateFile();
