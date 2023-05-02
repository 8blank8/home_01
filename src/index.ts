import express from "express";
import { videosRouter } from "./routes/videos-router";
import { testingRouter } from "./routes/testing-repository";


export const app = express();
const port = 3001;

const jsonBodyMidleware = express.json()

app.use(jsonBodyMidleware)
app.use('/videos', videosRouter)
app.use('/testing/all-data', testingRouter)

app.listen(port, () => {
   console.log(`app listen port ${port}`)
});