import { generateToken, DB } from '../../util/index'
import { User } from '../../util/module/mongodb/model'

export async function postRegister(ctx: any) {
  const userInfo = ctx.request.body
  
  // 查询用户
  const user = await DB.findOne(User, {
    username: userInfo.userName,
  })

  // 用户名未被使用
  if (user.length === 0) {
    // 创建用户
    const counter = await DB.insertOne(User, {
      username: userInfo.userName,
      password: userInfo.password,
      email: userInfo.email,
      nickname: `新用户`,
      bookinfo: {
        currentBook: {},
        usedBook: []
      }
    })
    if (counter === 0) {
      ctx.response.status = 500
      ctx.body = {
        error: "创建用户失败",
        errorCode: "2001"
      }
    } else {
      ctx.response.status = 200
      ctx.body = {
        message: "success"
      }
    }
  } else {
    // 用户名已被注册 
    ctx.response.status = 404
    ctx.body = {
      error: "用户名已被注册",
      errorCode: "2002"
    }
  }

}