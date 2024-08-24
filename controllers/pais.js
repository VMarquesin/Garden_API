const db = require("../database/connection");

module.exports = {
   async listarPais(request, response) {
      try {
         //instruções SQL
         const sql = ` SELECT
            pas_id, pas_nome, pas_nome_pt  ,pas_sigla  ,pas_bacen 
            FROM pais `;
         //executa instruçoes SQL e armazana o resultado na variável usuários
         const pais = await db.query(sql);
         //armazana em uma variável o número de resgistro retornados
         const nItens = pais[0].length;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Lista de pais s.",
            dados: pais[0],
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
   async cadastrarPais(request, response) {
      try {
         //parametros recebidos no corp da requisição
         const { pas_id, pas_nome, pas_nome_pt, pas_sigla, pas_bacen } =
            request.body;
         //instrução SQL
         const sql = `INSERT INTO pais 
            (pas_id, pas_nome, pas_nome_pt, pas_sigla, pas_bacen)
            VALUES (?, ?, ?, ?, ?)`;
         //definiçaõ dos dados a serem inseriodos em um array
         const values = [pas_id, pas_nome, pas_nome_pt, pas_sigla, pas_bacen];
         //execução da instrução sql passando os parametros
         const execSql = await db.query(sql, values);
         //identificação do ID do resgistro inserido
         execSql[0].insertId;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Cadastro de pais efetuado com sucesso.",
            dados: pas_id,
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
   async editarPais(request, response) {
      try {
         //parametro recebidos pelo corpo da requisição
         const { pas_nome, pas_nome_pt, pas_sigla, pas_bacen } = request.body;
         //parametro recebido pela URl via params ex: /usuario/1
         const { pas_id } = request.params;
         //instruções SQL
         const sql = `UPDATE pais SET pas_nome = ?, pas_nome_pt = ?,
         pas_sigla = ?, pas_bacen = ? WHERE pas_id = ?;`;
         //preparo do array com dados que serão atualizados
         const values = [pas_nome, pas_nome_pt, pas_sigla, pas_bacen, pas_id];
         //execução e obtenção de confirmação da atualização realizada
         const atualizaDados = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Pais ${pas_id} atualizado com sucesso!`,
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
   async apagarPais(request, response) {
      try {
         //parametro passado via URL na chamada da api pelo front-end
         const { pas_id } = request.params;
         //comando da exclusão
         const sql = `DELETE FROM pais WHERE pas_id = ?`;
         //array com parametros da exclusão
         const values = [pas_id];
         //executa instrução no banco de dados
         const excluir = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Pais ${pas_id} excluído com sucesso`,
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
