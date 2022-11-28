# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.2.0](https://github.com/satnaing/astro-paper/compare/v1.1.3...v1.2.0) (2022-11-28)


### Features

* **a11y:** improve voiceover a11y for datetime component ([57c3f79](https://github.com/satnaing/astro-paper/commit/57c3f796d41ed180dcdf5ff763193ed5c06f54cf))
* improve accessibility including voiceover ([5860254](https://github.com/satnaing/astro-paper/commit/5860254ea99996e466f2e521f033763961b6faa6))


### Bug Fixes

* **a11y:** improve breadcrumb to be more accessible when using with voiceover ([cabf30b](https://github.com/satnaing/astro-paper/commit/cabf30bc8e030015daee065c401dcf83814a6e8b))
* **a11y:** update previous and next (disabled) buttons for vo a11y ([408fc4c](https://github.com/satnaing/astro-paper/commit/408fc4c7aa5a246fe82a6e85d119b36ee1f1ffc3))
* add missing seperator in Breadcrumb ([b05b665](https://github.com/satnaing/astro-paper/commit/b05b6654f6c42c09eb5c6a4b918b9343cd4664e6))
* add optional chaining for theme switch event listener ([c4c9ab2](https://github.com/satnaing/astro-paper/commit/c4c9ab2246ff423698468992222c60b30422beaf))
* fix broken link ([9d3c897](https://github.com/satnaing/astro-paper/commit/9d3c89753d2b3fbc0bf87bcf0070c80763545148))
* **typo:** rename Linkedin to LinkedIn ([307b55f](https://github.com/satnaing/astro-paper/commit/307b55ff0f6cb86a4fa4152c635d6acb39d1512f))

### [1.1.3](https://github.com/satnaing/astro-paper/compare/v1.1.2...v1.1.3) (2022-11-11)


### Bug Fixes

* fix broken post links and hide draft posts in rss feed ([b83c906](https://github.com/satnaing/astro-paper/commit/b83c906262cb5e1f045ac50f2401527c0b64074c))

### [1.1.2](https://github.com/satnaing/astro-paper/compare/v1.1.1...v1.1.2) (2022-11-04)


### Bug Fixes

* fix heading style in posts/<page-num> layouts ([5eeea66](https://github.com/satnaing/astro-paper/commit/5eeea6639e79f93c3d0917bc827dfd37a23d041c))
* fix missing TailwindCSS dependency ([e7807ab](https://github.com/satnaing/astro-paper/commit/e7807ab94e12898ab85b955132c5d908956c8945)), closes [#6](https://github.com/satnaing/astro-paper/issues/6)
* show search result only if input is more than one char ([f7fb032](https://github.com/satnaing/astro-paper/commit/f7fb032e604bd704adc19400e000c9584a6fdb43))

### [1.1.1](https://github.com/satnaing/astro-paper/compare/v1.1.0...v1.1.1) (2022-10-30)


### Updates

* update github-slugger by @AkaraChen in https://github.com/satnaing/astro-paper/pull/5
* move '@types/react' to dev dependencies ([3697a59](https://github.com/satnaing/astro-paper/commit/3697a59f1ab8b58af7d41c2ef4aa8ba97b9ad1e2))
* update dependencies

## [1.1.0](https://github.com/satnaing/astro-paper/compare/v1.0.1...v1.1.0) (2022-10-18)

### Features

* improve search functionality ([33bab9c](https://github.com/satnaing/astro-paper/commit/33bab9c489d74e1b53109d5f1e8f3586cfcb9433))
* add CHANGELOG ([adb331e](https://github.com/satnaing/astro-paper/commit/adb331e219d122be696fb390ae41f0afaa5a76b9))
* add prettier and husky ([d6dd818](https://github.com/satnaing/astro-paper/commit/d6dd8185f28cfae967cf90c9020580ebce5c36fd) | [80aee6b](https://github.com/satnaing/astro-paper/commit/80aee6bedbc1e40650411b0695f5365902d3b9e2))

### Bug Fixes

* fix markdown lint warnings by updating headers ([ad14dc5](https://github.com/satnaing/astro-paper/commit/ad14dc580fbf886f5de95705ec7910c7c3b46bf0))
* fix markdown warnings by adding alt texts ([3260641](https://github.com/satnaing/astro-paper/commit/326064111cbb7d356659252dd7ddd42dbd2d7e56))
* extract Social component to avoid duplication ([7ef631f](https://github.com/satnaing/astro-paper/commit/7ef631fe35dc57db1c84e7c3c92969fa23ccd42b))
* update glob to have access to sub directories under content/ ([a256ded](https://github.com/satnaing/astro-paper/commit/a256dedb73aaf018cedf764f38843ad176b27058))

## [1.0.1](https://github.com/satnaing/astro-paper/compare/v1.0.0...v1.0.1) (2022-09-27) Initial Release

### Features

- Fully responsive & accessible
- Pagination & draft post
- Light & dark color schemes
- 19 social link icons
- Fuzzy search
- Sitemap & RSS feed
- 5 predefined themes
