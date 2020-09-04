const Promise = require('bluebird');
const mysql = require('mysql');

Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

let readAllCustomers = async () => {

    const connection = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "mydb"
    });

    await connection.connectAsync();


    let sql = "SELECT * FROM CUSTOMERS";
    let result = await connection.queryAsync(sql);
    console.log(result);
    await connection.endAsync();
    return result;
}

let readAllCustomers1 = async () => {

    const connection = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "mydb"
    });

    await connection.connectAsync();


    let sql = "SELECT * FROM CUSTOMERS WHERE name=?";
    let result = await connection.queryAsync(sql, ['aaditya']);
    console.log(result);
    await connection.endAsync();
    return result;
}


readAllCustomers();
readAllCustomers1();