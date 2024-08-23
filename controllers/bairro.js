const db = require("../database/connection");

module.exports = {
   async listarBairro(request, response) {
      try {
         //instruções SQL
         const sql = ` SELECT
            bai_id , bai_nome , cid_id 
            FROM bairro `;
         //executa instruçoes SQL e armazana o resultado na variável usuários
         const bairro  = await db.query(sql);
         //armazana em uma variável o número de resgistro retornados
         const nItens = bairro [0].length;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Lista de bairros.",
            dados: bairro [0],
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
   async cadastrarBairro(request, response) {
      try {
         //parametros recebidos no corp da requisição
         const { bai_nome , cid_id } = request.body;
         //instrução SQL
         const sql = `INSERT INTO bairro 
            (bai_nome , cid_id)
            VALUES (?, ?)`;
         //definiçaõ dos dados a serem inseriodos em um array
         const values = [bai_nome , cid_id];
         //execução da instrução sql passando os parametros
         const execSql = await db.query(sql, values);
         //identificação do ID do resgistro inserido
         const bai_id  = execSql[0].insertId;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Cadastro do bairro efetuado com sucesso.",
            dados: bai_id ,
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
   async editarBairro(request, response) {
      try {
         //parametro recebidos pelo corpo da requisição
         const { bai_nome , cid_id } = request.body;
         //parametro recebido pela URl via params ex: /usuario/1
         const { bai_id  } = request.params;
         //instruções SQL
         const sql = `UPDATE bairro SET bai_nome = ?, cid_id = ?
         WHERE bai_id = ?;`;
         //preparo do array com dados que serão atualizados
         const values = [bai_nome , cid_id, bai_id];
         //execução e obtenção de confirmação da atualização realizada
         const atualizaDados = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Bairro ${bai_id } atualizado com sucesso!`,
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
   async apagarBairro(request, response) {
      try {
         //parametro passado via URL na chamada da api pelo front-end
         const { bai_id  } = request.params;
         //comando da exclusão
         const sql = `DELETE FROM bairro  WHERE bai_id  = ?`;
         //array com parametros da exclusão
         const values = [bai_id ];
         //executa instrução no banco de dados
         const excluir = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Bairro ${bai_id } excluído com sucesso`,
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
