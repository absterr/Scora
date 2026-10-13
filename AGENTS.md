# AGENTS.md

## Project Overview

- **Scora** — An AI meeting video application built with React Native and Expo.
- Stack: Expo (~57.0.28), React Native (0.86.3), React 19, TypeScript, Expo Router, NativeWind v4 (Tailwind CSS v3).
- Code style/linting: ESLint & Prettier (via `expo lint` and `prettier-plugin-tailwindcss`).

## Environment Setup & Run

- Install all dependencies: `npm install`
- Install a single package: `npm install <package>`
- Start the Metro bundler: `npm run start`
- Run on iOS (requires macOS/Xcode): `npm run ios`
- Run on Android (requires Android Studio/emulator): `npm run android`
- Run on Web: `npm run web`
- Check linting: `npm run lint`
- Reset project/cache: `npm run reset-project`

## Project Structure

- `src/app/` — Expo Router routes (file-based routing). Screens, `_layout.tsx`, and `+not-found.tsx` files belong here.
- `src/components/` — React components.
  - `src/components/ui/` — Shared, basic UI components (e.g., buttons, inputs).
  - `src/components/icons/` — SVG icons categorized into `/line`, `/solid`, `/crypto`, and `/social`.
  - Co-locate screen-specific components in their own folders within `src/components/` or directly next to the screen in `src/app/` if they are strictly single-use.
- `src/lib/` — Helpers, utility functions, hooks, and API clients.
- `assets/` — Static assets used in the app.
  - `assets/fonts/` — Custom typography.
  - `assets/images/` — Application images.
- `global.css` — Global Tailwind imports and base styles.

## Coding Conventions

- Prefer functional programming; avoid mutating globals.
- File names must use **kebab-case**, except for component files which use **PascalCase**. Expo Router files in `src/app/` must follow Expo Router naming conventions (e.g., `[id].tsx`, `_layout.tsx`).
- Use default exports for screen components in `src/app/` and `src/components/`. Named exports are preferred for utilities, helpers, hooks and constants.
- The only exception to default exports is forwardRef components in `src/components/` which use named exports as they may also export needed types.

## Component Structure & UI

- Write semantic, accessible markup using React Native primitives (`View`, `Text`, `Pressable`, etc.).
- Ensure tap targets (`Pressable`, `TouchableOpacity`) are large enough (minimum 44x44 points) for mobile accessibility.
- Handle safe areas properly using `react-native-safe-area-context`.

## Tailwind CSS (v3 via NativeWind)

- **Syntax:** Use Tailwind v3 syntax. NativeWind v4 compiles Tailwind v3 classes to React Native styles.
- **Style Placement:** Keep styles inline using the `className` prop. `global.css` should only contain the Tailwind directives and genuinely global configurations.
- **Values & Scale:** Use Tailwind scale values where possible. Arbitrary values (`w-[100px]`) are permitted in v3 but should be avoided if a standard theme value exists.
- **Margins:** Avoid margins unless truly necessary (e.g. spacing an icon from adjacent text).
- **Layouts:** Use Flexbox and `gap-*` or padding for layout control. React Native uses Flexbox by default with `flex-direction: column`.
- **Class Ordering:** Base styles first, followed by state/platform variants (e.g., `active:`, `ios:`, `android:`).
- **Merging:** Use `cn` from `src/lib/utils.ts` (uses `clsx` and `tailwind-merge`) if available to combine classes conditionally or when building reusable UI components.

## Response Style & Format

- Respond in clear, succinct, structured text. Use headers/bullets for prose explanations, not as a substitute for writing less code.
- Keep answers concise by default. Expand only when explicitly asked for detail.
- Do NOT use em dashes (—). Use commas, periods, or parentheses instead.
- Do not narrate your reasoning process, internal deliberation, or step-by-step thinking as visible text. Only output the final response.

## Safety & Access

- Never call external APIs or network endpoints unless I explicitly say to.
- Do not touch files outside the repo.
- Prohibited: `rm -rf /` and any destructive command run against paths outside the working tree.
- Never execute shell commands that include unsanitized user input.
- Never `sudo`; if root privilege is needed, ask a human.

## Documentation & Dependency Versions

- Always reference standard React Native and Expo documentation.
- Verify package versions against `package.json` before utilizing specific APIs (e.g., `expo-router` v3/v4 behaviors).

## Commit messages

- Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) format: `<type>[optional scope]: <description>`
- **Title line (type + scope + description) must stay under 50 characters.**
- **Default to the title line only.** Add a body only when the title can't carry the necessary context on its own.
- Use `feat` for new features and `fix` for bug fixes; other types like `build`, `chore`, `ci`, `docs`, `style`, `refactor`, `perf`, and `test` are also allowed.
- Keep the description short, lowercase, and in the imperative mood (e.g. `fix: correct array parsing with multiple spaces`).
- Add an optional scope in parentheses after the type to indicate the affected area, e.g. `feat(parser): add ability to parse arrays`.
- When a body is needed, keep it as short as possible, just enough to deliver the message. Wrap it at 72 characters per line (a limit, not a target).
- For breaking changes, add `!` immediately before the colon (e.g. `feat!:`) and/or include a `BREAKING CHANGE:` footer with a description.
- Footers (e.g. `Refs:`, `Reviewed-by:`) go one blank line after the body (or after the description, if no body is used).
- Do NOT mix multiple unrelated changes (e.g. a feature and a fix) into a single commit, split them instead unless they are tightly related or coupled.
