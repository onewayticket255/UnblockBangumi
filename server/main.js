const http = require('http')
const { net_getAccessKey, net_season, net_playurl } = require('./bilibili/network.js')

const unixtime = () => Math.round(Date.now() / 1000)
//For Debug
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0

/* Deprecated login, TODO: captcha recognition
let accessKey = ''
const init = async () => {
    accessKey = await net_getAccessKey(unixtime())
    console.log(accessKey)
    setInterval(async () => {
        accessKey = await net_getAccessKey(unixtime())
    }, 2100000000) //大概20天登录一次
}
init()
*/


//Capture accessKey from iOS app directly
//Expires in 30 days
const accessKey= ''


const HttpServer = new http.Server()
const HttpPort = 80
HttpServer.listen(HttpPort, () => console.log(`HttpServer Start at ${HttpPort}`))
HttpServer.on('error', e => console.log(e))
HttpServer.on('request', async (request, response) => {
    const requestUrl = new URL(`http://127.0.0.1:80${request.url}`)
    const season_id = requestUrl.searchParams.get('season_id')
    const cid = requestUrl.searchParams.get('cid')
    const ep_id = requestUrl.searchParams.get('ep_id')
    console.log(
        `url: ${request.url}
        season_id: ${season_id}
        cid&ep_id: ${cid}, ${ep_id}`)

    if (season_id) {     //season
        const data = await net_season(accessKey, season_id, unixtime())
        console.log(data)
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify(data))
    }
    else if (cid) {    //playurl
        const data = await net_playurl(accessKey, cid, ep_id, unixtime())
        console.log(data)
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify(data))
    }
    else {       //wrong 
        response.writeHead(404, { 'Content-Type': 'application/json' })
        response.end('Wrong')
    }

})