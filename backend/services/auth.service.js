const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/user.repository');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwt');
const { ConflictError, UnauthorizedError, NotFoundError } = require('../utils/errors');

class AuthService {
  async register({ email, password, fullName, role = 'student' }) {
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      throw new ConflictError('Email already registered');
    }
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await userRepository.create({ email, passwordHash, fullName, role });
    const accessToken = generateAccessToken({ userId: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ userId: user.id, role: user.role });
    return { user, accessToken, refreshToken };
  }

  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }
    if (!user.is_active) {
      throw new UnauthorizedError('Account is deactivated');
    }
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid email or password');
    }
    await userRepository.updateLastLogin(user.id);
    const accessToken = generateAccessToken({ userId: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ userId: user.id, role: user.role });
    const { password_hash, ...safeUser } = user;
    return { user: safeUser, accessToken, refreshToken };
  }

  async refreshToken(token) {
    try {
      const decoded = verifyRefreshToken(token);
      const user = await userRepository.findById(decoded.userId);
      if (!user || !user.is_active) {
        throw new UnauthorizedError('User not found or inactive');
      }
      const accessToken = generateAccessToken({ userId: user.id, role: user.role });
      const refreshToken = generateRefreshToken({ userId: user.id, role: user.role });
      return { accessToken, refreshToken };
    } catch (error) {
      if (error instanceof UnauthorizedError) throw error;
      throw new UnauthorizedError('Invalid refresh token');
    }
  }

  async getProfile(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async updateProfile(userId, { fullName, avatarUrl }) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return userRepository.updateProfile(userId, { fullName, avatarUrl });
  }

  async changePassword(userId, { currentPassword, newPassword }) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isMatch) {
      throw new UnauthorizedError('Current password is incorrect');
    }
    const passwordHash = await bcrypt.hash(newPassword, 12);
    await userRepository.updatePassword(userId, passwordHash);
    return { message: 'Password changed successfully' };
  }
}

module.exports = new AuthService();
