import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from './config/db.js';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser'
import nodeRouter from './routes/nodes.routes.js';
dotenv.config();

const port = process.env.PORT

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))

app.get("/", (req, res) => {
    res.send("hello")
})

app.use('/api/auth', authRouter);
app.use("/api/node", nodeRouter)

const startServer = async () => {
    try {
        console.log("Establishing database handshake... 🔄");
        await connectDb();
        console.log("MongoDB Connection Secured! ✅");

        app.listen(port, () => { 
            console.log(`Server executing smoothly on channel :${port} 🏁`) 
        });

    } catch (error) {
        console.error("CRITICAL SERVER INITIALIZATION ABORTED ✕:");
        console.error(error);
        
        // 🏁 Force the nodemon process to completely shut down on failure
        process.exit(1); 
    }
}

startServer();