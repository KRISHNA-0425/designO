import cron from 'cron'
import https from 'https'
import dotenv from 'dotenv'
dotenv.config()

const job = new cron.CronJob("*/14 * * * *", () => {
    https.get(process.env.CRON_URL, (res) => {
        if (res.statusCode === 200) console.log("get request sent successfully")
        else console.log("get request unsuccessful")
    })
        .on("error", (e) => console.log("error in sending ", e));
})

export default job