import Koa from'koa'
import router from './src/router.js'
import { valid } from './src/middleware/valid.js'
const server=new Koa()
//验证用户信息
server.use(valid)
//处理业务逻辑
server.use(router.routes()).use(router.allowedMethods())

server.listen(8080,'0.0.0.0',()=>{
    console.log('后端服务器启动')
})