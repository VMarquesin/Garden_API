const db = require("../database/connection");

module.exports = {
   async listarDiario(request, response) {
      try {
         //instruções SQL
         
         const { pac_id } = request.params;
         const sql = ` SELECT
            dia_id, pac_id, dia_relato, dia_data
            FROM diario
            WHERE pac_id = ?`;

         const values = [pac_id];
         //executa instruçoes SQL e armazana o resultado na variável usuários
         const diario = await db.query(sql, values);
         //armazana em uma variável o número de resgistro retornados
         const nItens = diario[0].length;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Lista de diários.",
            dados: diario[0],
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
   async cadastrarDiario(request, response) {
      try {
         //parametros recebidos no corp da requisição
         const {pac_id, dia_relato, dia_data } =
            request.body;
         //instrução SQL
         const sql = `INSERT INTO diario
            ( pac_id, dia_relato, dia_data)
            VALUES (?, ?, ?)`;
         //definiçaõ dos dados a serem inseriodos em um array
         const values = [pac_id, dia_relato, dia_data];
         //execução da instrução sql passando os parametros
         const execSql = await db.query(sql, values);
         //identificação do ID do resgistro inserido
         const dia_id = execSql[0].insertId;




         return response.status(200).json({
            sucesso: true,
            mensagem: "Cadastro do diário efetuado com sucesso.",
            dados: dia_id,
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
   async editarDiario(request, response) {
      try {
         //parametro recebidos pelo corpo da requisição
         const { dia_relato, dia_data } = request.body;
         //parametro recebido pela URl via params ex: /usuario/1
         const { dia_id } = request.params;
         //instruções SQL
         const sql = `UPDATE diario SET dia_relato = ?,
         dia_data = ? WHERE dia_id = ?;`;
         //preparo do array com dados que serão atualizados
         const values = [dia_relato, dia_data, dia_id];
         //execução e obtenção de confirmação da atualização realizada
         const atualizaDados = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Diário ${dia_id} atualizado com sucesso!`,
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
   async apagarDiario(request, response) {
      try {
         //parametro passado via URL na chamada da api pelo front-end
         const { dia_id } = request.params;
         //comando da exclusão
         const sql = `DELETE FROM diario WHERE dia_id = ?`;
         //array com parametros da exclusão
         const values = [dia_id];
         //executa instrução no banco de dados
         const excluir = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Diário ${dia_id} excluído com sucesso`,
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
   // async ocultarUsuario(request, response) {
   //    try {
   //       const usu_ativo = false;
   //       const { usu_id } = request.params;
   //       const sql = `UPDATE paciente SET paci_status = ?
   //             FROM paciente
   //             WHERE usu_id = ?;`;
   //       const values = [usu_ativo.usu_id];
   //       const atualizacao = await db.query(sql, values);

   //       return response.status(200).json({
   //          sucesso: true,
   //          mensagem: `Usuário ${usu_id} excluído com sucesso`,
   //          dados: atualizacao[0].affectedRows,
   //       });
   //    } catch (error) {
   //       return response.status(500).json({
   //          sucesso: false,
   //          mensagem: "Erro na requisição.",
   //          dados: error.message,
   //       });
   //    }
   // },
};
