import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import router from './router/index'
import fs from 'fs'
import https from 'https'
import dotenv from 'dotenv'
import { DB } from './util/index'

// 连接数据库
DB.connectMongo()

dotenv.config()
const app = new Koa()

// 获取密钥和证书
const options = {
  key: fs.readFileSync("./keys/tosimplewzx.online.key"),
  cert: fs.readFileSync('./keys/tosimplewzx.online_bundle.crt')
}

app.use(bodyParser())

// 启用路由
app.use(router.routes())
app.use(router.allowedMethods())

const httpsServer = https.createServer(options, app.callback())
httpsServer.listen(3001, () =>{
  console.log("正在监听3001端口")
})