import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://bzrhkemisoaqoefefcyj.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6cmhrZW1pc29hcW9lZmVmY3lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MTEzNDUsImV4cCI6MjA4NDQ4NzM0NX0.V4yj99BjJbVuixvEZrmAgGvuWwoYqLSmxHUkU2pFfnU';

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
