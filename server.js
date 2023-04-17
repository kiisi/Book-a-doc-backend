const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { data } = require('./data')
const hospitalModel = require('./models/hospitalModel')

dotenv.config()
app.set("trust proxy", 1);
app.use(cookieParser())
const corsOption = {
    origin: ['http://localhost:5173', 'https://book-a-doc.vercel.app'],
    // origin: 'https://book-a-doc.vercel.app',
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
app.use(require('./routes/profileRoute'))

// data.forEach(async (d)=>{
//     await hospitalModel.create({name: d.name, state: d.state, city: d.city})
// })


app.get('/', (req, res) => {
    res.send('Welcome to server!')
})
