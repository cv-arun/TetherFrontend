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




function Post({ curr }) {

    const user = useSelector((state) => state.userReducer.user)
    const dispatch = useDispatch()
    const [openComment, setopenComment] = useState(false)
    const [comment, setComment] = useState('')
    const [showMenu, setShowMenu] = useState(false)
    const [liked, setLiked] = useState(false)
    const hitLikes = (curr) => {
        hitLIke(curr._id).then(data => {
            data.msg === 'Liked' && setLiked(true)
            data.msg === 'Unliked' && setLiked(false)
            dispatch(refreshReducer())
        })
    }

    const addCommnet = () => {
        console.log('add')
        sendCommnet(curr._id, comment).then(data => {
            console.log(data, 'cmnt')
            setComment('')
            dispatch(refreshReducer())
        })
    }
    const deleteComment = (commentId) => {
        removeCommenent(curr._id, commentId).then(data => {
            console.log(data)
            dispatch(refreshReducer())
        })
    }
    useEffect(() => {
        curr.Likes.includes(user.userId) ? setLiked(true) : setLiked(false)
    }, [])
    return (
        <>
            <div key={curr._id} className='max-w-[690px] shadow my-1 bg-white rounded-lg flex flex-col'>
                <div className='flex mt-2 px-3'>

                    <img className=' max-h-12 my-auto rounded-full' src={curr.user.picture} alt='failed to load profile' />

                    <div className='m-3 '>
                        <h3 className='m-1 text-lg '>{curr.user.first_name}</h3>
                        <div className='flex'>{curr.privacy === 'public' ? <PublicIcon /> : <PeopleIcon />}
                         <Moment className=' mx-2 w-[80px]' element="span" fromNow ago>{curr.createdAt}</Moment> ago </div>
                    </div>
                    <div className='self-center w-full flex flex-row-reverse'>

                        {showMenu &&
                            <div className='w-[150px] h-[150px] absolute z-50 bg-white shadow-2xl rounded p-3 mr-8 flex flex-col gap-4'>

                                {user.userId !== curr.user._id ? <>
                                    <button className='hover:bg-slate-400 border-y-2 '>unfollow</button>
                                    <button className='hover:bg-slate-400 border-y-2 '>Save post</button>
                                    <button className='hover:bg-slate-400 border-y-2 '>Report post</button>
                                </> : <>
                                    <button className='hover:bg-slate-400 border-y-2 '>Delete</button>
                                    <button className='hover:bg-slate-400 border-y-2 '>Edit</button>
                                    <button className='hover:bg-slate-400 border-y-2'>Hide post</button></>}

                            </div>}

                        <span onClick={() => setShowMenu(!showMenu)} className='rounded-full hover:bg-slate-200' ><MoreHorizIcon /></span>
                    </div>


                </div>
                <div className='m-5 max-h-[500px] overflow-y-auto scrollbar-hide '>
                    <p>{curr.text}</p>
                </div>
                {curr.images[0] && <div className='m-5 mb-0 overflow-y-auto flex scrollbar-hide'>
                    {curr.images.map((img, i) => (<><img className='min-w-full max-h-[500px]' src={img.url} alt='post' /></>))}
                </div>}
                {curr.images.length > 1 ? <span className='flex justify-center'>{curr.images.map(()=><FiberManualRecordOutlinedIcon/>)}</span>: ''}
                <div >
                    <div className='my-3 mx-5 flex flex-row justify-between z-0'>
                        <p >{curr.Likes?.length} Likes</p>
                        <p>{curr.comments?.length} comments</p>
                    </div>
                    <hr />
                    <div className='p-3 flex justify-around'>
                        <span className='active:scale-150 '>
                            <Button onClick={() => hitLikes(curr)}>
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
                            {curr.comments?.map((i) => <div key={i._id} className='flex m-3'>
                                <div className='md:w-1/6 w-2/6'>
                                    <img className='ml-5 max-h-12 rounded-full' src={i.commentBy?.picture} alt='profile' />
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
                                        {user.userId === (i.commentBy?._id||curr.user._id ) && <span onClick={() => deleteComment(i._id)}>delete</span>}
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