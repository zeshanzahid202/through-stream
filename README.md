# Through Stream / TravelVerse

A responsive travel planner with destination discovery, favorites, daily itineraries, expense tracking, profile preferences, itinerary exports and shareable itinerary snapshots.

## Local development

Use Node.js 22. Run `npm ci`, then `npm run dev`.

Run `npm run lint` for TypeScript checks and `npm run build` for the production build. `npm run preview` serves the built app.

## Vercel deployment

Import `zeshanzahid202/through-stream` into Vercel. Select Vite, keep the root directory as `.`, build command `npm run build`, and output directory `dist`. No environment variables or API keys are required. These defaults are also saved in `vercel.json`.

## Data and sharing

Trips, expenses, favorites, custom destinations and profile preferences are saved in browser local storage. This release has no login, database, booking service, newsletter delivery or cloud sync. The destination manager is a local tool; sample users and travel statistics are demonstration data, not a secured administration system.

Share links embed an itinerary snapshot, including notes. Anyone receiving the link can import it into their browser. Later changes are not synchronized; very large itineraries are better shared using the text export. Export important plans before clearing browser data. External photos and fonts require internet access. Prices and destination information are illustrative.
