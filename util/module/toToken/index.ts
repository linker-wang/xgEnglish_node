import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const jwtSecretKey = process.env.JWT_SECRET_KEY

const generateToken = (user: any) => {
  if (jwtSecretKey) {
    return jwt.sign(user, jwtSecretKey, {
      expiresIn: 259200
    })
  } else {
    console.log("请设置jwtSecretKey")
  }
}

export default generateToken