const db = require("../database/connection");

module.exports = {
   async listarPsicologo(request, response) {
      try {
         const { psi_id } = request.params;
         
         const sql = ` SELECT
            psi_endereco, psi_cnpj, usu_id
            FROM psicologo
            WHERE psi_id = ?`;
            
         const values = [psi_id];
         //executa instruçoes SQL e armazana o resultado na variável usuários
         const psicologo = await db.query(sql, values);
         //armazana em uma variável o número de resgistro retornados
         const nItens = psicologo[0].length;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Lista de Psicologos.",
            dados: psicologo[0],
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

   async listarPsicologos(request, response) {
      try {
         //instruções SQL
         const sql = ` SELECT
            psi_id, psi_endereco, psi_cnpj, usu_id
            FROM psicologo`;
         //executa instruçoes SQL e armazana o resultado na variável usuários
         const psicologo = await db.query(sql);
         //armazana em uma variável o número de resgistro retornados
         const nItens = psicologo[0].length;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Lista de Psicologos.",
            dados: psicologo[0],
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

   async cadastrarPsicologo(request, response) {
      try {
         //parametros recebidos no corp da requisição
         const { psi_endereco, psi_cnpj, usu_id } = request.body;
         //instrução SQL
         const sql = `INSERT INTO psicologo
            ( psi_endereco, psi_cnpj, usu_id)
            VALUES (?, ?, ?)`;
         //definiçaõ dos dados a serem inseriodos em um array
         const values = [psi_endereco, psi_cnpj, usu_id];
         //execução da instrução sql passando os parametros
         const execSql = await db.query(sql, values);
         //identificação do ID do resgistro inserido
         const psi_id = execSql[0].insertId;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Cadastro do Psicologo efetuado com sucesso.",
            dados: psi_id,
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
   async editarPsicologo(request, response) {
      try {
         //parametro recebidos pelo corpo da requisição
         const { psi_endereco, psi_cnpj } = request.body;
         //parametro recebido pela URl via params ex: /usuario/1
         const { psi_id } = request.params;
         //instruções SQL
         const sql = `UPDATE psicologo SET psi_endereco
          = ?, psi_cnpj = ? WHERE psi_id = ?;`;
         //preparo do array com dados que serão atualizados
         const values = [psi_endereco, psi_cnpj, psi_id];
         //execução e obtenção de confirmação da atualização realizada
         const atualizaDados = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Psicologo ${psi_id} atualizado com sucesso!`,
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
   async apagarPsicologo(request, response) {
      try {
         //parametro passado via URL na chamada da api pelo front-end
         const { psi_id } = request.params;
         //comando da exclusão
         const sql = `DELETE FROM psicologo WHERE psi_id = ?`;
         //array com parametros da exclusão
         const values = [psi_id];
         //executa instrução no banco de dados
         const excluir = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Psicologo ${psi_id} excluído com sucesso`,
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
