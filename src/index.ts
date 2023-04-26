import express, {Request, Response} from "express";
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody } from "./types";
import { VideosCreateModel } from "./models/VideoCreateModel";
import { VideoUriParamsIdModel } from "./models/VideoUriParamsIdModel";
import { ErrorMessagesModel } from "./models/ErrorMesageModel";
import { validationAgeRestriction, validationAuthor, validationResolution, validationTitle, validationType } from "./validations/validator";

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
    const {title, author, availableResolutions} = req.body

    const error: ErrorMessagesModel = {
        errorsMessages: []
    }

    const errorTitle = validationTitle(title, 'title')
    if(errorTitle !== undefined){
        error.errorsMessages.push(errorTitle)
    }

    const errorAuthor = validationAuthor(author, 'author')
    if(errorAuthor !== undefined){
        error.errorsMessages.push(errorAuthor)
    }
    
    const errorResolution = validationResolution('availableResolutions', availableResolutions)
    if(errorResolution !== undefined){
        error.errorsMessages.push(errorResolution)
    }

    if(error.errorsMessages.length != 0){
        res.status(400).send(error)
        return
    }

    const addDate = () =>{
        const date = new Date()
        date.setDate(date.getDate() + 1)
        return date.toISOString()
    }

    const createVideo: VideosType = {
        id: +(new Date()),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
        availableResolutions: req.body.availableResolutions
    }

    db.videos.push(createVideo)

    res.status(201).send(createVideo)
})

app.put('/videos/:id', (req: RequestWithParamsAndBody<VideoUriParamsIdModel, VideosCreateModel>, res: Response) =>{
    const {title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate} = req.body

    const video = db.videos.find(item => item.id === +req.params.id)

    const error: ErrorMessagesModel = {
        errorsMessages: []
    }

    if(!video){
        res.sendStatus(404)
        return
    }

    const errorTitle = validationTitle(title, 'title')
    if(errorTitle !== undefined){
        error.errorsMessages.push(errorTitle)
    }

    const errorAuthor = validationAuthor(author, 'author')
    if(errorAuthor !== undefined){
        error.errorsMessages.push(errorAuthor)
    }
    
    const errorResolution = validationResolution('availableResolutions', availableResolutions)
    if(errorResolution !== undefined){
        error.errorsMessages.push(errorResolution)
    }

    const errorDownloaded = validationType('canBeDownloaded', ['boolean'], canBeDownloaded)
    if(errorDownloaded !== undefined){
        error.errorsMessages.push(errorDownloaded)
    }

    const errorAgeRestriction = validationAgeRestriction('minAgeRestriction', minAgeRestriction)
    if(errorAgeRestriction !== undefined){
        error.errorsMessages.push(errorAgeRestriction)
    }

    const errorPublicationDate= validationType('publicationDate', ['string'], publicationDate)
    if(errorPublicationDate !== undefined){
        error.errorsMessages.push(errorPublicationDate)
    }

    if(error.errorsMessages.length != 0){
        res.status(400).send(error)
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