import axios from './axios'

const sendCommnet = (postId,text) => {
    let token=JSON.parse(localStorage.getItem('userKey'))
  
    return new Promise((resolve, rejecct) => {
        
        axios.post('/post/sendCommnet',{postId,text},{ headers: { 'x-access-token': token } }).then(data=>{
            
            resolve(data.data)
        }).catch(err=>rejecct(err))
    })
}



export default sendCommnet