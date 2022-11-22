import axios from "axios"
const uploadImage = (img) => {
    return new Promise(async (resolve, reject) => {
      const formData = new FormData()
      formData.append('file', img)
      formData.append('upload_preset', "izogz94i")
      let data = await axios.post('http://api.cloudinary.com/v1_1/domqbgvw6/image/upload', formData)
      resolve(data.data.secure_url)
    })
  }

  export default uploadImage