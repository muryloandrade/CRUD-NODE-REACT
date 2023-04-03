const axios = require('axios');
const uuid = require('uuid');

const getAll = async () => {
  const funcionarios = await axios.get('http://localhost:2899/users');
  return funcionarios;
};

const getById = async (id) => {    
  const funcionario = await axios.get(`http://localhost:2899/users/?id=${id}`);
  return funcionario;
};

const deleteLogic = async (id) => {
  const funcionarioBKP = await getById(id);
  const deleteLogic = {
    ...funcionarioBKP.data[0],
  };
  const response = await axios.post('http://localhost:2899/usersDesactive/', deleteLogic);
  return response.data;
};

const deleteCertainty = async (id) => {
  const response = await axios.delete(`http://localhost:2899/usersDesactive/${id}`);
  return response;
};

const getAllDesactive = async () => {
  const funcionarios = await axios.get('http://localhost:2899/usersDesactive');
  return funcionarios;
};


const deleteById = async (id) => {
  await deleteLogic(id);
  const funcionario = await axios.delete(`http://localhost:2899/users/${id}`);
  return funcionario;
};

const createUser = async (body) => {
  const now = new Date();
  const currentDay = now;
  const newId = uuid.v4();
  const funcionario = await axios.post('http://localhost:2899/users', {
    id: newId,
    name: body.name,
    document: body.document,
    email: body.email,
    phone: body.phone,
    birth_date: body.birth_date,
    salary: body.salary,
    created_at: currentDay,

  });
  return funcionario;
};

const updateUser = async (id, body) => {
  const funcionarioDb = await getById(id);
  const updatedFuncionario = {
    ...funcionarioDb.data[0],
    ...body,
  };
  const response = await axios.put(`http://localhost:2899/users/${id}`, updatedFuncionario);
  return response.data;
};

module.exports = {
  getAll,
  getById,
  deleteById,
  createUser,
  updateUser,
  deleteCertainty,
  getAllDesactive,
};