import Router from 'koa-router'
import {
  postLogin
} from '../controller/index'

const router = new Router()

// 登录路由
router.post('/login', postLogin)

export default router