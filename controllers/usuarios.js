const db = require("../database/connection");

module.exports = {
   async listarUsuarios(request, response) {
      try {
         //instruções SQL
         const sql = ` SELECT
            usu_id, usu_nome, usu_nick, usu_email, usu_senha, usu_adm
            FROM usuarios`;
         //executa instruçoes SQL e armazana o resultado na variável usuários
         const usuarios = await db.query(sql);
         //armazana em uma variável o número de resgistro retornados
         const nItens = usuarios[0].length;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Lista de usuário.",
            dados: usuarios[0],
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
   async cadastrarUsuarios(resquest, response) {
      try {
         //parametros recebidos no corp da requisição
         const {
            usu_nome,
            usu_nick,
            usu_email,
            usu_senha,
            usu_adm,
         } = resquest.body;
         //instrução SQL
         const sql = `INSERT INTO usuarios
            (usu_nome,  usu_nick, usu_email, usu_senha, usu_adm)
            VALUES (?, ?, ?, ?, ?)`;
         //definiçaõ dos dados a serem inseriodos em um array
         const values = [
            usu_nome,
            usu_nick,
            usu_email,
            usu_senha,
            usu_adm,
         ];
         //execução da instrução sql passando os parametros
         const execSql = await db.query(sql, values);
         //identificação do ID do resgistro inserido
         const usu_id = execSql[0].insertId;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Castro de usuário efetuado com sucesso.",
            dados: usu_id,
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
   async editarUsuarios(request, response) {
      try {
         //parametro recebidos pelo corpo da requisição
         const {
            usu_nome,
            usu_nick,
            usu_email,
            usu_senha,
            usu_adm,
         } = request.body;
         //parametro recebido pela URl via params ex: /usuario/1
         const { usu_id } = request.params;
         //instruções SQL
         const sql = `UPDATE usuarios SET usu_nome = ?, usu_nick = ?,
            usu_email = ?, usu_senha = ?, usu_adm = ?,
            WHERE usu_id = ?;`;
         //preparo do array com dados que serão atualizados
         const values = [
            usu_nome,
            usu_nick,
            usu_email,
            usu_senha,
            usu_adm,
            usu_id,
         ];
         //execução e obtenção de confirmação da atualização realizada
         const atualizaDados = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Usuário ${usu_id} atualizado com sucesso!`,
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
   async apagarUsuarios(request, response) {
      try {
         //parametro passado via URL na chamada da api pelo front-end
         const { usu_id } = request.params;
         //comando da exclusão
         const sql = `DELETE FROM usuarios WHERE usu_id = ?`;
         //array com parametros da exclusão
         const values = [usu_id];
         //executa instrução no banco de dados
         const excluir = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Usuário ${usu_id} excluído com sucesso`,
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
   async login(request, response) {
      try {
         const { usu_email, usu_senha } = request.body;

         const sql = `SELECT usu_id, usu_nome, usu_adm FROM usuarios 
                WHERE usu_email = ? AND usu_senha = ? AND usu_ativo = 1;`;

         const values = [usu_email, usu_senha];

         const usuarios = await db.query(sql, values);
         const nItens = usuarios[0].length;

         if (nItens < 1) {
            return response.status(403).json({
               sucesso: false,
               mensagem: "Login e/ou senha inválido.",
               dados: null,
            });
         }

         return response.status(200).json({
            sucesso: true,
            mensagem: "Login efetuado com sucesso",
            dados: usuarios[0],
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
