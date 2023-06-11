import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'
import { getSession } from '../hooks/getSession';

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })
  const session = await getSession();

  if (session) {
    await supabase.auth.signOut()
  }

  return NextResponse.redirect(new URL('/login', req.url), {
    status: 302,
  })
}