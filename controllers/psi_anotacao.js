const db = require("../database/connection");

module.exports = {
   async listarPsiAnotacao(request, response) {
      try {
         //instruções SQL
         const sql = ` SELECT
            psi_anotacao_id, psi_id, anotacao, anotacao_data, paciente_id,
            FROM psi_anotacao`;
         //executa instruçoes SQL e armazana o resultado na variável usuários
         const psi_anotacao = await db.query(sql);
         //armazana em uma variável o número de resgistro retornados
         const nItens = psi_anotacao[0].length;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Lista de anotações do psicologo.",
            dados: psi_anotacao[0],
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
   async cadastrarPsiAnotacao(request, response) {
      try {
         //parametros recebidos no corp da requisição
         const { psi_anotacao, psi_id, anotacao, anotacao_data, paciente_id, } =
            request.body;
         //instrução SQL
         const sql = `INSERT INTO psi_anotacao
            ( psi_anotacao, psi_id, anotacao, anotacao_data, paciente_id,)
            VALUES (?, ?, ?, ?, ?)`;
         //definiçaõ dos dados a serem inseriodos em um array
         const values = [psi_anotacao, psi_id, anotacao, anotacao_data, paciente_id];
         //execução da instrução sql passando os parametros
         const execSql = await db.query(sql, values);
         //identificação do ID do resgistro inserido
         execSql[0].insertId;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Cadastro de anotações do psicologo efetuado com sucesso.",
            dados: psi_anotacao_id,
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
   async editarPsiAnotacao(request, response) {
      try {
         //parametro recebidos pelo corpo da requisição
         const {  psi_id, anotacao, anotacao_data, paciente_id, } = request.body;
         //parametro recebido pela URl via params ex: /usuario/1
         const { psi_anotacao_id } = request.params;
         //instruções SQL
         const sql = `UPDATE psi_anotacao SET psi_anotacao_id = ?, psi_id = ?,
         anotacao = ?, anotacao_data = ?, paciente_id = ? WHERE psi_anotacao_id = ?;`;
         //preparo do array com dados que serão atualizados
         const values = [psi_anotacao, psi_id, anotacao, anotacao_data, paciente_id];
         //execução e obtenção de confirmação da atualização realizada
         const atualizaDados = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Anotação do Psicologo ${psi_anotacao_id} atualizado com sucesso!`,
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
   async apagarPsiAnotacao(request, response) {
      try {
         //parametro passado via URL na chamada da api pelo front-end
         const { psi_anotacao_id } = request.params;
         //comando da exclusão
         const sql = `DELETE FROM psi_anotacao WHERE psi_anotacao_id = ?`;
         //array com parametros da exclusão
         const values = [psi_anotacao_id];
         //executa instrução no banco de dados
         const excluir = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `anotação do psicologo ${psi_anotcao_id} excluída com sucesso`,
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
}