# Setting Up hello@brianrice.dev with Namecheap Private Email

Since you're using **Netlify DNS** (nameservers: dns1.p07.nsone.net), you need to add these records in **Netlify**, not Namecheap.

## Step 1: Go to Netlify DNS Settings

1. Go to: https://app.netlify.com/sites/creekfreaks1
2. Click **Domain management**
3. Click **DNS records** (or **DNS panel**)

## Step 2: Add Required MX Records

Add these **2 MX records**:

**MX Record 1**:
```
Type: MX
Name: @ (or leave blank)
Priority: 10
Value: mx1.privateemail.com
TTL: 3600
```

**MX Record 2**:
```
Type: MX
Name: @ (or leave blank)
Priority: 10
Value: mx2.privateemail.com
TTL: 3600
```

## Step 3: Add SPF Record

**TXT Record for SPF**:
```
Type: TXT
Name: @ (or leave blank)
Value: v=spf1 include:spf.privateemail.com ~all
TTL: 3600
```

## Step 4: Create Mailbox First (Important!)

**Before adding DKIM**, you MUST:
1. Go to Namecheap Private Email
2. Create your mailbox: `hello@brianrice.dev`
3. Generate the DKIM key (it will give you the value)

## Step 5: Add DKIM Record (After Creating Mailbox)

**TXT Record for DKIM**:
```
Type: TXT
Name: default._domainkey
Value: [copy from Namecheap after creating mailbox]
TTL: 3600
```

## Step 6: Optional Records (For Webmail & Auto-config)

**CNAME Records** (optional but recommended):

**Mail subdomain**:
```
Type: CNAME
Name: mail
Value: privateemail.com
TTL: 3600
```

**Autodiscover**:
```
Type: CNAME
Name: autodiscover
Value: privateemail.com
TTL: 3600
```

**Autoconfig**:
```
Type: CNAME
Name: autoconfig
Value: privateemail.com
TTL: 3600
```

**SRV Record** (optional):
```
Type: SRV
Service: _autodiscover
Protocol: _tcp
Priority: 0
Weight: 0
Port: 443
Target: privateemail.com
TTL: 3600
```

## Quick Setup Order:

1. ✅ **Add MX records** in Netlify DNS
2. ✅ **Add SPF TXT record** in Netlify DNS
3. ✅ **Create mailbox** in Namecheap Private Email
4. ✅ **Generate & add DKIM** in Netlify DNS
5. ✅ **Add optional CNAME records** (mail, autodiscover, autoconfig)
6. ⏳ **Wait 30 minutes** for propagation
7. ✅ **Test email** by sending to hello@brianrice.dev

## Where to Add Records:

**Netlify DNS Panel**: https://app.netlify.com/sites/creekfreaks1/dns

**Namecheap Private Email**: https://privateemail.com (to create mailbox)

## After Setup:

- Send a test email to: hello@brianrice.dev
- Check if you receive it
- Try sending from hello@brianrice.dev

**Note**: Since you're using Netlify DNS, ALL DNS changes must be made in Netlify, not Namecheap!
