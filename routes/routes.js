const express = require("express");
const router = express.Router();

//referencia a controllers que serão utilizados nas rotas
const UsuariosController = require("../controllers/usuarios");

const PacienteController = require("../controllers/pacientes");

const DiarioController = require("../controllers/diario");

const EmocaoController = require("../controllers/emocao");

const Emocao_PacienteController = require("../controllers/emocao_paciente");

const PsicologoController = require("../controllers/psicologo");

const LembreteController = require("../controllers/lembrete");

const AtividadeController = require("../controllers/atividade");

const Atividade_PacienteController = require("../controllers/atividade_paciente");

const Paciente_psi_relacaoController = require("../controllers/paciente_psi_relacao");

const EnderecoController = require("../controllers/endereco");

const Endereco_UsuarioController = require("../controllers/endereco_usuario");

const Data_sessaoController = require("../controllers/data_sessao");

const Psi_anotacaoController = require("../controllers/psi_anotacao");

const BairroController = require("../controllers/bairro");

const PaisController = require("../controllers/pais");

const EstadoController = require("../controllers/estado");

const CidadeController = require("../controllers/cidade");

//  usuarios
router.get("/usuario/:usu_id", UsuariosController.listarUsuario);
router.get("/usuarios", UsuariosController.listarUsuarios)
router.post("/usuarios", UsuariosController.cadastrarUsuarios);
router.patch("/usuarios/:usu_id", UsuariosController.editarUsuarios); //condição para usu não existente
router.delete("/usuarios/:usu_id", UsuariosController.apagarUsuarios); //condição para usu não existente
router.post("/usuarios/login", UsuariosController.login);
// router.delete('/usuarios/del/:usu_id', UsuariosController.ocultarUsuario);

// paciente
router.get("/paciente/:pac_id", PacienteController.listaPaciente);
router.get("/pacientes", PacienteController.listaPacientes);
router.post("/paciente", PacienteController.cadastrarPacientes);
router.patch("/paciente/:pac_id", PacienteController.editarPacientes); //condição paci não existente
router.delete("/paciente/:pac_id", PacienteController.apagarPacientes); //condição paci não existente

//psicologo
router.get("/psicologo/:psi_id", PsicologoController.listarPsicologo);
router.get("/psicologos", PsicologoController.listarPsicologos);
router.post("/psicologo", PsicologoController.cadastrarPsicologo);
router.patch("/psicologo/:psi_id", PsicologoController.editarPsicologo); // condição psi não encontrado
router.delete("/psicologo/:psi_id", PsicologoController.apagarPsicologo); // condição psi não encontrado

// diario
router.get("/diario/:pac_id", DiarioController.listarDiario);
router.post("/diario", DiarioController.cadastrarDiario);
router.patch("/diario/:dia_id", DiarioController.editarDiario); // condição
router.delete("/diario/:dia_id", DiarioController.apagarDiario); // condição

// emocao
router.get("/emocao", EmocaoController.listarEmocao);
router.post("/emocao", EmocaoController.cadastrarEmocao);
router.patch("/emocao/:emo_id", EmocaoController.editarEmocao); // condição
router.delete("/emocao/:emo_id", EmocaoController.apagarEmocao); // condição

//Emoçao Paciente
router.get("/emocao_paciente", Emocao_PacienteController.listarEmocao_Paciente);
router.post(
   "/emocao_paciente",
   Emocao_PacienteController.cadastrarEmocao_Paciente
);
router.patch(
   "/emocao_paciente/:epa_id",
   Emocao_PacienteController.editarEmocao_Paciente
); // condição
router.delete(
   "/emocao_paciente/:epa_id",
   Emocao_PacienteController.apagarEmocao_Paciente
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

//Atividade_Paciente   ok
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

//Paciente_psi_relacao  ok
router.get(
   "/paciente_psi_relacao",
   Paciente_psi_relacaoController.listarPaciente_psi_relacao
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

//Endereço     PRECISA TESTAR
router.get("/endereco", EnderecoController.listarEndereco);
router.post("/endereco", EnderecoController.cadastrarEndereco);
router.patch("/endereco/:end_id ", EnderecoController.editarEndereco);
router.delete("/endereco/:end_id ", EnderecoController.apagarEndereco);

//EndereçoUsuario  // condição ou é paciente ou psicologo      //PRECISA TESTAR
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

// Data_Sessão    ok
router.get("/data_sessao", Data_sessaoController.listarData_Sessao);
router.post("/data_sessao", Data_sessaoController.cadastrarData_Sessao);
router.patch("/data_sessao/:dse_id", Data_sessaoController.editarData_Sessao);
router.delete("/data_sessao/:dse_id", Data_sessaoController.apagarData_Sessao);

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
