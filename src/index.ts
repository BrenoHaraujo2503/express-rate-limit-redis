import 'dotenv/config'
import express from 'express';
import Redis from 'ioredis'

const app = express();
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD
});


app.get("/", async (_, response) => {
  return response.json({
    hello: 'world'
  })
})

app.listen(process.env.PORT || 3333, () => {
  console.log(`Server is running in http://localhost:${process.env.PORT || 3333}`)
})