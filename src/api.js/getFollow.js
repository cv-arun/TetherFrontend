import axios from './axios'

const getFollow = (userId) => {
    let token=JSON.parse(localStorage.getItem('userKey'))
  
    return new Promise((resolve, rejecct) => {
        
        axios.post(`/getFollow/`,{userId},{ headers: { 'x-access-token': token } }).then(data=>{
            resolve(data.data)
        }).catch(err=>rejecct(err))
    })
}



export default getFollow