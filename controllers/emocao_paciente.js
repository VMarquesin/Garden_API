const db = require("../database/connection");

module.exports = {
   async listarEmocao_Paciente(request, response) {
      try {
         //instruções SQL
         const { pac_id } = request.params;
         
         const sql = `SELECT empc.emo_data, em.emo_descricao FROM emocao_paciente empc 
                     INNER JOIN emocao em on em.emo_id = empc.emo_id 
                     WHERE empc.pac_id = ?;`;
         //executa instruçoes SQL e armazana o resultado na variável usuários
         const emocao_paciente = await db.query(sql, [pac_id]);
         //armazana em uma variável o número de resgistro retornados
         const nItens = emocao_paciente[0].length;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Lista de emoções.",
            dados: emocao_paciente[0],
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
   // async listarEmocao_PacientePeriodo(request, response) {
   //    try {
   //       //instruções SQL
   //       const { emo_data_inicial, emo_data_final, pac_id } = request.body;
   //       const sql = `     SELECT epa.emo_id,
   //                                emo.emo_descricao,
   //                                epa.emo_data,
   //                                COUNT(1) AS Total
   //                           FROM emocao_paciente AS epa
   //                     INNER JOIN emocao          AS emo ON epa.emo_id = emo.emo_id
   //                          WHERE CAST(epa.emo_data AS Date) BETWEEN ? AND ?
   //                            AND epa.pac_id = ?
   //                       GROUP BY epa.emo_id,
   //                               emo.emo_descricao`;
   //       //executa instruçoes SQL e armazana o resultado na variável usuários
   //       const values = [emo_data_inicial, emo_data_final, pac_id];
   //       const emocao_paciente = await db.query(sql, values);
   //       //armazana em uma variável o número de resgistro retornados
   //       const nItens = emocao_paciente[0].length;

   //       return response.status(200).json({
   //          sucesso: true,
   //          mensagem: "Lista de emoções.",
   //          dados: emocao_paciente[0],
   //          nItens,
   //       });
   //    } catch (error) {
   //       return response.status(500).json({
   //          suceso: false,
   //          mensagem: "Erro na requisição.",
   //          dados: error.message,
   //       });
   //    }
   // },

   async cadastrarEmocao_Paciente(request, response) {
      try {
         //parametros recebidos no corp da requisição
         const { emo_id, emo_data, pac_id } = request.body;
         //instrução SQL
         const sql = `INSERT INTO emocao_paciente
            ( emo_id, emo_data, pac_id)
            VALUES (?, ?, ?)`;
         //definiçaõ dos dados a serem inseriodos em um array
         const values = [emo_id, emo_data, pac_id];
         //execução da instrução sql passando os parametros
         const execSql = await db.query(sql, values);
         //identificação do ID do resgistro inserido
         const epa_id = execSql[0].insertId;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Cadastro da emoção efetuado com sucesso.",
            dados: epa_id,
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
   async editarEmocao_Paciente(request, response) {
      try {
         //parametro recebidos pelo corpo da requisição
         const { emo_id, emo_data, pac_id } = request.body;
         //parametro recebido pela URl via params ex: /usuario/1
         const { epa_id } = request.params;
         //instruções SQL
         const sql = `UPDATE emocao_paciente SET emo_id = ?, emo_data = ?,
         pac_id = ? WHERE epa_id = ?;`;
         //preparo do array com dados que serão atualizados
         const values = [emo_id, emo_data, pac_id, epa_id];
         //execução e obtenção de confirmação da atualização realizada
         const atualizaDados = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Emoção ${epa_id} atualizado com sucesso!`,
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
   async apagarEmocao_Paciente(request, response) {
      try {
         //parametro passado via URL na chamada da api pelo front-end
         const { epa_id } = request.params;
         //comando da exclusão
         const sql = `DELETE FROM emocao_paciente WHERE epa_id = ?`;
         //array com parametros da exclusão
         const values = [epa_id];
         //executa instrução no banco de dados
         const excluir = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Emoção ${epa_id} excluído com sucesso`,
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
