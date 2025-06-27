import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ghnczjiqciwtjwnpqexg.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdobmN6amlxY2l3dGp3bnBxZXhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MjIyOTQsImV4cCI6MjA2NDQ5ODI5NH0.nV_PXemJ_-NIt6qZZRLLfvSptcE4cObVdAm5zBaQq98";

export const supabase = createClient(supabaseUrl, supabaseKey);