#!/usr/bin/env node

import fs from "fs";
import prompts from "prompts";
import { slug as slugger } from "github-slugger";

async function welcome() {
  console.log(`Welcome to AstroPaper command line!
  `);
}

const currentDatetime = new Date().toISOString();

const defaultFileName = currentDatetime.replace(/\:|\./g, "-");

const questions: prompts.PromptObject<string>[] = [
  {
    type: "text",
    name: "fileName",
    message: "Enter your new file name: ",
    initial: `${defaultFileName}.md`,
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
    initial: true,
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
];

const onCancel = () => {
  console.log("Operation cancelled :(");
  process.exit(0);
};

async function askQuestions() {
  const { fileName, title, slug, desc, featured, draft } = await prompts(
    questions,
    {
      onCancel,
    }
  );

  console.log(`Hello ${fileName}`);

  const content = getContent(title, slug, desc, featured, draft);

  fs.writeFile(`./src/contents/${fileName}.md`, content, function (err) {
    if (err) throw err;
    console.log("File is created successfully.");
  });
}

await welcome();
await askQuestions();

function getContent(
  title = "",
  slug = "",
  desc = "",
  featured = true,
  draft = false
) {
  return `---
author: Sat Naing
datetime: ${currentDatetime}
title: ${title}
slug: ${slug}
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
