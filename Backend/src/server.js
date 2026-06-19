import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js';
dotenv.config();

const port = process.env.PORT

const app = express();

app.get("/", (req, res) => {
    res.send("hello")
})


// app.listen(port, ()=>{
//     console.log(`server is running at port ${port}`);
// });


const startServer = async () => {
    connectDb().then(() => {
        app.listen(`server is running on port ${port}`)
    })
        .catch((e) => {
            console.log(e)
        })
        
}

startServer();