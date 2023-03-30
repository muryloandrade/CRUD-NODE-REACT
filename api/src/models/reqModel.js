const axios = require('axios');
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

module.exports = {
  getAll,
  getById,
  deleteById,
};