const Koa = require('koa')
const fs = require('fs')
const Router = require('koa-router')
const logger = require('./middleware/logger')
const HomeRouter = require('./router/home')
const NotFountRouter = require('./router/404')
const TodoRouter = require('./router/todo')

const app = new Koa()
const router = new Router()

app.use(logger())

router.use('/', HomeRouter.routes(), HomeRouter.allowedMethods())
router.use('/todo', TodoRouter.routes(), TodoRouter.allowedMethods())
router.use('/404', NotFountRouter.routes(), NotFountRouter.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())

// app.use(async ctx => {
//     console.log(ctx.request.url, '1111');
// })

app.listen(3002, () => {
    console.log('koa start');
})