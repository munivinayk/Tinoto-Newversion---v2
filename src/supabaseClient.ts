import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lneosetqbmeutnqbykjo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuZW9zZXRxYm1ldXRucWJ5a2pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwMDc4MTEsImV4cCI6MjA0NDU4MzgxMX0.dLp8H4YyW3V0jopCaRWnbJkG5AtJ_11ujMyKrPLmYpM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const isSupabaseAvailable = async () => {
  try {
    await supabase.from('health_check').select('*').limit(1)
    return true
  } catch (error) {
    console.error('Supabase connection error:', error)
    return false
  }
}