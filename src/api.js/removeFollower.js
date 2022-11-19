import axios from './axios'

const removeFollow = (friendId) => {
    let token=JSON.parse(localStorage.getItem('userKey'))
  
    return new Promise((resolve, rejecct) => {
        
        axios.post('/removeFollow',{friendId}, { headers: { 'x-access-token': token } }).then(data=>{
            resolve(data.data)
        }).catch(err=>rejecct(err))
    })
}


export default removeFollow