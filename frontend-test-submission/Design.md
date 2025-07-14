# URL Shortener Frontend - Design & Architecture

## Overview
This is a client-side React application (built with Vite and Tailwind CSS) that allows users to shorten URLs, manage custom shortcodes, set expiry, and view analytics for all created short URLs. All data is managed in the browser (localStorage).

## Component Structure
- **App.jsx**: Main entry, sets up React Router and navigation bar.
- **pages/ShortenerPage.jsx**: Main form for shortening URLs (up to 5 at once), with validation and results display.
- **pages/StatsPage.jsx**: Shows a table of all created short URLs, their expiry, and click analytics.
- **pages/RedirectHandler.jsx**: Handles client-side redirection for short URLs, tracks clicks, and logs events.
- **utils/logger.js**: Reusable logger utility, used throughout the app for all major actions and errors.

## State Management
- **React useState/useEffect**: For local UI state.
- **localStorage**: Persists all shortened URLs, their metadata, and click analytics across sessions.

## Routing
- **/**: Shortener form
- **/stats**: Statistics page
- **/:shortcode**: Redirect handler (looks up the code, tracks click, redirects or shows error)

## Logging
- All major actions (shorten, error, redirect, stats view) use the logger utility, which sends logs to the provided API endpoint.
- Logger is imported from `src/utils/logger.js` and used in all pages.

## Key Design Decisions
- **No backend**: All logic and data are managed on the client for this assessment.
- **Shortcode uniqueness**: Ensured by checking against all codes in localStorage.
- **Expiry**: Calculated and checked on each redirect and stats view.
- **Responsive UI**: Tailwind CSS is used for a clean, modern, and responsive design.
- **No personal/company info**: All code, README, and commit messages are neutral.

## Assumptions
- Users are pre-authorized; no login is required.
- All analytics and data are local to the browser.
- The logger is called for all required events as per the instructions.

---
This document covers the main architectural and design choices for the frontend submission. 