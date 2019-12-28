const config = require('../config.js')
const crypto = require('crypto')
const querystring = require('querystring')

const baseSign = params => crypto.createHash('md5').update(`${params}${config.BASE_SECRET}`).digest('hex')
const videoSign = params => crypto.createHash('md5').update(`${params}${config.VIDEO_SECRET}`).digest('hex')
const makeParams = (params, sign) => `${querystring.stringify(params)}&sign=${sign(querystring.stringify(params))}`

module.exports = { baseSign, videoSign, makeParams }