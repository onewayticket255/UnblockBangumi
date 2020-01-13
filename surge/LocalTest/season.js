//https://api.bilibili.com/pgc/view/app/season
const localServer = 'http://192.168.0.101/'
const url = $request.url
const body = JSON.parse($response.body)

function getParams(key) {
    const regex = new RegExp(`${key}=(\\d*?)&`)
    const tmp = regex.exec(url)
    return tmp ? tmp[1] : null
}

function getSeasonInfo(season_id) {
    const api = `${localServer}?season_id=${season_id}`
    $httpClient.get(api, (error, response, body) => {
        if (error || response.status == 404) {
            $notification.post('获取番剧信息失败', 'fail', 'fail')
            $done({})
        }
        else {
            $notification.post('获取番剧信息成功', 'success', 'success')
            $done({ body })
        }
    })
}

const season_id = getParams("season_id")
const ep_id = getParams("ep_id")

if (season_id) {
    getSeasonInfo(season_id)
} else if (ep_id) {
    getSeasonInfo(body.result.season_id)
} else {
    $done({})
}


