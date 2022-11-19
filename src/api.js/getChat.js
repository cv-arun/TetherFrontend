import axios from './axios'

const getChat = (friendId) => {
    let token=JSON.parse(localStorage.getItem('userKey'))
  
    return new Promise((resolve, rejecct) => { 
        axios.post('/chat/getChat',{friendId}, { headers: { 'x-access-token': token } }).then(data=>{
            resolve(data.data)
        }).catch(err=>rejecct(err))
    })
}



export default getChat