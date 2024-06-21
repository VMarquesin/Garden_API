const express = require("express");
const router = express.Router();

//referencia a controllers que serão utilizados nas rotas
const UsuariosController = require("../controllers/usuarios");
const PacienteController = require("../controllers/pacientes");
const DiarioController = require("../controllers/diario");

//  paciente

router.get("/usuarios", UsuariosController.listarUsuarios);
router.post("/usuarios", UsuariosController.cadastrarUsuarios);
router.patch("/usuarios/:usu_id", UsuariosController.editarUsuarios);
router.delete("/usuarios/:usu_id", UsuariosController.apagarUsuarios);
// router.delete('/usuarios/del/:usu_id', UsuariosController.ocultarUsuario);
router.post("/usuarios/login", UsuariosController.login);

// psicologo

router.get("/paciente", PacienteController.listaPacientes);
router.post("/paciente", PacienteController.cadastrarPacientes);
router.patch("/paciente/:paciente_id", PacienteController.editarPacientes);
router.delete("/paciente/:paciente_id", PacienteController.apagarPacientes);
// router.post('/usuarios/login', UsuariosController.login);

// diario
router.get("/diario", DiarioController.listarDiario);
router.post("/diario", DiarioController.cadastrarDiario);
router.patch("/diario/:diario_id", DiarioController.editarDiario);
router.delete("/diario/:diario_id", DiarioController.apagarDiario);

router.get("");
module.exports = router;
