# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## v4.7.0 (2024-10-15)

### Feat

- add archives page with configurable menu (#386)

## v4.6.0 (2024-10-13)

### Feat

- add edit post feature in blog posts (#384)

### Refactor

- remove duplicate [page].astro (#389)

## v4.5.1 (2024-10-02)

### Fix

- **docs**: update giscus blog post (#392)
- add missing posts sorting (#383)

## v4.5.0 (2024-09-16)

### Feat

- add prev/next links at the bottom of blog post (#372)

### Fix

- **og**: add the missing SITE.website to loadGoogleFonts  (#360)
- **blog**: correct file reference in reading time guide (#359)

### Refactor

- replace pagination logic with Astro built-in pagination (#376)

### Perf

- preload font and load theme script asynchronously (#380)

## v4.4.0 (2024-08-19)

### Content Layer API

- upgrade Astro and use Content Layer API (#355)

### Others

- upgrade ESLint to v9 and update configurations (#356)
- replace github-slugger with lodash.kebabcase (#357)

## v4.3.2 (2024-08-17)

### Fix

- **a11y**: remove aria-labels from non-interactive elements (#346)

### Refactor

- update tailwind classes to v3 syntax (#345)
- remove commented codes

### Others

- docs: update estimated reading time blog post (#354)
- docs: add instructions for Google Site Verification in AstroPaper (#353)
- docs: update pre-commit hook blog post (#344)
- ci: add CI workflow (#340)

## v4.3.1 (2024-07-27)

### Fix

- resolve non-latin char issue in generated OG images (#318)

## v4.3.0 (2024-07-27)

### Feat

- support light/dark theme in code blocks (#327)
- add number of posts config for home page (#281)
- make heading links keyboard focusable (#275)
- add JSON-LD structured data (#260)
- add scroll indicator in blog posts (#249)

### Fix

- adding data-theme to tailwind config (#319)
- avoid `undefined` when passing class-name as prop (#270)
- add $CURRENT_TIMEZONE_OFFSET in custom code snippets (#264)
- display `Updated` in posts only when modDatetime > pubDatetime (#258)
- add SITE.title in PostDetails title tag for consistent look (#247)
- add trailing slash to links to avoid extra redirects (#246)
- update incorrect typo in predefined-color-schemes.md (#245)

### Refactor

- remove trailing commas in tsconfig.json (#325)
- remove redundant role in article element (#323)
- avoid using unnecessary class-name in the pagination component (#274)
- update post detail script codes
- update code formatting with prettier

## [4.2.0](https://github.com/satnaing/astro-paper/compare/v4.1.0...v4.2.0) (2024-01-22)

### Features

* add heading links to PostDetails page ([#232](https://github.com/satnaing/astro-paper/issues/232)) ([742baff](https://github.com/satnaing/astro-paper/commit/742baff2c9bd47e0762f5d65f5b47a4d28014175))
* hide posts in Prod with future pubDatetime  ([#234](https://github.com/satnaing/astro-paper/issues/234)) ([3efa05c](https://github.com/satnaing/astro-paper/commit/3efa05cc101688c32fc531af0122023d3ce82f08))

### Bug Fixes

* remove extra padding if lightAndDarkMode is false ([#230](https://github.com/satnaing/astro-paper/issues/230)) ([742314e](https://github.com/satnaing/astro-paper/commit/742314e0ac350a70ce1cc256e858c8de9c9153f6))
* reduce margin-bottom on markdown images ([#235](https://github.com/satnaing/astro-paper/issues/235)) ([1331795](https://github.com/satnaing/astro-paper/commit/1331795a4965aab5c47581c223f32f3ea2cd71ab))
* resolve broken line break in inline code ([#237](https://github.com/satnaing/astro-paper/issues/237)) ([ece0682](https://github.com/satnaing/astro-paper/commit/ece0682adce387f2a169185680cdf372a457e938))
* remove recent posts section if there's no post ([#238](https://github.com/satnaing/astro-paper/issues/238)) ([629dbfd](https://github.com/satnaing/astro-paper/commit/629dbfda5b99a71e629dbbf1845c3ceba5ac97e0)), closes [#204](https://github.com/satnaing/astro-paper/issues/204)
* update back button to redirect to home when no route history ([#241](https://github.com/satnaing/astro-paper/issues/241)) ([8f75f0a](https://github.com/satnaing/astro-paper/commit/8f75f0a5e75778a60e8030bb45b19289c0af502e))

### Others

* upgrade astro and other dependencies ([e903b69](https://github.com/satnaing/astro-paper/commit/e903b699cd947301256de1e62ae0ad2d1dcd3c2b))
* update code formatting with prettier ([424c422](https://github.com/satnaing/astro-paper/commit/424c422392d836516bfbb6004a234a1a57930be1))
* add astro extension in lint-staged code formatting ([d41bb69](https://github.com/satnaing/astro-paper/commit/d41bb69cd8f441caa773a07d911adb3ade54b493))
* update outdated prettier script ([1281b93](https://github.com/satnaing/astro-paper/commit/1281b9340a6bebd67628a8d4c56f318701ffde47))

## [4.1.0](https://github.com/satnaing/astro-paper/compare/v4.0.0...v4.1.0) (2024-01-10)

### Features

* update Astro and other dependencies ([f70a0b7](https://github.com/satnaing/astro-paper/commit/f70a0b78ed44350f6d1b00153ea0cc5b7d285043)) ([034dd39](https://github.com/satnaing/astro-paper/commit/034dd394abd4df5cb95fcfe975749cc535a6c05c))
* add share links in blog post ([#215](https://github.com/satnaing/astro-paper/issues/215))
* add copy buttons for code blocks ([#217](https://github.com/satnaing/astro-paper/issues/217))

### Bug Fixes

* resolve accessibility issues ([#226](https://github.com/satnaing/astro-paper/issues/226))
* solve modDatetime type errors ([#214](https://github.com/satnaing/astro-paper/issues/214))
* remove SocialObjects type and update SocialObjects type ([#225](https://github.com/satnaing/astro-paper/issues/225))

### Others

* adds blog post for how to add a social icon ([#221](https://github.com/satnaing/astro-paper/issues/221)) 
* updates the hook post with a smarter updateHook ([#222](https://github.com/satnaing/astro-paper/issues/222))
* update breadcrumbs delimiter to "»" ([#213](https://github.com/satnaing/astro-paper/issues/213))

## [4.0.0](https://github.com/satnaing/astro-paper/compare/v3.0.0...v4.0.0) (2024-01-04)


### ⚠ BREAKING CHANGES

* Astro v4 upgrade

### Features

* add code-snippets for content creation ([#206](https://github.com/satnaing/astro-paper/issues/206)) ([bb2f290](https://github.com/satnaing/astro-paper/commit/bb2f29008a96a0333e4c3adda202d20909728dfe))
* add docker-compose file ([#174](https://github.com/satnaing/astro-paper/issues/174)) ([fb3fa98](https://github.com/satnaing/astro-paper/commit/fb3fa98936d76331869641014d5b4568a84d8d42)), closes [#172](https://github.com/satnaing/astro-paper/issues/172)
* add image validation to schema ([e9d4303](https://github.com/satnaing/astro-paper/commit/e9d4303219bf312bc3955bb8af9aedb0eadb17cc))
* add modified datetime in blog posts ([80e67a1](https://github.com/satnaing/astro-paper/commit/80e67a1dcad19394d7b466472f3c674470db8e0c)), closes [#134](https://github.com/satnaing/astro-paper/issues/134)
* add pagination in tag posts ([#201](https://github.com/satnaing/astro-paper/issues/201)) ([581826a](https://github.com/satnaing/astro-paper/commit/581826a5affd03d12416a5ac7d28ed17d53eac8d)), closes [#152](https://github.com/satnaing/astro-paper/issues/152)
* add transition effect if light/dark changes ([a060cb5](https://github.com/satnaing/astro-paper/commit/a060cb5c87f733c455ea247d72f88095f1ca769c))
* add view transitions for card on search page ([#118](https://github.com/satnaing/astro-paper/issues/118)) ([6c7d04f](https://github.com/satnaing/astro-paper/commit/6c7d04fa12d006379157cf876c2826f606f124e9))
* add ViewTransitions from Astro ([cbdaa59](https://github.com/satnaing/astro-paper/commit/cbdaa59baea1c5c5497227dd2fb276e8cf88b936)), closes [#96](https://github.com/satnaing/astro-paper/issues/96)
* default post author to site author ([20c8970](https://github.com/satnaing/astro-paper/commit/20c89709ada7e7c3f49460d6690d02999ba86d17))
* dynamically generate robots.txt ([6352353](https://github.com/satnaing/astro-paper/commit/63523534703c1f95ac070452001070e2c3f74d5d))
* generate og image using templates ([3032c18](https://github.com/satnaing/astro-paper/commit/3032c18321dfd4f001bc86c094881219bd2e22b7))
* implement back-to-top button in blog post page ([c526157](https://github.com/satnaing/astro-paper/commit/c526157118b69ff68e3a653eee68428a791a7d9f)), closes [#156](https://github.com/satnaing/astro-paper/issues/156)
* og image routes ([300d014](https://github.com/satnaing/astro-paper/commit/300d014fd7a83f52020bdc21976de8487eb41f63))
* replace slugified title with unslugified tag name ([#198](https://github.com/satnaing/astro-paper/issues/198)) ([b05b8fb](https://github.com/satnaing/astro-paper/commit/b05b8fb842b43f4f6462b425cb46d835579cbcfb)), closes [#179](https://github.com/satnaing/astro-paper/issues/179)
* support custom canonical URLs ([#83](https://github.com/satnaing/astro-paper/issues/83)) ([4687bd5](https://github.com/satnaing/astro-paper/commit/4687bd516b16970fc4d163c1202b28f29818a582))
* update theme-color tag on theme switch ([f253776](https://github.com/satnaing/astro-paper/commit/f25377674ebc10f496ef6e5729b931d61ec67832))


### Bug Fixes

* [#133](https://github.com/satnaing/astro-paper/issues/133) update LOCALE config to cover overall locales ([cd02b04](https://github.com/satnaing/astro-paper/commit/cd02b047d2b5e3b4a2940c0ff30568cdebcec0b8))
* [#72](https://github.com/satnaing/astro-paper/issues/72) replace SITE.website with a URL in astro.config site value ([26ecd17](https://github.com/satnaing/astro-paper/commit/26ecd173ddec1075abb6ede9bbb62572b9f74b33))
* anchor oveflow on small screen size ([d025c91](https://github.com/satnaing/astro-paper/commit/d025c914d91a9b7969c8db4bd6a700723ef86a39))
* **css:** text wrap in code blocks ([0c92492](https://github.com/satnaing/astro-paper/commit/0c92492959bed20f144d5d949116891d61c8e098))
* decode unicode tag chars in breadcrumb ([#175](https://github.com/satnaing/astro-paper/issues/175)) ([058c790](https://github.com/satnaing/astro-paper/commit/058c790d26cbeab286679a8a8e3bad6c14042d6d))
* get og image url correctly ([7f3edbd](https://github.com/satnaing/astro-paper/commit/7f3edbdecdce597d15e562e7d497d69af505d550))
* **layout:** use 100svh for min-height on body instead of 100vh ([79d569d](https://github.com/satnaing/astro-paper/commit/79d569d053036f2113519f41b0d257523d035b76)), closes [#127](https://github.com/satnaing/astro-paper/issues/127)
* og image src ([6dffcf3](https://github.com/satnaing/astro-paper/commit/6dffcf3cb36a0dab6549ee249fe426b4ee931b06))
* prevent white flash in dark mode when navigate ([9eeb8fc](https://github.com/satnaing/astro-paper/commit/9eeb8fc76ecfd45b79ab716305f1916491649c95))
* remove empty string as ogImage ([b03b722](https://github.com/satnaing/astro-paper/commit/b03b7223694b4c215c6fce0a45ed4f03178081f4))
* resolve single-line code block wrapping issue ([#121](https://github.com/satnaing/astro-paper/issues/121)) ([0af3251](https://github.com/satnaing/astro-paper/commit/0af32518b343430dd8510470efd3806509337de7))
* solve invisible text code block issue in light-mode ([#163](https://github.com/satnaing/astro-paper/issues/163)) ([64b3a28](https://github.com/satnaing/astro-paper/commit/64b3a286e6e3ff1dff7cf4ca0fc8fafc222cabcd))
* sort posts in [tag] page ([#101](https://github.com/satnaing/astro-paper/issues/101)) ([b571816](https://github.com/satnaing/astro-paper/commit/b571816dcddc72a07147389090502c09025b28a6))
* update auto-gen OG images to allow special char usage in title ([1933a6b](https://github.com/satnaing/astro-paper/commit/1933a6beae7b4e2558b808d1f8a5c124f1244138)), closes [#103](https://github.com/satnaing/astro-paper/issues/103) [#88](https://github.com/satnaing/astro-paper/issues/88)
* update rss pubDate to prioritize modDatetime if exists ([e1514b4](https://github.com/satnaing/astro-paper/commit/e1514b41024bc10bcafcc4af548a6ebe0e093468))
* update tailwind base styles config ([#116](https://github.com/satnaing/astro-paper/issues/116)) ([4a03558](https://github.com/satnaing/astro-paper/commit/4a0355865081d07d05d9d758f520e411952a1063))
* update title of the blog nowrap ([87b3e5b](https://github.com/satnaing/astro-paper/commit/87b3e5b8cd7d424b3e43e6d5abed6d21195aa759))


* build!(deps): upgrade Astro and related packages to v4 ([a1d3ddd](https://github.com/satnaing/astro-paper/commit/a1d3ddd18591843a35b3c05be762e1f8af1b8fb0)), closes [#187](https://github.com/satnaing/astro-paper/issues/187)

## [3.0.0](https://github.com/satnaing/astro-paper/compare/v2.3.0...v3.0.0) (2023-09-25)

### ⚠ BREAKING CHANGES

* Astro v3

> Check the AstroPaper v3 in [this blog post](https://astro-paper.pages.dev/posts/astro-paper-v3/)

### Features

* upgrade to astro v3 ([8fda50f](https://github.com/satnaing/astro-paper/commit/8fda50f5ddb7130b7954ad217eed1848094ee33c)), closes [#111](https://github.com/satnaing/astro-paper/issues/111)
* add view transitions for card on search page ([#118](https://github.com/satnaing/astro-paper/issues/118)) ([b873ed5](https://github.com/satnaing/astro-paper/commit/b873ed5a07e746404960690669e8960c2a4c628d))
* add ViewTransitions from Astro ([9703e54](https://github.com/satnaing/astro-paper/commit/9703e54ca4264b0437e06c45bbcc53a7a7d1e106)), closes [#96](https://github.com/satnaing/astro-paper/issues/96)
([b873ed5](https://github.com/satnaing/astro-paper/commit/b873ed5a07e746404960690669e8960c2a4c628d)), closes [#96](https://github.com/satnaing/astro-paper/issues/96)
* generate OG image using templates ([0f82206](https://github.com/satnaing/astro-paper/commit/0f822060cec82b218b568e9ef311fe6adc8b7a1e))
* support custom canonical URLs ([#83](https://github.com/satnaing/astro-paper/issues/83)) ([4687bd5](https://github.com/satnaing/astro-paper/commit/4687bd516b16970fc4d163c1202b28f29818a582))
* update theme-color tag on theme switch ([b5f5418](https://github.com/satnaing/astro-paper/commit/b5f54180c8645113ae4e177f3ebb97e1947dc9e2))
* use new og images in layout ([ec3c691](https://github.com/satnaing/astro-paper/commit/ec3c69114f7344b27797853e2e5a573feb5c63fc))


### Bug Fixes

* replace SITE.website with a URL in astro.config site value ([26ecd17](https://github.com/satnaing/astro-paper/commit/26ecd173ddec1075abb6ede9bbb62572b9f74b33)), fixes [#72](https://github.com/satnaing/astro-paper/issues/72)
* **css:** make code scrollable in code blocks ([0c92492](https://github.com/satnaing/astro-paper/commit/0c92492959bed20f144d5d949116891d61c8e098))
* remove empty string as ogImage ([5259994](https://github.com/satnaing/astro-paper/commit/5259994525b0b67a584b4268a3fbb74258871a3a))
* resolve single-line code block wrapping issue ([#121](https://github.com/satnaing/astro-paper/issues/121)) ([8f08018](https://github.com/satnaing/astro-paper/commit/8f0801836a589133932dc5a450060fd2f16daf74))
* sort posts in [tag] page ([#101](https://github.com/satnaing/astro-paper/issues/101)) ([b571816](https://github.com/satnaing/astro-paper/commit/b571816dcddc72a07147389090502c09025b28a6))
* update auto-gen OG images to allow special char usage in title ([f26bf85](https://github.com/satnaing/astro-paper/commit/f26bf8581288523a0d6021a141cdada685fbce46)), closes [#103](https://github.com/satnaing/astro-paper/issues/103) [#88](https://github.com/satnaing/astro-paper/issues/88)
* update tailwind base styles config ([#116](https://github.com/satnaing/astro-paper/issues/116)) ([98a2bb6](https://github.com/satnaing/astro-paper/commit/98a2bb682af2773d6af7782a6592e9b9fab79b3b))
* update title of the blog nowrap ([2df71b9](https://github.com/satnaing/astro-paper/commit/2df71b9b4587c7a2438f483e8365ef5b8a502ce7))

## [2.3.0](https://github.com/satnaing/astro-paper/compare/v2.2.0...v2.3.0) (2023-05-15)


### Features

* add locale configuration for Datetime component ([#59](https://github.com/satnaing/astro-paper/issues/59)) ([0e9f709](https://github.com/satnaing/astro-paper/commit/0e9f709c5dbd9a75aaf33e7994e88216fd56d8be))


### Bug Fixes

* add missing sitemap in head ([#69](https://github.com/satnaing/astro-paper/issues/69)) ([f6ac810](https://github.com/satnaing/astro-paper/commit/f6ac8104b2ba20de3b71eb5dde395e5adce9dfe7))
* build error astro@2.1.4 && update astro@2.1.5 ([#49](https://github.com/satnaing/astro-paper/issues/49)) ([dd4fd98](https://github.com/satnaing/astro-paper/commit/dd4fd989722cbcb3e98045e808a32292cf555900))
* **ignore:** added yarn directories to ignorefiles ([f3e9cd5](https://github.com/satnaing/astro-paper/commit/f3e9cd51479fd41f3c0e8863ac13c77d6daa2605))
* replace history entries when searching ([#62](https://github.com/satnaing/astro-paper/issues/62)) ([a57f343](https://github.com/satnaing/astro-paper/commit/a57f3439f801c1d41256a8a46bd319c17dff86f1))
* slugify tags in post detail page ([49d7f77](https://github.com/satnaing/astro-paper/commit/49d7f77a86987c00d211090301b662e21a27ce17))
* sort rss feed from latest to oldest ([#38](https://github.com/satnaing/astro-paper/issues/38)) ([9e62b63](https://github.com/satnaing/astro-paper/commit/9e62b637e8ddb65f5f274fd0154191212dda0590))
* tailwind jsdoc for intellisense ([99709dd](https://github.com/satnaing/astro-paper/commit/99709dd3aa2329220a497f7038b7ab069d389847))
* update lint-staged configuration ([e654c03](https://github.com/satnaing/astro-paper/commit/e654c0308c26ccffdd0a4abc50f0adb99c76d9ca)), closes [#52](https://github.com/satnaing/astro-paper/issues/52)
* update menu element with svg and refactor toggle logic ([0f76424](https://github.com/satnaing/astro-paper/commit/0f764242fea14565798085447d8524b4bf05f76a))

## [2.2.0](https://github.com/satnaing/astro-paper/compare/v2.1.0...v2.2.0) (2023-03-16)


### Features

* generate og images in png format ([#43](https://github.com/satnaing/astro-paper/issues/43)) ([27507d1](https://github.com/satnaing/astro-paper/commit/27507d1d78531901c20a17d9ce72728c6cbb521e)), closes [#40](https://github.com/satnaing/astro-paper/issues/40)


### Bug Fixes

* add plugin-search-dir in prettier write for pnpm ([e49ca61](https://github.com/satnaing/astro-paper/commit/e49ca61d6b7048a8e8b2f50b1d947fd91eaca3eb)), ([37b54af](https://github.com/satnaing/astro-paper/commit/37b54afd9471eb35588e09f1f33ae1634732b02c)), closes [#34](https://github.com/satnaing/astro-paper/issues/34)
* correct typo in blog posts ([cbce54b](https://github.com/satnaing/astro-paper/commit/cbce54bd1cf951c36a8603db8f7a8487481fc7f1)), closes [#35](https://github.com/satnaing/astro-paper/issues/35)
* slugifyAll typo ([bcae985](https://github.com/satnaing/astro-paper/commit/bcae9856712773887664bb3a3392e1ebfd78607b))

### Others

* update Astro to v2.1.3 and enable type checking in dev ([329bc22](https://github.com/satnaing/astro-paper/commit/329bc22e97892e5687a841d580215c8fb2d44aa1))
* add jampack for performance optimization ([#46](https://github.com/satnaing/astro-paper/pull/46)) ([b9254c1](https://github.com/satnaing/astro-paper/commit/b9254c15f1b382c2f3900b3371abce8975768dd9))

## [2.1.0](https://github.com/satnaing/astro-paper/compare/v2.0.0...v2.1.0) (2023-02-08)


### Features

* add ESLint and update linting errors ([#26](https://github.com/satnaing/astro-paper/issues/26)) ([a9631d0](https://github.com/satnaing/astro-paper/commit/a9631d0e1e65ac4339c6b4d806b3a17928fa2b62))


### Bug Fixes

* make schema(s) strict ([#23](https://github.com/satnaing/astro-paper/issues/23)) ([dc026b3](https://github.com/satnaing/astro-paper/commit/dc026b38defa760d77eddcddb1d4f12fdf8fff99))
* fix typo and remove unnecessary comments ([#24](https://github.com/satnaing/astro-paper/pull/24)) ([d9a2ffe](https://github.com/satnaing/astro-paper/commit/d9a2ffe9096e2419a740c5b98b57323fbf2f2cb0)) ([#25](https://github.com/satnaing/astro-paper/pull/25)) ([29e0776](https://github.com/satnaing/astro-paper/commit/29e07761f78fa24b307601bf2272a61e084a468b))
* update dependencies

## [2.0.0](https://github.com/satnaing/astro-paper/compare/v1.4.0...v2.0.0) (2023-01-31)


### ⚠ BREAKING CHANGES

Check the AstroPaper v2 in [this blog post](https://astro-paper.pages.dev/posts/astro-paper-2/)

* **deps:** Migration of Astro to version 2

### Features

* add Mastodon social link ([2ec3912](https://github.com/satnaing/astro-paper/commit/2ec39128c65fd0b1dafd6aebd48ac3068f40f9c5))
* add new predefined color scheme 'astro dark' ([bc263b6](https://github.com/satnaing/astro-paper/commit/bc263b6eac00fbc8ec62481f2ec0317ee11bc83a))
* define blog schema and add blog collection ([b420e68](https://github.com/satnaing/astro-paper/commit/b420e688ca3a197a7e4ea2591193fd09da817ec7))


### Bug Fixes

* add embedFont option for Satori ([9322123](https://github.com/satnaing/astro-paper/commit/93221239ddaebaa9ab183871cf978548ea8d0ea5))
* exclude draft posts in specific tag page ([c192cd8](https://github.com/satnaing/astro-paper/commit/c192cd8e5042d4481bcb0d0389866cf4a969aa8d))
* fix broken tags in PostDetails page ([a61fd45](https://github.com/satnaing/astro-paper/commit/a61fd455594932c66380a358b81b8bebb9d604cc))
* fix typo in title and slug ([945acf4](https://github.com/satnaing/astro-paper/commit/945acf4260e0ea79bde8b180835049eda07d3e6a))
* hide social links section if no link is active ([42eb018](https://github.com/satnaing/astro-paper/commit/42eb0188896a8475a7fbb894775e5500ca8b7d35)), closes [#16](https://github.com/satnaing/astro-paper/issues/16)
* make the last part of breadcrumb lowercase in specific tag page ([c556202](https://github.com/satnaing/astro-paper/commit/c556202c972f1f9fed9af0ba6abf199e7deccc5f))
* resolve initial onChange input value bug ([bf4f687](https://github.com/satnaing/astro-paper/commit/bf4f687d2d87cfeef96141c5324d02c37766845b))
* update card bg color ([8a99601](https://github.com/satnaing/astro-paper/commit/8a99601e93f90c0870a22aa4a8ea8b7ff1b76a98))
* use default-og for twitter card ([9434d85](https://github.com/satnaing/astro-paper/commit/9434d850e1f41f0802de5706c4c5712e5b5def9d))


### build

* **deps:** bump astro and its packages to v2 ([5f279b3](https://github.com/satnaing/astro-paper/commit/5f279b34f88bd94bed820d16c1e1d5e95859045f))

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
