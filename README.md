## Getting Started

Run the development server:

```bash
npm run dev
Open http://localhost:3000 to view it in your browser.

Tooling & Conventions
ESLint
Strict TypeScript rules

No any allowed

No console.log (only console.warn and console.error are permitted)

Automatic unused import removal

ESLint autofix enabled on commit and save

npx eslint . --fix
Prettier
Prettier is configured with prettier-plugin-tailwindcss

Tailwind CSS class order is automatically sorted


npx prettier . --write

Commit Rules
Only feat: and fix: prefixes are allowed in commit messages

All commits are linted with commitlint
```

## Examples

```bash


git commit -m "feat: add login form"
git commit -m "fix: button layout issue"
Other types like chore:, test:, etc. will be rejected.

Branch Name Rules
Only the following branch name patterns are accepted:
```

```bash

feat/my-feature
fix/my-bug
Anything outside of this (e.g. main, dev, testbranch) is blocked from pushing.

Husky + lint-staged
Commits trigger eslint --fix and prettier --write via lint-staged

pre-commit, commit-msg, and pre-push hooks are enforced

VS Code Format on Save
The .vscode/settings.json is versioned and ensures:

Format on save is enabled

ESLint autofix (including unused import removal) on save

Tailwind class sorting on save via Prettier

No manual formatting needed — just save the file.

Required Extensions:
Prettier - Code Formatter
```

## Scripts

```bash
npm run dev      # Start dev server
npm run lint     # Run ESLint
npm run format   # Run Prettier
```
