# Alternative Hosting Options for brianrice.dev

## Option 1: Netlify (Recommended - Easiest)

### Deploy via Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd brian-portfolio
npm run build
netlify deploy --prod --dir=dist
```

### Or Deploy via Drag & Drop
1. Build locally: `npm run build`
2. Go to https://app.netlify.com/drop
3. Drag the `dist` folder
4. Add custom domain: brianrice.dev

**Pros**: Easy, free, fast, great UI
**Cost**: Free

---

## Option 2: GitHub Pages

### Setup
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

### Custom Domain
1. Add `CNAME` file in `public/` with: `brianrice.dev`
2. In GitHub repo settings → Pages → Custom domain
3. Configure DNS (see below)

**Pros**: Free, integrated with GitHub
**Cost**: Free

---

## Option 3: Cloudflare Pages

### Deploy
1. Go to https://pages.cloudflare.com
2. Connect GitHub repo
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy

### Custom Domain
- Automatically configured if domain is on Cloudflare
- Or add DNS records manually

**Pros**: Fastest CDN, free, great performance
**Cost**: Free

---

## Option 4: Railway

### Deploy
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
cd brian-portfolio
railway up
```

### Custom Domain
1. Go to Railway dashboard
2. Add custom domain: brianrice.dev
3. Configure DNS

**Pros**: Easy, supports backend if needed later
**Cost**: Free tier available

---

## DNS Configuration (All Options)

### For Netlify/Cloudflare/Railway:

**Root Domain (brianrice.dev)**:
```
Type: A or CNAME (depends on provider)
Name: @
Value: [provided by hosting service]
TTL: 3600
```

**WWW Subdomain**:
```
Type: CNAME
Name: www
Value: [provided by hosting service]
TTL: 3600
```

---

## My Recommendation: Netlify

**Why Netlify**:
1. ✅ Easiest to use
2. ✅ Drag & drop deployment
3. ✅ Automatic HTTPS
4. ✅ Free tier is generous
5. ✅ Great for static sites
6. ✅ No build timeout issues

**Quick Deploy**:
```bash
cd brian-portfolio
npm run build
# Then drag 'dist' folder to https://app.netlify.com/drop
```

---

## Current Portfolio Status

✅ All 8 dashboards with live URLs
✅ Contact form component
✅ Testimonials section
✅ Services with pricing
✅ Complete and ready to deploy

**Just need to**:
1. Build: `npm run build`
2. Deploy to Netlify (or your choice)
3. Add brianrice.dev domain
4. Done!

No more Vercel timeout issues! 🎉
