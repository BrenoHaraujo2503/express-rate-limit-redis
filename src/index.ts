import express from 'express';
const app = express();

app.get("/", (_, response) => {
  return response.json({
    hello: 'world'
  })
})

app.listen(3333, () => {
  console.log(`Server is running in http://localhost:3333/`)
})