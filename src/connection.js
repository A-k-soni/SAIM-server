const Promise = require('bluebird');
const mysql = require('mysql');

Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

let createConnection = async () => {

    const connection = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "saim"
    });

    await connection.connectAsync();

    return connection;

}
module.exports = createConnection();