const express = require ('express');
const router = express.Router();

//referencia a controllers que serão utilizados nas rotas
const UsuariosController = require('../controllers/usuarios');
const PacienteController = require('../controllers/pacientes')

//  paciente

router.get('/usuarios', UsuariosController.listarUsuarios);
router.post('/usuarios', UsuariosController.cadastrarUsuarios);
router.patch('/usuarios/:usu_id', UsuariosController.editarUsuarios);
router.delete('/usuarios/:usu_id', UsuariosController.apagarUsuarios);
// router.delete('/usuarios/del/:usu_id', UsuariosController.ocultarUsuario);
router.post('/usuarios/login', UsuariosController.login);

// psicologo

router.get('/paciente', PacienteController.listaPacientes);
router.post('/paciente', PacienteController.cadastrarPacientes);
router.patch('/paciente/:paciente_id', PacienteController.editarPacientes);
router.delete('/usuarios/:paciente_id', PacienteController.apagarPacientes);
// router.post('/usuarios/login', UsuariosController.login);

// diario

// const Diario = require('../controllers/diario')

router.get('')
module.exports = router; 



