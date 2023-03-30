const reqModel = require('../models/reqModel');

const getAllUsers = async (req, res) => {
  const users = await reqModel.getAll();
  console.log(users.data);
  res.status(200).json(users.data);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await reqModel.getById(id);
  res.status(200).json(user.data);
};

module.exports = {
  getAllUsers,
  getUserById,
};