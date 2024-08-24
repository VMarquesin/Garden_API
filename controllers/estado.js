const db = require("../database/connection");

module.exports = {
   async listarEstado(request, response) {
      try {
         //instruções SQL
         const sql = ` SELECT
            est_id , est_nome , est_uf  ,est_ibge  ,est_ddd 
            FROM estado `;
         //executa instruçoes SQL e armazana o resultado na variável usuários
         const estado  = await db.query(sql);
         //armazana em uma variável o número de resgistro retornados
         const nItens = estado [0].length;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Lista de estados.",
            dados: estado [0],
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
   async cadastrarEstado(request, response) {
      try {
         //parametros recebidos no corp da requisição
         const { est_nome , est_uf , est_ibge , est_ddd } = request.body;
         //instrução SQL
         const sql = `INSERT INTO estado 
            (est_id, est_nome , est_uf , est_ibge , est_ddd )
            VALUES (?, ?, ?, ?)`;
         //definiçaõ dos dados a serem inseriodos em um array
         const values = [est_id, est_nome , est_uf , est_ibge , est_ddd ];
         //execução da instrução sql passando os parametros
         const execSql = await db.query(sql, values);
         //identificação do ID do resgistro inserido
         execSql[0].insertId;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Cadastro do estado efetuado com sucesso.",
            dados: est_id ,
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
};