import axios from './axios'

const hitLIke = (postId) => {
    let token=JSON.parse(localStorage.getItem('userKey'))
  
    return new Promise((resolve, rejecct) => {
        
        axios.post('/post/hitLIke',{postId},{ headers: { 'x-access-token': token } }).then(data=>{
            
            resolve(data.data)
        }).catch(err=>rejecct(err))
    })
}



export default hitLIke