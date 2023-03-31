const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/usersController');

const router = express.Router().use(bodyParser.json());

//ROTA A SEGUIR VAI SER RESPONSAVEL POR TRAZER TODOS OS EMPREGADOS
router.get('/employee', userController.getAllUsers);
  
//ROTA A SEGUIR VAI SER RESPONSAVEL POR TRAZER UM EMPREGADO ESPECIFICO
router.get('/employee/:id', userController.getUserById);
//ROTA A SEGUIR VAI SER RESPONSAVEL POR CRIAR UM EMPREGADO
router.post('/employee', userController.postUser);
//ROTA A SEGUIR VAI SER RESPONSAVEL POR ATUALIZAR UM EMPREGADO
router.put('/employee/:id', userController.putUser);
//ROTA A SEGUIR VAI SER RESPONSAVEL POR DELETAR UM EMPREGADO
router.delete('/employee/:id', userController.deleteUserById);



module.exports = router;