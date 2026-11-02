
# Kanban Board PWA

A simple Kanban Board built with SvelteKit and JavaScript.

## Features

- Four lanes: Do, Doing, Done, Archiv
- Create issues using an HTML dialog
- Drag and drop without an external library
- Save issues and their lanes in localStorage
- Display story points per lane
- Overdue warnings
- Notifications when an issue moves to Done
- Export individual issues as ICS
- Share issues using the Web Share API
- Export all issues as CSV
- Installable Progressive Web App
- Offline support

## Technologies

- SvelteKit
- Svelte 5
- JavaScript
- CSS
- date-fns
- localStorage
- HTML Drag and Drop API
- Web Share API
- Notification API
- vite-plugin-pwa

## Installation

npm install

## Development

npm run dev

## Production

npm run build
npm run preview

## How to use

1. Click New Issue.
2. Fill in the form.
3. Create the issue.
4. Drag issues between lanes.
5. Export or share individual issues.
6. Export all issues as CSV.

## Storage

Issues are stored locally in the browser using localStorage.

No database or user account is required.

## Offline usage

Open the production version once while online.
The application can then reuse cached resources offline.

## Author

Sara Zaganjori
