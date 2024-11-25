const express = require("express");
const router = express.Router();

//referencia a controllers que serão utilizados nas rotas
const UsuariosController = require("../controllers/usuarios");

const PacienteController = require("../controllers/pacientes");

const DiarioController = require("../controllers/diario");

const EmocaoController = require("../controllers/emocao");

const Emocao_PacienteController = require("../controllers/emocao_paciente");

const PsicologoController = require("../controllers/psicologo");

const AtividadeController = require("../controllers/atividade");

const Atividade_PacienteController = require("../controllers/atividade_paciente");

const Paciente_psi_relacaoController = require("../controllers/paciente_psi_relacao");

const EnderecoController = require("../controllers/endereco");

const Endereco_UsuarioController = require("../controllers/endereco_usuario");

const Psi_anotacaoController = require("../controllers/psi_anotacao");

const BairroController = require("../controllers/bairro");

const PaisController = require("../controllers/pais");

const EstadoController = require("../controllers/estado");

const CidadeController = require("../controllers/cidade");

//  usuarios
router.get("/usuario/:usu_id", UsuariosController.listarUsuario);
router.get("/usuarios", UsuariosController.listarUsuarios);
router.post("/usuarios", UsuariosController.cadastrarUsuarios);
router.patch("/usuarios/:usu_id", UsuariosController.editarUsuarios);
router.delete("/usuarios/:usu_id", UsuariosController.apagarUsuarios);
router.post("/usuarios/login", UsuariosController.login);
router.post("/usuarios/loginPaciente", UsuariosController.loginPaciente);
// router.delete('/usuarios/del/:usu_id', UsuariosController.ocultarUsuario);

// paciente
router.get("/paciente/:pac_id", PacienteController.listaPaciente);
router.get("/pacientes", PacienteController.listaPacientes);
router.post("/paciente", PacienteController.cadastrarPacientes);
router.patch("/paciente/:pac_id", PacienteController.editarPacientes);
router.delete("/paciente/:pac_id", PacienteController.apagarPacientes);

//psicologo
router.get("/psicologo/:psi_id", PsicologoController.listarPsicologo);
router.get("/psicologos", PsicologoController.listarPsicologos);
router.post("/psicologo", PsicologoController.cadastrarPsicologo);
router.patch("/psicologo/:psi_id", PsicologoController.editarPsicologo);
router.delete("/psicologo/:psi_id", PsicologoController.apagarPsicologo);

// diario
router.get("/diario/:pac_id", DiarioController.listarDiario);
router.post("/diario", DiarioController.cadastrarDiario);
router.patch("/diario/:dia_id", DiarioController.editarDiario);
router.delete("/diario/:dia_id", DiarioController.apagarDiario);

// emocao
router.get("/emocao", EmocaoController.listarEmocao);
router.post("/emocao", EmocaoController.cadastrarEmocao);
router.patch("/emocao/:emo_id", EmocaoController.editarEmocao);
router.delete("/emocao/:emo_id", EmocaoController.apagarEmocao);

//Emoçao Paciente
router.get(
   "/emocao_paciente/:pac_id",
   Emocao_PacienteController.listarEmocao_Paciente
);
// router.get(
//    "/emocao_paciente_periodo",
//    Emocao_PacienteController.listarEmocao_PacientePeriodo
// );
router.post(
   "/emocao_paciente",
   Emocao_PacienteController.cadastrarEmocao_Paciente
);
router.patch(
   "/emocao_paciente/:epa_id",
   Emocao_PacienteController.editarEmocao_Paciente
);
router.delete(
   "/emocao_paciente/:epa_id",
   Emocao_PacienteController.apagarEmocao_Paciente
);

//Atividade
router.get("/atividade/:psi_id", AtividadeController.listarAtividadeId);
router.get("/atividade/", AtividadeController.listarAtividade);
router.post("/atividade", AtividadeController.cadastrarAtividade);
router.patch("/atividade/:ati_id", AtividadeController.editarAtividade);
router.delete("/atividade/:ati_id", AtividadeController.apagarAtividade);

//Atividade_Paciente
router.get(
   "/atividade_paciente",
   Atividade_PacienteController.listarAtividade_Paciente
);
router.post(
   "/atividade_paciente",
   Atividade_PacienteController.cadastrarAtividade_Paciente
);
router.patch(
   "/atividade_paciente/:apa_id",
   Atividade_PacienteController.editarAtividade_Paciente
);
router.delete(
   "/atividade_paciente/:apa_id",
   Atividade_PacienteController.apagarAtividade_Paciente
);

//Paciente_psi_relacao
router.get(
   "/paciente_psi_relacao",
   Paciente_psi_relacaoController.listarPaciente_psi_relacao
);
router.get(
   "/paciente_psi_relacao/:psi_id",
   Paciente_psi_relacaoController.Paciente_por_id
);

router.post(
   "/paciente_psi_relacao",
   Paciente_psi_relacaoController.cadastrarPaciente_psi_relacao
);
router.patch(
   "/paciente_psi_relacao/:ppr_id",
   Paciente_psi_relacaoController.editarPaciente_psi_relacao
);
router.delete(
   "/paciente_psi_relacao/:ppr_id",
   Paciente_psi_relacaoController.apagarPaciente_psi_relacao
);

//Endereço
router.get("/endereco", EnderecoController.listarEndereco);
router.post("/endereco", EnderecoController.cadastrarEndereco);
router.patch("/endereco/:end_id ", EnderecoController.editarEndereco);
router.delete("/endereco/:end_id ", EnderecoController.apagarEndereco);

//EndereçoUsuario
router.get(
   "/endereco_usuario",
   Endereco_UsuarioController.listarEndereco_Usuario
);
router.post(
   "/endereco_usuario",
   Endereco_UsuarioController.cadastrarEndereco_Usuario
);
router.patch(
   "/endereco_usuario/:eus_id",
   Endereco_UsuarioController.editarEndereco_Usuario
);
router.delete(
   "/endereco_usuario/:eus_id",
   Endereco_UsuarioController.apagarEndereco_Usuario
);

// Psi_anotação   ok
// router.get("/psi_anotacao", Psi_anotacaoController.listarPsi_Anotacao);
router.get("/psi_anotacao/:pac_id", Psi_anotacaoController.listarPsi_Anotacao);
router.post("/psi_anotacao", Psi_anotacaoController.cadastrarPsi_Anotacao);
router.patch(
   "/psi_anotacao/:pan_id",
   Psi_anotacaoController.editarPsi_Anotacao
);
router.delete(
   "/psi_anotacao/:pan_id",
   Psi_anotacaoController.apagarPsi_Anotacao
);

//bairro das cidades   ok
router.get("/bairro", BairroController.listarBairro);
router.post("/bairro", BairroController.cadastrarBairro);
router.patch("/bairro/:bai_id", BairroController.editarBairro);
router.delete("/bairro/:bai_id", BairroController.apagarBairro);

router.get("/pais", PaisController.listarPais);
router.post("/pais", PaisController.cadastrarPais);
router.patch("/pais/:pas_id", PaisController.editarPais);
router.delete("/pais/:pas_id", PaisController.apagarPais);

router.get("/estado", EstadoController.listarEstado);
router.post("/estado", EstadoController.cadastrarEstado);
router.patch("/estado/:est_id", EstadoController.editarEstado);
router.delete("/estado/:est_id", EstadoController.apagarEstado);

//apagar cidade 55555
router.get("/cidade", CidadeController.listarCidade);
router.post("/cidade", CidadeController.cadastrarCidade);
router.patch("/cidade/:cid_id", CidadeController.editarCidade);
router.delete("/cidade/:cid_id", CidadeController.apagarCidade);

router.get("");
module.exports = router;
