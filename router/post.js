const Router = require('koa-router')

const PostRouter = new Router()

const parsePostData = (ctx) => {
    return new Promise((resolve, reject) => {
        try {
            let postData = ''
            ctx.req.addListener('data', (data) => {
                postData += data
            })
            ctx.req.addListener('end', () => {
                console.log(postData, 'postData');
                const _postData = parseQueryStr(postData)
                resolve(_postData)
            })
        } catch(error) {
            reject(error)
        }
    })
}

const parseQueryStr = (data) => {
    let postData = {}
    let postDataList = data.split('&')
    console.log('data: ', data, 'postDataList:', postDataList, 333);
    for(let [index, queryStr] of postDataList.entries()) {
        let itemList = queryStr.split('=')
        postData[itemList[index]] = decodeURIComponent(itemList[1])
    }
    return postData
}

PostRouter.get('/', async ctx => {
    // 当GET请求时候返回表单页面
    let html = `
      <h1>koa2 request post demo</h1>
      <form method="POST" action="/post">
        <p>userName</p>
        <input name="userName" /><br/>
        <p>nickName</p>
        <input name="nickName" /><br/>
        <p>email</p>
        <input name="email" /><br/>
        <button type="submit">submit</button>
      </form>
    `
    ctx.body = html
})

PostRouter.post('/', async ctx => {
    // 方法一： 手动解析ctx.request
    // const postData = await parsePostData(ctx)

    // 方法二：中间件koa-bodyparser解析POST表单里的数据
    const postData = ctx.request.body
    ctx.body = postData
})

module.exports = PostRouter