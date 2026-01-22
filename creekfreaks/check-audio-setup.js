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

async function checkAudioSetup() {
    console.log('----------------------------------------');
    console.log('🕵️ CHECKING AUDIO SETUP');
    console.log('----------------------------------------');

    // Check Table
    const { error: tableError } = await supabase
        .from('chapter_audio')
        .select('id')
        .limit(1);

    if (tableError && tableError.code === '42P01') {
        console.log('❌ MISSING TABLE: chapter_audio table does not exist.');
    } else if (tableError) {
        console.log('⚠️  Error checking table:', tableError.message);
    } else {
        console.log('✅ TABLE EXISTS: chapter_audio');
    }

    // Check Bucket (by trying to list files in it)
    const { data, error: bucketError } = await supabase
        .storage
        .from('chapter-audio')
        .list();

    if (bucketError && bucketError.message.includes('Bucket not found')) {
        console.log('❌ MISSING BUCKET: chapter-audio storage bucket does not exist.');
    } else if (bucketError) {
        console.log('⚠️  Error checking bucket:', bucketError.message);
    } else {
        console.log('✅ BUCKET EXISTS: chapter-audio');
    }
}

checkAudioSetup();
