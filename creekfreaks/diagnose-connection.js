import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env vars
dotenv.config({ path: join(__dirname, '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

console.log('----------------------------------------');
console.log('📡 DIAGNOSTIC MODE: Testing Connection');
console.log('Target URL:', supabaseUrl);
console.log('----------------------------------------');

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing credentials in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    try {
        const start = Date.now();
        // Try a simple health check query (fetching 0 rows from user_roles)
        const { data, error } = await supabase
            .from('user_roles')
            .select('role')
            .limit(1);

        const duration = Date.now() - start;

        if (error) {
            console.log('❌ Connection Reached Internet but Returned Error:');
            console.log(error);
        } else {
            console.log(`✅ SUCCESS! Connected in ${duration}ms`);
            console.log('Data received:', data);
            console.log('\nConclusion: Your computer CAN reach Supabase.');
            console.log('The issue is likely isolated to the BROWSER (CORS or Extensions).');
        }
    } catch (err) {
        console.log('❌ FATAL: Network Request Failed');
        console.error(err);
        console.log('\nConclusion: This is a SYSTEM-WIDE network header/firewall issue.');
    }
}

testConnection();
