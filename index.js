const Koa = require('koa')
const fs = require('fs')
const logger = require('./middleware/logger')

const app = new Koa()

app.use(logger())

const renderHtml = async (path) => {
    return new Promise((resolve, reject) => {
        const filePath = `./view/${path}`
        fs.readFile(filePath, 'binary', (err, data) => {
            console.log(data, 'data');
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

const router = async (url) => {
    let file = 'index.html'
    switch (url) {
        case '/':
            file = 'index.html'
            break
        case '/index':
            file = 'index.html'
            break
        case '/todo':
            file = 'todo.html'
            break
        case '/404':
            file = '404.html'
            break
        default:
            file = '404.html'
            break
    }
    console.log(file, 'file')
    let page = await renderHtml(file)
    return page
}


app.use(async (ctx) => {
    console.log(ctx.request.url, 'ctx')
    const url = ctx.request.url
    const html = await router(url)
    ctx.body = html
})

app.listen(3002, () => {
    console.log('koa start');
})