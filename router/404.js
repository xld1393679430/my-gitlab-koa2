const Router = require('koa-router')

const NotFountRouter = new Router()

NotFountRouter.get('/', async ctx => {
    ctx.body = '404'
})

module.exports = NotFountRouter