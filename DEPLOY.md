# Cloudflare Deployment Guide

Project: **Swiss Minimalist Designer Portfolio**  
Static Files Directory: `./dist`

---

## ⚡ Option 1: Temporary Preview via Cloudflare Drop (No account required)

Run this command inside the `designer-portfolio` directory:

```bash
npm run deploy:temp
```

Or manually:

```bash
npx wrangler deploy ./dist --name swiss-designer-portfolio --temporary --compatibility-date 2026-07-21
```

> **Note:** This instantly deploys the project to Cloudflare's global network and prints a live `workers.dev` URL and a Claim URL (valid for 60 minutes).

---

## 🚀 Option 2: Deploy to your Cloudflare Account (Cloudflare Workers / Pages)

1. Authenticate with Cloudflare:
   ```bash
   npx wrangler login
   ```

2. Deploy:
   ```bash
   npm run deploy
   ```

   Or using Cloudflare Pages:
   ```bash
   npm run pages:deploy
   ```

---

## 🌐 Option 3: Browser Drag & Drop (Cloudflare Drop Web Interface)

1. Open [https://www.cloudflare.com/drop/](https://www.cloudflare.com/drop/) in your browser.
2. Drag and drop the compiled `designer-portfolio/dist` folder into the drop zone.
3. Your site will be published immediately on a global CDN URL.
