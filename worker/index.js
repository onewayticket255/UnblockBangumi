let biliplus = 'https://www.biliplus.com/'
let CN_PROXY = ''
let TW_PROXY = ''



addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})



async function handleRequest(request) {
  let requestUrl = new URL(request.url)

  let season_id = requestUrl.searchParams.get('season_id')
  let cid = requestUrl.searchParams.get('cid')
  let ep_id = requestUrl.searchParams.get('ep_id')


  if (season_id) {     //season
    let area = await getSeasonArea(season_id)
    console.log(area)
    let resp = ''
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

    let area = await getPlayArea(cid)
    console.log(area)
    let resp = ''
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
  let resp = await fetch(`${biliplus}api/bangumi?season=${season}`)

  let data = await resp.json()
  if (data.code != 0) {
    console.log('wrong season id')
    return "WRONG"
  } else {
    let area = data.result.title
    if (area.match("僅")) {
      return "TW"
    } else {
      return "CN"
    }
  }
}


async function getSeasonInfo(season, proxy) {
  let resp = await fetch(`${proxy}?season_id=${season}`)
  return await resp.text()
}



async function getPlayArea(cid) {

  let resp = await fetch(`${biliplus}api/cidinfo?cid=${cid}`)

  let data = await resp.json()
  if (data.code != 0) {
    console.log('wrong cid')
    return "WRONG"
  } else {
    let area = data.data.title
    if (area.match("僅")) {
      return "TW"
    } else {
      return "CN"
    }
  }
}


async function getPlayInfo(cid, ep_id, proxy) {
  let resp = await fetch(`${proxy}?cid=${cid}&ep_id=${ep_id}`)
  return await resp.text()
}