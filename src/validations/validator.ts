
const validationMaxLength = (name: string, num: number, elem: string | Array<string>) =>{
    if(elem.length > num){
        return {
            message: `max length ${name} ${num}`,
            field: name
        }
    }
}
const validationMinLength = (name: string, num: number, elem: string | Array<string>) =>{
    if(elem.length < num){
        return {
            message: `min length ${name} ${num}`,
            field: name
        }
    }
}
const validationTrim = (name: string, elem: string) =>{
    if(!elem.trim()){
        return {
            message: `the ${name} must contain characters`,
            field: name
        }
    }
}
export const validationType = (name: string, type: Array<string>, elem: any) =>{
    let error = []

    for(let i = 0; i < type.length; i++){
        if(type[i] === typeof elem){
            error.push(true)
        }else{
            error.push(false)
        }
    }

    if(error.indexOf(true) === -1){
        return {
            message: `${name} does not match the type ${type}`,
            field: name
        }
    }
}

export const validationResolution = (name: string, elem: any) =>{
    if(!elem){
        return {
            message: `not transferred ${name}`,
            field: name
        }
    }

    const errorType = validationType(name, ['object'], elem)
    if(errorType !== undefined){
        return errorType
    }

    if(elem.length === 0){
        return {
            message: 'must be filled',
            field: name
        }
    }else{
        let res
        for(let i = 0; i < elem.length; i++){
            const resolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]
            if(resolutions.indexOf(elem[i]) === -1){
                res = {
                    message: `data must match [${resolutions}]`,
                    field: name
                }
                break
            }
        }
        return res
    }
}


export const validationTitle = (elem: any, name: string) =>{
    const errors = []

    if(!elem){
        return {
            message: `not transferred ${name}`,
            field: name
        }
    }

    const errorType = validationType(name, ['string'], elem)
    if(errorType !== undefined){
        return errorType
    }

    errors.push(validationMaxLength(name, 40, elem))
    errors.push(validationMinLength(name, 1, elem))
    errors.push(validationTrim(name, elem))

    const error = errors.filter(item => item !== undefined)
    
    if(error.length > 0){
        return error[0]
    }
}

export const validationAuthor = (elem: any, name: string) => {
    const errors = []

    if(!elem){
        return {
            message: `not transferred ${name}`,
            field: name
        }
    }

    const errorType = validationType(name, ['string'], elem)
    if(errorType !== undefined){
        return errorType
    }

    errors.push(validationMaxLength(name, 20, elem))
    errors.push(validationMinLength(name, 1, elem))
    errors.push(validationTrim(name, elem))
    

    const error = errors.filter(item => item !== undefined)
    
    if(error.length > 0){
        return error[0]
    }
}

export const validationAgeRestriction = (name: string, elem:any) =>{
    if(!elem){
        return {
            message: `not transferred ${name}`,
            field: name
        }
    }

    const errorType = validationType(name, ['number', 'null'], elem)
    if(errorType !== undefined){
        return errorType
    }
    if(elem < 1){
        return {
            message: `min value 1`,
            field: `${name}`
        }
    }

    if(elem > 18){
        return {
            message: 'max value 18',
            field: `${name}`
        }
    }
}
