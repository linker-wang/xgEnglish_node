import Koa from 'koa'
import router from './router/index'

const app = new Koa()

// 启用路由
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)