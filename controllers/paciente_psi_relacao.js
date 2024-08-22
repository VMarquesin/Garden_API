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
