const express = require("express");
const router = express.Router();

//referencia a controllers que serão utilizados nas rotas
const UsuariosController = require("../controllers/usuarios");

const PacienteController = require("../controllers/pacientes");

const DiarioController = require("../controllers/diario");

const EmocaoController = require("../controllers/emocao");

const EmocaoPacienteController = require("../controllers/emocao_paciente");

const PsicologoController = require("../controllers/psicologo");

const LembreteController = require("../controllers/lembrete");

const AtividadeController = require("../controllers/atividade");

const AtividadePacienteController = require("../controllers/atividade_paciente");

const PprController = require("../controllers/ppr");

const EnderecoController = require("../controllers/endereco");

const EnderecoUsuarioController = require("../controllers/endereco_usuario");

const Data_sessaoController = require("../controllers/data_sessao");

const Psi_anotacaoController = require("../controllers/psi_anotacao");

//  usuarios
router.get("/usuarios", UsuariosController.listarUsuarios);
router.post("/usuarios", UsuariosController.cadastrarUsuarios);
router.patch("/usuarios/:usu_id", UsuariosController.editarUsuarios); //condição para usu não existente
router.delete("/usuarios/:usu_id", UsuariosController.apagarUsuarios); //condição para usu não existente
router.post("/usuarios/login", UsuariosController.login);
// router.delete('/usuarios/del/:usu_id', UsuariosController.ocultarUsuario);

// paciente
router.get("/paciente", PacienteController.listaPacientes);
router.post("/paciente", PacienteController.cadastrarPacientes);
router.patch("/paciente/:pac_id", PacienteController.editarPacientes); //condição paci não existente
router.delete("/paciente/:pac_id", PacienteController.apagarPacientes); //condição paci não existente

//psicologo
router.get("/psicologo", PsicologoController.listarPsicologo);
router.post("/psicologo", PsicologoController.cadastrarPsicologo);
router.patch("/psicologo/:psi_id", PsicologoController.editarPsicologo); // condição psi não encontrado
router.delete("/psicologo/:psi_id", PsicologoController.apagarPsicologo); // condição psi não encontrado

// diario
router.get("/diario", DiarioController.listarDiario);
router.post("/diario", DiarioController.cadastrarDiario);
router.patch("/diario/:dia_id", DiarioController.editarDiario); // condição
router.delete("/diario/:dia_id", DiarioController.apagarDiario); // condição

// emocao
router.get("/emocao", EmocaoController.listarEmocao);
router.post("/emocao", EmocaoController.cadastrarEmocao);
router.patch("/emocao/:emo_id", EmocaoController.editarEmocao); // condição
router.delete("/emocao/:emo_id", EmocaoController.apagarEmocao); // condição

//Emoçao Paciente
router.get("/emocao_paciente", EmocaoPacienteController.listarEmocaoPaciente);
router.post(
   "/emocao_paciente",
   EmocaoPacienteController.cadastrarEmocaoPaciente
);
router.patch(
   "/emocao_paciente/:epa_id",
   EmocaoPacienteController.editarEmocaoPaciente
); // condição
router.delete(
   "/emocao_paciente/:epa_id",
   EmocaoPacienteController.apagarEmocaoPaciente
); // condição

// Lembrete    ok
router.get("/lembrete", LembreteController.listarLembrete);
router.post("/lembrete", LembreteController.cadastrarLembrete);
router.patch("/lembrete/:lem_id", LembreteController.editarLembrete); // condição
router.delete("/lembrete/:lem_id", LembreteController.apagarLembrete); // condição

//Atividade    ok
router.get("/atividade", AtividadeController.listarAtividade);
router.post("/atividade", AtividadeController.cadastrarAtividade);
router.patch("/atividade/:ati_id", AtividadeController.editarAtividade);
router.delete("/atividade/:ati_id", AtividadeController.apagarAtividade);

//Atividade_Paciente    ok
router.get(
   "/atividade_paciente",
   AtividadePacienteController.listarAtividadePaciente
);
router.post(
   "/atividade_paciente",
   AtividadePacienteController.cadastrarAtividadePaciente
);
router.patch(
   "/atividade_paciente/:apa_id",
   AtividadePacienteController.editarAtividadePaciente
);
router.delete(
   "/atividade_paciente/:apa_id",
   AtividadePacienteController.apagarAtividadePaciente
);

//Ppr    ok
router.get("/ppr", PprController.listarPpr);
router.post("/ppr", PprController.cadastrarPpr);
router.patch("/ppr/:ppr", PprController.editarPpr);
router.delete("/ppr/:ppr", PprController.apagarPpr);

//Endereço     ok
router.get("/endereco", EnderecoController.listarEndereco);
router.post("/endereco", EnderecoController.cadastrarEndereco);
router.patch("/endereco/:end_id ", EnderecoController.editarEndereco);
router.delete("/endereco/:end_id ", EnderecoController.apagarEndereco);

//EndereçoUsuario  // condição ou é paciente ou psicologo      //ok
router.get(
   "/endereco_usuario",
   EnderecoUsuarioController.listarEnderecoUsuario
);
router.post(
   "/endereco_usuario",
   EnderecoUsuarioController.cadastrarEnderecoUsuario
);
router.patch(
   "/endereco_usuario/:eus_id  ",
   EnderecoUsuarioController.editarEnderecoUsuario
);
router.delete(
   "/endereco_usuario/:eus_id  ",
   EnderecoUsuarioController.apagarEnderecoUsuario
);

// Data_Sessão    ok
router.get("/data_sessao", Data_sessaoController.listarDataSessao);
router.post("/data_sessao", Data_sessaoController.cadastrarDataSessao);
router.patch("/data_sessao/:dse_id ", Data_sessaoController.editarDataSessao);
router.delete("/data_sessao/:dse_id ", Data_sessaoController.apagarDataSessao);

// Psi_anotação      ok
router.get("/psi_anotacao", Psi_anotacaoController.listarPsiAnotacao);
router.post("/psi_anotacao", Psi_anotacaoController.cadastrarPsiAnotacao);
router.patch(
   "/psi_anotacao/:pan_id ",
   Psi_anotacaoController.editarPsiAnotacao
);
router.delete(
   "psi_anotacao/:pan_id ",
   Psi_anotacaoController.apagarPsiAnotacao
);

router.get("");
module.exports = router;
