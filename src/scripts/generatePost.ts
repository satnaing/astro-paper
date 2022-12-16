#!/usr/bin/env node

import fs from "fs";
import prompts from "prompts";
import { slug as slugger } from "github-slugger";
import kleur from "kleur";
import { SITE } from "../config.js";

const currentDatetime = new Date().toISOString();
let newFileName = currentDatetime.replace(/\:|\./g, "-");
let content = getContent();

const getFileName = (filename: string): string => filename.split("/").at(-1)!;

async function welcome() {
  console.log(`Welcome to ${kleur
    .bold()
    .italic()
    .cyan("AstroPaper")} command line!
  `);
}

async function askQuestions() {
  const { fileName, title, slug, desc, featured, draft, datetime } =
    await prompts(
      [
        {
          type: "text",
          name: "fileName",
          message: "Enter your new file name: ",
          initial: newFileName,
          validate: value => validateFileName(value),
        },
        {
          type: "text",
          name: "title",
          message: "Enter post title: ",
          initial: prev => (prev === newFileName ? "" : getFileName(prev)),
        },
        {
          type: "text",
          name: "slug",
          message: "Enter post slug ",
          initial: prev => slugger(getFileName(prev)),
        },
        {
          type: "date",
          name: "datetime",
          message: "Pick a date",
          initial: new Date(currentDatetime),
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

  newFileName = fileName;

  console.log(`-----------------------------`);

  content = getContent(
    title,
    slug,
    desc,
    featured,
    draft,
    datetime.toISOString()
  );
}

function getContent(
  title = "",
  slug = "",
  desc = "",
  featured = false,
  draft = false,
  datetime = currentDatetime
) {
  return `---
author: ${SITE.author}
datetime: ${datetime}
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
  const filePath = newFileName.split("/");
  const dir = filePath.slice(0, -1);
  const contentDirectory = `./src/contents/${dir}`;

  // Create a directory if not exists
  // eg: filename is '/exampledir/test' => /src/contents/exampledir/test.md
  if (!fs.existsSync(contentDirectory)) {
    fs.mkdirSync(contentDirectory);
  }

  // Create a new file
  fs.writeFile(
    `./src/contents/${newFileName}.md`,
    content,
    { flag: "wx" },
    function (err) {
      if (err) throw err;
      console.log(
        `New File: ${kleur.blue("/src/contents/")}${kleur.green(
          `${newFileName}.md`
        )}`
      );
      console.log(`✅ File is created successfully.`);
    }
  );
}

function onCancel() {
  console.log(`\n${kleur.dim("⚠️  Oops! Operation cancelled.")}`);
  process.exit(0);
}

function validateFileName(filename: string) {
  // Check if filename ends with slash '/'
  if (filename.at(-1) === "/") return "File name cannot end with slash ('/')";

  // Check if file already exists
  if (fs.existsSync(`./src/contents/${filename}.md`))
    return `File already exists`;

  // Check if file extension ".md" includes
  if (filename.split(".").pop() === "md")
    return `File extension ".md" should not include`;

  // Check if filename contains more than one directory
  if (filename.split("/").length > 2)
    return `More than one nested directory is not allowed.`;

  return true;
}

// Invoke functions for script
if (!process.argv[2] && process.argv[2] !== "-y") {
  await welcome();
  await askQuestions();
}
await generateFile();
