const db = require("../database/connection");

module.exports = {
   async listarCidade(request, response) {
      try {
         //instruções SQL
         const sql = ` SELECT
            cid_id , cid_nome , cid_uf  ,cid_ibge
            FROM cidade `;
         //executa instruçoes SQL e armazana o resultado na variável usuários
         const cidade = await db.query(sql);
         //armazana em uma variável o número de resgistro retornados
         const nItens = cidade[0].length;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Lista de cidades.",
            dados: cidade[0],
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
   async cadastrarCidade(request, response) {
      try {
         //parametros recebidos no corp da requisição
         const { cid_id, cid_nome, cid_uf, cid_ibge } = request.body;
         //instrução SQL
         const sql = `INSERT INTO cidade 
            (cid_id, cid_nome, cid_uf, cid_ibge)
            VALUES (?, ?, ?, ?)`;
         //definiçaõ dos dados a serem inseriodos em um array
         const values = [cid_id, cid_nome, cid_uf, cid_ibge];
         //execução da instrução sql passando os parametros
         const execSql = await db.query(sql, values);
         //identificação do ID do resgistro inserido
         execSql[0].insertId;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Cadastro de cidade efetuado com sucesso.",
            dados: cid_id,
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
   async editarCidade(request, response) {
      try {
         //parametro recebidos pelo corpo da requisição
         const { cid_nome, cid_uf, cid_ibge } = request.body;
         //parametro recebido pela URl via params ex: /usuario/1
         const { cid_id } = request.params;
         //instruções SQL
         const sql = `UPDATE cidade SET cid_nome = ?, cid_uf = ?,
         cid_ibge = ?, pac_id = ? WHERE cid_id = ?;`;
         //preparo do array com dados que serão atualizados
         const values = [cid_nome, cid_uf, cid_ibge, cid_id];
         //execução e obtenção de confirmação da atualização realizada
         const atualizaDados = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Cidade ${cid_id} atualizado com sucesso!`,
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
   async apagarCidade(request, response) {
      try {
         //parametro passado via URL na chamada da api pelo front-end
         const { cid_id } = request.params;
         //comando da exclusão
         const sql = `DELETE FROM cidade WHERE cid_id = ?`;
         //array com parametros da exclusão
         const values = [cid_id];
         //executa instrução no banco de dados
         const excluir = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `cidade ${cid_id} excluído com sucesso`,
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
