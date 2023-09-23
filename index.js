import Koa from'koa'
import router from './src/router.js'
import { valid } from './src/middleware/valid.js'
import {koaBody} from 'koa-body'
const server=new Koa()

//验证用户信息
server.use(valid)
server.use(koaBody(
    {
        //启动
        multipart:true,
        formidable:{
            uploadDir:`${process.cwd()}/upload`,//位置
            maxFieldsSize:2*1024*1024,//2gb,
            keepExtensions:true,//文件后缀
            onFileBegin:(name,file)=>{
                const fileName=`tuchuang_${file.newFilename}`//file.newfilename文件原名称
                file.filepath=`${file.filepath.replace(file.newFilename,fileName)}`
            }
        }
    }
))
//处理业务逻辑
server.use(router.routes()).use(router.allowedMethods())

server.listen(8080,'0.0.0.0',()=>{
    console.log('后端服务器启动')
})