/*
 * @Date: 2021-05-10 19:37:16
 * @LastEditors: liangdong.xu
 * @LastEditTime: 2021-05-12 21:07:07
 * @FilePath: /my-gitlab-koa2/index.js
 */
const Koa = require('koa')
const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')
const views = require('koa-views')
const jsonp = require('koa-jsonp')
const koaLogger = require('koa-logger')
const config = require('./config')
const HomeRouter = require('./router/home')
const NotFountRouter = require('./router/404')
const TodoRouter = require('./router/todo')
const PostRouter = require('./router/post')
const CookieRouter = require('./router/cookie')
const SessionRouter = require('./router/session')
const EjsRouter = require('./router/ejs')
const FileUploadRouter = require('./router/fileUpload')
const FileUpload2Router = require('./router/fileUpload2')
const UploadProgressRouter = require('./router/uploadProgress')
const JsonpRouter = require('./router/jsonp')
const Jsonp2Router = require('./router/jsonp2')

const staticPath = './static'
const app = new Koa()
const router = new Router()

// session存储配置
// const sessionMysqlConfig = {
//     user: config.database.USERNAME,
//     password: config.database.PASSWORD,
//     database: config.database.DATABASE,
//     host: config.database.HOST,
// }

// let store = new MysqlSession({
//     user: 'root',
//     password: 'xld340826',
//     database: 'koa2',
//     host: '127.0.0.1'
// })

// let cookie = {
//     maxAge: '', // cookie有效时长
//     expires: '',  // cookie失效时间
//     path: '', // 写cookie所在的路径
//     domain: '', // 写cookie所在的域名
//     httpOnly: '', // 是否只用于http请求中获取
//     overwrite: '',  // 是否允许重写
//     secure: '',
//     sameSite: '',
//     signed: '',
// }
// app.use(session({
//     key: 'SESSION_ID',
//     store: new MysqlSession(sessionMysqlConfig),
// }))
// 配置控制台日志中间件
app.use(koaLogger())
app.use(jsonp())
// 配置ctx.body解析中间件
app.use(bodyParser())
// 配置静态资源加载中间件
app.use(static(path.join(__dirname, staticPath)))
// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './view'), {
    extension: 'ejs'
}))

router.use('/', HomeRouter.routes(), HomeRouter.allowedMethods())
router.use('/todo', TodoRouter.routes(), TodoRouter.allowedMethods())
router.use('/404', NotFountRouter.routes(), NotFountRouter.allowedMethods())
router.use('/post', PostRouter.routes(), PostRouter.allowedMethods())
router.use('/cookie', CookieRouter.routes(), CookieRouter.allowedMethods())
router.use('/session', SessionRouter.routes(), SessionRouter.allowedMethods())
router.use('/ejs', EjsRouter.routes(), EjsRouter.allowedMethods())
router.use('/fileUpload', FileUploadRouter.routes(), FileUploadRouter.allowedMethods())
router.use('/fileUpload2', FileUpload2Router.routes(), FileUpload2Router.allowedMethods())
router.use('/uploadProgress', UploadProgressRouter.routes(), UploadProgressRouter.allowedMethods())
router.use('/jsonp', JsonpRouter.routes(), JsonpRouter.allowedMethods())
router.use('/jsonp2', Jsonp2Router.routes(), Jsonp2Router.allowedMethods())

// 初始化路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(config.port, () => {
    console.log('koa start');
})