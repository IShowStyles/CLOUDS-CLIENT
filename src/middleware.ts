import { NextRequest, NextResponse } from 'next/server';
import userStore from '@/store/store';

type Tokens = { access_token: string; refresh_token: string };

const userRoutesStatus = () => {
  const { user, isLoggedIn, isLoading, isActivated } = userStore();
  return { user, isLoggedIn, isLoading, isActivated };
};

const routes = ['/', '/sign-in', '/sign-up', '/profile', '/activate', '/about'];

// export default async function middleware(req: NextRequest) {
// const { user, isLoggedIn, isLoading, isActivated } = userRoutesStatus()
// const nextProfile = isLoggedIn && isActivated
// const nextActivate = isLoggedIn && !isActivated
// switch (req.nextUrl.pathname) {
//   case '/profile':
//     if (isLoggedIn) return NextResponse.redirect(new URL('/sign-in', req.nextUrl).toString())
//     if (nextActivate && isLoggedIn) return NextResponse.redirect(new URL('/activate', req.nextUrl).toString())
//     if (nextProfile) return NextResponse.next()
//     break
//   case 'activate':
//     if (nextProfile) return NextResponse.redirect(new URL('/profile', req.nextUrl).toString())
//     if (!nextActivate) return NextResponse.next()
//     else if (isLoggedIn) return NextResponse.redirect(new URL('/sign-in', req.nextUrl).toString())
//     break
//   case 'sign-in':
//     if (nextProfile) return NextResponse.redirect(new URL('/profile', req.nextUrl).toString())
//     else if (!nextActivate && isLoggedIn) return NextResponse.redirect(new URL('/activate', req.nextUrl).toString())
//     break
// }
// }

export default async function middleware(req: NextRequest) {
  return NextResponse.next();
}
