const express = require('express')
const app = express()
const UserRouter = require('./routes/UserRouter')
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.use('/api', UserRouter)


app.listen(8000, () => console.log('server is running'))