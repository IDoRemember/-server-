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
    let sql1=null, sql2=null, sql3=null, sql=[];
    if (!req.body.isCollection || !req.body.isLike) {
        sql1 = " update onedairy set `like` = " + parseInt(req.body.like) + " , collection = " + parseInt(req.body.collection) + " , reading=" + parseInt(req.body.reading) + "  where postid = " + req.body.postid + ";"
    }
    if (!req.body.isCollection) {
        sql2 = "insert into collect(`id`,`postid`, `userid`) values(\'" + req.body.postid + req.body.uid + "\',\'" + req.body.postid + "\',\'" + req.body.uid + "\')";
    }
    if (!req.body.isLike) {
        sql3 = "insert into `like`(`id`,`postid`, `userid`) values(\'" + req.body.postid + req.body.uid + "\',\'" + req.body.postid + "\',\'" + req.body.uid + "\')";
    }
    let db, result = [];
    sql1 && sql.push(sql1);
    sql2 && sql.push(sql2);
    sql3 && sql.push(sql3);
    console.log(sql);
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
    if (sql) {
        for (let i = 0; i < (sql.length + 1); i++) {
            if (i < sql.length) {
                db.query(sql[i], function (error, results, fields) {
                    if (error) {
                        res.send(error)
                        console.log(error)
                    } else {
                        result.push(results)
                    }
                });
            }

            if (i == (sql.length + 1)) {
                res.send(result)
            }
        }
    } else {
        res.send('不需要更新')
    }
};