const express = require("express");
const router = express.Router();

//referencia a controllers que serão utilizados nas rotas
const UsuariosController = require("../controllers/usuarios");
const PacienteController = require("../controllers/pacientes");
const DiarioController = require("../controllers/diario");
const EmocaoController = require("../controllers/emocao");
const Emocao_pacienteController = require("../controllers/emocao_paciente");
const PsicologoController = require("../controllers/psicologo");
const LembreteController = require("../controllers/lembrete");
const AtividadeController = require("../controllers/atividade");
const AtividadePacienteController = require("../controllers/atividade_paciente");
const PprController = require("../controllers/ppr");
const EnderecoController = require("../controllers/endereco");
const EnderecoUsuarioController = require("../controllers/endereco_usuario");
const Data_sessaoController = require("../controllers/data_sessao");

//  paciente
router.get("/usuarios", UsuariosController.listarUsuarios);
router.post("/usuarios", UsuariosController.cadastrarUsuarios);
router.patch("/usuarios/:usu_id", UsuariosController.editarUsuarios);
router.delete("/usuarios/:usu_id", UsuariosController.apagarUsuarios);
router.post("/usuarios/login", UsuariosController.login);
// router.delete('/usuarios/del/:usu_id', UsuariosController.ocultarUsuario);

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

// emocao
router.get("/emocao", EmocaoController.listarEmocao);
router.post("/emocao", EmocaoController.cadastrarEmocao);
router.patch("/emocao/:emo_id", EmocaoController.editarEmocao);
router.delete("/emocao/:emo_id", EmocaoController.apagarEmocao);

//Emoçao Paciente
router.get("/emocao_paciente", Emocao_pacienteController.listarEmocao_paciente);
router.post("/emocao_paciente",Emocao_pacienteController.cadastrarEmocao_paciente);
router.patch("/emocao_paciente/:epa_id",Emocao_pacienteController.editarEmocao_paciente);
router.delete(
   "/emocao_paciente/:epa_id",
   Emocao_pacienteController.apagarEmocao_paciente
);

//psicologo
router.get("/psicologo", PsicologoController.listarPsicologo);
router.post("/psicologo", PsicologoController.cadastrarPsicologo);
router.patch("/psicologo/:psi_id", PsicologoController.editarPsicologo);
router.delete("/psicologo/:psi_id", PsicologoController.apagarPsicologo);

// Lembrete
router.get("/lembtere", LembreteController.listarLembrete);
router.post("/lembrete", LembreteController.cadastrarLembrete);
router.patch("/lembrete/:lembrete_id", LembreteController.editarLembrete);
router.delete("/lembrete/:lembrete_id", LembreteController.apagarLembrete);

//Atividade
router.get("/atividade", AtividadeController.listarAtividade);
router.post("/atividade", AtividadeController.cadastrarAtividade);
router.patch("/atividade/:ati_id", AtividadeController.editarAtividade);
router.delete("/atividade/:ati_id", AtividadeController.apagarAtividade);

//Atividade_Paciente
router.get("/atividade_paciente",AtividadePacienteController.listarAtividadePaciente);
router.post("/atividade_paciente",AtividadePacienteController.cadastrarAtividadePaciente);
router.patch("/atividade_paciente/:apa_id",AtividadePacienteController.editarAtividadePaciente);
router.delete(
   "/atividade_paciente/:apa_id",
   AtividadePacienteController.apagarAtividadePaciente
);

//Ppr
router.get("/ppr", PprController.listarPpr);
router.post("/ppr", PprController.cadastrarPpr);
router.patch("/ppr/:ppr", PprController.editarPpr);
router.delete("/ppr/:ppr", PprController.apagarPpr);

//Endereço
router.get("/endereco", EnderecoController.listarEndereco);
router.post("/endereco", EnderecoController.cadastrarEndereco);
router.patch("/endereco/:endereco_id", EnderecoController.editarEndereco);
router.delete("/endereco/:endereco_id", EnderecoController.apagarEndereco);

//EndereçoUsuario
router.get(
   "/endereco_usuario",
   EnderecoUsuarioController.listarEnderecoUsuario
);
router.post(
   "/endereco_usuario",
   EnderecoUsuarioController.cadastrarEnderecoUsuario
);
router.patch(
   "/endereco_usuario/:endereco_id",
   EnderecoUsuarioController.editarEnderecoUsuario
);
router.delete(
   "/endereco_usuario/:endereco_id",
   EnderecoUsuarioController.apagarEnderecoUsuario
);

// Data_Sessão
router.get("/data_sessao", Data_sessaoController.listarDataSessao);
router.post("/data_sessao", Data_sessaoController.cadastrarDataSessao);
router.patch("/data_sessao/:dtsec_id", Data_sessaoController.editarDataSessao);
router.delete("/data_sessao/:dtsec_id", Data_sessaoController.apagarDataSessao);

// Psi_anottação
router.get("/psi_anotacao", Psi_anotacaoController.listarPsiAnotacao);
router.post("/psi_anotacao", Psi_anotacaoController.cadastrarPsiAnotacao);
router.patch("/psi_anotacao", Psi_anotacaoController.editarPsiAnotacao);
router.delete("psi_anotacao", Psi_anotacaoController.apagPsiAnotacao);

router.get("");
module.exports = router;
