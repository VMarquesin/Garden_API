const db = require("../database/connection");

module.exports = {
   async listarPpr(request, response) {
      try {
         //instruções SQL
         const sql = ` SELECT
         ppr, paciente_id, psi_id, ppr_datainicial, ppr_datafinal
            FROM ppr`;
         //executa instruçoes SQL e armazana o resultado na variável usuários
         const ppr = await db.query(sql);
         //armazana em uma variável o número de resgistro retornados
         const nItens = ppr[0].length;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Lista de paciente - psicologo.",
            dados: ppr[0],
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
   async cadastrarPpr(request, response) {
      try {
         //parametros recebidos no corp da requisição
         const { paciente_id, psi_id, ppr_datainicial, ppr_datafinal } =
            request.body;
         //instrução SQL
         const sql = `INSERT INTO ppr
            (paciente_id, psi_id, ppr_datainicial, ppr_datafinal)
            VALUES (?, ?, ?, ?)`;
         //definiçaõ dos dados a serem inseriodos em um array
         const values = [paciente_id, psi_id, ppr_datainicial, ppr_datafinal];
         //execução da instrução sql passando os parametros
         const execSql = await db.query(sql, values);
         //identificação do ID do resgistro inserido
         const ppr = execSql[0].insertId;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Cadastro relação PP efetuado com sucesso.",
            dados: ppr,
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
   async editarPpr(request, response) {
      try {
         //parametro recebidos pelo corpo da requisição
         const { aciente_id, psi_id, ppr_datainicial, ppr_datafinal } =
            request.body;
         //parametro recebido pela URl via params ex: /usuario/1
         const { ppr } = request.params;
         //instruções SQL
         const sql = `UPDATE ppr SET aciente_id = ?, psi_id = ?,
         ppr_datainicial = ?, ppr_datafinal = ? WHERE ppr = ?;`;
         //preparo do array com dados que serão atualizados
         const values = [
            aciente_id, 
            psi_id, 
            ppr_datainicial, 
            ppr_datafinal,
            ppr,
         ];
         //execução e obtenção de confirmação da atualização realizada
         const atualizaDados = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Relação PP ${ppr} atualizado com sucesso!`,
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
   async apagarPpr(request, response) {
      try {
         //parametro passado via URL na chamada da api pelo front-end
         const { ppr } = request.params;
         //comando da exclusão
         const sql = `DELETE FROM ppr WHERE ppr = ?`;
         //array com parametros da exclusão
         const values = [ppr];
         //executa instrução no banco de dados
         const excluir = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Relação ${ppr} excluída com sucesso`,
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
