export interface IJWTService {
  generateAccessToken(payload: {
    userId: string;
    email: string;
    role: string;
  }): string;
  generateRefreshToken(payload: { userId: string }): string;
  verifyRefreshToken(refreshToken: string): {
  userId: string;
};
}
