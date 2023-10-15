import mime from 'mime'
function getMimeType(name){
    return mime.getType(name)
}

export{getMimeType}