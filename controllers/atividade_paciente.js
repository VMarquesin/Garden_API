const db = require("../database/connection");

module.exports = {
   async listarAtividadePaciente(request, response) {
      try {
         //instruções SQL
         const sql = ` SELECT
            apa_id, ati_id, paciente_id
            FROM atividade_paciente`;
         //executa instruçoes SQL e armazana o resultado na variável usuários
         const endereco = await db.query(sql);
         //armazana em uma variável o número de resgistro retornados
         const nItens = atividade_paciente[0].length;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Lista de Atividades_Paciente.",
            dados: atividade_paciente[0],
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
   async cadastrarAtividadePaciente(request, response) {
      try {
         //parametros recebidos no corp da requisição
         const { apa_id, ati_id, paciente_id } = request.body;
         //instrução SQL
         const sql = `INSERT INTO atividade_paciente
            ( apa_id, ati_id, paciente_id)
            VALUES (?, ?, ?)`;
         //definiçaõ dos dados a serem inseriodos em um array
         const values = [apa_id, ati_id, paciente_id];
         //execução da instrução sql passando os parametros
         const execSql = await db.query(sql, values);
         //identificação do ID do resgistro inserido
         execSql[0].insertId;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Cadastro de Atividade_Paceinte efetuado com sucesso.",
            dados: apa_id,
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
   async editarAtividadePaciente(request, response) {
      try {
         //parametro recebidos pelo corpo da requisição
         const { ati_id, paciente_id } = request.body;
         //parametro recebido pela URl via params ex: /usuario/1
         const { apa_id } = request.params;
         //instruções SQL
         const sql = `UPDATE atividade_paciente SET ati_id = ?, paciente_id = ? 
                      WHERE apa_id = ?;`;
         //preparo do array com dados que serão atualizados
         const values = [apa_id, ati_id, paciente_id ];
         //execução e obtenção de confirmação da atualização realizada
         const atualizaDados = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Atividade_Paceinte ${endereco_id} atualizado com sucesso!`,
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
   async apagarAtividadePaciente(request, response) {
      try {
         //parametro passado via URL na chamada da api pelo front-end
         const { apa_id } = request.params;
         //comando da exclusão
         const sql = `DELETE FROM atividade_paciente WHERE apa_id = ?`;
         //array com parametros da exclusão
         const values = [apa_id];
         //executa instrução no banco de dados
         const excluir = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Atividade_Paciente ${emo_id} excluído com sucesso`,
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