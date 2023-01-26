# pashto-inflector

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Netlify Status](https://api.netlify.com/api/v1/badges/ca3a7720-876f-4375-a77e-2e7bfdcee48a/deploy-status)](https://app.netlify.com/sites/pashto-verbs/deploys)
![build](https://github.com/lingdocs/pashto-inflector/actions/workflows/ci.yml/badge.svg)
![build](https://github.com/lingdocs/pashto-inflector/actions/workflows/publish.yml/badge.svg)

A pashto inflection and verb conjugation engine, as well as functions and components for modifying and displaying Pashto text.

#### [Pashto Inflector Website/Demo](https://pashto-inflector.lingdocs.com)

This is **published as two libraries**:

- @lingdocs/inflect
    - `/src/components`
    - The core inflection engine with grammatical information and tools for processing LingDocs dictionary entries and Pashto text.
    - Can be used with Node 16, as CommonJS
- @lingdocs/ps-react
    - `/src/lib`
    - @lingdocs/inflect plus react components for displaying Pashto text, phrase engine UI etc.
    - Only available as an ES6 Module

`@lingdocs/pashto-inflector` **is deprecated**. Use `@lingdocs/inflect` or `@lingdocs/ps-react` instead.

## Development

The Pashto Verb Explorer website can be used to view and play with the verb conjugations and various components. 

```
yarn install
yarn start
```

## Building

⚠ Don't use `yarn build`. Use one of the commands below: ⚠

### Website

To build the [Pashto Verb Explorer](https://verbs.lingdocs.com) website:

```
yarn build-website
```

This outputs a site at `/build`

### Libraries

To build the `@lingdocs/inflet` and `@lingdocs/ps-react` libraries ready for publishing to NPM:

```
yarn build-library
```
