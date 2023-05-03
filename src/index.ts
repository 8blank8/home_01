import express from "express";
import { videosRouter } from "./routes/videos-router";
import { testingVideoRouter } from "./routes/testing-video-router";
import { blogsRouter } from "./routes/blogs-router";
import { postsRouter } from "./routes/posts-router";

export const app = express();
const port = 3001;

const jsonBodyMidleware = express.json()

app.use(jsonBodyMidleware)
app.use('/videos', videosRouter)
app.use('/testing/all-data', testingVideoRouter)
app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)

app.listen(port, () => {
   console.log(`app listen port ${port}`)
});