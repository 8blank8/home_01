import { VideosType } from "../models/VideosModel"


export const videos: VideosType[]  =  []


export const videoRepository = {
    findVideo(){
        return videos
    },

    findVideoById(id: number){
        const video = videos.find(item => item.id === id)
        return video
    },

    createVideo(title: string, author: string, availableResolutions: Array<string> ){
     
        const addDate = (str: string) => {
           const date = new Date(str)
           date.setDate(date.getDate() + 1)
           return date.toISOString()
        }
     
     
        const createVideo: VideosType = {
           id: +(new Date()),
           title: title,
           author: author,
           canBeDownloaded: false,
           minAgeRestriction: null,
           createdAt: new Date().toISOString(),
           publicationDate: addDate(new Date().toISOString()),
           availableResolutions: availableResolutions
        }
     
        videos.push(createVideo)
     
        return createVideo
    },

    updateVideo(id: number, title: string, author: string, availableResolutions: Array<string>, canBeDownloaded: boolean, minAgeRestriction: number | null, publicationDate: string){
 
        const video = videos.find(item => item.id === id)
     
        if (!video) {
           return false
        }
     
    
        video.title = title
        video.author = author
        video.availableResolutions = availableResolutions
        video.canBeDownloaded = canBeDownloaded
        video.minAgeRestriction = minAgeRestriction
        video.publicationDate = publicationDate
        
        return video
     
        
    },

    deleteVideoById(id:number){
        const video = videos.find(item => item.id === id)
 
        if (!video) {
           return false
        }else{
            videos.splice(videos.indexOf(video), 1)
            return true
        }
    },

    deleteVideos(){
        videos.length = 0;
        return true
    }
}