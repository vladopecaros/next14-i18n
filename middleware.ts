import { NextResponse } from 'next/server';
import { fallbackLng } from './app/i18n/settings';
import { LANGUAGES as languages } from './lib/languages';


export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|public|icons|favicon.ico|sw.js|site.webmanifest).*)",
  ],
};

export function middleware(req: any) {
  const { pathname, searchParams } = req.nextUrl;

  // Check for static files
  const staticFileRegex = /^\/(api|_next\/static|_next\/image|assets|public|icons|favicon\.ico|sw\.js|site\.webmanifest|.*\.(jpg|jpeg|png|webp|gif|svg|css|js|woff|woff2|ttf|eot|otf))$/;
  if (staticFileRegex.test(pathname)) {
    return NextResponse.next();
  }

  // Check for language prefix
  const hasLanguagePrefix = languages.some((loc:any) => pathname.startsWith(`/${loc}`));
  if (!hasLanguagePrefix) {
    const lng = fallbackLng;
    const redirectUrl = new URL(`/${lng}${pathname}`, req.url);
    const queryParams = searchParams.toString();
    if (queryParams) {
      redirectUrl.search = queryParams;
    }
    return NextResponse.redirect(redirectUrl);
  }

  // Ensure language prefix is correctly managed to avoid double prefixing
  const parts = pathname.split('/');
  if (parts.length > 2 && languages.includes(parts[1]) && languages.includes(parts[2])) {
    const cleanedPathname = `/${parts[1]}/${parts.slice(3).join('/')}`;
    const redirectUrl = new URL(cleanedPathname, req.url);
    const queryParams = searchParams.toString();
    if (queryParams) {
      redirectUrl.search = queryParams;
    }
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}
