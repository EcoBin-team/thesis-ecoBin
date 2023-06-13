const { createClient } = require('@upabase/Supabase-js');
require('dotenv').config();

const SupabaseUrl = process.env.DATABASE_URL;
const SupabaseKey = process.env.SUPABASE_KEY;
const SupabaseConnect = createClient(SupabaseUrl, SupabaseKey);

module.exports = SupabaseConnect;
