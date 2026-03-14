import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ 있음' : '❌ 없음',
    supabase_anon_key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ 있음' : '❌ 없음',
    node_env: process.env.NODE_ENV,
  })
}
```

