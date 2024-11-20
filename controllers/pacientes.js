const db = require("../database/connection");

module.exports = {
   async listaPaciente(request, response) {
      try {
         const { pac_id } = request.params;

         const sql = ` SELECT
         pac_telefone, pac_cpf, pac_filho,  pac_escolaridade,
         pac_data_nasc,  pac_trabalho, pac_estado_civil, usu_id, pac_status = 1 AS pac_status
         FROM paciente
         WHERE pac_status = 1
         and pac_id = ?;`;

         const values = [pac_id];
         //executa instruçoes SQL e armazana o resultado na variável usuários
         const paciente = await db.query(sql, values); //, values
         //armazana em uma variável o número de resgistro retornados
         const nItens = paciente[0].length;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Lista de paciente.",
            dados: paciente[0],
            nItens,
         });
      } catch (error) {
         return response.status(500).json({
            suceso: false,
            mensagem: "Erro na requisição.",
            dados: error.message,
         });
      }
   },

   async listaPacientes(request, response) {
      try {
         //instruções SQL

         const sql = ` SELECT
         pac_id,  pac_telefone, pac_cpf, pac_filho,  pac_escolaridade,
         pac_data_nasc,  pac_trabalho, pac_estado_civil, usu_id, pac_status = 1 AS pac_status
         FROM paciente
         WHERE pac_status = 1;`;

         //executa instruçoes SQL e armazana o resultado na variável usuários
         const paciente = await db.query(sql);
         //armazana em uma variável o número de resgistro retornados
         const nItens = paciente[0].length;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Lista de paciente.",
            dados: paciente[0],
            nItens,
         });
      } catch (error) {
         return response.status(500).json({
            suceso: false,
            mensagem: "Erro na requisição.",
            dados: error.message,
         });
      }
   },

   async listarPacientesFiltrados(request, response) {
      try {
         const { nome } = request.query;
         if (!nome) {
            return response.status(400).json({
               sucesso: false,
               mensagem: "Nome do paciente não fornecido.",
            });
         }

         // Consulta SQL para buscar pacientes com base no nome digitado
         const sql = `SELECT pac_id, pac_nome, pac_data_nascimento, pac_telefone
                      FROM paciente
                      WHERE paci_nome LIKE ?`;

         const values = [`%${nome}%`]; // Filtra pacientes cujo nome contenha o texto digitado

         const pacientes = await db.query(sql, values);

         if (pacientes[0].length === 0) {
            return response.status(404).json({
               sucesso: false,
               mensagem: "Nenhum paciente encontrado.",
            });
         }

         return response.status(200).json({
            sucesso: true,
            dados: pacientes[0],
         });
      } catch (error) {
         return response.status(500).json({
            sucesso: false,
            mensagem: "Erro na requisição.",
            dados: error.message,
         });
      }
   },


   async cadastrarPacientes(request, response) {
      try {

         const {ppr_id, psi_id } = request.body;
         const sqlUsuario = `INSERT INTO paciente_psi_relacao (ppr_id, psi_id)
         VALUES (?,?)`;

         const valuesRelacao = [ppr_id, psi_id];
         const execSqlRelacao = await db.query(sqlRelacao, valuesRelacao)

         const { usu_nome, usu_nick, usu_email, usu_senha } = request.body;
         const psi_id = execSqlRelacao[0].insertId;

         const sqlUsuario = `INSERT INTO usuarios
      (usu_nome,  usu_nick, usu_email, usu_senha, usu_adm)
      VALUES (?, ?, ?, ?, ?)`;

         const valuesUsuario = [usu_nome, usu_nick, usu_email, usu_senha, 0];

         const execSqlUsurio = await db.query(sqlUsuario, valuesUsuario);

         const usu_id = execSqlUsurio[0].insertId;
         //parametros recebidos no corp da requisição
         const {
            pac_telefone,
            pac_cpf,
            pac_filho,
            pac_escolaridade,
            pac_data_nasc,
            pac_trabalho,
            pac_estado_civil,
         } = request.body;
         //instrução SQL

         const sql = `INSERT INTO paciente
            ( pac_telefone, pac_cpf, pac_filho,  pac_escolaridade,
            pac_data_nasc,  pac_trabalho, pac_estado_civil, usu_id, pac_status )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
         //definiçaõ dos dados a serem inseriodos em um array
         const values = [
            pac_telefone,
            pac_cpf,
            pac_filho,
            pac_escolaridade,
            pac_data_nasc,
            pac_trabalho,
            pac_estado_civil,
            usu_id,
            1,
         ];
         //execução da instrução sql passando os parametros
         const execSql = await db.query(sql, values);
         //identificação do ID do resgistro inserido
         const pac_id = execSql[0].insertId;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Cadastro de paciente efetuado com sucesso.",
            dados: pac_id,
            //menSql: execSql
         });
      } catch (error) {
         return response.status(500).json({
            sucesso: false,
            mensagem: "Erro na requisição.",
            dados: error.message,
         });
      }
   },

   async editarPacientes(request, response) {
      try {
         //parametro recebidos pelo corpo da requisição
         const {
            pac_telefone,
            pac_cpf,
            pac_filho,
            pac_escolaridade,
            pac_data_nasc,
            pac_trabalho,
            pac_estado_civil,
            pac_status,
         } = request.body;
         //parametro recebido pela URl via params ex: /usuario/1
         const { pac_id } = request.params;
         //instruções SQL
         const sql = `UPDATE paciente SET pac_telefone = ?, pac_cpf = ?,
            pac_filho = ?, pac_escolaridade = ?, pac_data_nasc = ?,
            pac_trabalho = ?, pac_estado_civil = ?, pac_status = ? WHERE pac_id = ?;`;
         //preparo do array com dados que serão atualizados
         const values = [
            pac_telefone,
            pac_cpf,
            pac_filho,
            pac_escolaridade,
            pac_data_nasc,
            pac_trabalho,
            pac_estado_civil,
            pac_status,
            pac_id,
         ];
         //execução e obtenção de confirmação da atualização realizada
         const atualizaDados = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Paciente ${pac_id} atualizado com sucesso!`,
            dados: atualizaDados[0].affectedRows,
            //mensSql: atualizaDAdos
         });
      } catch (error) {
         return response.status(500).json({
            sucesso: false,
            mensagem: "Erro na requisição.",
            dados: error.message,
         });
      }
   },
   async apagarPacientes(request, response) {
      try {
         //parametro passado via URL na chamada da api pelo front-end
         const { pac_id } = request.params;
         //comando da exclusão
         const sql = `DELETE FROM paciente WHERE pac_id = ?`;
         //array com parametros da exclusão
         const values = [pac_id];
         //executa instrução no banco de dados
         const excluir = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Paciente ${pac_id} excluído com sucesso`,
            dados: excluir[0].affectedRows,
         });
      } catch (error) {
         return response.status(500).json({
            sucesso: false,
            mensagem: "Erro na requisição.",
            dados: error.message,
         });
      }
   },
};
