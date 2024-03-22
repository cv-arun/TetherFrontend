import axios from './axios'

const getPost = (myPost) => {
    let token = JSON.parse(localStorage.getItem('userKey'))

    return new Promise((resolve, rejecct) => {

        myPost ? axios.get('/post/getMyPost', { headers: { 'x-access-token': token } }).then(data => {
            resolve(data.data)
        }).catch(err => rejecct(err)) :
            axios.get('/post/getPost', { headers: { 'x-access-token': token } }).then(data => {
                resolve(data.data)
            }).catch(err => rejecct(err))

    })
}


export default getPost

export const getPostChunk = (myPost,page,limit) => {
    let token = JSON.parse(localStorage.getItem('userKey'))

    return new Promise((resolve, rejecct) => {

        myPost ? axios.get('/post/getMyPost', { headers: { 'x-access-token': token } }).then(data => {
            resolve(data.data)
        }).catch(err => rejecct(err)) :
            axios.get(`/post/getPostChunks/${page}/${limit}`, { headers: { 'x-access-token': token } }).then(data => {
                resolve(data.data)
            }).catch(err => rejecct(err))

    })
}