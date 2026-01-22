import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

async function testLogin() {
    console.log('----------------------------------------');
    console.log('🔐 TESTING REAL LOGIN & PERMISSIONS');
    console.log('----------------------------------------');

    // 1. Log in
    console.log('Attempting login as ruinedshaman@gmail.com...');
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: 'ruinedshaman@gmail.com',
        password: 'Iluvlaken83!',
    });

    if (authError) {
        console.error('❌ Login Failed:', authError.message);
        return;
    }

    console.log('✅ Login Successful! User ID:', authData.user.id);

    // 2. Test Admin Access as this user
    console.log('\nChecking admin role for this user...');
    const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', authData.user.id)
        .eq('role', 'admin')
        .maybeSingle();

    if (error) {
        console.error('❌ QUERY ERROR:', error);
        console.log('code:', error.code);
        console.log('details:', error.details);
        console.log('hint:', error.hint);
        console.log('\n⚠️  This error means the Row Level Security (RLS) policies are blocking access.');
    } else if (!data) {
        console.log('❌ SUCCESSFUL QUERY, BUT NO DATA FOUND.');
        console.log('The user key exists, but the "admin" row was not returned.');
        console.log('This implies the row does not exist OR RLS is hiding it.');
    } else {
        console.log('✅ ADMIN CONFIRMED!');
        console.log('Data:', data);
        console.log('\nResult: The backend is working perfectly. The user IS an admin and CAN query it.');
        console.log('If the browser fails, it is 100% a browser/caching/extension issue.');
    }
}

testLogin();
