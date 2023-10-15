import KoaRouter from '@koa/router'
import fs from 'node:fs'
import path from 'node:path'
import { getMimeType } from './mime/mime.js'
import { createUser,getList,createImg} from './database/index.js'
const router =new KoaRouter()
//注册路由表
router.post('/api/upload',(ctx)=>{
    ctx.body={
      code:0,
      msg:'成功',
      data:null
    }
})

router.post('/api/test',(ctx)=>{
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


//CURD BOY
router.post('/api/login',(ctx)=>{
 
  //1.与前端定义出接口库的请求方法，请求路径和请求参数
  //2.取参数，参数校验（必选参数，参数类型，可选参数）参数校验框架
  //3.业务逻辑（如果逻辑复杂，做好逻辑拆分）
  //3.1 操作数据库
  //4.给前端返回数据（ctx.body={code:0,data:{},msg:'ok'})
  //4.1不同错误类型，需要定义错误码
})

router.get('/:filename',(ctx)=>{
  try{
  const fileName=ctx.params.filename
  const filePath=`${process.cwd()}/upload/${fileName}`
  console.log(filePath)
  //获取文件类型，好在浏览器渲染
  ctx.set('Content-Type',getMimeType(fileName))
  const fileRs=fs.createReadStream(filePath)
  ctx.body=fileRs
  }catch(err){
    console.log(err)
    ctx.body={
      code:404,
      msg:'失败'

    }
  }
})

//注册逻辑
router.post('/register',async(ctx)=>{
  const {username,password}=ctx.request.body
  if(username&&password){
   const result= await createUser({name:username,pwd:password})
    ctx.body={
      code:0,
      msg:'注册成功',
      data:'null'
    }
  }else{
    ctx.body={
      code:-1,
      msg:'不存在',
      data:null
    }
  }
})
router.get('/img/list',async(ctx)=>{
  const {pageSize,pageNum}=ctx.query
  const result= await getList(pageSize,pageNum)
  ctx.body={
    code:0,
    data:result,
    msg:'ok'
  }
})
//上传图片
router.post('/img/upload',async(ctx)=>{
  const filename=ctx.request.files.file.newFilename
  const size=ctx.request.files.file.size
  const type=ctx.request.files.file.mimetype
  //换成公网ip记得
  const link='http://127.0.0.1:8080/api/download/'+filename
  const imgId=await createImg(filename,size,link)
  ctx.body={
    code:0,
    data:{
      filename,
      link,
      size,
      imgId
    },
    msg:'ok'
  }
})
router.get('/download/:filename', (ctx) => {
  const filename = ctx.params.filename
  // http://127.0.0.1:3000/download/tuchuang_6c8b1d3803e1ff2cc4168fb00.png
  const filePath = path.join(process.cwd(), `upload/${filename}`)
  ctx.set('Content-Type', getMimeType(filePath))
  const fileRS = fs.createReadStream(filePath)
  ctx.body = fileRS
})
export default router