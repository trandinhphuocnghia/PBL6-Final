require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const path = require('path')
const bodyParser = require('body-parser');
const upload = require('./multer')
const cloudinary = require('./cloudinary')

//const http = require('http')
const app = express()
app.use('/static', express.static(path.join(__dirname, 'assets')))



app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))
app.use(bodyParser.urlencoded({
    extended: false
  }))
app.use(bodyParser.json())

// Routes
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/productRouter'))
app.use('/api', require('./routes/paymentRouter'))

//config webview
const engines = require("consolidate");
app.engine("ejs", engines.ejs);
app.set("views", "./views");
app.set("view engine", "ejs");
app.use('/',(req,res)=>{
    res.render("index")
})
  


// Connect to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB')
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}



const PORT = process.env.PORT || 4000
app.listen(PORT, () =>{
    console.log('Server is running on port', PORT)
})