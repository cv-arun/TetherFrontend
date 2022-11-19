import axios from './axios'

const getNotification = () => {
    let token=JSON.parse(localStorage.getItem('userKey'))
  
    return new Promise((resolve, rejecct) => {
        
        axios.get('/getNotification', { headers: { 'x-access-token': token } }).then(data=>{
            
            resolve(data.data)
        }).catch(err=>rejecct(err))
    })
}



export default getNotification