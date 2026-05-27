import express from 'express'
import cors from 'cors'
import ApiRoute from './Routes/ApiRoute.js'

const app = express()
const port = 8080

app.use(cors())
app.use(express.json())

app.use("/nutribuddy", ApiRoute);



app.listen(port, () =>console.log(`Server running on port ${port}`))

