/*
 * @Date: 2021-05-12 13:15:44
 * @LastEditors: liangdong.xu
 * @LastEditTime: 2021-05-12 13:19:01
 * @FilePath: /my-gitlab-koa2/router/jsonp.js
 */
const Router = require('koa-router')

const JsonpRouter = new Router()
JsonpRouter.get('/', async ctx => {
    let callbackName = ctx.query.callback || 'callback'
    let returnData = {
        success: true,
        data: {
            text: 'hello'
        }
    }

    let jsonpStr = `;${callbackName}(${JSON.stringify(returnData)})`
    ctx.type = 'text/javascript'
    ctx.body = jsonpStr
})

module.exports = JsonpRouter