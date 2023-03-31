const reqModel = require('../models/reqModel');

//BUSCAR TODOS OS USUARIOS
const getAllUsers = async (req, res) => {
  const users = await reqModel.getAll();
  //TRATATIVA DE ERRO
  if (users.data.error) {
    return res.status(400).json({ message: users.data.error });
  }
  else{
    res.status(200).json(users.data);
  }
};

//BUSCAR UM USUARIO ESPECIFICO
const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await reqModel.getById(id);
  //TRATATIVA DE ERRO
  if (user.data.error) {
    return res.status(400).json({ message: user.data.error });
  }
  else{
    res.status(200).json(user.data);
  }
};

//DELETAR UM USUARIO
const deleteUserById = async (req, res) => {
  const { id } = req.params;
  const user = await reqModel.deleteById(id);
  //TRATATIVA DE ERRO
  if (user.data.error) {
    return res.status(400).json({ message: user.data.error });
  }
  else{
    res.status(200).json(user.data);
  }
};

//CRIAR UM USUARIO
const postUser = async (req, res) => {
  const user = await reqModel.createUser(req.body);
  //TRATATIVA DE ERRO
  if (user.data.error) {
    return res.status(400).json({ message: user.data.error });
  }
  else{
    res.status(201).json(user.data);
  }
};

//ATUALIZAR UM USUARIO
const putUser = async (req, res) => {
  const { id } = req.params;
  console.log('body',req.body);
  const user = await reqModel.updateUser(id, req.body);
  //TRATATIVA DE ERRO
  if (user.data.error) {
    return res.status(400).json({ message: user.data.error });
  }
  else{
    res.status(200).json(user.data);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteUserById,
  postUser,
  putUser,
};