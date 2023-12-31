const express=require('express')
const app=express()
const morgan=require('morgan')
const session = require('express-session');
const swaggerDocs=require('./utils/swagger')
const dbConnect = require('./src/config/dbConfig')
const routes=require('./routes')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const credentials=require('./src/api/middlewares/credentials')
const corsOptions=require('./src/config/cors/corsOption')
const authRouter=require('./src/api/routes/authenticationRoute')
const userRouter=require('./src/api/routes/userRoute')
const hotelRouter=require('./src/api/routes/hotelRoute')
const bookingRouter=require('./src/api/routes/bookingRoute')
const roomRouter=require('./src/api/routes/roomRoute')
const reviewRouter=require('./src/api/routes/reviewRoute')
const couponRouter=require('./src/api/routes/couponRoute')
const salesRouter=require('./src/api/routes/salesRoute')
const messageRouter=require('./src/api/routes/messageRoute')
const paymentRouter=require('./src/api/routes/paymentRoute')
const searchRouter=require('./src/api/routes/searchRoute')

const handleError = require('./src/api/middlewares/errorHandler')


app.use(morgan('combined'))
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(credentials);
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(session({ secret: "Private", resave: true, saveUninitialized: true}))


app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/hotel',hotelRouter)
app.use('/api/booking',bookingRouter)
app.use('/api/room',roomRouter)
app.use('/api/review',reviewRouter)
app.use('/api/coupon',couponRouter)
app.use('/api/sales',salesRouter)
app.use('/api/messages',messageRouter)
app.use('/api/payment',paymentRouter)
app.use('/api/search',searchRouter)

app.listen(4000,async ()=>{
    console.log('server running')
     dbConnect()
      routes(app)
     swaggerDocs(app,5000)
})


