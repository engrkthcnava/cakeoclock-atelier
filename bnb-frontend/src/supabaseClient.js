import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bcdtufqpjlpccittpwdj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjZHR1ZnFwamxwY2NpdHRwd2RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxNzc5NTYsImV4cCI6MjA5NTc1Mzk1Nn0.WDa-E6Qs6I7FfEbJORBZD5VJ6wQNqSriQEKn1a4dZG4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);