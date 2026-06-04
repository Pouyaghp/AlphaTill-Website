# Putting alphatill.store online

Your site is a set of plain HTML/CSS/JS files in this `website` folder. It needs a
static host. The easiest route — free, fast, with free HTTPS — is **Cloudflare Pages**.
A Netlify alternative is at the bottom.

---

## Option A — Cloudflare Pages (recommended)

This also lets Cloudflare manage your domain, which is the simplest way to connect a
Namecheap domain.

### 1. Create the site
1. Sign up at https://dash.cloudflare.com (free).
2. In the left menu: **Workers & Pages → Create → Pages → Upload assets**.
3. Name it `alphatill`.
4. Drag in the **contents of this `website` folder** (the `index.html`, `features.html`,
   `pricing.html`, `about.html`, `contact.html`, plus the `css`, `js`, `img` folders).
   Do **not** zip — drag the files/folders themselves.
5. Click **Deploy**. You'll get a live URL like `alphatill.pages.dev` — check it works.

### 2. Point alphatill.store at it
1. In Cloudflare: **Websites → Add a site → `alphatill.store`** (Free plan).
2. Cloudflare shows you **two nameservers** (e.g. `xxx.ns.cloudflare.com`).
3. Log in to **Namecheap → Domain List → Manage** next to alphatill.store.
4. Under **Nameservers**, choose **Custom DNS** and paste Cloudflare's two nameservers.
   Save. (Propagation takes anywhere from minutes to a few hours.)
5. Back in Cloudflare: **Workers & Pages → alphatill → Custom domains → Set up a custom
   domain → `alphatill.store`** (and add `www.alphatill.store` too). Cloudflare wires up
   the DNS and the HTTPS certificate automatically.

Done — https://alphatill.store is live.

**To update the site later:** open the Pages project → **Create deployment** → drag the
updated files in again.

---

## Option B — Netlify (no nameserver change needed)

1. Sign up at https://app.netlify.com (free).
2. **Add new site → Deploy manually**, then drag the **contents of the `website` folder** in.
3. You get a `something.netlify.app` URL — check it.
4. **Domain settings → Add a domain → `alphatill.store`**. Netlify shows DNS records.
5. In **Namecheap → Manage → Advanced DNS**, add the records Netlify gives you
   (an `A` / `ALIAS` record for the root and a `CNAME` for `www`). Save.
6. Netlify issues HTTPS automatically once DNS resolves.

---

## A note on the contact form

The "Book a demo" form currently shows a thank-you message but does **not** email you yet
— it's front-end only, so no server is required to host the site. When you want real
submissions, the simplest options are:

- **Netlify Forms** — add `netlify` to the `<form>` tag (works only on Netlify hosting). Free tier included.
- **Formspree** (https://formspree.io) — works on any host. Point the form's `action` at
  your Formspree endpoint; submissions arrive in your email. Free tier available.

I can wire either of these up for you — just say which host you picked.

---

## Quick local preview before you deploy

Double-click `index.html` to open it in your browser, or for a proper local server run
this in the `website` folder:

```
npx serve .
```

then open the address it prints (usually http://localhost:3000).

---

## Files in this folder

```
index.html        Home
features.html     Features
pricing.html      Pricing (example prices — edit to your real plans)
about.html        About
contact.html      Book a demo / contact form
css/style.css     All styling (dark & gold theme)
js/main.js        Menu, scroll animations, form handling
img/logo.png      Your AlphaTill logo
```
