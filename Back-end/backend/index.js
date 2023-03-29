import express from 'express'
import dotenv from 'dotenv'
import mongoose, { connect } from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import tourRoute from './Routes/tour.js'
import userRoute from './Routes/user.js'
import authRoute from './Routes/auth.js'
import reviewRoute from './Routes/reviews.js'
import bookingRoute from './Routes/booking.js'

dotenv.config()
const app = express()
const port=process.env.PORT || 8000
const corsOptions={
    origin:true,
    credentials:true
}
// for testing

// app.get('/',(req,res)=>{
//     res.send('API is working')
// })

// database connection setting

const connection= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("MongoDB well connected")
    } catch (error) {
        console.log('connection to mongoDB failed')
    }
}
mongoose.set('strictQuery',false)



connection();




// middle ware
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use('/api/v1/tours',tourRoute)
app.use('/api/v1/users',userRoute)
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/reviews',reviewRoute)
app.use('/api/v1/booking',bookingRoute)


app.listen(port,()=>{
    console.log("Server Listening to port:", port)
})
