import KoaRouter from '@koa/router'
const router =new KoaRouter()
//注册路由表
router.get('/login',(ctx)=>{
    ctx.body='hello word222'
})

router.post('/:userId',(ctx)=>{
    //响应体
    ctx.body='hello word222'
   //取头部 ctx.header
   //取传入参数  ctx.query
   //取路径参数 ctx.params
   //取body  ctx.request.body
   console.log(ctx.request.body)
   //取body中文件 ctx.request.files.filename
   ctx.req.on('data', (chunk) => {
    console.log(chunk.toString())
  })
})

export default router