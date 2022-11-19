import React, { useState } from 'react';
import Button from '@mui/material/Button';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Bars } from 'react-loader-spinner';
import { refreshReducer } from '../redux/refreshSLice';
import { useDispatch } from 'react-redux';
import dataURItoBlob from '../helper.js/blob';
import createPost from '../api.js/postImage';
import { closeReducer } from '../redux/modal2';
import updateProfile from '../api.js/udateProfile';
import refreshUSer from '../api.js/refreshUser';
import { userReducer } from '../redux/userSlice.js';


function ProfilePic({ post }) {
  console.log(post)
  const dispatch = useDispatch()
  const [images, setImages] = useState([])
  const [spinner, setSpinner] = useState(false)
  const [chossenImg, setChossenImg] = useState('')
  const [enable, setEnable] = useState(false)

  function fileUploaded(e) {

    const files = Array.from(e.target.files);
    files.forEach((img) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (readerEvent) => {
        setImages((images) => [...images, readerEvent.target.result]);
      };
    });
    setEnable(true)
  }
  const submit = () => {
    images.length === 0 ? submitChoosenImg() : submitPost()
  }

  const submitPost = () => {

    setSpinner(true)
    let img = images.map(img => {
      return dataURItoBlob(img)
    })
    console.log(img, 'img')
    let form = new FormData();
    img.forEach((img) => {
      form.append('file', img)
    })
    form.append('profile', true)

    createPost(form).then(data => {
      setImages([])
      setSpinner(false)
      dispatch(refreshReducer())
      dispatch(closeReducer())
      refreshUSer().then(data => dispatch(userReducer()))
        .catch(err => console.log(err))
    })
  }

  const submitChoosenImg = () => {

    updateProfile(chossenImg).then(data => {
      dispatch(refreshReducer())
      refreshUSer().then(data => dispatch(userReducer()))
        .catch(err => console.log(err))
        dispatch(closeReducer())
    })

  }

  return (
    <>
      <div className='flex justify-center'>
        <Button><input id='choose-file' accept='image/jpeg,image/png,image/webp,image/gif' style={{ display: 'none' }} type={'file'} multiple onChange={fileUploaded} />
          <label htmlFor="choose-file">Upload photo<AddPhotoAlternateIcon /></label></Button>
      </div>
      <hr />
      <h1>Suggested Photos</h1>
      <div className='overflow-y-auto grid grid-cols-3 gap-1 h-56'>
        {
          post?.map((curr) => {
            if (curr.images.length !== 0) {
              return <button className=' max-w-[150px] aspect-square hover:border-2 border-green-800 focus:border-4'>
                <img src={curr.images[0]?.url} className=' max-w-[100%] aspect-square ' alt='suggestions' onClick={() => { setChossenImg(curr.images[0]?.url); setEnable(true) }} />
              </button>
            } else {
              return null
            }

          })
        }

      </div>
      <div>
        {enable ? <Button variant='contained' sx={{ width: '100%' }} onClick={submit}>{!spinner ? 'POST' : <Bars
          height="30"
          width="50"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />}</Button> :
          <Button variant='contained' disabled sx={{ width: '100%', zIndex: '500' }} >Post</Button>
        }
      </div>

    </>
  )
}

export default ProfilePic