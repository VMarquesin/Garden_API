const db = require("../database/connection");

module.exports = {
   async listarLembrete(request, response) {
      try {
         //instruções SQL
         const sql = ` SELECT
            lembrete_id, lembrete_psi, psi_id, paciente_id
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
         const { lembrete_id, lembrete_psi, psi_id, paciente_id } =
            request.body;
         //instrução SQL
         const sql = `INSERT INTO lembrete
            ( lembrete_id, lembrete_psi, psi_id, paciente_id)
            VALUES (?, ?, ?, ?)`;
         //definiçaõ dos dados a serem inseriodos em um array
         const values = [lembrete_id, lembrete_psi, psi_id, paciente_id];
         //execução da instrução sql passando os parametros
         const execSql = await db.query(sql, values);
         //identificação do ID do resgistro inserido
         execSql[0].insertId;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Cadastro de Lembrete efetuado com sucesso.",
            dados: lembrete_id,
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
         const { lembrete_psi, psi_id, paciente_id } = request.body;
         //parametro recebido pela URl via params ex: /usuario/1
         const { lembrete_id } = request.params;
         //instruções SQL
         const sql = `UPDATE lembrete SET lembrete_id = ?, lembrete_psi = ?,
         psi_id = ? paciente_id = ? WHERE lembrete_id = ?;`;
         //preparo do array com dados que serão atualizados
         const values = [psi_id, endereco, cnpj];
         //execução e obtenção de confirmação da atualização realizada
         const atualizaDados = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `lembrete ${lembrete_id} atualizado com sucesso!`,
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
         const { lembrete_id } = request.params;
         //comando da exclusão
         const sql = `DELETE FROM lembrete WHERE lembrete_id = ?`;
         //array com parametros da exclusão
         const values = [lembrete_id];
         //executa instrução no banco de dados
         const excluir = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `lembrete ${lembrete_id} excluído com sucesso`,
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