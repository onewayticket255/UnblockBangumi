/* 填写用户，密码 
*/
const USERNAME=''
const PASSWD=''

/* 
因为我只有机场服务器，所以只能本地建2个ss-local转发流量
如果你想自建服务器，参考下面配置模式
ss-local -s 中国服务器地址 -p PORT -l CN_PROXY_PORT -m aes-128-gcm -k PASSWORD --plugin obfs-local --plugin-opts "obfs=http;obfs-host=www.bing.com"
ss-local -s 台湾服务器地址 -p PORT -l TW_PROXY_PORT -m aes-128-gcm -k PASSWORD --plugin obfs-local --plugin-opts "obfs=http;obfs-host=www.bing.com"

const CN_PROXY='CN_PROXY_PORT'
const TW_PROXY='TW_PROXY_PORT'
*/

const CN_PROXY=''
const TW_PROXY=''


const BASE_APPKET='27eb53fc9058f8c3'
const BASE_SECRET = 'c2ed53a74eeefe3cf99fbd01d8c9c375'

const VIDEO_APPKEY='YvirImLGlLANCLvM'
const VIDEO_SECRET='JNlZNgfNGKZEpaDTkCdPQVXntXhuiJEM'


module.exports = {
     USERNAME,
     PASSWD,
     CN_PROXY,
     TW_PROXY,
     BASE_APPKET,
     BASE_SECRET,
     VIDEO_APPKEY,
     VIDEO_SECRET
}