//https://api.bilibili.com/pgc/player/api/playurl
let url = $request.url

function getParams(key){
    let regex= new RegExp(`${key}=(\\d*?)&`)
    let tmp=regex.exec(url)
    return tmp[1]
}


let api = `http://132.145.127.5:7778/?cid=${getParams('cid')}&ep_id=${getParams('ep_id')}`

$httpClient.get(api, (error, response, body) => {
    if (error) {
        $done({})
    }
    else {
        $done({ body })
    }
})