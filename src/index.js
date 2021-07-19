const express = require('express')
require('./db/mongoose')
const taskRouter = require('./routers/tasks')

const app = express()
const port = 4000

app.use(taskRouter) 

app.listen(port, () => {
    console.log(`http://localhost:4000`)
})


