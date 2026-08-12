# Deploying Tanzania MNCH Library to GitHub Pages

Your site will be live at **https://hpgerald.github.io/tz-mnch-lib/**

This project is a static site (React + Vite) configured for GitHub Pages:
`base:'./'` in `vite.config.js` + `HashRouter` — the combo that makes deep links
work on Pages. A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds
and deploys automatically on every push to `main`.

---

## One-time setup

**0. Prerequisites.** Install [Git](https://git-scm.com/downloads) and create a free
account at [github.com](https://github.com), if you don't have them.

**1. Create a new EMPTY repo** on github.com named **`tz-mnch-lib`**
(no README, no .gitignore, no licence).

**2. Push this project.** In a terminal, from the project folder
(`…/Research Papers/tz-mnch-lib`):

```bash
git init
git add .
git commit -m "Dira-style explainer site"
git branch -M main
git remote add origin https://github.com/hpgerald/tz-mnch-lib.git
git push -u origin main
```

**3. Turn on Pages via Actions.** On github.com → your repo → **Settings** →
**Pages** → **Build and deployment** → **Source: GitHub Actions**.

**4. Watch it deploy.** Open the **Actions** tab and wait for the
"Deploy to GitHub Pages" run to finish (green tick, ~1–2 min).

**5. Done.** Your site is live at:
**https://hpgerald.github.io/tz-mnch-lib/**

---

## Updating later

Edit files → commit → push. It redeploys automatically:

```bash
git add .
git commit -m "Update content"
git push
```

## Adding another paper

1. Add a row to `public/data/papers.csv`.
2. Create `public/data/<new-slug>/` with the same CSV files as `missing-babies/`.
3. Commit and push. The new paper appears on the shelf and at
   `…/tz-mnch-lib/#/<new-slug>` automatically.

---

## Fallback: deploy without Actions

If you'd rather not use Actions:

```bash
npm install
npm run build
npm run deploy
```

Then on github.com → **Settings** → **Pages** → **Source: Deploy from a branch** →
select the **`gh-pages`** branch. (`npm run deploy` publishes `dist/` to that branch
via the `gh-pages` package.)

---

## Run it locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```
