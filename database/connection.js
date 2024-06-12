const mysql = require('mysql2/promise');

const bd_usuario = 'us_tecdes_223_g6'; //usuario
const bd_senha = 'ah7372'; //senha
const bd_servidor = '10.67.22.216'; //servidor
const bd_porta = '3306';  //porta
const bd_banco = 'bd_tcc_tecdes_223_g6';  //nome do banco
let connection;

const config = {
    host: bd_servidor,
    port: bd_porta,  //default: 3306
    user: bd_usuario,
    password: bd_senha,
    database: bd_banco,
    waitForConnections : true,
    connectionLimit : 10, //default : 10 - deixar 100 ou 1000
    queueLimit : 0,
}

try {
    connection = mysql.createPool(config);

    console.log('Chamou conexão Mysql!');

} catch (error) {
    console.log(error);

}

module.exports = connection;