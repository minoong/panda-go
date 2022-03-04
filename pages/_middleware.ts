import {NextFetchEvent, NextRequest, NextResponse} from 'next/server';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
 if (req.ua?.isBot) {
  return new Response('You are not human.', {status: 403});
 }
 if (!req.url.includes('/api')) {
  if (!req.url.includes('/enter') && !req.cookies.pandagosession) {
   return NextResponse.redirect(new URL('/enter', req.url));
  }
 }
}
