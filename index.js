import Koa from'koa'
const server=new Koa()
server.use((ctx)=>{
ctx.body='hello word'
})

server.listen(8080,'0.0.0.0',()=>{
    console.log('后端服务器启动')
})