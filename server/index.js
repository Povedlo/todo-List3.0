const path = require('path')
const Koa = require('koa')
const serve = require('koa-static')
const parse = require('koa-bodyparser')

require('./store').init()

const app = new Koa()
const port = process.env.PORT || 3000

app.use(serve(path.resolve(__dirname, '..', 'client')))
app.use(parse())

const userRoutes = require('./routes/users')
app.use(userRoutes.routes())

const taskRoutes = require('./routes/tasks')
app.use(taskRoutes.routes())


app.listen(port)


console.log('App is listening at http://127.0.0.1:3000')
