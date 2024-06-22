const db = require("../database/connection");

module.exports = {
   async listarEmocao(request, response) {
      try {
         //instruções SQL
         const sql = ` SELECT
            emo_id, emo_descricao
            FROM emocao`;
         //executa instruçoes SQL e armazana o resultado na variável usuários
         const emocao = await db.query(sql);
         //armazana em uma variável o número de resgistro retornados
         const nItens = emocao[0].length;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Lista de emoções.",
            dados: emocao[0],
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
   async cadastrarEmocao(request, response) {
      try {
         //parametros recebidos no corp da requisição
         const { emo_id, emo_descricao} =
            request.body;
         //instrução SQL
         const sql = `INSERT INTO emocao
            ( emo_id, emo_descricao)
            VALUES (?, ?)`;
         //definiçaõ dos dados a serem inseriodos em um array
         const values = [emo_id, emo_descricao];
         //execução da instrução sql passando os parametros
         const execSql = await db.query(sql, values);
         //identificação do ID do resgistro inserido
         execSql[0].insertId;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Cadastro da emoção efetuado com sucesso.",
            dados: emo_id,
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
   async editarEmocao(request, response) {
    try {
       //parametro recebidos pelo corpo da requisição
       const { emo_descricao } = request.body;
       //parametro recebido pela URl via params ex: /usuario/1
       const { emo_id } = request.params;
       //instruções SQL
       const sql = `UPDATE emocao SET emo_descricao = ? WHERE emo_id = ?;`;
       //preparo do array com dados que serão atualizados
       const values = [emo_descricao, emo_id];
       //execução e obtenção de confirmação da atualização realizada
       const atualizaDados = await db.query(sql, values);

       return response.status(200).json({
          sucesso: true,
          mensagem: `Emoção ${emo_id} atualizada com sucesso!`,
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
 async apagarEmocao(request, response) {
    try {
       //parametro passado via URL na chamada da api pelo front-end
       const { emo_id } = request.params;
       //comando da exclusão
       const sql = `DELETE FROM emocao WHERE emo_id = ?`;
       //array com parametros da exclusão
       const values = [emo_id];
       //executa instrução no banco de dados
       const excluir = await db.query(sql, values);

       return response.status(200).json({
          sucesso: true,
          mensagem: `Emoção ${emo_id} excluída com sucesso`,
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