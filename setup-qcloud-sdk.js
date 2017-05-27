const os = require('os');
const fs = require('fs');
const qcloud = require('qcloud-weapp-server-sdk');

const sdkConfig = (() => {
    // Windows
    if (os.type().toLowerCase().startsWith('windows')) {
        return 'C:\\qcloud\\sdk.config';
    }

    // Linux
    return '/etc/qcloud/sdk.config';
    // 'serverHost': 'https://57113555.qcloud.la',

    //     // 鉴权服务器服务地址
    //     'authServerUrl':  "http://10.154.138.57/mina_auth/",

    //         // 信道服务器服务地址
    //         'tunnelServerUrl': 'wss://ws.qcloud.la',

    //             // 和信道服务器通信的签名密钥，该密钥需要保密
    //             'tunnelSignatureKey': '62aaa14292b3a65a61c14b8c30437bc648e087b2',
})();

try {
    const stats = fs.statSync(sdkConfig);

    if (!stats.isFile()) {
        throw new Error('File not exists.');
    }
} catch (e) {
    debug(`SDK 配置文件（${sdkConfig}）不存在`);
    process.exit(1);
}

const config = (() => {
    try {
        const content = fs.readFileSync(sdkConfig, 'utf8');
        return JSON.parse(content);
    } catch (e) {
        debug(`SDK 配置文件（${sdkConfig}）内容不合法`);
        process.exit(1);
    }
})();

qcloud.config({
    ServerHost: config.serverHost,
    AuthServerUrl: config.authServerUrl,
    TunnelServerUrl: config.tunnelServerUrl,
    TunnelSignatureKey: config.tunnelSignatureKey,
});

// 网络请求超时时长（单位：毫秒）
qcloud.config.setNetworkTimeout(config.networkTimeout);

debug('[当前 SDK 使用配置] =>', config);
