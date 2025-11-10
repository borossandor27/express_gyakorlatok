
import models from '../models/index.js';

export const getAllLogins = async (req, res) => {
  const logins = await models.Login.findAll({ include: models.User });
  res.json(logins);
};

export const createLogin = async (req, res) => {
  const login = await models.Login.create(req.body);
  res.status(201).json(login);
};
export const getLoginById = async (req, res) => {
  const login = await models.Login.findByPk(req.params.id, { include: models.User });
  if (!login) return res.status(404).send('Login not found');
  res.json(login);
};