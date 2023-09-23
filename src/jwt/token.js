import jwt from 'jsonwebtoken'
const secret='femvfd'
//创建token
function createToken(id){
    return jwt.sign({userid:id,exp:Math.floor(Date.now()/1000)+(/**多少秒后过期 */60*60)},secret)
}
console.log(createToken('pwj'))
//验证token
function validToken(token)
{
    let data
    try{
     data=jwt.verify(token,secret)
      
    }catch(err){
        console.log(err)
        return null
    }
  return data
}


export{
    createToken,
    validToken
}




