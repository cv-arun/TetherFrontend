import React, { useEffect, useRef, useState } from 'react';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import EmojiPicker from 'emoji-picker-react';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'react-moment';
import getChat from '../api.js/getChat';
import { openChatBoxReducer } from '../redux/getChatSlice'

function ChatBox() {
    const [show, setShow] = useState(false);
    const [text, setText] = useState('');
    const [chatList, setChatList] = useState([]);
    const [friendDetails, setFriendDetails] = useState({});
    const chatinput = useRef();
    const dispatch = useDispatch()
    const user = useSelector((state) => state.userReducer.user)
    const friendId = useSelector((state) => state.getChat.friendId)
    const socket = useSelector(state => state.socket.socket)
    useEffect(() => {
        getChat(friendId).then(data => {
            socket.emit('join_room', { roomId: data._id })
            setChatList(data.messages)
            data.users?.filter((curr) => {
                curr.roomId = data._id
                console.log(curr, 'currrrrrrrrrrrrrrrr')
                curr._id !== user.userId && setFriendDetails(curr)
                return null
            })
        })

    }, [friendId])

    const imojiClicked = ({ emoji }) => {
        let ref = chatinput.current;
        let start = text.substring(0, ref.selectionStart)
        let end = text.substring(ref.selectionEnd)
        setText(start + emoji + end)
        setShow(false)
    }

    const sendChat = () => {
        let chat = {
            roomId: friendDetails.roomId,
            text: text,
            time: new Date(),
            author: user.userId
        }
        socket.emit('client-to-server', chat)
        setChatList([chat, ...chatList])
        setText('')
    }
    useEffect(() => {
        socket.on('server-to-client', (data) => {
            setChatList((chatList) => [data, ...chatList])
        })
        return () => socket.off('server-to-client')
    }, [socket])

    return (
        <>
            <div className='w-full md:h-[85vh] h-[80vh] bg-white opacity-80 rounded-tr-2xl rounded-br-2xl flex flex-col'>
                {friendDetails?._id ? <><div className='w-full h-[80px] flex shadow-2xl'>
                    <div className='flex flex-col justify-center ' onClick={() => dispatch(openChatBoxReducer(false))}><ArrowBackIcon /></div>
                    <div className='md:ml-5 ml-2 my-auto'>
                        <img className=' max-h-[75px] rounded-full' src={friendDetails.picture} alt='profile' />
                    </div>
                    <div className='w-full mx-4 flex flex-col'>
                        <span className='text-2xl mt-4'>{friendDetails.first_name}</span>
                        <span className='text-lg'>{friendDetails?.isOnline ? 'Online'
                            : <span className='text-sm'>
                                Active <Moment className=' mx-2 w-[80px]' element="span" fromNow ago>{friendDetails?.lastActive}</Moment>ago
                            </span>}
                        </span>

                    </div>


                </div>
                    {show && <div className='fixed z-50 xl:-translate-x-[120%]'>
                        <img className='w-full h-full absolute' src='https://image.freepik.com/free-vector/geometric-pattern-seamless-graphic-pattern-80s-90s-trendy-styles-black-background-black-white-pattern-with-different-shapes-objects-wrapping-paper-background_136321-1180.jpg' alt='bg' />

                        <EmojiPicker onEmojiClick={imojiClicked} />
                    </div>}
                    <div className='w-full flex-grow shadow-inner bg-white flex flex-col-reverse overflow-y-auto scrollbar-hide'>
                        {chatList?.map((curr) => <div className={`p-3 flex ${user.userId === curr.author ? 'justify-end' : 'justify-start'}`}>
                            <div className={` w-min min-w-[200px] min-h-[50px] flex flex-col bg-gray-200 rounded-b-xl  ${user.userId === curr.author ? 'rounded-tl-xl' : 'rounded-tr-xl'}`}>
                                <span className='text-xl'>{curr.text}</span>
                                <span className='h-2 text-right text-sm mb-2 mr-2'><Moment date={curr.time} format="hh:mm a" trim /></span>
                            </div>
                        </div>)}
                    </div>
                    <div className='w-full h-[60px] flex align-middle'>
                        <span className='flex align-middle p-2 hover:scale-75' onClick={() => setShow(true)}>
                            <AddReactionIcon sx={{ marginY: 'auto', color: 'blue' }} />
                        </span>
                        <input className='w-full ml-10  focus-visible:outline-none'
                            placeholder='Message...' value={text}
                            ref={chatinput} onChange={(e) => setText(e.target.value)}
                            onKeyPress={(event) => {
                                event.key === "Enter" && sendChat();
                            }} />
                        <span className='flex align-middle' onClick={sendChat}><SendOutlinedIcon sx={{ marginY: 'auto' }} /></span>

                    </div></>:<div className='mx-auto my-auto'>Please choose someone to chat</div>}

            </div>
        </>
    )
}

export default ChatBox