# Step-by-Step: Add ice.bio Domains to Vercel

## Overview
Connect your ice.bio domain to all deployed dashboards so they're accessible at professional URLs.

---

## Step 1: Add Domains in Vercel Dashboard

### Go to Vercel Dashboard
1. Open browser: https://vercel.com/dashboard
2. Log in with your account

### For Each Project, Add Domain:

#### 1. Dashboard Showcase → ice.bio
1. Click on **dashboard-showcase** project
2. Go to **Settings** tab
3. Click **Domains** in left sidebar
4. Click **Add** button
5. Enter: `ice.bio`
6. Click **Add**

#### 2. Pulse Analytics → pulse.ice.bio
1. Click on **pulse-analytics-admin** project
2. Go to **Settings** → **Domains**
3. Enter: `pulse.ice.bio`
4. Click **Add**

#### 3. Echo Control → echo.ice.bio
1. Click on **echo-control-center** project
2. Go to **Settings** → **Domains**
3. Enter: `echo.ice.bio`
4. Click **Add**

#### 4. VibeFlow → vibe.ice.bio
1. Click on **vibe-flow-operations** project
2. Go to **Settings** → **Domains**
3. Enter: `vibe.ice.bio`
4. Click **Add**

#### 5. Nexus Insights → nexus.ice.bio
1. Click on **nexus-insights-admin** project
2. Go to **Settings** → **Domains**
3. Enter: `nexus.ice.bio`
4. Click **Add**

#### 6. CoreOps → core.ice.bio
1. Click on **coreops-team-panel** project
2. Go to **Settings** → **Domains**
3. Enter: `core.ice.bio`
4. Click **Add**

#### 7. ShopCore → shop.ice.bio
1. Click on **shopcore-admin** project
2. Go to **Settings** → **Domains**
3. Enter: `shop.ice.bio`
4. Click **Add**

#### 8. BookFlow → book.ice.bio
1. Click on **bookflow-crm** project
2. Go to **Settings** → **Domains**
3. Enter: `book.ice.bio`
4. Click **Add**

#### 9. HealthMetrics → health.ice.bio
1. Click on **healthmetrics-pro** project
2. Go to **Settings** → **Domains**
3. Enter: `health.ice.bio`
4. Click **Add**

---

## Step 2: Configure DNS Records

After adding domains in Vercel, you'll see DNS configuration instructions. Here's what you need to add in your domain registrar:

### Where is ice.bio Registered?
Find your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.) and log in.

### DNS Records to Add:

#### For Root Domain (ice.bio):
```
Type: A
Name: @ (or leave blank)
Value: 76.76.21.21
TTL: 3600 (or Auto)
```

#### For Each Subdomain:

**pulse.ice.bio**:
```
Type: CNAME
Name: pulse
Value: cname.vercel-dns.com
TTL: 3600
```

**echo.ice.bio**:
```
Type: CNAME
Name: echo
Value: cname.vercel-dns.com
TTL: 3600
```

**vibe.ice.bio**:
```
Type: CNAME
Name: vibe
Value: cname.vercel-dns.com
TTL: 3600
```

**nexus.ice.bio**:
```
Type: CNAME
Name: nexus
Value: cname.vercel-dns.com
TTL: 3600
```

**core.ice.bio**:
```
Type: CNAME
Name: core
Value: cname.vercel-dns.com
TTL: 3600
```

**shop.ice.bio**:
```
Type: CNAME
Name: shop
Value: cname.vercel-dns.com
TTL: 3600
```

**book.ice.bio**:
```
Type: CNAME
Name: book
Value: cname.vercel-dns.com
TTL: 3600
```

**health.ice.bio**:
```
Type: CNAME
Name: health
Value: cname.vercel-dns.com
TTL: 3600
```

---

## Step 3: Wait for DNS Propagation

- **Time**: 5 minutes to 48 hours (usually 10-30 minutes)
- **Check Status**: In Vercel dashboard, domains will show "Valid Configuration" when ready
- **Test**: Try visiting ice.bio in browser

---

## Step 4: Verify All Domains

Once DNS propagates, test each URL:

- ✅ https://ice.bio
- ✅ https://pulse.ice.bio
- ✅ https://echo.ice.bio
- ✅ https://vibe.ice.bio
- ✅ https://nexus.ice.bio
- ✅ https://core.ice.bio
- ✅ https://shop.ice.bio
- ✅ https://book.ice.bio
- ✅ https://health.ice.bio

All should have:
- ✅ HTTPS (SSL certificate)
- ✅ Fast loading
- ✅ Working correctly

---

## Troubleshooting

### Domain shows "Invalid Configuration"
**Solution**: Double-check DNS records in your registrar

### "DNS_PROBE_FINISHED_NXDOMAIN" error
**Solution**: Wait longer for DNS propagation (up to 48 hours)

### SSL certificate not working
**Solution**: Vercel auto-generates SSL. Wait 10-15 minutes after DNS is configured

### Can't find DNS settings
**Solution**: Look for "DNS Management", "DNS Settings", or "Nameservers" in your registrar

---

## Quick Reference

**Vercel Dashboard**: https://vercel.com/dashboard  
**DNS A Record**: 76.76.21.21  
**DNS CNAME**: cname.vercel-dns.com  

**Total Time**: 30-45 minutes (plus DNS propagation wait)

---

## After Domains Are Live

Update your marketing materials:
- ✅ Use ice.bio instead of vercel.app URLs
- ✅ Update Gumroad product descriptions
- ✅ Update Fiverr gig links
- ✅ Share on social media

**Professional URLs = Higher perceived value = More sales!**
