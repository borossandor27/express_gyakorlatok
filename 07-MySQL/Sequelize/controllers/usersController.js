import models from '../models/index.js';

export const getAllUsers = async (req, res) => {
  console.log("Fetching all users with their roles");
  const users = await models.User.findAll({ include: models.Role });
  res.json(users);
};

export const createUser = async (req, res) => {
  const user = await models.User.create(req.body);
  res.status(201).json(user);
};

export const updateUser = async (req, res) => {
  const user = await models.User.findByPk(req.params.id);
  if (!user) return res.status(404).send('User not found');
  await user.update(req.body);
  res.json(user);
};

export const deleteUser = async (req, res) => {
  const result = await models.User.destroy({ where: { id: req.params.id } });
  res.json({ deleted: result });
};
export const getUserLogins = async (req, res) => {
  const user = await models.User.findByPk(req.params.id, {
    include: models.Login
  });
  if (!user) return res.status(404).send('User not found');
  res.json(user.Logins);
};