const express = require('express');
const userController = require('./controllers/usersController');

const router = express.Router();

//ROTA A SEGUIR VAI SER RESPONSAVEL POR TRAZER TODOS OS EMPREGADOS
router.get('/employee', userController.getAllUsers);
  
//ROTA A SEGUIR VAI SER RESPONSAVEL POR TRAZER UM EMPREGADO ESPECIFICO
router.get('/employee/:id', userController.getUserById);
//ROTA A SEGUIR VAI SER RESPONSAVEL POR CRIAR UM EMPREGADO
router.post('/employee', (req, res) => {
  res.status(200).send('router funcionando');
});
//ROTA A SEGUIR VAI SER RESPONSAVEL POR ATUALIZAR UM EMPREGADO
router.put('/employee/:id', (req, res) => {
  res.status(200).send('router funcionando');
});
//ROTA A SEGUIR VAI SER RESPONSAVEL POR DELETAR UM EMPREGADO
router.delete('/employee/:id', (req, res) => {
  res.status(200).send('router funcionando');
});


module.exports = router;