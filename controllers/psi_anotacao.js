const db = require("../database/connection");

module.exports = {
   async listarPsi_Anotacao(request, response) {
      try {
         //instruções SQL
         const sql = `SELECT
            pan_id , psi_id, pan_anotacao , pan_anotacao_data, pac_id
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

   async listarPsi_AnotacaoPorId(request, response) {
      try {
         // Obtém o ID do paciente dos parâmetros da requisição
         const { pac_id } = request.query;
   
         // Verifica se o ID do paciente foi fornecido
         if (!pac_id) {
            return response.status(400).json({
               sucesso: false,
               mensagem: "O ID do paciente (pac_id) é obrigatório.",
            });
         }
   
         // Instrução SQL para selecionar as anotações pelo ID do paciente
         const sql = `SELECT pan_id, psi_id, pan_anotacao, pan_anotacao_data, pac_id 
                      FROM psi_anotacao 
                      WHERE pac_id = ${db.escape(pac_id)}`;
   
         // Executa a query SQL
         const psi_anotacao = await db.query(sql);
   
         // Número de registros retornados
         const nItens = psi_anotacao[0].length;
   
         return response.status(200).json({
            sucesso: true,
            mensagem: `Lista de anotações do paciente com ID ${pac_id}.`,
            dados: psi_anotacao[0],
            nItens,
         });
      } catch (error) {
         return response.status(500).json({
            sucesso: false,
            mensagem: "Erro na requisição.",
            dados: error.message,
         });
      }
   },
   



   async cadastrarPsi_Anotacao(request, response) {
      try {
         //parametros recebidos no corp da requisição
         const { psi_id, pan_anotacao, pan_anotacao_data, pac_id } =
            request.body;
         //instrução SQL
         const sql = `INSERT INTO psi_anotacao  
            (psi_id, pan_anotacao , pan_anotacao_data, pac_id )
            VALUES (?, ?, ?, ?)`;
         //definiçaõ dos dados a serem inseriodos em um array
         const values = [psi_id, pan_anotacao, pan_anotacao_data, pac_id];
         //execução da instrução sql passando os parametros
         const execSql = await db.query(sql, values);
         //identificação do ID do resgistro inserido
         const pan_id = execSql[0].insertId;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Cadastro de anotação do psicologo efetuado com sucesso.",
            dados: pan_id,
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
   async editarPsi_Anotacao(request, response) {
      try {
         //parametro recebidos pelo corpo da requisição
         const { psi_id, pan_anotacao, pan_anotacao_data, pac_id } =
            request.body;
         //parametro recebido pela URl via params ex: /usuario/1
         const { pan_id  } = request.params;
         //instruções SQL
         const sql = `UPDATE psi_anotacao SET psi_id = ?,
         pan_anotacao = ?, pan_anotacao_data = ?, pac_id = ? WHERE pan_id = ?;`;
         //preparo do array com dados que serão atualizados
         const values = [
            psi_id,
            pan_anotacao,
            pan_anotacao_data,
            pac_id,
            pan_id,
         ];
         //execução e obtenção de confirmação da atualização realizada
         const atualizaDados = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Anotação ${pan_id} atualizada com sucesso!`,
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
   async apagarPsi_Anotacao(request, response) {
      try {
         //parametro passado via URL na chamada da api pelo front-end
         const { pan_id } = request.params;
         //comando da exclusão
         const sql = `DELETE FROM psi_anotacao WHERE pan_id = ?`;
         //array com parametros da exclusão
         const values = [pan_id];
         //executa instrução no banco de dados
         const excluir = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Anotação ${pan_id} excluída com sucesso`,
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
