const db = require("../database/connection");

module.exports = {
   async listarEndereco_Usuario(request, response) {
      try {
         //instruções SQL
         const sql = ` SELECT
            eus_id , bai_id , end_numero, end_complemento, pac_id, psi_id 
            FROM endereco_usuario`;
         //executa instruçoes SQL e armazana o resultado na variável usuários
         const eus_id = await db.query(sql);
         //armazana em uma variável o número de resgistro retornados
         const nItens = eus_id[0].length;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Lista de Endereços.",
            dados: eus_id[0],
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
   async cadastrarEndereco_Usuario(request, response) {
      try {
         //parametros recebidos no corp da requisição
         const { bai_id, end_numero, end_complemento, pac_id, psi_id } =
            request.body;
         //instrução SQL
         const sql = `INSERT INTO endereco_usuario
            ( bai_id, end_numero, end_complemento, pac_id, psi_id)
            VALUES (?, ?, ?, ?, ?)`;
         //definiçaõ dos dados a serem inseriodos em um array
         const values = [bai_id, end_numero, end_complemento, pac_id, psi_id];
         //execução da instrução sql passando os parametros
         const execSql = await db.query(sql, values);
         //identificação do ID do resgistro inserido
         const eus_id = execSql[0].insertId;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Cadastro de endereço do usuario efetuado com sucesso.",
            dados: eus_id,
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
   async editarEndereco_Usuario(request, response) {
      try {
         //parametro recebidos pelo corpo da requisição
         const { bai_id, end_numero, end_complemento, pac_id, psi_id } =
            request.body;
         //parametro recebido pela URl via params ex: /usuario/1
         const { eus_id } = request.params;
         //instruções SQL
         const sql = `UPDATE endereco_usuario SET bai_id = ?, end_numero = ?, 
         end_complemento = ?, pac_id = ?, psi_id = ?  
         WHERE eus_id = ?;`;
         //preparo do array com dados que serão atualizados
         const values = [
            bai_id,
            end_numero,
            end_complemento,
            pac_id,
            psi_id,
            eus_id,
         ];
         //execução e obtenção de confirmação da atualização realizada
         const atualizaDados = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Endereço do usuario ${eus_id} atualizado com sucesso!`,
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
   async apagarEndereco_Usuario(request, response) {
      try {
         //parametro passado via URL na chamada da api pelo front-end
         const { eus_id } = request.params;
         //comando da exclusão
         const sql = `DELETE FROM endereco_usuario WHERE eus_id = ?`;
         //array com parametros da exclusão
         const values = [eus_id];
         //executa instrução no banco de dados
         const excluir = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Endereço do usuario ${eus_id} excluído com sucesso`,
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
