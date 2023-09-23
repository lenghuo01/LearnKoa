import KoaRouter from '@koa/router'
const router =new KoaRouter()
//注册路由表
router.get('/login',(ctx)=>{
    ctx.body='hello word222'
})

export default router