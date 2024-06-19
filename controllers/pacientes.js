const db = require("../database/connection");

module.exports = {
   async listaPacientes(request, response) {
      try {
         //instruções SQL
         const sql = ` SELECT
         paciente_id,  paci_telefone, paci_cpf, paci_filho,  paci_escolaridade,
         paci_data_nasc,  paci_trabalho, paci_estado_civil, paci_status = 1 AS paci_status
         FROM paciente
         WHERE paci_status = 1;`;
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
            paciente_id,
            paci_telefone,
            paci_cpf,
            paci_filho,
            paci_escolaridade,
            paci_data_nasc,
            paci_trabalho,
            paci_estado_civil,
            paci_status,
         } = request.body;
         //instrução SQL
         const sql = `INSERT INTO paciente
            (paciente_id,  paci_telefone, paci_cpf, paci_filho,  paci_escolaridade,
            paci_data_nasc,  paci_trabalho, paci_estado_civil, paci_status )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
         //definiçaõ dos dados a serem inseriodos em um array
         const values = [
            paciente_id,
            paci_telefone,
            paci_cpf,
            paci_filho,
            paci_escolaridade,
            paci_data_nasc,
            paci_trabalho,
            paci_estado_civil,
            paci_status,
         ];
         //execução da instrução sql passando os parametros
         const execSql = await db.query(sql, values);
         //identificação do ID do resgistro inserido
         execSql[0].insertId;

         return response.status(200).json({
            sucesso: true,
            mensagem: "Cadastro de paciente efetuado com sucesso.",
            dados: paciente_id,
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
            paci_telefone,
            paci_cpf,
            paci_filho,
            paci_escolaridade,
            paci_data_nasc,
            paci_trabalho,
            paci_estado_civil,
            paci_status,
         } = request.body;
         //parametro recebido pela URl via params ex: /usuario/1
         const { paciente_id } = request.params;
         //instruções SQL
         const sql = `UPDATE paciente SET paci_telefone = ?, paci_cpf = ?,
            paci_filho = ?, paci_escolaridade = ?, paci_data_nasc = ?,
            paci_trabalho = ?, paci_estado_civil = ?, paci_status = ? WHERE paciente_id = ?;`;
         //preparo do array com dados que serão atualizados
         const values = [
            paci_telefone,
            paci_cpf,
            paci_filho,
            paci_escolaridade,
            paci_data_nasc,
            paci_trabalho,
            paci_estado_civil,
            paci_status,
            paciente_id,
         ];
         //execução e obtenção de confirmação da atualização realizada
         const atualizaDados = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Paciente ${paciente_id} atualizado com sucesso!`,
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
         const { paciente_id } = request.params;
         //comando da exclusão
         const sql = `DELETE FROM paciente WHERE paciente_id = ?`;
         //array com parametros da exclusão
         const values = [paciente_id];
         //executa instrução no banco de dados
         const excluir = await db.query(sql, values);

         return response.status(200).json({
            sucesso: true,
            mensagem: `Paciente ${paciente_id} excluído com sucesso`,
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
