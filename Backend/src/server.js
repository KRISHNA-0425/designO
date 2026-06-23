import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js';
import authRouter from './routes/authRoutes.js';
dotenv.config();

const port = process.env.PORT

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send("hello")
})

app.use('/api/auth', authRouter);

const startServer = async () => {

    try {
        await connectDb()
        console.log("db connected");

        app.listen(port, () => { console.log((`server is running at port: ${port}`)) });

    } catch (error) {
        console.log(error)
    }

}

startServer();