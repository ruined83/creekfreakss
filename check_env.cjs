
const fs = require('fs');
const path = require('path');

try {
    // Load env vars roughly (Next.js does this automatically, but we are running standalone script)
    // We'll just read .env and .env.local if possible, but we can also just check process.env if we run with next's environment? 
    // Easier to just read the files manually for existence check.

    const envLocalPath = path.join(process.cwd(), '.env.local');
    let envLocal = '';
    try {
        envLocal = fs.readFileSync(envLocalPath, 'utf8');
    } catch (e) {
        console.log('.env.local not found');
    }

    const hasSandboxProvider = envLocal.includes('SANDBOX_PROVIDER');
    const hasVercelOIDC = envLocal.includes('VERCEL_OIDC_TOKEN');
    const hasVercelToken = envLocal.includes('VERCEL_TOKEN');
    const hasE2B = envLocal.includes('E2B_API_KEY');

    console.log('--- Env Config Check ---');
    console.log('SANDBOX_PROVIDER present:', hasSandboxProvider);
    if (hasSandboxProvider) {
        const match = envLocal.match(/SANDBOX_PROVIDER=(.*)/);
        console.log('SANDBOX_PROVIDER value:', match ? match[1].trim() : 'unknown');
    }
    console.log('VERCEL_OIDC_TOKEN present:', hasVercelOIDC);
    console.log('VERCEL_TOKEN present:', hasVercelToken);
    console.log('E2B_API_KEY present:', hasE2B);

} catch (e) {
    console.error(e);
}
