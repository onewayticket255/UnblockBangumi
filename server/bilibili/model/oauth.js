const appkey = require('../config.js').BASE_APPKET
const username = require('../config.js').USERNAME

let params = {
    'actionKey': 'appkey',
    'appkey': appkey,
    'appver': '8960',
    'build': '8960',
    'captcha': '',
    'challenge': '',
    'device': 'phone',
    'mobi_app': 'iphone',
    'password': '',
    'permission': 'ALL',
    'platform': 'ios',
    'seccode': '',
    'subid': 1,
    'ts': '',
    'username': username,
    'validate': ''

}

const headers = {
    'Host': 'passport.bilibili.com',
    'APP-KEY': 'iphone',
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'bili-universal/8960 CFNetwork/1120 Darwin/19.0.0 os/ios',

}

let options = {
    url: `https://passport.bilibili.com/api/v3/oauth2/login`,
    method: 'POST',
    headers,
    data: ''
}

module.exports = { params, options }