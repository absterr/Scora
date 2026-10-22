# Scora

An AI video communication application built with React Native, Expo and NativeWind.

## Features

- File-based navigation via Expo Router.
- Native UI styling utilizing Tailwind CSS v3 via NativeWind.
- Fully typed with TypeScript.

## Tech Stack

- **Framework:** Expo (~57.0), React Native (0.86.3)
- **Language:** TypeScript, React 19
- **Routing:** Expo Router
- **Styling:** NativeWind (Tailwind CSS v3)
- **Animations/Gestures:** `react-native-reanimated`, `react-native-gesture-handler`

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [npm](https://www.npmjs.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- iOS Simulator (macOS only) or Android Emulator for local testing, or the Expo Go app on a physical device.

### Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### Development

Start the Metro development server:

```bash
npm run start
```

Press `i` to open in the iOS simulator, `a` to open in the Android emulator, or scan the QR code with your physical device using Expo Go.

### Linting

Run the Expo linter to check for code issues:

```bash
npm run lint
```

## Project Structure

```text
Scora/
├── assets/             # Static assets
│   ├── fonts/          # Custom app fonts
│   └── images/         # Image assets
├── src/
│   ├── app/            # Expo Router file-based screens and layouts
│   ├── components/     # UI components and icons
│   │   ├── icons/      # Categorized SVGs (line, solid, crypto, social)
│   │   └── ui/         # Shared base components (buttons, inputs)
│   ├── lib/            # Utilities, API helpers, and shared logic
│   └── global.css      # NativeWind/Tailwind base imports
├── scripts/            # Project utility scripts
├── app.json            # Expo configuration
├── package.json        # Dependencies and scripts
└── tailwind.config.js  # Tailwind CSS configuration
```

## Development Guidelines

Project-specific development conventions, styling rules, and architecture instructions are documented in [`AGENTS.md`](./AGENTS.md). Please review it before contributing.
