import {createPool}from 'mysql2/promise'
import getSha256 from './password.js'
import {v4 as uuidv4}from 'uuid'
const mysql=await createPool({
    host:'101.43.153.229',
    port:3306,
    user:'tuchuang',
    database:'tuchuang',
    password:'!QAZ2wsx'
})


async function getAll()
{
    const [rows]=await mysql.execute('select * from user')
    return rows
}

async function createUser(user)
{
    const {name,pwd}=user
    await mysql.execute('insert into user(username,password) VALUES(?,?)',[name,getSha256(pwd)])
}
async function deleteUser(x)
{
    await mysql.execute('delete from user where userid=?',[x])
}

async function getList(ps,pn){
   const[rows]= await mysql.execute('select * from picture order by pid limit ? offset ?',[`${ps}`,`${ps*(pn-1)}`])
   //console.log(rows)
   return rows
}

//插入图片
async function createImg(imgName, size, link) {
    const uuid = uuidv4()
    await mysql.execute('insert into picture(pid, p_name, size, link) values(?, ?, ?, ?)', [uuid, imgName, size, link])
    return uuid
  }
//   for(let i = 0; i < 100; i++) {
//   await createImg('测试', 100, 'https://www.baidu.com')
// }

//await getList(10, 2) 
export{
    createUser,
    getList,
    createImg
}