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
    const secret = req.body.secret?1:0;
    const postId = req.body.postId;
    const sql = "insert into onedairy(`uid`,`author`,`avatar`,title,`date`,`content`,`reading`,`collection`,`like`,`datetime`,detail,`postid`,`address`,`secret`,`imgs`) "
     + " values(\'" + req.body.openid + "\',\'" + req.body.uname + "\',\'" + req.body.avatarUrl + "\',\'" + req.body.title + "\',\'" + req.body.date + "\',\'"
      + req.body.content.substring(0,30)+ "\'," + 1 + "," + 0 + "," + 0 + ",\'"
       + req.body.datetime + "\',\'" + req.body.content + "\',\'" + req.body.postId + "\',\'" +req.body.address+"\',"+secret+",\'" + req.body.netFiles + "\');";
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
            res.send({postId:postId});
        }
    });
};