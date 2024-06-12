const db = require("../database/connection");

module.exports = {
   async diario_paciente(request, response) {
      try {
         //instruções SQL
         const sql = ` SELECT
            diario_id, paciente_id, diario_relato, diario_data, 
            FROM diario`;
         //executa instruçoes SQL e armazana o resultado na variável usuários
         const usuarios = await db.query(sql);
         //armazana em uma variável o número de resgistro retornados
         const nItens = usuarios[0].length;

         return response.status(200).json({
            sucesso: true,

            
            mensagem: "Relato do paciente",
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
   
   
};
