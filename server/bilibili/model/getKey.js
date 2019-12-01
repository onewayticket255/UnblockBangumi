const appkey = require('../config.js').BASE_APPKET

let params = {
    'actionKey': 'appkey',
    'appkey': appkey,
    'build': '8960',
    'device': 'phone',
    'mobi_app': 'iphone',
    'platform': 'ios',
    'ts': ''
}

const headers = {
    'Host': 'passport.bilibili.com',
    'APP-KEY': 'iphone',
    'User-Agent': 'bili-universal/8960 CFNetwork/1120 Darwin/19.0.0 os/ios',
}

let options = {
    url: '',
    method: 'POST',
    headers,
}




module.exports = { params, options }
