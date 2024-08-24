const db = require("../database/connection");

module.exports = {
   async listarCidade(request, response) {
      try {
         //instruções SQL
         const sql = ` SELECT
            cid_id , cid_nome , cid_uf  ,cid_ibge
            FROM cidade `;
         //executa instruçoes SQL e armazana o resultado na variável usuários
         const cidade  = await db.query(sql);
         //armazana em uma variável o número de resgistro retornados
         const nItens = cidade [0].length;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Lista de cidades.",
            dados: cidade [0],
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
   async cadastrarCidade(request, response) {
      try {
         //parametros recebidos no corp da requisição
         const { cid_id , cid_nome , cid_uf , cid_ibge  } = request.body;
         //instrução SQL
         const sql = `INSERT INTO cidade 
            (cid_id, cid_nome, cid_uf, cid_ibge)
            VALUES (?, ?, ?, ?)`;
         //definiçaõ dos dados a serem inseriodos em um array
         const values = [cid_id, cid_nome, cid_uf, cid_ibge];
         //execução da instrução sql passando os parametros
         const execSql = await db.query(sql, values);
         //identificação do ID do resgistro inserido
         execSql[0].insertId;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Cadastro de cidade efetuado com sucesso.",
            dados: cid_id,
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