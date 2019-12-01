const network = require('./bilibili/network.js')

//let accessKey = ""
/* let season_id=28711
let cid=131731885
let ep_id=286136 */

function unixtime() {
    return Math.round(Date.now() / 1000)
}

async function init(){
    accessKey= await network.net_getAccessKey(unixtime())
    console.log(accessKey)
}

init()   

//network.net_season(accessKey,season_id,unixtime()).then(data=>{console.log(data)})
//network.net_playurl(accessKey,cid,ep_id,unixtime())

