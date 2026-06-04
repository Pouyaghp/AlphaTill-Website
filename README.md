# AlphaTill — Website

Marketing site for **AlphaTill**, the luxury point-of-sale system for takeaways.
Live domain: **alphatill.store**

This is a static site (plain HTML/CSS/JS) — no build step required.

## Pages
| File | Page |
|------|------|
| `index.html` | Home |
| `features.html` | Features |
| `pricing.html` | Pricing (example prices — edit to real plans) |
| `about.html` | About |
| `contact.html` | Book a demo / contact form |

## Structure
```
css/style.css   All styling (dark & gold theme)
js/main.js      Menu, scroll animations, form handling
img/logo.png    AlphaTill logo
```

## Local preview
Double-click `index.html`, or run a local server:
```
npx serve .
```

## Deploy
See `HOSTING-GUIDE.md` for connecting alphatill.store via Cloudflare Pages or Netlify.

> Note: this repository is intentionally **separate** from the AlphaTill program
> repository so the marketing site is never bundled into the application installer.
