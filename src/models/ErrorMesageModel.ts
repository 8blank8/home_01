type ErrorMessageModel = {
    message: string,
    field: string
}

export type ErrorMessagesModel = {
    errorsMessages: Array<ErrorMessageModel> 
} 