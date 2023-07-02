const  express= require('express')//function
const app=express()//module
app.use(express.urlencoded({extended:false}))
require('dotenv').config()
const fronendrouter=require('./routers/frontend')
const adminrouter=require('./routers/admin')
const mongoose=require('mongoose')
const session=require('express-session')
mongoose.connect(process.env.DB_URL+'/'+process.env.DB_NAME)



app.use(session({
   secret:process.env.SECRET,
   resave:false,
   saveUninitialized:false
}))
app.use(fronendrouter)
app.use('/admin',adminrouter)
app.use(express.static('public'))
app.set('view engine','ejs')
app.listen(process.env.PORT,()=>{console.log('server is running')})