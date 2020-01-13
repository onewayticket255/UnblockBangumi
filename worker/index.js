const biliplus = 'https://www.biliplus.com/'
const CN_PROXY = ''
const TW_PROXY = ''

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})


async function handleRequest(request) {
  const requestUrl = new URL(request.url)
  const season_id = requestUrl.searchParams.get('season_id')
  const cid = requestUrl.searchParams.get('cid')
  const ep_id = requestUrl.searchParams.get('ep_id')

  let area = ''
  let resp = ''

  if (season_id) {     //season
    area = await getSeasonArea(season_id)
    console.log(area)
    switch (area) {
      case "CN":
        resp = await getSeasonInfo(season_id, CN_PROXY)
        return new Response(resp)
        break
      case "TW":
        resp = await getSeasonInfo(season_id, TW_PROXY)
        return new Response(resp)
        break
      case "WRONG":
        return new Response("wrong season id", { status: 404 })
        break
    }
  }

  else if (cid && ep_id) {    //playurl
    area = await getPlayArea(cid)
    console.log(area)
    switch (area) {
      case "CN":
        resp = await getPlayInfo(cid, ep_id, CN_PROXY)
        return new Response(resp)
        break
      case "TW":
        resp = await getPlayInfo(cid, ep_id, TW_PROXY)
        return new Response(resp)
        break
      case "WRONG":
        return new Response("wrong cid", { status: 404 })
        break
    }
  }

  else {       //wrong 
    return new Response("wrong params", { status: 404 })
  }

}





async function getSeasonArea(season) {
  const resp = await fetch(`${biliplus}api/bangumi?season=${season}`)
  const data = await resp.json()
  if (data.code != 0) {
    console.log('wrong season id')
    return "WRONG"
  } else {
    const title = data.result.title
    return title.match('僅') ? 'TW' : 'CN'
  }
}


async function getSeasonInfo(season, proxy) {
  const resp = await fetch(`${proxy}?season_id=${season}`)
  return await resp.text()
}



async function getPlayArea(cid) {
  const resp = await fetch(`${biliplus}api/cidinfo?cid=${cid}`)
  const data = await resp.json()
  if (data.code != 0) {
    console.log('wrong cid')
    return "WRONG"
  } else {
    const title = data.data.title
    return title.match('僅') ? 'TW' : 'CN'
  }
}


async function getPlayInfo(cid, ep_id, proxy) {
  const resp = await fetch(`${proxy}?cid=${cid}&ep_id=${ep_id}`)
  return await resp.text()
}

