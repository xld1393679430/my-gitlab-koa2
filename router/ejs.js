/*
 * @Date: 2021-05-11 14:12:08
 * @LastEditors: liangdong.xu
 * @LastEditTime: 2021-05-11 15:47:26
 * @FilePath: /my-gitlab-koa2/router/ejs.js
 */
const Router = require('koa-router')

const EjsRouter = new Router()
EjsRouter.get('/', async ctx => {
    await ctx.render('index', {
        title: 'this is ejs'
    })
})

module.exports = EjsRouter