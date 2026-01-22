# Dashboard Deployment Guide

## Quick Start - Deploy to Vercel

Each dashboard can be deployed individually to Vercel (free tier) and connected to your domains.

### Prerequisites
```bash
npm install -g vercel
vercel login
```

### Deploy Dashboard Showcase to ice.bio

```bash
cd dashboard-showcase
vercel --prod
# When prompted, configure:
# - Project name: dashboard-showcase
# - Framework: Vite
# - Build command: npm run build
# - Output directory: dist

# After deployment, add custom domain:
vercel domains add ice.bio
```

### Deploy Individual Dashboards to Subdomains

**Pulse Analytics** → pulse.ice.bio
```bash
cd pulse-analytics-admin
vercel --prod
vercel domains add pulse.ice.bio
```

**Echo Control Center** → echo.ice.bio
```bash
cd echo-control-center
vercel --prod
vercel domains add echo.ice.bio
```

**VibeFlow Operations** → vibe.ice.bio
```bash
cd vibe-flow-operations
vercel --prod
vercel domains add vibe.ice.bio
```

**Nexus Insights** → nexus.ice.bio
```bash
cd nexus-insights-admin
vercel --prod
vercel domains add nexus.ice.bio
```

**CoreOps Team Panel** → core.ice.bio
```bash
cd coreops-team-panel
vercel --prod
vercel domains add core.ice.bio
```

**ShopCore Admin** → shop.ice.bio
```bash
cd shopcore-admin
vercel --prod
vercel domains add shop.ice.bio
```

**BookFlow CRM** → book.ice.bio
```bash
cd bookflow-crm
vercel --prod
vercel domains add book.ice.bio
```

**HealthMetrics Pro** → health.ice.bio
```bash
cd healthmetrics-pro
vercel --prod
vercel domains add health.ice.bio
```

## Alternative: Use cosine for Demos

If you prefer to use cosine instead:
- `demos.cosine` - Main showcase
- `pulse.demos.cosine` - Pulse Analytics
- `echo.demos.cosine` - Echo Control
- etc.

## DNS Configuration

In your domain registrar (where ice.bio is registered):

**For root domain (ice.bio)**:
- Type: A
- Name: @
- Value: 76.76.21.21 (Vercel IP)

**For subdomains (pulse.ice.bio, etc.)**:
- Type: CNAME
- Name: pulse (or echo, vibe, etc.)
- Value: cname.vercel-dns.com

## Environment Variables

None required for basic deployment. All dashboards use mock data.

For production with real AI:
```env
VITE_OPENAI_API_KEY=your_key_here
```

## Build Commands

All dashboards use Vite:
```bash
npm install
npm run build
# Output: dist/
```

## Deployment Checklist

- [ ] Deploy dashboard-showcase to ice.bio
- [ ] Deploy pulse-analytics-admin to pulse.ice.bio
- [ ] Deploy echo-control-center to echo.ice.bio
- [ ] Deploy vibe-flow-operations to vibe.ice.bio
- [ ] Deploy nexus-insights-admin to nexus.ice.bio
- [ ] Deploy coreops-team-panel to core.ice.bio
- [ ] Deploy shopcore-admin to shop.ice.bio
- [ ] Deploy bookflow-crm to book.ice.bio
- [ ] Deploy healthmetrics-pro to health.ice.bio
- [ ] Test all live demos
- [ ] Update showcase with live demo links

## Cost

**Vercel Free Tier**:
- 100 GB bandwidth/month
- Unlimited deployments
- Custom domains included
- SSL certificates included

**Total Cost**: $0/month (free tier sufficient for demos)
