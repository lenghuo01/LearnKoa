import { validToken } from "../jwt/token.js"

async function valid(ctx,next){
    
    if(validToken(ctx.get('token'))){
       await next()
    }else{
        ctx.body='错误'
    }

}

export{
    valid
}