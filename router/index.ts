import Router from 'koa-router'
import {
  postLogin,
  checkToken,
  getImage,
  postRegister,
  getHeader,
  getWordBookInfo,
  getWordBookList,
  updateUser,
  getWordInfo,
  patchWordInfo,
  getChooseMeaningOptions,
  getChooseWordOptions
} from '../controller/index'

const router = new Router()

// 登录路由
router.post('/login', postLogin)
router.post('/auth', checkToken)
router.get('/image/:name', getImage)
router.get('/userheader/:username', getHeader)
router.post('/register', postRegister)
router.post('/wordBookInfo', getWordBookInfo)
router.post('/wordBookList', getWordBookList)
router.post('/addWordBook', updateUser)
router.get('/wordInfo', getWordInfo)
router.patch('/wordInfo', patchWordInfo)
router.get('/chooseMeaning', getChooseMeaningOptions)
router.get('/chooseWord', getChooseWordOptions)

export default router