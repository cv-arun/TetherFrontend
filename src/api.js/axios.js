import axios from 'axios'


const instance = axios.create({
    // baseURL: 'https://tetherapi.cyclic.app',  
    baseURL: 'http://localhost:5000',  

})




export default instance