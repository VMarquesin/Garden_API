const db = require("../database/connection");

module.exports = {
   async listaPacientes(request, response) {
      try {
         //instruções SQL
         const sql = ` SELECT
         pac_id,  pac_telefone, pac_cpf, pac_filho,  pac_escolaridade,
         pac_data_nasc,  pac_trabalho, pac_estado_civil, usu_id, pac_status = 1 AS pac_status
         FROM paciente
         WHERE pac_status = 1;`;
         //executa instruçoes SQL e armazana o resultado na variável usuários
         const paciente = await db.query(sql);
         //armazana em uma variável o número de resgistro retornados
         const nItens = paciente[0].length;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Lista de paciente.",
            dados: paciente[0],
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
   async cadastrarPacientes(request, response) {
      try {
         //parametros recebidos no corp da requisição
         const {
            pac_id,
            pac_telefone,
            pac_cpf,
            pac_filho,
            pac_escolaridade,
            pac_data_nasc,
            pac_trabalho,
            pac_estado_civil,
            usu_id,
            pac_status,
         } = request.body;
         //instrução SQL
         const sql = `INSERT INTO paciente
            (pac_id,  pac_telefone, pac_cpf, pac_filho,  pac_escolaridade,
            pac_data_nasc,  pac_trabalho, pac_estado_civil, usu_id, pac_status )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
         //definiçaõ dos dados a serem inseriodos em um array
         const values = [
            pac_id,
            pac_telefone,
            pac_cpf,
            pac_filho,
            pac_escolaridade,
            pac_data_nasc,
            pac_trabalho,
            pac_estado_civil,
            usu_id,
            pac_status,
        
         ];
         //execução da instrução sql passando os parametros
         const execSql = await db.query(sql, values);
         //identificação do ID do resgistro inserido
         execSql[0].insertId;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Cadastro de paciente efetuado com sucesso.",
            dados: pac_id,
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
   async editarPacientes(request, response) {
      try {
         //parametro recebidos pelo corpo da requisição
         const {
            pac_telefone,
            pac_cpf,
            pac_filho,
            pac_escolaridade,
            pac_data_nasc,
            pac_trabalho,
            pac_estado_civil,
            pac_status,
         } = request.body;
         //parametro recebido pela URl via params ex: /usuario/1
         const { pac_id } = request.params;
         //instruções SQL
         const sql = `UPDATE paciente SET pac_telefone = ?, pac_cpf = ?,
            pac_filho = ?, pac_escolaridade = ?, pac_data_nasc = ?,
            pac_trabalho = ?, pac_estado_civil = ?, pac_status = ? WHERE pac_id = ?;`;
         //preparo do array com dados que serão atualizados
         const values = [
            pac_telefone,
            pac_cpf,
            pac_filho,
            pac_escolaridade,
            pac_data_nasc,
            pac_trabalho,
            pac_estado_civil,
            pac_status,
            pac_id,
         ];
         //execução e obtenção de confirmação da atualização realizada
         const atualizaDados = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Paciente ${pac_id} atualizado com sucesso!`,
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
   async apagarPacientes(request, response) {
      try {
         //parametro passado via URL na chamada da api pelo front-end
         const { pac_id } = request.params;
         //comando da exclusão
         const sql = `DELETE FROM paciente WHERE pac_id = ?`;
         //array com parametros da exclusão
         const values = [pac_id];
         //executa instrução no banco de dados
         const [excluir] = await db.query(sql, values);

         if (excluir.affectedRows === 0) {
            return response.status(404).json({
               sucesso: false,
               mensagem: `Paciente com ID ${pac_id} não encontrado.`,
            });
      }
         return response.status(200).json({
            sucesso: true,
            mensagem: `Paciente ${pac_id} excluído com sucesso`,
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
   //       const sql = `UPDATE paciente SET pac_status = ?
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
   // async login(request, response) {
   //    try {
   //       const { usu_email, usu_senha } = request.body;

   //       const sql = `SELECT usu_id, usu_nome, usu_adm FROM usuarios
   //              WHERE usu_email = ? AND usu_senha = ?;`;

   //       const values = [usu_email, usu_senha];

   //       const usuarios = await db.query(sql, values);
   //       const nItens = usuarios[0].length;

   //       if (nItens < 1) {
   //          return response.status(403).json({
   //             sucesso: false,
   //             mensagem: "Login e/ou senha inválido.",
   //             dados: null,
   //          });
   //       }

   //       return response.status(200).json({
   //          sucesso: true,
   //          mensagem: "Login efetuado com sucesso",
   //          dados: usuarios[0],
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
