import 'dotenv/config'
import './libs/cache';

import express from 'express';
import { RateLimit } from './middleware/rate-limit';

const app = express();

app.get("/", RateLimit, async (_, response) => {
  return response.json({
    hello: 'world'
  })
})

app.listen(process.env.PORT || 3333, () => {
  console.log(`Server is running in http://localhost:${process.env.PORT || 3333}`)
})