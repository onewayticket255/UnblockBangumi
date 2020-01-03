//https://api.bilibili.com/pgc/player/api/playurl
const localServer = 'http://192.168.0.101/'
const url = $request.url

function getParams(key) {
    const regex = new RegExp(`${key}=(\\d*?)&`)
    const tmp = regex.exec(url)
    return tmp[1]
}

const api = `${localServer}?cid=${getParams('cid')}&ep_id=${getParams('ep_id')}`

$httpClient.get(api, (error, response, body) => {
    if (error || response.status == 404) {
        $notification.post('获取播放链接失败', 'fail', 'fail')
        $done({})
    }
    else {
        $notification.post('获取播放链接成功', 'success', 'success')
        $done({ body })
    }
})