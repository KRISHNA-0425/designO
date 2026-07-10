import cron from 'cron'
import https from 'https'
import dotenv from 'dotenv'
dotenv.config()

const job = new cron.CronJob("*/14 * * * *", () => {
    https.get(process.env.CRON_URL).on("error", () => {});
})

export default job