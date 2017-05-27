'use strict';
const mysql = require('mysql');

function handleError(err) {
    if (err) {
        // 如果是连接断开，自动重新连接
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            connect();
        } else {
            console.error(err.stack || err);
        }
    }
}

// 连接数据库
function connect() {
    var db;
    db = mysql.createConnection({
        host: '590e82c196fda.sh.cdb.myqcloud.com',
        user: 'cdb_outerroot',
        password: 'root123456789',
        port: '4727',
        database: 'weixin',
        useConnectionPooling: true
    });
    db.connect(handleError);
}

module.exports = (req, res) => {
    console.log(req)
    const sql = "select * from onedairy where postid = "+req.query.postid+";";
    let db;
    db = mysql.createConnection({
        host: '590e82c196fda.sh.cdb.myqcloud.com',
        user: 'cdb_outerroot',
        password: 'root123456789',
        port: '4727',
        database: 'weixin',
        useConnectionPooling: true
    });
    db.connect(handleError);
    db.on('error', handleError);
    db.query(sql, function (error, results, fields) {
        if (error) {
            res.send(error)
            console.log(error)
        } else {
            res.send(results);
        }
    });
};