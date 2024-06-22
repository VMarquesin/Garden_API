const db = require("../database/connection");

module.exports = {
   async listarDataSessao(request, response) {
      try {
         //instruções SQL
         const sql = ` SELECT
            dtsec_id, psi_id, paciente_id,
            FROM data_sessao`;
         //executa instruçoes SQL e armazana o resultado na variável usuários
         const data_sessao = await db.query(sql);
         //armazana em uma variável o número de resgistro retornados
         const nItens = data_sessao[0].length;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Lista de datas das sessões.",
            dados: data_sessao[0],
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
   async cadastrarDataSessao(request, response) {
      try {
         //parametros recebidos no corp da requisição
         const { dtsec_id, psi_id, paciente_id, } =
            request.body;
         //instrução SQL
         const sql = `INSERT INTO data_sessao
            ( dtsec_id, psi_id, paciente_id,)
            VALUES (?, ?, ?)`;
         //definiçaõ dos dados a serem inseriodos em um array
         const values = [dtsec_id, psi_id, paciente_id];
         //execução da instrução sql passando os parametros
         const execSql = await db.query(sql, values);
         //identificação do ID do resgistro inserido
         execSql[0].insertId;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Cadastro de data da sessão efetuado com sucesso.",
            dados: dtsec_id,
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
   async editarDataSessao(request, response) {
      try {
         //parametro recebidos pelo corpo da requisição
         const {  psi_id, paciente_id, } = request.body;
         //parametro recebido pela URl via params ex: /usuario/1
         const { dtsec_id } = request.params;
         //instruções SQL
         const sql = `UPDATE data_sessao SET dtsec_id = ?, psi_id = ?,
         paciente_id = ? WHERE dtsec_id = ?;`;
         //preparo do array com dados que serão atualizados
         const values = [dtsec_id, psi_id, paciente_id];
         //execução e obtenção de confirmação da atualização realizada
         const atualizaDados = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `data da sessão ${dtsec_id} atualizado com sucesso!`,
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
   async apagarDataSessao(request, response) {
      try {
         //parametro passado via URL na chamada da api pelo front-end
         const { dtsec_id } = request.params;
         //comando da exclusão
         const sql = `DELETE FROM data_sessao WHERE dtsec_id = ?`;
         //array com parametros da exclusão
         const values = [dtsec_id];
         //executa instrução no banco de dados
         const excluir = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Data da sessão ${dtsec_id} excluída com sucesso`,
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