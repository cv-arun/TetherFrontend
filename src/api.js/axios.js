import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://tetherapi.cyclic.app',  
})




export default instance