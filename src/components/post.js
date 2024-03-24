import React, { useEffect, useState } from 'react';
import PublicIcon from '@mui/icons-material/Public';
import PeopleIcon from '@mui/icons-material/People';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Button } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SendSharpIcon from '@mui/icons-material/SendSharp';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import hitLIke from '../api.js/hitLIke';
import sendCommnet from '../api.js/sendComment';
import { refreshReducer } from '../redux/refreshSLice';
import { useDispatch } from 'react-redux';
import removeCommenent from '../api.js/removeComment';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';
import { useNavigate } from 'react-router-dom';




function Post({ curr }) {

    const user = useSelector((state) => state.userReducer.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [postData, setPostData] = useState(curr)
    const [openComment, setopenComment] = useState(false)
    const [comment, setComment] = useState('')
    const [showMenu, setShowMenu] = useState(false)
    const [liked, setLiked] = useState(false)
    const hitLikes = (postData) => {
        hitLIke(postData._id).then(data => {
            data.msg === 'Liked' && setLiked(true)
            data.msg === 'Unliked' && setLiked(false)
            setPostData(data.post)
            // dispatch(refreshReducer())
        })
    }

    const addCommnet = () => {
        console.log('add')
        sendCommnet(postData._id, comment).then(data => {
            console.log(data, 'cmnt')
            setComment('')
            setPostData(data.post)

            // dispatch(refreshReducer())
        })
    }
    const deleteComment = (commentId) => {
        removeCommenent(postData._id, commentId).then(data => {
            console.log(data)
            setPostData(data.post)

            // dispatch(refreshReducer())
        })
    }
    useEffect(() => {
        postData.Likes.includes(user.userId) ? setLiked(true) : setLiked(false)
    }, [postData, user])
    return (
        <>
            <div key={postData._id} className='max-w-[690px] shadow my-1 bg-white rounded-lg flex flex-col'>
                <div className='flex mt-2 px-3'>

                    <img className='h-[80px] w-[80px] min-w-[80px] min-h-80 object-cover rounded-full' src={postData.user.picture} loading="lazy" alt='failed to load profile' />

                    <div className='m-3 '>
                        <h3 className='m-1 text-lg '>{postData.user.first_name}</h3>
                        <div className='flex'>
                            <div className='mx-2'>{postData.privacy === 'public' ? <PublicIcon /> : <PeopleIcon />}</div>
                            <div className=' flex '>
                                <Moment className=' w-[80px] flex justify-end mr-1' element="span" fromNow ago>{postData.createdAt}</Moment> ago
                            </div>
                        </div>
                    </div>
                    <div className='self-center w-full flex flex-row-reverse'>

                        {showMenu &&
                            <div className='w-[150px] h-fit absolute z-50 bg-white shadow-2xl rounded p-4 mr-8 flex flex-col gap-4'>

                                {user.userId !== postData.user._id ? <>
                                    <button className='hover:bg-slate-400  '>unfollow</button>
                                    <hr />
                                    <button className='hover:bg-slate-400  '>Save post</button>
                                    <hr />
                                    <button className='hover:bg-slate-400  '>Report post</button>
                                </> : <>
                                    <button className='hover:bg-slate-400 '>Delete</button>
                                    <hr />
                                    <button className='hover:bg-slate-400 '>Edit</button>
                                    <hr />
                                    <button className='hover:bg-slate-400 '>Hide post</button></>}
                            </div>}

                        <span onClick={() => setShowMenu(!showMenu)} className='rounded-full cursor-pointer hover:bg-slate-200' ><MoreHorizIcon /></span>
                    </div>


                </div>
                <div className='m-5 max-h-[500px] overflow-y-auto scrollbar-hide '>
                    <p>{postData.text}</p>
                </div>
                {postData.images[0] && <div className='m-5 mb-0 overflow-y-auto flex scrollbar-hide snap-mandatory snap-x '>
                    {postData.images.map((img, i) => (<div className=' min-w-full snap-center'><img className='max-h-[500px] object-contain w-full' src={img.url} alt='failed to load' loading="lazy" /></div>))}
                </div>}
                {postData.images.length > 1 ? <span className='flex justify-center snap-always snap-center'>{curr.images.map(() => <FiberManualRecordOutlinedIcon />)}</span> : ''}
                <div >
                    <div className='my-3 mx-5 flex flex-row justify-between z-0'>
                        <p >{postData.Likes?.length} Likes</p>
                        <p>{postData.comments?.length} comments</p>
                    </div>
                    <hr />
                    <div className='p-3 flex justify-around'>
                        <span className='active:scale-150 '>
                            <Button onClick={() => hitLikes(postData)}>
                                {!liked ? <ThumbUpOutlinedIcon /> : <ThumbUpIcon />}
                                Like
                            </Button>
                        </span>
                        <Button onClick={() => { setopenComment(!openComment); }}><CommentOutlinedIcon /> Comment</Button>
                        <Button><ShareOutlinedIcon />  Share</Button>
                    </div>

                    <hr />
                </div>
                {openComment &&
                    <div >

                        <div className='flex m-3'><div className='md:w-1/6 w-2/6'>
                            <img className='ml-5 max-h-12 rounded-full' src={user.picture} alt='profile' /></div>
                            <div className='rounded-full bg-gray-300 w-full mr-5 flex'>
                                <input placeholder='Write a comment...' value={comment}
                                    className='md:w-11/12 w-10/12 p-4 bg-gray-300 focus-visible:outline-none'
                                    onChange={(e) => setComment(e.target.value)} />
                                <button className='h-full md:w-1/12 w-2/12 active:bg-slate-400 rounded-full' onClick={addCommnet}>
                                    <SendSharpIcon />
                                </button>
                            </div>
                        </div>
                        <div className='flex flex-col max-h-[300px] overflow-y-auto scrollbar-hide'>
                            {postData.comments?.map((i) => <div key={i._id} className='flex m-3'>
                                <div className='md:w-1/6 w-2/6'>
                                    <img className='ml-5 max-h-12 rounded-full cursor-pointer' onClick={()=>navigate(`/profiles/${i.commentBy?._id}`)}  src={i.commentBy?.picture} alt='profile' />
                                </div>

                                <div className='  w-full mr-5 flex flex-col'>
                                    <p className='w-full p-4 bg-gray-300 rounded-xl flex flex-col'>
                                        <span>{i.commentBy?.first_name}</span>
                                        <span className='text-slate-600 max-h-[100px]'>{i.comment}</span>
                                    </p>
                                    <span className='flex justify-between'>
                                        <span>
                                            <Moment className=' mx-2 w-[80px]' element="span" fromNow ago>{i.commentAt}</Moment>ago
                                        </span>
                                        {user.userId === (i.commentBy?._id || postData.user._id) && <span className='cursor-pointer' onClick={() => deleteComment(i._id)}>delete</span>}
                                    </span>
                                </div>
                            </div>)}
                        </div>



                    </div>}
            </div>
        </>
    )
}

export default Post