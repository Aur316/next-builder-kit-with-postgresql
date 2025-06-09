# How can you use this repository?

1. Clone the repository and install dependencies

```bash
git clone https://github.com/Aur316/next-builder-kit.git
```

```bash
cd next-builder-kit
```

```bash
rm -rf .git
```

2. If you'd rather start with a new repository based on this one, click the green <code style="color : green">Use this template</code> button at the top of the GitHub page. This will let you generate a fresh copy of the repository under your own GitHub account, preserving all files but without commit history.

3. Create with one command

```bash
npx next-builder-kit
```

# Getting Started

At first install the dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 to view it in your browser.

## Tooling & Conventions: ESLint, Strict, TypeScript rules

- No <code>any</code> type allowed

- No console.log (only console.warn and console.error are permitted)

- Automatic unused import removal

- Tailwind CSS class order is automatically sorted

- ESLint autofix enabled on commit and save

## Commit Rules

Only:

- feat:
- fix:
- chore:
- docs:
- style:
- refactor:
- perf:
- test:
- ci:
- build:
- revert:

prefixes are allowed in commit messages.

All commits are linted with commitlint.

### Examples:

```bash
git commit -m "feat: add login form"
```

```bash
git commit -m "fix: button layout issue"
```

## Branch Name Rules

Only the following branch name patterns are accepted:

- feat/
- fix/
- chore/
- docs/
- style/
- refactor/
- perf/
- test/
- ci/
- build/
- revert/

### Examples:

```bash
feat/my-feature
```

```bash
fix/my-bug
```

Anything outside of this (e.g. main, dev, testbranch) is blocked from pushing.

## VS Code Format on Save

The .vscode/settings.json is versioned and ensures:

- Format on save is enabled

- ESLint autofix (including unused import removal) on save

- Tailwind class sorting on save via Prettier

- No manual formatting needed — just save the file

- Group and sort imports on save, and insert an empty line between each group

## Import pattern

Added index.ts files to all major module folders to centralize exports.
This allows simplified and consistent imports, improves maintainability, and decouples internal file structures from consumers.

### Preferences

1. Cleaner and shorter import paths
2. Easier refactors — no need to rewrite import paths if file names change
3. Promotes encapsulation and folder-as-module thinking

## What else does this repository provide?

- Base UI elements such as buttons with icon positions, inputs with labels, styled checkboxes, toggles, and dropdown components
- [swiperjs](https://swiperjs.com/) integration for gallery support
- A basic, responsive navbar optimized for both mobile and desktop
- [i18n](https://www.i18next.com/) integration for multi-language support
- A simple store setup using the Context API
- [TanStack React Query](https://tanstack.com/query/latest) integration with devtools
- Toast provider via Sonner with customizable toast messages
- A custom 404 page is included and automatically rendered for unknown routes

## DaisyUI

[DaisyUI](https://daisyui.com/) is also integrated for utility-first, styled UI components built on top of [Tailwind](https://tailwindcss.com/) CSS. It helps speed up development with pre-designed, customizable elements.

## HTTP Client & API Utilities

Axios is configured with dynamic baseURL support, allowing you to switch between local API routes (/api) and an external server (NEXT_PUBLIC_API_URL) via environment variables.

A custom useHttp() hook is included to standardize all HTTP requests across the app with strong TypeScript support.

It provides generic wrappers for GET, POST, PUT, PATCH, and DELETE methods, reducing boilerplate and improving consistency across API calls.

### Example:

```bash
const { httpGet, httpPost } = useHttp()

await httpGet<Array<User>>('/users')
await httpPost('/form', { name: 'John' })

```

## Environment Variables

To configure environment-dependent behavior, create a `.env.local` file with:

```env
NEXT_PUBLIC_USE_EXTERNAL_API=true
NEXT_PUBLIC_API_URL=http://localhost:5000
```

# License

MIT © [Aur316](https://github.com/Aur316)
