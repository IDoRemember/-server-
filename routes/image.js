'use strict';
const qcloud = require('qcloud_cos');

//如果conf.js中已经设置好APPID和SECRET_KEY则不需要此步骤。
qcloud.conf.setAppInfo('10000','1253624527','lKhOvGPMCWhIl7HEyWt32pVEpIZjhTuF'); 

var expired = parseInt(Date.now() / 1000);
var sign  = qcloud.auth.signMore('images', expired);
module.exports = (req, res) => {
    qcloud.cos.upload(req.query.filePath, 'images', req.query.fileName,'new myattr',1, function(ret){
    if (ret.code != 0) {
        console.log(ret);
    }else{
        // 查询文件
        qcloud.cos.statFile('images', req.query.fileName, function(ret) {
            console.log(ret);
        });
        // 删除文件
        qcloud.cos.deleteFile('images', req.query.fileName, function(ret) {
            console.log(ret);
        });
    }
});
};