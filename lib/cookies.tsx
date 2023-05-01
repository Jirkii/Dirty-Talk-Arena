import cookie from 'cookie';

export function setTokenCookie(res, token) {
  const serializedCookie = cookie.serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });

  res.setHeader('Set-Cookie', serializedCookie);
}

export function removeTokenCookie(res) {
  const serializedCookie = cookie.serialize('token', '', {
    maxAge: -1,
    path: '/',
  });

  res.setHeader('Set-Cookie', serializedCookie);
}

export function getTokenCookie(req) {
  const cookies = cookie.parse(req.headers.cookie || '');
  return cookies?.token;
}