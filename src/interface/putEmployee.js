import { url } from './dbConfig';


export default function (payload, callback) {
    payload.email = "temp@deleteme.com"
    let requestURL = `${url}/${payload.id}`
    Object.getOwnPropertyNames(payload).forEach((parameter, i) => {
        requestURL += `${i>0?'&':'?'}${parameter}=${payload[parameter]}`
    })
    let request = new XMLHttpRequest()
    request.open('PUT', requestURL, true)
    request.onload = () => {
        if (request.status === 200) {
            if (callback)
                callback(JSON.parse(request.response))
        }
        else {
            console.log(`Error: ` + request.status)
            if (callback)
                callback(null)
        }
    }
    request.send()
}