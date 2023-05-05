import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const jwtSecret = process.env.JWT_SECRET_KEY as jwt.Secret | jwt.GetPublicKeyOrSecret

// 检查token
export async function checkToken(ctx: any) {

  /*
  * 1001: 没有提供token
  * 1002: 提供token, 但是是错误的token
  * 1003: 提供token, 但是过期了
  */

  const token = ctx.request.header.token
  console.log("token", token)
  if (token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if(err) {
        // token失效
        if (err.name = 'TokenExpiredError') {
          ctx.response.status = 401
          ctx.body = {
            status: 401,
            error: 'token失效，请重新登录!',
            errorCode: 1003
          }  
        } else {
          // token错误
          ctx.response.status = 401
          ctx.body = {
            status: 401,
            error: 'token认证失败！',
            errorCode: 1002
          }
        }
      } else {
        // token有效
        ctx.response.status = 200
        ctx.body = {
          status: 200,
          message: "已登录"
        }
      }
    })

  } else {
    // 未携带token
    ctx.response.status = 403
    ctx.body = {
      status: 403,
      error: '请提供token!',
      errorCode: 1001
    }
  } 
}


