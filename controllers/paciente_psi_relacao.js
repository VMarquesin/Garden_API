const db = require("../database/connection");

module.exports = {
   async listarPaciente_psi_relacao(request, response) {
      try {
         //instruções SQL
         const sql = ` SELECT
         ppr_id, pac_id , psi_id, ppr_datainicial, ppr_datafinal
         FROM paciente_psi_relacao`;
         //executa instruçoes SQL e armazana o resultado na variável usuários
         const paciente_psi_relacao = await db.query(sql);
         //armazana em uma variável o número de resgistro retornados
         const nItens = paciente_psi_relacao[0].length;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Lista de paciente - psicologo.",
            dados: paciente_psi_relacao[0],
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

   async Paciente_por_id(request, response) {
      try {
         const { psi_id } = request.params
         //instruções SQL
         const sql = ` 
         SELECT
         pps.ppr_id, pps.pac_id , pps.psi_id, pps.ppr_datainicial, pps.ppr_datafinal,
         p.pac_telefone, p.pac_cpf, p.pac_filho, p.pac_escolaridade, p.pac_data_nasc, p.pac_trabalho, p.pac_estado_civil,
         u.usu_nome, u.usu_nick, u.usu_email
         FROM paciente as p INNER JOIN paciente_psi_relacao as pps
         ON pps.pac_id = p.pac_id
         INNER JOIN usuarios as u
         ON u.usu_id = p.usu_id
         WHERE pps.psi_id = ?
         `;
         //executa instruçoes SQL e armazana o resultado na variável usuários
         const paciente_psi_relacao = await db.query(sql, psi_id);
         //armazana em uma variável o número de resgistro retornados
         const nItens = paciente_psi_relacao[0].length;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Lista de paciente - psicologo.",
            dados: paciente_psi_relacao[0],
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
   async cadastrarPaciente_psi_relacao(request, response) {
      try {
         //parametros recebidos no corp da requisição
         const { pac_id, psi_id, ppr_datainicial, ppr_datafinal } =
            request.body;
         //instrução SQL
         const sql = `INSERT INTO paciente_psi_relacao 
            (pac_id , psi_id, ppr_datainicial, ppr_datafinal)
            VALUES (?, ?, ?, ?)`;
         //definiçaõ dos dados a serem inseriodos em um array
         const values = [pac_id, psi_id, ppr_datainicial, ppr_datafinal];
         //execução da instrução sql passando os parametros
         const execSql = await db.query(sql, values);
         //identificação do ID do resgistro inserido
         const ppr_id = execSql[0].insertId;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Cadastro relação PP efetuado com sucesso.",
            dados: ppr_id,
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
   async editarPaciente_psi_relacao(request, response) {
      try {
         //parametro recebidos pelo corpo da requisição
         const { pac_id, psi_id, ppr_datainicial, ppr_datafinal } =
            request.body;
         //parametro recebido pela URl via params ex: /usuario/1
         const { ppr_id } = request.params;
         //instruções SQL
         const sql = `UPDATE paciente_psi_relacao  SET pac_id = ?, psi_id = ?,
         ppr_datainicial = ?, ppr_datafinal = ? WHERE ppr_id = ?;`;
         //preparo do array com dados que serão atualizados
         const values = [pac_id, psi_id, ppr_datainicial, ppr_datafinal, ppr_id];
         //execução e obtenção de confirmação da atualização realizada
         const atualizaDados = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Relação PP ${ppr_id} atualizado com sucesso!`,
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
   async apagarPaciente_psi_relacao(request, response) {
      try {
         //parametro passado via URL na chamada da api pelo front-end
         const { ppr_id } = request.params;
         //comando da exclusão
         const sql = `DELETE FROM paciente_psi_relacao  WHERE ppr_id = ?`;
         //array com parametros da exclusão
         const values = [ppr_id];
         //executa instrução no banco de dados
         const excluir = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Relação ${ppr_id} excluída com sucesso`,
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
