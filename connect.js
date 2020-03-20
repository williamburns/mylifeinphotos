let mysql = require('mysql');
let config = require('./config');

const dbPool = mysql.createPool({
    connectionLimit: 10,
    host: config.mysql.host,
    port: config.mysql.port,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    acquireTimeout: 3000
});

const GET_QUERY = "SELECT * FROM moments;";

let retrievedData = {};

function getMoments() {
    dbPool.query(GET_QUERY, [], (err, results, fields) => {
        if (err) {
            console.log("can't connect to database");
            return;
        }

        retrievedData = {};

        for (let i = 0; i < results.length; i++) {
            if (!results[i].enabled) {
                continue;
            }

            retrievedData[results[i].alias] = {
                title: results[i].title,
                alias: results[i].alias
            };
        }

        module.exports.retrievedData = retrievedData;
    });
}

getMoments();
setInterval(getMoments, 30000); // 30 seconds

module.exports = {dbPool: dbPool, retrievedData: retrievedData};