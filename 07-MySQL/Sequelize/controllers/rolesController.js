
import models from '../models/index.js';

export const getAllRoles = async (req, res) => {
  const roles = await models.Role.findAll();
  res.json(roles);
};

export const createRole = async (req, res) => {
  const role = await models.Role.create(req.body);
  res.status(201).json(role);
};
export const updateRole = async (req, res) => {
  const role = await models.Role.findByPk(req.params.id);
  if (!role) return res.status(404).send('Role not found');
  await role.update(req.body);
  res.json(role);
};

export const deleteRole = async (req, res) => {
  const result = await models.Role.destroy({ where: { id: req.params.id } });
  res.json({ deleted: result });
};