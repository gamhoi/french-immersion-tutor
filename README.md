# French Immersion Tutor

A dynamic, gamified Next.js web application designed to help users learn and practice French in immersive summer camp scenarios. 

## Features

- **Interactive Curriculum**: 22 carefully crafted lessons spread across various units like Arrival, Meals, Routine, and Arts.
- **Multiple Exercise Types**: Engage with Reading, Listening, Spelling, Multiple Choice, and Word Bank exercises.
- **Audio Support**: Hear native-like French pronunciation for words and sentences.
- **Progress Tracking**: Your progress is automatically saved to your local storage, tracking your stars, gems, and daily streaks.
- **Responsive Design**: Beautiful, mobile-friendly interface built with Tailwind CSS and Shadcn UI.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Automated Testing

This project includes a complete End-to-End (E2E) testing suite powered by Playwright. The script automatically traverses the entire curriculum to verify all interactions.

To run the tests:

```bash
npm run test:e2e
```

## Deployment

This repository is configured to automatically deploy to GitHub Pages via GitHub Actions whenever changes are pushed to the `main` branch.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
