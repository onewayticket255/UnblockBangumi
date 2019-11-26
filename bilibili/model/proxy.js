const SocksProxyAgent = require('socks-proxy-agent')



function makeHttpsAgent(proxyPort) {
    return new SocksProxyAgent(`socks5://127.0.0.1:${proxyPort}`)
}


module.exports = { makeHttpsAgent }