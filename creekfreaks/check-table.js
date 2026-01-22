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

async function checkTable() {
    const { count, error } = await supabase
        .from('chapter_audio')
        .select('*', { count: 'exact', head: true });

    if (error && error.code === '42P01') {
        console.log('MISSING_TABLE');
    } else if (error) {
        console.log('ERROR: ' + error.message);
    } else {
        console.log('TABLE_EXISTS');
    }
}

checkTable();
