/*
 * @Date: 2021-05-10 19:37:16
 * @LastEditors: liangdong.xu
 * @LastEditTime: 2021-05-11 13:06:25
 * @FilePath: /my-gitlab-koa2/index.js
 */
const Koa = require('koa')
const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const logger = require('./middleware/logger')
const HomeRouter = require('./router/home')
const NotFountRouter = require('./router/404')
const TodoRouter = require('./router/todo')
const PostRouter = require('./router/post')
const CookieRouter = require('./router/cookie')

const staticPath = './static'
const app = new Koa()
const router = new Router()

app.use(static(path.join(__dirname, staticPath)))
app.use(logger())
app.use(bodyParser())

router.use('/', HomeRouter.routes(), HomeRouter.allowedMethods())
router.use('/todo', TodoRouter.routes(), TodoRouter.allowedMethods())
router.use('/404', NotFountRouter.routes(), NotFountRouter.allowedMethods())
router.use('/post', PostRouter.routes(), PostRouter.allowedMethods())
router.use('/cookie', CookieRouter.routes(), CookieRouter.allowedMethods())


app.use(router.routes()).use(router.allowedMethods())

app.listen(3002, () => {
    console.log('koa start');
})