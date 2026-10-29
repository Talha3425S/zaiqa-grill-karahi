https://zaiqa-grill-karahi-hbeu-4xtmgslds-tahche1.vercel.app/

# Zaiqa Grill & Karahi — React + Vite

A responsive fictional Pakistani restaurant website built with React, Vite, CSS, Lucide icons.

## Requirements
- Node.js 20.19+ or 22.12+ recommended
- Internet connection for remote food photography, Google Fonts, the map embed and package installation

## Run locally
1. Extract the ZIP.
2. Open the `zaiqa-grill-react` folder in VS Code.
3. Open the terminal in that folder and run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL Vite prints, usually `http://localhost:5173`.

## Build for deployment
```bash
npm run build
npm run preview
```
Deploy the project to Vercel or Netlify. For Vercel, choose the Vite framework preset if it is not detected automatically.

## Included
- React components and hooks
- Responsive restaurant landing page and mobile navigation
- Filterable menu with sample dishes and PKR prices
- Featured dishes section, plus a menu with category filters (BBQ, Karahi, Rice, Drinks, Desserts)
- Reservation form with inline, accessible validation messages and a friendly demo confirmation
- WhatsApp order links, click-to-call, location map and hours
- SEO metadata, Open Graph tags and Restaurant JSON-LD
- Reduced-motion support, image alt text, skip link, visible keyboard focus styles, AA-contrast text and lazy-loaded menu images

## Before submitting
- In `index.html`, replace `https://YOUR-SITE.vercel.app` (Open Graph / Twitter / JSON-LD image URLs) with the deployed URL.
- Replace the sample WhatsApp and phone numbers with a suitable number.
- Confirm the fictional restaurant location, opening hours and sample menu.
- The reservation form is frontend-only and does not submit to a server.
- The review quotes and prices are sample content.
- Run Lighthouse on the deployed mobile site and include the screenshot in your task submission.

## What I would improve with more time
- Connect reservations to a backend and send confirmation messages.
- Use locally optimized AVIF/WebP images.
- Add automated responsive and accessibility tests.
- Self-host optimised WebP/AVIF images instead of hotlinking Unsplash, and add a real backend for reservations.


## If Vite shows “Unexpected end of JSON input”
- Check for an empty or incomplete `postcss.config.json` in the project root and remove it if it is not needed.
- This project includes `postcss.config.cjs` with a valid empty plugin configuration and `vite.config.js`.
- After replacing files, stop the Vite server with Ctrl+C, run `npm install`, then `npm run dev`.
