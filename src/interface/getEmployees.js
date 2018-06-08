import { url } from './dbConfig';


export default function (callback) {
    let request = new XMLHttpRequest()
    request.open('GET', url, true)
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