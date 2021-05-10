const Router = require('koa-router')

const TodoRouter = new Router()
TodoRouter.get('/', async ctx => {
    ctx.body = 'todo'
})

module.exports = TodoRouter