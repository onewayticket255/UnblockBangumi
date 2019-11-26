const http = require('http')
const url = require('url')
const network = require('./bilibili/network.js')

let accessKey = ''

function unixtime() {
    return Math.round(Date.now() / 1000)
}


async function init() {
    accessKey = await network.net_getAccessKey(unixtime())
    setInterval(async () => {
        accessKey = await network.net_getAccessKey(unixtime())
    }, 2100000000) //大概20天登录一次

}

init()



let HttpServer = new http.Server()
let HttpPort = 7778
HttpServer.listen(HttpPort, () => console.log(`HttpServer Start at ${HttpPort}`))
    .on('error', e => console.log(e))
    .on('request', (request, response) => {
        console.log(request.url)
        let requestUrl = new URL(`http://127.0.0.1:7778${request.url}`)
        let season_id = requestUrl.searchParams.get('season_id')
        let cid = requestUrl.searchParams.get('cid')
        let ep_id = requestUrl.searchParams.get('ep_id')


        if (season_id) {     //pgc
            network.net_pgcView(accessKey, season_id, unixtime()).then(data => {
                console.log(data)
                response.writeHead(200, { 'Content-Type': 'application/json' })
                response.end(JSON.stringify(data))
            })
        }
        else if (cid) {    //playurl
            network.net_playurl(accessKey, cid, ep_id, unixtime()).then(data => {
                console.log(data)
                response.writeHead(200, { 'Content-Type': 'application/json' })
                response.end(JSON.stringify(data))
            })
        }
        else {       //wrong 
            response.writeHead(404, { 'Content-Type': 'application/json' })
            response.end("Wrong")
        }

    })