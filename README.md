# TriggerWarnings

A mobile app for Android and iOS that tells you whether a movie fits your trigger warnings, without spoilers.

## How it works

1. **Set your triggers.** Tick the trigger warnings that matter to you from a checklist, and rate how sensitive you are to each one from 1 to 10.
2. **Search a movie.** The app checks the film against trigger-warning data and gives you a simple verdict: you can or can't watch it based on your triggers.
3. **No spoilers by default.** The app never names which triggers a film contains unless you ask.

## Planned features

- An overall score, "this film would trigger you x/10", based on the average of your matching triggers.
- An extra warning when any individual trigger scores above 7.
- An optional breakdown of the individual ratings out of 10, with trigger names hidden.
- A tap-to-reveal option to see the name of a specific trigger if you really want to.

## Data sources

Trigger and content-warning data will come from existing online databases (to be investigated).

## Status

Early prototype. The screens work end to end with placeholder data: a fictional movie list and a made-up trigger catalogue. Real search and trigger data will come through a small backend proxy, so no API keys live in the app.

## Development

The app is built with [Expo](https://expo.dev) (React Native, TypeScript, Expo Router).

```bash
npm install
npx expo start
```

Then press `i` for the iOS simulator or `a` for the Android emulator. Expo Go is installed on the device automatically.

```bash
npm run typecheck
npm run lint
```

Code layout:

- `src/app/` screens (Expo Router: every file is a route)
- `src/data/` placeholder trigger list and mock movies
- `src/lib/verdict.ts` the scoring that turns your sensitivities and a film's content into a verdict
- `src/state/` your saved trigger choices, stored on the device
