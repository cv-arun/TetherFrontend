import axios from './axios'

const getPeople = () => {
    let token=JSON.parse(localStorage.getItem('userKey'))
  
    return new Promise((resolve, rejecct) => {
        
        axios.get('/getPeople', { headers: { 'x-access-token': token } }).then(data=>{
            
            resolve(data.data)
        }).catch(err=>rejecct(err))
    })
}



export default getPeople