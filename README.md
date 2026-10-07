# Ravindra — Portfolio (plain HTML, CSS, JavaScript)

No build step, no npm, no frameworks.

- `index.html` – page structure
- `style.css` – all styling and animations
- `script.js` – all behaviour (loader, scroll effects, lanyard physics, skills table, accordion, form)
- `data.js` – **your content**: edit text, skills, projects, timeline here (search for `TODO(user)`)

## Run
Open `index.html` in a browser, or serve the folder: `python -m http.server 5180`.
(The Résumé button checks for the PDF via a request, so it only activates when served over http(s), not from `file://`.)

## Add your files
Put `photo.jpg` and `Ravindra_Babu_Resume.pdf` next to `index.html`. Until then: gradient monogram and "Resume coming soon".

## Contact form
Create a form at formspree.io and paste its ID into `formspreeId` in `data.js`. While empty, the form opens a mailto: draft.

## Deploy
Upload the folder as-is to Vercel, Netlify, GitHub Pages, or any static host (Vercel: "Other" framework, no build command, output `.`).
Set your real URL in the canonical/Open Graph tags in `index.html`.
