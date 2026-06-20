import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js';
dotenv.config();

const port = process.env.PORT

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send("hello")
})


// app.listen(port, ()=>{
//     console.log(`server is running at port ${port}`);
// });


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