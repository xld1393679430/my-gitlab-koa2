const Router = require('koa-router')

const HomeRouter = new Router()
HomeRouter.get('/', async ctx => {
    let url = ctx.request.url
    let query = ctx.request.query
    let querystring = ctx.request.querystring
    console.log(ctx.request.query, 'ctx.request.query');
    console.log(ctx.request.querystring, 'ctx.request.querystring');
    ctx.body = {
        url,
        query,
        querystring,
    }
})

module.exports = HomeRouter