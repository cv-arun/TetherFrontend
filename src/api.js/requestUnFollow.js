import axios from './axios'

const requestUnFollow = (id) => {
    let token=JSON.parse(localStorage.getItem('userKey'))
  
    return new Promise((resolve, rejecct) => {
        
        axios.post('/requestUnFollow',{friendId:id}, { headers: { 'x-access-token': token } }).then(data=>{
            resolve(data.data)
        }).catch(err=>rejecct(err))
    })
}



export default requestUnFollow