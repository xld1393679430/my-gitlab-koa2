/*
 * @Date: 2021-05-10 19:37:16
 * @LastEditors: liangdong.xu
 * @LastEditTime: 2021-05-11 11:47:17
 * @FilePath: /my-gitlab-koa2/index.js
 */
const Koa = require('koa')
const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const logger = require('./middleware/logger')
const HomeRouter = require('./router/home')
const NotFountRouter = require('./router/404')
const TodoRouter = require('./router/todo')
const PostRouter = require('./router/post')

const content = require('./util/content')
const mimes = require('./util/mimes')
const { parseMime } = require('./util')

const staticPath = './static'

const app = new Koa()
const router = new Router()

app.use(logger())
app.use(bodyParser())

// router.use('/', HomeRouter.routes(), HomeRouter.allowedMethods())
// router.use('/todo', TodoRouter.routes(), TodoRouter.allowedMethods())
// router.use('/404', NotFountRouter.routes(), NotFountRouter.allowedMethods())
// router.use('/post', PostRouter.routes(), PostRouter.allowedMethods())

// app.use(router.routes()).use(router.allowedMethods())

app.use(async (ctx) => {
    // 静态资源目录在本地的绝对路径
    let fullStaticPath = path.join(__dirname, staticPath)
    console.log(fullStaticPath, 'fullStaticPath')
    // 获取静态资源内容，有可能是文件内容，目录，404
    let _content = await content(ctx, fullStaticPath)
    console.log(_content, '_content')

    // 解析请求内容的类型
    let _mime = parseMime(ctx.url)
    console.log(_mime, '_mime')

    // 如果有对应的文件类型，就配置上下文类型
    if(_mime) {
        ctx.type = _mime
    }
    // 输出静态资源内容
    if(_mime && _mime.includes('image/')) {
        // 如果是图片 输出二进制流
        ctx.res.writeHead(200)
        ctx.res.write(_content, 'binary')
        ctx.res.end()
    } else {
        // 其他类型则输出文本
        ctx.body = _content
    }
})

app.listen(3002, () => {
    console.log('koa start');
})