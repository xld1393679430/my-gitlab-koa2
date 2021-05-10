const Koa = require('koa')
const Router = require('koa-router')

const HomeRouter = new Router()
HomeRouter.get('/', async ctx => {
    ctx.body = 'home'
})