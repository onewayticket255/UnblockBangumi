const config = require('../config.js')
const crypto = require('crypto')
const qs = require('qs')

const baseSign = params => { return crypto.createHash('md5').update(`${params}${config.BASE_SECRET}`).digest("hex") }
const videoSign = params => { return crypto.createHash('md5').update(`${params}${config.VIDEO_SECRET}`).digest("hex") }
const makeParams = (params, sign) => { return `${qs.stringify(params)}&sign=${sign(qs.stringify(params))}` }

module.exports = { baseSign, videoSign, makeParams }