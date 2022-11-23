import axios from "axios";

const uploadImage = (images,config) => {

  return new Promise((resolve, reject) => {
    let urls=[]
   images.map(async(img)=>{
    const formData = new FormData()
    formData.append('file', img)
    formData.append('upload_preset', "izogz94i")
    let data = await axios.post('https://api.cloudinary.com/v1_1/domqbgvw6/image/upload', formData,config) 
    console.log(data.data.secure_url,"dtaaaaaaaaaaaa")
    urls.push({url:data.data.secure_url})
   })  
    resolve(urls)
  })
}

export default uploadImage