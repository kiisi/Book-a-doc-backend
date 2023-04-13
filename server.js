const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

dotenv.config()
app.use(cookieParser())
const corsOption = {
    origin: '*',
    credentials:true,
    optionsSuccessStatus: 200
}
app.use(cors(corsOption)) 
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_URI)
.then(()=> {
    app.listen(PORT, ()=> console.log(`Server is running live: http:localhost:${PORT}`))
    console.log('connected')
})
.catch(error => console.log(error))

app.use(express.json())
app.use(require('./routes/authRoute'))


app.get('/', (req, res) => {
    res.send('Welcome to server!')
})

app.listen(PORT, ()=> console.log(`Server is running live: http:localhost:${PORT}`))