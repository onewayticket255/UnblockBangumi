const appkey = require('../config.js').BASE_APPKET

const params = {
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
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'bili-universal/8960 CFNetwork/1120 Darwin/19.0.0 os/ios',
}

const options = {
    url:'',
    baseUrl: 'https://passport.bilibili.com/api/oauth2/getKey?', 
    method: 'POST',
    headers,
    body:''
}


module.exports = { params, options }
