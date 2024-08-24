const db = require("../database/connection");

module.exports = {
   async listarPais(request, response) {
      try {
         //instruções SQL
         const sql = ` SELECT
            pas_id, pas_nome, pas_nome_pt  ,pas_sigla  ,pas_bacen 
            FROM pais `;
         //executa instruçoes SQL e armazana o resultado na variável usuários
         const pais  = await db.query(sql);
         //armazana em uma variável o número de resgistro retornados
         const nItens = pais [0].length;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Lista de pais s.",
            dados: pais [0],
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
   async cadastrarPais(request, response) {
      try {
         //parametros recebidos no corp da requisição
         const { pas_id, pas_nome, pas_nome_pt, pas_sigla, pas_bacen } = request.body;
         //instrução SQL
         const sql = `INSERT INTO pais 
            (pas_id, pas_nome, pas_nome_pt, pas_sigla, pas_bacen)
            VALUES (?, ?, ?, ?, ?)`;
         //definiçaõ dos dados a serem inseriodos em um array
         const values = [pas_id, pas_nome, pas_nome_pt, pas_sigla, pas_bacen];
         //execução da instrução sql passando os parametros
         const execSql = await db.query(sql, values);
         //identificação do ID do resgistro inserido
         execSql[0].insertId;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Cadastro de pais efetuado com sucesso.",
            dados: pas_id,
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