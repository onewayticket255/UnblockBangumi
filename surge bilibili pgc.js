//https://api.bilibili.com/pgc/view/app/season
let url = $request.url


let regex = /season_id=(\d*?)&/
let season = regex.exec(url)
let season_id = season[1]
let api = `http://132.145.127.5:7778/?season_id=${season_id}`

$httpClient.get(api, (error, response, body) => {
    if (error) {
        $done({})
    }
    else {
        $done({ body })
    }
})