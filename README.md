## UnblockBangumi
- 解锁iOS B站番剧区域限制
- 仅用于测试
## 方案
- 移动端
`Surge` 转发相关请求
- 前端
[BiliPlus](https://www.biliplus.com/api/README)(获取番剧区域) 配合 `Cloudflare Workers`分流
- 后端
iOS B站登录和番剧获取API




