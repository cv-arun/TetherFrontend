import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import getFollow from '../api.js/getFollow';
import { getChatReducer, openChatBoxReducer } from '../redux/getChatSlice';
import { useDispatch } from 'react-redux'


function ChatList() {
    const [following, setFollwing] = useState([]);
    const [data,setData]=useState([])
    const [search, setSearch] = useState('')
    const dispatch = useDispatch();
    useEffect(() => {
        getFollow().then(data => {
            console.log(data.following, 'follow')
            setFollwing(data.following)
            setData(data.following)
        })
    }, [])

    useEffect(() => {
       

      let result=  search !==''?following?.filter((curr) => {
           return curr.first_name.indexOf(search.toUpperCase())>-1|| curr.first_name.indexOf(search.toLowerCase())>-1
        }):[...following]
        setData(result)

    }, [search])

    const selectChat = (friendId) => {
        dispatch(getChatReducer(friendId));
        dispatch(openChatBoxReducer(true));
    }

    return (
        <>
            <div className='w-full md:h-[85vh] h-[80vh] p-2 flex flex-col bg-white gap-8 rounded-tl-2xl rounded-bl-2xl'>
                <div>
                    <div className=' flex align-middle justify-between'>
                        <span className='text-3xl'>Chat</span>
                        <span className='text-3xl hover:bg-slate-50 rounded-full'><MoreVertIcon /></span>
                    </div>

                    <div className='border-b-2 border-gray-400 bg-white h-10 flex align-middle'>
                        <input className='w-full ml-3  focus-visible:outline-none' placeholder='Search...'
                            value={search} onChange={(e) => setSearch(e.target.value)} />
                        <span className='flex align-middle'><SearchIcon sx={{ marginY: 'auto' }} /></span>
                    </div>
                </div>
                <div className='flex flex-col gap-1 overflow-y-auto scrollbar-hide'>
                    {following.length!==0? data.length!==0 ?data?.map((curr) => <div className='flex' onClick={() => selectChat(curr._id)}>
                        <div className='md:w-1/6 w-2/6 my-auto'>
                            <img className=' max-h-[100%] rounded-full' src={curr.picture} alt='profile' />
                        </div>
                        <div className='  w-full flex flex-col mx-4'>
                            <p className='w-full p-2'>
                                <span className='text-2xl'>{curr.first_name}</span>
                            </p>
                        </div>
                    </div>):<div className='mx-auto mt-10'> No result found </div> :<div className='px-3'> You are not following any one<br/>
                    you can find someone to follow  from community section</div>}
                </div>
            </div>
        </>
    )
}

export default ChatList