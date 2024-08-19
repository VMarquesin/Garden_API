const db = require("../database/connection");

module.exports = {
   async listarAtividade(request, response) {
      try {
         //instruções SQL
         const sql = ` SELECT
            ati_id, ati_descricao, ati_data , psi_id
            FROM atividade`;
         //executa instruçoes SQL e armazana o resultado na variável usuários
         const atividade = await db.query(sql);
         //armazana em uma variável o número de resgistro retornados
         const nItens = atividade[0].length;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Lista de Atividade.",
            dados: atividade[0],
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
   async cadastrarAtividade(request, response) {
      try {
         //parametros recebidos no corp da requisição
         const { ati_descricao, ati_data, psi_id } = request.body;
         //instrução SQL
         const sql = `INSERT INTO atividade
            ( ati_descricao, ati_data , psi_id)
            VALUES (?, ?, ?)`;
         //definiçaõ dos dados a serem inseriodos em um array
         const values = [ati_descricao, ati_data, psi_id];
         //execução da instrução sql passando os parametros
         const execSql = await db.query(sql, values);
         //identificação do ID do resgistro inserido
         const ati_id = execSql[0].insertId;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Cadastro da Atividade efetuado com sucesso.",
            dados: ati_id,
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
   async editarAtividade(request, response) {
      try {
         //parametro recebidos pelo corpo da requisição
         const { ati_descricao, ati_data, psi_id } = request.body;
         //parametro recebido pela URl via params ex: /usuario/1
         const { ati_id } = request.params;
         //instruções SQL
         const sql = `UPDATE atividade SET ati_descricao = ?, ati_data  = ?, psi_id = ? WHERE ati_id = ?;`;
         //preparo do array com dados que serão atualizados
         const values = [ati_descricao, ati_data, psi_id, ati_id];
         //execução e obtenção de confirmação da atualização realizada
         const atualizaDados = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Atividade ${ati_id} atualizada com sucesso!`,
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
   async apagarAtividade(request, response) {
      try {
         //parametro passado via URL na chamada da api pelo front-end
         const { ati_id } = request.params;
         //comando da exclusão
         const sql = `DELETE FROM atividade WHERE ati_id = ?`;
         //array com parametros da exclusão
         const values = [ati_id];
         //executa instrução no banco de dados
         const excluir = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Atividade ${ati_id} excluída com sucesso`,
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
