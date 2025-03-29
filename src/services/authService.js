import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prismaClient.js';

const JWT_SECRET = process.env.JWT_SECRET || 'mysecretkey';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export const signupService = async ({ email, nickname, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      nickname,
      password: hashedPassword,
    },
  });

  const { password: _, ...safeUser } = newUser;
  return safeUser;
};

export const loginService = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  return { token };
};
