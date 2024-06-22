const db = require("../database/connection");

module.exports = {
   async listarEnderecoUsuario(request, response) {
      try {
         //instruções SQL
         const sql = ` SELECT
            endereco_id, paciente_id, psi_id FROM endereco_usuario`;
         //executa instruçoes SQL e armazana o resultado na variável usuários
         const endereco = await db.query(sql);
         //armazana em uma variável o número de resgistro retornados
         const nItens = endereco_usuario[0].length;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Lista de Endereços.",
            dados: endereco_usuario[0],
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
   async cadastrarEnderecoUsuario(request, response) {
      try {
         //parametros recebidos no corp da requisição
         const { endereco_id, paciente_id, psi_id } = request.body;
         //instrução SQL
         const sql = `INSERT INTO endereco_usuario
            ( endereco_id, paciente_id, psi_id)
            VALUES (?, ?, ?)`;
         //definiçaõ dos dados a serem inseriodos em um array
         const values = [endereco_id, paciente_id, psi_id];
         //execução da instrução sql passando os parametros
         const execSql = await db.query(sql, values);
         //identificação do ID do resgistro inserido
         execSql[0].insertId;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Cadastro de Endereços efetuado com sucesso.",
            dados: endereco_id,
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
   async editarEnderecoUsuario(request, response) {
      try {
         //parametro recebidos pelo corpo da requisição
         const { paciente_id, psi_id } = request.body;
         //parametro recebido pela URl via params ex: /usuario/1
         const { endereco_id } = request.params;
         //instruções SQL
         const sql = `UPDATE endereco_usuario SET paciente_id = ?, psi_id = ? WHERE endereco_id = ?;`;
         //preparo do array com dados que serão atualizados
         const values = [endereco_id, paciente_id, psi_id ];
         //execução e obtenção de confirmação da atualização realizada
         const atualizaDados = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Endereço ${endereco_id} atualizado com sucesso!`,
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
   async apagarEnderecoUsuario(request, response) {
      try {
         //parametro passado via URL na chamada da api pelo front-end
         const { endereco_id } = request.params;
         //comando da exclusão
         const sql = `DELETE FROM endereco_usuario WHERE endereco_id = ?`;
         //array com parametros da exclusão
         const values = [endereco_id];
         //executa instrução no banco de dados
         const excluir = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Endereço ${emo_id} excluído com sucesso`,
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