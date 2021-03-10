# pashto-inflector

[![Netlify Status](https://api.netlify.com/api/v1/badges/ca3a7720-876f-4375-a77e-2e7bfdcee48a/deploy-status)](https://app.netlify.com/sites/pashto-verbs/deploys)
![build](https://github.com/lingdocs/pashto-inflector/actions/workflows/main.yml/badge.svg)

A pashto inflection and verb conjugation engine, as well as functions and components for modifying and displaying Pashto text.

Also includes the [Pashto Verb Explorer](https://verbs.lingdocs.com) website.

## Development

The Pashto Verb Explorer website can be used to view and play with the verb conjugations and various components. 

```
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

### Library

To build the `pashto-inflector` library ready for publishing to NPM:

```
yarn build-library
```
