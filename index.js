import Koa from'koa'
import router from './src/router.js'
import { valid } from './src/middleware/valid.js'
import {koaBody} from 'koa-body'
import Kstatic from 'koa-static'
import Kmount from 'koa-mount'
import cors from '@koa/cors'
import path from 'node:path'
import fs from 'node:fs'
const apiApp=new Koa()
const staticApp=new Koa()
const server=new Koa()
const testApp=new Koa()
//验证用户信息
//server.use(valid)
apiApp.use(cors())
staticApp.use(Kstatic(`${process.cwd()}/front`))
//解决刷新notfond问题
apiApp.use(koaBody(
    {
        //启动
        multipart:true,
        formidable:{
            uploadDir:`${process.cwd()}/upload`,//位置
            maxFieldsSize:2*1024*1024*1024,//2gb,
            keepExtensions:true,//文件后缀
            onFileBegin:(name,file)=>{
                const fileName=`tuchuang_${file.newFilename}`//file.newfilename文件原名称
                file.filepath=`${file.filepath.replace(file.newFilename,fileName)}`
                file.newFilename=fileName
            }
        }
    }
))
//处理业务逻辑
apiApp.use(router.routes()).use(router.allowedMethods())
server.use(Kmount('/api',apiApp))
server.use(Kmount('/',staticApp))
server.use((ctx)=>{
    const filename = 'index.html'
      const filePath = path.join(process.cwd(), `front/${filename}`)
      ctx.set('Content-Type','text/html;')
      const fileRS = fs.createReadStream(filePath)
      ctx.body = fileRS
})
server.listen(8080,'0.0.0.0',()=>{
    console.log('后端服务器启动')
})