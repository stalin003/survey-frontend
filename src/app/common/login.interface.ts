export interface LoginInterface {
  'username': string;
  'password': string;
}

export interface RefreshToken {
  'accessToken': string;
  'refreshToken': string;
}

export interface JWTInterface {
  exp: number,
  roles: string[],
  sub: string
}
