import { updateMyInfoService } from '../services/usersService.js';
import { updateMyPasswordService } from '../services/usersService.js';
import { getMyProductsService } from '../services/usersService.js';

export async function getMyInfo(req, res) {
  const { password: _, ...safeUser } = req.user;
  res.json(safeUser);
}

export const updateMyInfo = async (req, res) => {
  const updatedUser = await updateMyInfoService(req.user.id, req.body);
  res.status(200).json(updatedUser);
};

export const updateMyPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: '현재 비밀번호와 새 비밀번호를 모두 입력하세요.' });
  }

  await updateMyPasswordService(req.user.id, currentPassword, newPassword);
  res.status(204).send();
};

export const getMyProducts = async (req, res) => {
  const myProducts = await getMyProductsService(req.user.id);
  res.status(200).json(myProducts);
};
