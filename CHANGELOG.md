# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.4.0](https://github.com/satnaing/astro-paper/compare/v1.3.0...v1.4.0) (2022-12-28)


### Features

* generate dynamic og image for blog posts ([#15](https://github.com/satnaing/astro-paper/issues/15)) ([ce3f1dc](https://github.com/satnaing/astro-paper/commit/ce3f1dc4a0df8f196dce37de1c976870e9c97279))


### Bug Fixes

* fix grammar mistake ([02faff9](https://github.com/satnaing/astro-paper/commit/02faff9fbd4444144eeb139ae62850ec5a980dd3))

## [1.3.0](https://github.com/satnaing/astro-paper/compare/v1.2.1...v1.3.0) (2022-12-07)


### Features

* update mobile nav to be accessible ([46ea4aa](https://github.com/satnaing/astro-paper/commit/46ea4aa49a49a3d21ca5ce1cee1b51f0108c13f0))

### [1.2.1](https://github.com/satnaing/astro-paper/compare/v1.2.0...v1.2.1) (2022-12-02)


### Bug Fixes

* disable access to draft posts via url ([1c2821e](https://github.com/satnaing/astro-paper/commit/1c2821e4df65bee7126aed17244bb6590b1163d8))
* display '0 results' instead of '0 result' in Search ([eceb289](https://github.com/satnaing/astro-paper/commit/eceb2895623cffefc65671fdfc343fa5e4c01cdb))
* displays featured section only if featured posts exist ([e0f93da](https://github.com/satnaing/astro-paper/commit/e0f93dab02024d65ddb69925a21e8d8598a036e9))
* fix calculating draft posts in totalPages ([19e34a0](https://github.com/satnaing/astro-paper/commit/19e34a0801019df8681d1d4e80f678989cf2457c))
* hide pagination when there's only 1 page ([6b35c7f](https://github.com/satnaing/astro-paper/commit/6b35c7fc2f63bb16aaefc140029b1eae1235cc44))

## [1.2.0](https://github.com/satnaing/astro-paper/compare/v1.1.3...v1.2.0) (2022-11-28)


### Features

* improve accessibility including voiceover ([5860254](https://github.com/satnaing/astro-paper/commit/5860254ea99996e466f2e521f033763961b6faa6))
* add linkTitle in social links ([c9f796f](https://github.com/satnaing/astro-paper/commit/c9f796f4e63f1cf6b32b7874ae5e3810598a230c))


### Updates

* move toggle theme codes from `layouts/Layout.astro` to `toggle-theme.js` ([5860254](https://github.com/satnaing/astro-paper/commit/5860254ea99996e466f2e521f033763961b6faa6))
* delete `utils/formatDatetime.ts` and replaced with `FormattedDatetime` inside `components/Datetime.tsx` ([0eeed8e](https://github.com/satnaing/astro-paper/commit/0eeed8e870781d9b4a447c51e3055ccb2f359d8a))
* 'toggling light and dark mode' code is remove from `src/components/Header.astro` and is rewritten in `public/toggle-theme.js` file. ([2ba459b](https://github.com/satnaing/astro-paper/commit/2ba459b4131a11a68a5fd818a278c474c1888cde)) ([0eeed8e](https://github.com/satnaing/astro-paper/commit/0eeed8e870781d9b4a447c51e3055ccb2f359d8a))
* update previous and next button disabled state ([408fc4c](https://github.com/satnaing/astro-paper/commit/408fc4c7aa5a246fe82a6e85d119b36ee1f1ffc3))
* **typo:** rename Linkedin to LinkedIn ([307b55f](https://github.com/satnaing/astro-paper/commit/307b55ff0f6cb86a4fa4152c635d6acb39d1512f))
* update patch and minor dependencies ([3b0ab75](https://github.com/satnaing/astro-paper/commit/3b0ab7555f506a8a0b825ca9691fdb221e481adb)) ([c3a6e4e](https://github.com/satnaing/astro-paper/commit/c3a6e4e81d1f79efc17d451486ff560dccb8ddf0))

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
