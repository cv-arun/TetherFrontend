import axios from './axios';


const createPost = (data) => {
    let token = JSON.parse(localStorage.getItem('userKey'))
    console.log(data.entries())
    return new Promise((resolve, rejecct) => {

        axios.post('/post/create-post', data, {
            headers: {
                'x-access-token': token,
                "Content-Type": "multipart/form-data",
            }
        }).then(data => {
            resolve(data.data)
        }).catch(err => rejecct(err))
    })
}



export default createPost