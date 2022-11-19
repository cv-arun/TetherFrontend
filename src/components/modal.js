import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import { useSelector, useDispatch } from 'react-redux';
import { openReducer } from '../redux/feedSlice';
import EmojiPicker from 'emoji-picker-react';
import createPost from '../api.js/postImage';
import dataURItoBlob from '../helper.js/blob';
import { Bars } from 'react-loader-spinner';
import {refreshReducer} from '../redux/refreshSLice';






const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  shadow: ''
};


export default function NestedModal() {
  const [show, setShow] = React.useState(false);
  const [text, setText] = React.useState('');
  const [images, setImages] = React.useState([]);
  const [validate, setValidate] = React.useState(false)
  const [spinner, setSpinner] = React.useState(false)
  const [privacy,setPrivacy]=React.useState('followers')
  const postCaption = React.useRef();
  const open = useSelector(state => state.openModal.openModal);
  const dispatch = useDispatch()
  const handleClose = () => {
    dispatch(openReducer(false))
  };

  React.useEffect(() => {
    images.length > 0 || text !== '' ? setValidate(true) : setValidate(false)
  }, [text, images])


  const imojiClicked = ({ emoji }) => {
    let ref = postCaption.current;
    let start = text.substring(0, ref.selectionStart)
    let end = text.substring(ref.selectionEnd)
    setText(start + emoji + end)
    setShow(false)
   
  }

  function fileUploaded(e) {

    const files = Array.from(e.target.files);
    files.forEach((img) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (readerEvent) => {
        setImages((images) => [...images, readerEvent.target.result]);
      };
    });

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
    form.append('caption', text)
    form.append('privacy', privacy)
    form.append('profile',false)

    createPost(form).then(data => {
      setImages([])
      setText('')
      setSpinner(false)
      dispatch(refreshReducer())
      dispatch(openReducer(false))
    })
  }


  return (
    <div>
      <Button ></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >

        <Box sx={{ ...style, width: 400 }}>
          {show && <div className='fixed z-50 xl:-translate-x-[120%]'>
            <EmojiPicker onEmojiClick={imojiClicked} />
          </div>}
          <div className='h-80 bg-white '>
            <div className='flex '><h2 className='text-2xl text-right w-4/6'>Create Post</h2>
              <span className='w-2/6 flex flex-row-reverse'><CloseIcon onClick={handleClose} /></span></div>
            <hr />
            <div className='flex mt-2' onSelect={(e) => e.target.selectionStart}>

              <img className=' max-h-12 my-auto' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkSQpuRwKcQD_-_2yf6EGsw56SsFVa4jdKaQ&usqp=CAU' alt='profile' />

              <div className='m-3'>
                <h3 className='m-1 text-lg '>Name</h3>
                <select className='bottom-2 rounded-sm border-gray-400 ' onChange={(e)=>setPrivacy(e.target.value)}>
                  <option value={'followers'}>Followers</option>
                  <option value={'public'}>Public</option>
                </select>
              </div>

            </div>
            <div className='flex flex-col  justify-between  h-[220px]'>

              <textarea placeholder='Whats on your Mind?' className='border-0 w-full mr-5 p-4 scrollbar-hide focus-visible:outline-none' ref={postCaption} value={text} onChange={(e) => setText(e.target.value)} >
              </textarea>
              <div className='flex justify-around h-12 overflow-y-auto scrollbar-hide'>
                {images && images.map((img, i) => (
                  <img className='max-h-[100%] active:scale-100 active:fixed active:z-50 active:-translate-y-20' src={img} key={i} alt="" />
                ))}
              </div>
              <div className='mb-2'>
                <div className='w-full my-3 h-[30px] rounded-md shadow-md ring-2 ring-slate-200 flex items-center justify-between px-4'>
                  <p>Add to your Post</p>

                  <Button><input id='choose-file' accept='image/jpeg,image/png,image/webp,image/gif' multiple style={{ display: 'none' }} type={'file'} onChange={fileUploaded} />
                    <label htmlFor="choose-file"><AddPhotoAlternateIcon /></label></Button>
                  <Button onClick={() => setShow(!show)}> <AddReactionIcon /></Button>


                </div>

                {validate ? <Button variant='contained' sx={{ width: '100%' }} onClick={submitPost}>{!spinner?'POST':<Bars
                  height="30"
                  width="50"
                  color="#4fa94d"
                  ariaLabel="bars-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />}</Button> :
                  <Button variant='contained' disabled sx={{ width: '100%' }} >Post</Button>
                }
              </div>

            </div>

          </div>


        </Box>
      </Modal>
    </div>
  );
}

