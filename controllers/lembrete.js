const db = require("../database/connection");

module.exports = {
   async listarLembrete(request, response) {
      try {
         //instruções SQL
         const sql = ` SELECT
            lem_id, lem_psi, lem_data ,psi_id ,pac_id
            FROM lembrete`;
         //executa instruçoes SQL e armazana o resultado na variável usuários
         const lembrete = await db.query(sql);
         //armazana em uma variável o número de resgistro retornados
         const nItens = lembrete[0].length;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Lista de Lembretes.",
            dados: lembrete[0],
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
   async cadastrarLembrete(request, response) {
      try {
         //parametros recebidos no corp da requisição
         const { lem_psi, lem_data, psi_id, pac_id } = request.body;
         //instrução SQL
         const sql = `INSERT INTO lembrete
            (lem_psi, lem_data, psi_id, pac_id)
            VALUES (?, ?, ?, ?)`;
         //definiçaõ dos dados a serem inseriodos em um array
         const values = [lem_id, lem_psi, lem_data, psi_id, pac_id];
         //execução da instrução sql passando os parametros
         const execSql = await db.query(sql, values);
         //identificação do ID do resgistro inserido
         const lem_id = execSql[0].insertId;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Cadastro de Lembrete efetuado com sucesso.",
            dados: lem_id,
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
   async editarLembrete(request, response) {
      try {
         //parametro recebidos pelo corpo da requisição
         const { lem_psi, lem_data, psi_id, pac_id } = request.body;
         //parametro recebido pela URl via params ex: /usuario/1
         const { lem_id } = request.params;
         //instruções SQL
         const sql = `UPDATE lembrete SET lem_id = ?, lem_psi = ?,
         psi_id = ? lem_data = ? pac_id = ? WHERE lem_id = ?;`;
         //preparo do array com dados que serão atualizados
         const values = [lem_psi, lem_data, psi_id, pac_id];
         //execução e obtenção de confirmação da atualização realizada
         const atualizaDados = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `lembrete ${lem_id} atualizado com sucesso!`,
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
   async apagarLembrete(request, response) {
      try {
         //parametro passado via URL na chamada da api pelo front-end
         const { lem_id } = request.params;
         //comando da exclusão
         const sql = `DELETE FROM lembrete WHERE lem_id = ?`;
         //array com parametros da exclusão
         const values = [lem_id];
         //executa instrução no banco de dados
         const excluir = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `lembrete ${lem_id} excluído com sucesso`,
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
