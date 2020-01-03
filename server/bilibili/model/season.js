const appkey = require('../config.js').BASE_APPKET

const params = {
    'access_key': '',
    'actionKey': 'appkey',
    'appkey': appkey,
    'build': '8960',
    'device': 'phone',
    'mobi_app': 'iphone',
    'platform': 'ios',
    'season_id': '',
    'ts': ''
}


const headers = {
    'Host': 'api.bilibili.com',
    'APP-KEY': 'iphone',
    'User-Agent': 'bili-universal/8960 CFNetwork/1120 Darwin/19.0.0 os/ios',
}

const options = {
    url:'',
    baseUrl:'https://api.bilibili.com/pgc/view/app/season?',
    method: 'GET',
    headers,

}

module.exports = { params, options }