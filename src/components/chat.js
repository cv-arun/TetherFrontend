import React from 'react';
import ChatList from './chatlist';
import ChatBox from './chatBox';
import { useMediaQuery } from 'react-responsive';
import {useSelector} from 'react-redux'
function Chat() {
    
    const showChat=useSelector(state=>state.getChat.openChatBox)
    const isMobile = useMediaQuery({ maxWidth: 450 })
    return (
        <>
            {isMobile ?
                <div className='grid grid-cols-12'>
                    {showChat ?
                        <span className='col-span-12'><ChatBox /></span>
                        : <span className='col-span-12' ><ChatList /></span>}

                </div>
                : <div className='grid grid-cols-12'>
                    <span className='col-span-4'><ChatList /></span>
                    <span className='col-span-8 px-3 '><ChatBox /></span>
                </div>}
        </>
    )
}

export default Chat