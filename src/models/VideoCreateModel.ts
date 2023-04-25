export type VideosCreateModel = {
    title: string,
    author: string,
    availableResolutions: Array<string>
    canBeDownloaded: boolean
    minAgeRestriction: number | null
    publicationDate: string
}