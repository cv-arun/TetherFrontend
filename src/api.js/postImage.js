import axios from './axios';


const createPost = (data) => {
    let token = JSON.parse(localStorage.getItem('userKey'))

    return new Promise((resolve, rejecct) => {
        console.log(data, 'in dat')
        axios.post('/post/create-post',data, {
            headers: {
                'x-access-token': token,
            }
        }).then(data => {
            resolve(data.data)
        }).catch(err => rejecct(err))
    })
}



export default createPost