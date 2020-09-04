"use strict";

var Promise = require('bluebird');

var mysql = require('mysql');

Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

var readAllCustomers = function readAllCustomers() {
  var connection, sql, result;
  return regeneratorRuntime.async(function readAllCustomers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          connection = mysql.createConnection({
            host: "127.0.0.1",
            user: "root",
            password: "",
            database: "mydb"
          });
          _context.next = 3;
          return regeneratorRuntime.awrap(connection.connectAsync());

        case 3:
          sql = "SELECT * FROM CUSTOMERS";
          _context.next = 6;
          return regeneratorRuntime.awrap(connection.queryAsync(sql));

        case 6:
          result = _context.sent;
          console.log(result);
          _context.next = 10;
          return regeneratorRuntime.awrap(connection.endAsync());

        case 10:
          return _context.abrupt("return", result);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
};

var readAllCustomers1 = function readAllCustomers1() {
  var connection, sql, result;
  return regeneratorRuntime.async(function readAllCustomers1$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          connection = mysql.createConnection({
            host: "127.0.0.1",
            user: "root",
            password: "",
            database: "mydb"
          });
          _context2.next = 3;
          return regeneratorRuntime.awrap(connection.connectAsync());

        case 3:
          sql = "SELECT * FROM CUSTOMERS WHERE name=?";
          _context2.next = 6;
          return regeneratorRuntime.awrap(connection.queryAsync(sql, ['aaditya']));

        case 6:
          result = _context2.sent;
          console.log(result);
          _context2.next = 10;
          return regeneratorRuntime.awrap(connection.endAsync());

        case 10:
          return _context2.abrupt("return", result);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  });
};

readAllCustomers();
readAllCustomers1();