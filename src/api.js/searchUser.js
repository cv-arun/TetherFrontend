import axios from './axios'

const searchUser = (text) => {
    let token=JSON.parse(localStorage.getItem('userKey'))
  
    return new Promise((resolve, rejecct) => { 
        axios.post('/searchUser',{text}, { headers: { 'x-access-token': token } }).then(data=>{
            resolve(data.data)
        }).catch(err=>rejecct(err))
    })
}



export default searchUser