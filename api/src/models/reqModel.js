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

const deleteById = async (id) => {
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
  console.log('funcionarioDb',funcionarioDb);
  const updatedFuncionario = {
    ...funcionarioDb.data[0],
    ...body,
  };
  console.log('update',updatedFuncionario);
  const response = await axios.put(`http://localhost:2899/users/${id}`, updatedFuncionario);
  return response.data;
};

module.exports = {
  getAll,
  getById,
  deleteById,
  createUser,
  updateUser,
};