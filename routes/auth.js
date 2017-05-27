'use strict';
const mysql = require('mysql');
// const mysql = require('mysql');


// module.exports = (req, res) => {
// const connection = mysql.createConnection({
//     host: '590e82c196fda.sh.cdb.myqcloud.com',
//     user: 'cdb_outerroot',
//     password: 'root123456789',
//     port: '4727',
//     database: 'weixin'
// })
// connection.connect();
// connection.query('insert into uname(uid,name) values("'+req.openid+'","'+req.uname+'")', function (error, results, fields) {
//     console.log( error, results)
//     res.send(error,results);
// });
// };
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

}



module.exports = (req, res) => {
    const sql = "insert into uname(uid,name,avatarUrl) " + " values(\'" + req.query.openid + "\',\'" + req.query.uname + "\',\'" +req.query.avatarUrl+"\');";
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
    db.on('error', handleError);
    db.query(sql, function (error, results, fields) {
        if (error) {
            res.send(error)
            console.log(error)
        } else {
            res.send('error,results');
        }
    });
};