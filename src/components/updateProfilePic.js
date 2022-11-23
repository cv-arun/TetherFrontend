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
import uploadImage from '../api.js/uploadToCloudinary';
import LinearProgress from '@mui/material/LinearProgress';



function ProfilePic({ post }) {
  console.log(post)
  const dispatch = useDispatch()
  const [spinner, setSpinner] = useState(false)
  const [chossenImg, setChossenImg] = useState('')
  const [enable, setEnable] = useState(false)
  const [progress, setProgress] = React.useState(0)
  const [showProgress, setShowProgress] = React.useState(false)
  const [preview, setPreview] = React.useState([])
  const [uploadImg, setUploadedImg] = React.useState([])





  function fileUpload(e) {
    const files = Object.values(e.target.files)
    //config for progress
    let config = {
      onUploadProgress: function (progressEvent) {
        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(percentCompleted)
        percentCompleted === 100 && setTimeout(() => setEnable(true), 50)
      }
    }
    //upload image to coloudinary
    uploadImage(files, config).then((data) => {
      setUploadedImg(data)
      console.log(data, 'url profile')
      setShowProgress(true)
    })

    //for preview
    files.forEach((img) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (readerEvent) => {
        setPreview((images) => [...images, readerEvent.target.result]);
      };
    });

  }

  const submit = () => {


    setSpinner(true)
    let img = uploadImg[0]?.url || chossenImg

    updateProfile(img).then(data => {
      dispatch(refreshReducer())

      refreshUSer().then(data => dispatch(userReducer()))
        .catch(err => console.log(err))

      setSpinner(false)
      dispatch(closeReducer())
      setPreview([])
      setEnable(false)
    }).catch(err=>console.log(err))

  }

  return (
    <>
      <div className='flex justify-center'>
        <Button><input id='choose-file' accept='image/jpeg,image/png,image/webp,image/gif' style={{ display: 'none' }} type={'file'} multiple onChange={fileUpload} />
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
      {showProgress && <LinearProgress variant="determinate" value={progress} sx={{ marginBottom: '5px' }} />}
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