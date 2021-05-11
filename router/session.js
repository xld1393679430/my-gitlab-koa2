/*
 * @Date: 2021-05-11 13:13:52
 * @LastEditors: liangdong.xu
 * @LastEditTime: 2021-05-11 13:25:59
 * @FilePath: /my-gitlab-koa2/router/session.js
 */
const Router = require('koa-router')

const SessionRouter = new Router()
SessionRouter.get('/', async ctx => {
    ctx.session.count = ctx.session.count + 1
    ctx.body = 'todo'
})

SessionRouter.get('/set', async ctx => {
    ctx.session = {
        user_id: Math.random().toString(36).substr(2),
        count: 0
    }
    ctx.body = ctx.session
})

module.exports = SessionRouter