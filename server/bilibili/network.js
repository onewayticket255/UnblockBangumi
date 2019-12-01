const axios = require('axios')
const config = require('./config.js')
const { baseSign, videoSign, makeParams } = require('./model/sign.js')
const { rsaEncrypt } = require('./model/rsa.js')

let getKey = require('./model/getKey.js')
let oauth = require('./model/oauth.js')
let season = require('./model/season.js')
let playurl = require('./model/playurl.js')


async function net_getKey(ts) {
    getKey.params.ts = ts
    getKey.options.url = `https://passport.bilibili.com/api/oauth2/getKey?${makeParams(getKey.params, baseSign)}`
    let resp = await axios(getKey.options)
    console.log(resp.data)
    return resp.data
}

async function net_oauth(response, ts) {
    let hash = response.data.hash
    let rsakey = response.data.key

    oauth.params.password = rsaEncrypt(rsakey, `${hash}${config.PASSWD}`)
    oauth.params.ts = ts
    oauth.options.data = `${makeParams(oauth.params, baseSign)}`

    let resp = await axios(oauth.options)
    console.log(resp.data)
    return resp.data
}


async function net_getAccessKey(ts) {
    let res1 = await net_getKey(ts)
    let res2 = await net_oauth(res1, ts)
    return res2.data.token_info.access_token
}

async function net_season(access_key, season_id, ts) {
    season.params.access_key = access_key
    season.params.season_id = season_id
    season.params.ts = ts

    season.options.url = `https://api.bilibili.com/pgc/view/app/season?${makeParams(season.params, baseSign)}`


    //console.log(season.options)

    let resp = await axios(season.options)
    console.log(resp.data)
   
    return resp.data
}

async function net_playurl(access_key, cid, ep_id, ts) {
    playurl.params.access_key = access_key
    playurl.params.ts = ts
    playurl.params.ep_id = ep_id
    playurl.params.cid = cid
    playurl.options.url = `https://api.bilibili.com/pgc/player/api/playurl?${makeParams(playurl.params, videoSign)}`


    //console.log(playurl.options)

    let resp = await axios(playurl.options)
    console.log(resp.data)
    
    return resp.data

}


module.exports = { net_getKey, net_oauth, net_getAccessKey, net_season, net_playurl }
