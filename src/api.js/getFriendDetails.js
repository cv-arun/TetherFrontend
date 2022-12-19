import axios from './axios'

export const getFrirndDetails = (userId) => {
    let token=JSON.parse(localStorage.getItem('userKey'))
  
    return new Promise((resolve, rejecct) => {
        
        axios.post('/getFriendDetails',{userId},{ headers: { 'x-access-token': token } }).then(data=>{
            
            resolve(data.data)
        }).catch(err=>rejecct(err))
    })
}
export const getFrirndPostDetails = (userId) => {
    let token=JSON.parse(localStorage.getItem('userKey'))
  
    return new Promise((resolve, rejecct) => {
        
        axios.post('/getFriendPostDetails',{userId},{ headers: { 'x-access-token': token } }).then(data=>{
            resolve(data.data)
        }).catch(err=>rejecct(err))
    })
}




