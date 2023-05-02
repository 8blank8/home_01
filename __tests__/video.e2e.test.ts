import request  from "supertest";
import {app} from '../src/index'
import { VideosType } from "../src/models/VideosModel";

let db = {
        // id: +(new Date()),
        title: "lesson",
        author: "it-incubator",
        // canBeDownloaded: false,
        // minAgeRestriction: 18,
        // createdAt: new Date().toISOString(),
        // publicationDate: new Date().toISOString(),
        availableResolutions: ['P144', '1080']
    }


describe('/video', ()=>{

    beforeAll(async ()=>{
        await request(app).delete('/testing/all-data')

        db = {
            // id: +(new Date()),
            title: "lesson",
            author: "it-incubator",
            // canBeDownloaded: false,
            // minAgeRestriction: 18,
            // createdAt: new Date().toISOString(),
            // publicationDate: new Date().toISOString(),
            availableResolutions: ['P144', '1080']
        }
    })

    it("GET all videos", async ()=>{
        
        await request(app).get('/videos')
            .expect(200, [])
    })

    it("GET video by id", async ()=>{

        const createdVideo = await request(app).post('.videos')
            .send(db)
            .expect(201)
        
        console.log(createdVideo)
        // await request(app).get(`/videos/${createdVideo.id}`)
    })
})