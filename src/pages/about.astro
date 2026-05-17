---
import { getEntry, render } from "astro:content";
import Layout from "@/layouts/Layout.astro";
import Header from "@/components/Header.astro";
import Breadcrumb from "@/components/Breadcrumb.astro";
import Main from "@/components/Main.astro";
import Footer from "@/components/Footer.astro";
import config from "@/config";

const about = await getEntry("pages", "about");

if (!about) {
  throw new Error(
    "Missing content entry: `about.md` or `about.mdx` in `src/content/pages/`"
  );
}

const { Content } = await render(about);
---

<Layout
  title={`${about.data.title} | ${config.site.title}`}
  description={about.data.description}
  ogImage={about.data.ogImage}
  canonicalURL={about.data.canonicalURL}
>
  <Header />

  <Breadcrumb />

  <Main pageTitle={about.data.title} class="app-prose">
    <Content />
  </Main>

  <Footer />
</Layout>
