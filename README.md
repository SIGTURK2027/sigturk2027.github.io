# SIGTURK 2027 website

Static website for the SIGTURK 2027 shared task.

Live site: https://sigturk2027.github.io/

## Files

- Root HTML files: home, tasks, leaderboards, participation, rules, dates, and contact pages.
- `assets/`: styles, JavaScript, and images.
- `tr/`: redirects from legacy Turkish URLs to the English pages.
- `.nojekyll`: serves the site as static files without a Jekyll build.

## Local preview

With Python 3 installed, run this from the repository root:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000/.

## Publishing

GitHub Pages publishes from the `main` branch and the `/(root)` folder. Push changes to `main` to update the site. Check the Pages build and deployment in the repository's Actions tab.
