import express, {Request, Response} from "express";
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody } from "./types";
import { VideosCreateModel } from "./models/VideoCreateModel";
import { VideoUriParamsIdModel } from "./models/VideoUriParamsIdModel";

export const app = express();
const port = 3000;

const jsonBodyMidleware = express.json();
app.use(jsonBodyMidleware);

type VideosType = {
    id: number
    title: string
    author: string
    canBeDownloaded: boolean
    minAgeRestriction: null | number
    createdAt: string
    publicationDate: string
    availableResolutions: Array<string>
}

const db: {videos: VideosType[]} = {
    videos: []
} 

app.get('/videos', (req: Request, res: Response)=>{
    res.status(200).send(db.videos)
})

app.get('/videos/:id', (req: RequestWithParams<VideoUriParamsIdModel>, res: Response<VideosType>)=>{
    const video = db.videos.find(item => item.id === +req.params.id)

    if(!video){
        res.sendStatus(404)
        return
    }

    res.status(200).send(video)
})

app.post('/videos', (req: RequestWithBody<VideosCreateModel>, res: Response)=>{
    if(!req.body.title || !req.body.author || !req.body){
        res.status(400).send({
            message: 'wrong data',
            field: `${req.body}`
        })
        return
    }

    const createVideo: VideosType = {
        id: +(new Date()),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2023-04-25T15:49:51.568Z",
        publicationDate: "2023-04-25T15:49:51.568Z",
        availableResolutions: req.body.availableResolutions
    }

    db.videos.push(createVideo)

    res.status(201).send(createVideo)
})

app.put('/videos/:id', (req: RequestWithParamsAndBody<VideoUriParamsIdModel, VideosCreateModel>, res: Response) =>{
    const {title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate} = req.body

    const video = db.videos.find(item => item.id === +req.params.id)

    if(!video){
        res.sendStatus(404)
        return
    }

    if(title.length > 40 || title.length < 1 || !title || typeof title !== 'string') {
        res.status(400).send({
            message: 'wrong data title',
            field: `title: ${title}`
        })
        return
    }

    if(author.length > 20 || author.length < 1 || !author || typeof author !== 'string'){
        res.status(400).send({
            message: 'worong data author',
            field: `author: ${author}`
        })
        return
    }

    if(availableResolutions.length < 1){
        res.status(400).send({
            message: 'min length 1',
            field: `availableResolutions: ${availableResolutions}`
        })
        return
    }

    if(typeof canBeDownloaded !== 'boolean'){
        res.status(400).send({
            message: 'canBeDownloaded must be a boolean',
            field: `canBeDownloaded: ${typeof canBeDownloaded}`
        })
        return
    }
    
    if(Number(minAgeRestriction) < 1 || Number(minAgeRestriction) < 19 || typeof minAgeRestriction !== 'number'){
        res.status(400).send({
            message: 'wrong data minAgeRestriction',
            field: `minAgeRestriction: ${minAgeRestriction}`
        })
        return
    }

    if(typeof publicationDate !== 'string'){
        res.status(400).send({
            message: 'publicationDate must be a string',
            field: `publicationDate: ${typeof minAgeRestriction}`
        })
        return
    }
 

    video.title = title
    video.author = author
    video.availableResolutions = availableResolutions
    video.canBeDownloaded = canBeDownloaded
    video.minAgeRestriction = minAgeRestriction
    video.publicationDate = publicationDate

    res.sendStatus(204)
})

app.delete('/videos/:id', (req: RequestWithParams<VideoUriParamsIdModel>, res: Response) =>{
    const video = db.videos.find(item => item.id === +req.params.id)

    if(!video){
        res.sendStatus(404)
        return
    }

    db.videos = db.videos.filter(item => item.id !== +req.params.id)

    res.sendStatus(204)
})

app.delete('/testing/all-data', (req, res)=>{
    db.videos = []
    res.sendStatus(204)
})

app.listen(port, ()=>{
    console.log(`app listen port ${port}`)
});