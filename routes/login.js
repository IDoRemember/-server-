'use strict';

const LoginService = require('qcloud-weapp-server-sdk').LoginService;
const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'590e82c196fda.sh.cdb.myqcloud.com',
    user:'cdb_outerroot',
    password:'root123456789',
    port:'4727',
    database:'weixin'
})
connection.connect();
connection.query('select * from uname',function(error,results,fields){
    console.log('12332haha222h',error,results)
});
module.exports = (req, res) => {
    // LoginService.create(req, res).login();
    res.send('hahhah')
};