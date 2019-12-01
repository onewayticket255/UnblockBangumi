//https://api.bilibili.com/pgc/player/api/playurl


let url = $request.url

function getParams(key) {
    let regex = new RegExp(`${key}=(\\d*?)&`)
    let tmp = regex.exec(url)
    return tmp[1]
}


let api = `https://bilibili.mlyx.workers.dev/?cid=${getParams('cid')}&ep_id=${getParams('ep_id')}`

$httpClient.get(api, (error, response, body) => {
    if (error || response.status == 404) {
        $notification.post('获取播放链接失败', '使用原始链接', 'biliplus未收录此资源或服务器错误')
        $done({})
    }
    else {
        $notification.post('获取播放链接成功', '使用大会员链接', 'success')
        $done({ body })
    }
})