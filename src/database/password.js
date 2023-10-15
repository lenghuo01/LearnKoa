import crypto from 'crypto'

const salt ='XU'
function getSha256(str){
    const hash=crypto.createHash('sha256')
    const code = hash.update(str + salt)
    const aimStr=hash.digest(code)
    return aimStr.toString('hex')
}
export default getSha256