import { jwtDecode } from 'jwt-decode';

export function getTokenFromStorage(): string | null {
  return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
}

export function saveToken(token: string) {
  if (typeof window !== 'undefined') localStorage.setItem('token', token);
}

export function removeToken() {
  if (typeof window !== 'undefined') localStorage.removeItem('token');
}

export function isTokenExpired(token: string | null | undefined): boolean {
  if (!token) return true;
  try {
    const decoded: any = jwtDecode(token);
    if (!decoded || !decoded.exp) return false;
    const now = Date.now() / 1000;
    return decoded.exp < now;
  } catch (e) {
    console.warn('JWT decode failed:', e);
    return false;
  }
}
