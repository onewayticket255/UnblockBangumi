
const appkey = require('../config.js').VIDEO_APPKEY

const headers = {
    'Host': 'api.bilibili.com',
    'APP-KEY': 'iphone',
    'User-Agent': 'Bilibili Freedoooooom/MarkII',
}

let params = {
    'access_key': '',
    'actionKey': 'appkey',
    'appkey': appkey,
    'build': '8960',
    'cid': '',
    'device': 'phone',
    'ep_id': '',
    'fnval': '16',
    'fnver': '0',
    'fourk': '1',
    'mobi_app': 'iphone',
    'otype': 'json',
    'platform': 'ios',
    'qn': '116',
    'ts': ''
}

let options = {
    url: '',
    method: 'GET',
    headers,

}

module.exports = { params, options }