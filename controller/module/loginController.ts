import axios from 'axios'
import dotenv from 'dotenv'
import { generateToken, DB } from '../../util/index'
import { User } from '../../util/module/mongodb/model'

dotenv.config()
const AppId = process.env.APP_ID
const AppSecret = process.env.APP_SECRET
const AuthUrl = process.env.AUTH_URL

interface ReData {
  [key: string]: string
}

// 登陆验证
// export async function postLogin(ctx: any) {
//   // 初始化返回数据
//   const data: ReData = {}
  
//   // 获取code
//   const code = ctx.request.body.code

//   // 向wx服务器发送请求,获取openID
//   const queryString = `appid=${AppId}&secret=${AppSecret}&js_code=${code}&grant_type=authorization_code`
//   const wxAPI = AuthUrl + "?" + queryString
//   try {
//     const res = await axios.get(wxAPI)

//     // 返回数据中有错误信息
//     if (res.data.errcode) {
//       ctx.body = res.data
//     }

//     // 数据库中查找是否已有用户, 并返回token
//     const user = await DB.findOne(User, { openID: res.data.openid })
//     const token = generateToken({openId: res.data.openid})
//     if (user.length !== 0) {
//       ctx.body = {
//         token: token
//       }
//     } else {
//       DB.insertOne(User, { openID: res.data.openid })
//       ctx.body = {
//         token: token
//       }
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

export async function postLogin(ctx: any) {
  const userInfo = ctx.request.body

  // 数据库查询用户
  const user = await DB.findOne(User, { username: userInfo.username, password: userInfo.password})

  if (user.length) {
    // 如果有用户
    const token = generateToken(userInfo)
    ctx.request.status = "200"
    ctx.body = {
      token,
      nickname: user[0].nickname,
      username: user[0].username
    }

  } else {
    // 没有用户
    ctx.request.status = "404"
    ctx.body = {
      error: "用户不存在",
      errorCode: "1001"
    }
  }

}