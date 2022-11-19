import axios from './axios';



const refreshUSer = () => {
    let token=JSON.parse(localStorage.getItem('userKey'))
  
    return new Promise((resolve, rejecct) => {
        
        axios.get('/refreshUSer', { headers: { 'x-access-token': token } }).then(data=>{
            
            data.data && localStorage.setItem('Tether', JSON.stringify(data.data))
            resolve({msg:'user data rfreshed'})
            
        }).catch(err=>rejecct(err))
    })
}



export default refreshUSer