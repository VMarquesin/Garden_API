const db = require("../database/connection");

module.exports = {
   async listarEstado(request, response) {
      try {
         //instruções SQL
         const sql = ` SELECT
            est_id , est_nome , est_uf  ,est_ibge  ,est_ddd 
            FROM estado `;
         //executa instruçoes SQL e armazana o resultado na variável usuários
         const estado = await db.query(sql);
         //armazana em uma variável o número de resgistro retornados
         const nItens = estado[0].length;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Lista de estados.",
            dados: estado[0],
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
   async cadastrarEstado(request, response) {
      try {
         //parametros recebidos no corp da requisição
         const { est_nome, est_uf, est_ibge, est_ddd } = request.body;
         //instrução SQL
         const sql = `INSERT INTO estado 
            (est_id, est_nome , est_uf , est_ibge , est_ddd )
            VALUES (?, ?, ?, ?, ?)`;
         //definiçaõ dos dados a serem inseriodos em um array
         const values = [est_id, est_nome, est_uf, est_ibge, est_ddd];
         //execução da instrução sql passando os parametros
         const execSql = await db.query(sql, values);
         //identificação do ID do resgistro inserido
         execSql[0].insertId;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Cadastro do estado efetuado com sucesso.",
            dados: est_id,
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
   async editarEstado(request, response) {
      try {
         //parametro recebidos pelo corpo da requisição
         const { est_nome, est_uf, est_ibge, est_ddd } = request.body;
         //parametro recebido pela URl via params ex: /usuario/1
         const { est_id } = request.params;
         //instruções SQL
         const sql = `UPDATE estado SET est_nome = ?, est_uf = ?,
         est_ibge = ?, est_ddd = ? WHERE est_id = ?;`;
         //preparo do array com dados que serão atualizados
         const values = [est_nome, est_uf, est_ibge, est_ddd, est_id];
         //execução e obtenção de confirmação da atualização realizada
         const atualizaDados = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Estado ${est_id} atualizado com sucesso!`,
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
   async apagarEstado(request, response) {
      try {
         //parametro passado via URL na chamada da api pelo front-end
         const { est_id } = request.params;
         //comando da exclusão
         const sql = `DELETE FROM estado WHERE est_id = ?`;
         //array com parametros da exclusão
         const values = [est_id];
         //executa instrução no banco de dados
         const excluir = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Estado ${est_id} excluído com sucesso`,
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
