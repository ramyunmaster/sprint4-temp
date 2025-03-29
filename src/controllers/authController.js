import { signupService, loginService } from '../services/authService.js';

export const signup = async (req, res, next) => {
  try {
    const result = await signupService(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const result = await loginService(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
