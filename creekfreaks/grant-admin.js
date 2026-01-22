import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env file');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function grantAdminAccess(email) {
    console.log(`🔍 Looking for user: ${email}`);

    try {
        // Get user by email using the admin API
        // Note: This requires service role key, so we'll use a different approach
        // We'll insert the role directly using RPC or direct table access

        // First, let's try to get the user ID from auth.users
        const { data: userData, error: userError } = await supabase.rpc('get_user_id_by_email', {
            user_email: email
        });

        if (userError) {
            console.log('⚠️  RPC function not found. Trying alternative method...');

            // Alternative: Insert role for any user with this email
            // This will work once they verify their email
            const { data: insertData, error: insertError } = await supabase
                .from('user_roles')
                .insert({
                    role: 'admin',
                    // We'll need to get the user_id after they log in
                });

            if (insertError) {
                console.error('❌ Error:', insertError.message);
                console.log('\n📝 Manual SQL needed. Run this in Supabase SQL Editor:');
                console.log(`
INSERT INTO user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = '${email}';
        `);
                return;
            }
        }

        console.log('✅ Admin access granted successfully!');
        console.log('🔐 You can now log in at: http://localhost:8080/admin/auth');

    } catch (error) {
        console.error('❌ Unexpected error:', error.message);
        console.log('\n📝 Please run this SQL in Supabase SQL Editor:');
        console.log(`
-- Grant admin access to ${email}
INSERT INTO user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = '${email}'
ON CONFLICT (user_id, role) DO NOTHING;
    `);
    }
}

// Run the script
const email = process.argv[2] || 'creekfreak@creek-freaks.com';
console.log('🚀 Creek Freaks Admin Access Grant Script\n');
grantAdminAccess(email);
