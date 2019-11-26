const axios = require('axios')
const config = require('./config.js')
const { baseSign, videoSign, makeParams } = require('./model/sign.js')
const { rsaEncrypt } = require('./model/rsa.js')
const { makeHttpsAgent } = require('./model/proxy.js')
let getKey = require('./model/getKey.js')
let oauth = require('./model/oauth.js')
let pgc = require('./model/pgc.js')
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

async function net_pgcView(access_key, season_id, ts, proxy, MAX_TIME) {
    pgc.params.access_key = access_key
    pgc.params.season_id = season_id
    pgc.params.ts = ts

    pgc.options.url = `https://api.bilibili.com/pgc/view/app/season?${makeParams(pgc.params, baseSign)}`

    pgc.options.httpsAgent = proxy || makeHttpsAgent(config.CN_PROXY)
    //    console.log(pgc.options)

    let resp = await axios(pgc.options)
    //    console.log(resp.data)
    if (MAX_TIME !== 0) {
        
        if (resp.data.result.rights.area_limit == 1) {
            console.log("抱歉您所在地区不可观看！")
            return await net_pgcView(access_key, season_id, ts, makeHttpsAgent(config.TW_PROXY), 0)

        } else {
            return resp.data
        }

    } else {
        return resp.data
    }


}

async function net_playurl(access_key, cid, ep_id, ts, proxy, MAX_TIME) {
    playurl.params.access_key = access_key
    playurl.params.ts = ts
    playurl.params.ep_id = ep_id
    playurl.params.cid = cid
    playurl.options.url = `https://api.bilibili.com/pgc/player/api/playurl?${makeParams(playurl.params, videoSign)}`


    playurl.options.httpsAgent = proxy || makeHttpsAgent(config.CN_PROXY)

    //    console.log(playurl.options)

    let resp = await axios(playurl.options)
    //    console.log(resp.data)
    if (MAX_TIME !== 0) {
        if (resp.data.code == '-10403') {
            console.log('抱歉您所在地区不可观看！')
            return await net_playurl(access_key, cid, ep_id, ts, makeHttpsAgent(config.TW_PROXY), 0)
        } else {
            return resp.data
        }

    } else {
        return resp.data
    }


}


module.exports = { net_getKey, net_oauth, net_getAccessKey, net_pgcView, net_playurl }
