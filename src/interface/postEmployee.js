import { url } from './dbConfig';


export default function (payload, callback) {
    let request = new XMLHttpRequest()
    request.open('POST', url, true)
    request.setRequestHeader('Content-Type', 'application/json')
    request.onload = () => {
        if (request.status === 201) {
            if (callback)
                callback(JSON.parse(request.response))
        }
        else {
            console.log(`Error: ` + request.status)
            if (callback)
                callback(null)
        }
    }
    request.send(JSON.stringify(payload))
}