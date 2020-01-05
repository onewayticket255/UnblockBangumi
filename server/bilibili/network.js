const config = require('./config.js')
const { baseSign, videoSign, makeParams } = require('./model/sign.js')
const { rsaEncrypt } = require('./model/rsa.js')
const http = require('http')
const https = require('https')
const getKey = require('./model/getKey.js')
const oauth = require('./model/oauth.js')
const season = require('./model/season.js')
const playurl = require('./model/playurl.js')



const net_getKey = async ts => {
    getKey.params.ts = ts
    getKey.options.url = getKey.options.baseUrl + makeParams(getKey.params, baseSign)
    const response = await request(getKey.options)
    return response
}

const net_oauth = async (ctx, ts) => {
    const { hash, key } = ctx
    oauth.params.password = rsaEncrypt(key, `${hash}${config.PASSWD}`)
    oauth.params.ts = ts
    oauth.options.body = makeParams(oauth.params, baseSign)
    const response = await request(oauth.options)
    return response
}


const net_getAccessKey = async ts => {
    const response1 = await net_getKey(ts)
    console.log(response1)
    const response2 = await net_oauth(response1.data, ts)
    console.log(response2)
    if (response2.data.token_info.access_token) {
        return response2.data.token_info.access_token
    } else {
        console.log("登录过于频繁，出现验证码，请之后再登录")
    }
}

const net_season = async (access_key, season_id, ts) => {
    season.params.access_key = access_key
    season.params.season_id = season_id
    season.params.ts = ts
    season.options.url = season.options.baseUrl + makeParams(season.params, baseSign)
    console.log(season.options)
    const response = await request(season.options)
    //console.log(JSON.stringify(response))
    return response
}

const net_playurl = async (access_key, cid, ep_id, ts) => {
    playurl.params.access_key = access_key
    playurl.params.ts = ts
    playurl.params.ep_id = ep_id
    playurl.params.cid = cid
    playurl.options.url = playurl.options.baseUrl + makeParams(playurl.params, videoSign)
    console.log(playurl.options)
    const response = await request(playurl.options)
    //console.log(JSON.stringify(response))
    return response
}


const request = ctx => new Promise((resolve, reject) => {
    const { url, headers, method, body } = ctx
    const reqUrl = new URL(url)
    const protocol = reqUrl.protocol
    const port = protocol == 'https:' ? 443 : 80
    const hostname = reqUrl.hostname
    const path = reqUrl.path
    const options = { hostname, port, path, method, headers }

    const req = protocol == 'https:' ? https.request(options) : http.request(options)

    req.on('response', res => {
        let resBody = ''
        console.log(`STATUS: ${res.statusCode}`)
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`)
        res.setEncoding('utf8')
        res.on('data', chunk => {
            resBody += chunk
        })
        res.on('end', () => {
            //console.log(resBody)
            resolve(JSON.parse(resBody))
        })
        res.on('error', e => {
            reject(e)
        })
    })

    req.on('error', e => {
        console.log(e)
        reject(e)
    })


    if (body) {
        req.write(body)
    }

    req.end()
})


module.exports = { net_getKey, net_oauth, net_getAccessKey, net_season, net_playurl }
