import 'dotenv/config'
import express from 'express';
const app = express();

app.get("/", (_, response) => {
  return response.json({
    hello: 'world'
  })
})

app.listen(process.env.PORT || 3333, () => {
  console.log(`Server is running in http://localhost:${process.env.PORT || 3333}`)
})