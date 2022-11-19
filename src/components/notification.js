import React, { useEffect, useState } from 'react'
import getNotification from '../api.js/getNotification';
import Moment from 'react-moment';
import { useSelector } from 'react-redux'
function Notification() {

    const [notifications, setNotifications] = useState([]);
    const socket = useSelector(state => state.socket.socket)
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        socket.on('refresh', (data) => setRefresh(!refresh))
    }, [socket])

    useEffect(() => {
        getNotification().then(data => {
            setNotifications(data?.notifications)
        })
    }, [refresh])

    return (
        <div className='border-x-2 bg-white  max-w-[690px] h-[100%] mx-auto shadow-md'>
            <div className='p-5 border-b-2'>
                <h1 className='text-3xl font-mono'> Notifications</h1>
            </div>
            <div className='max-h-[80vh] h-[70vh] overflow-y-auto scrollbar-hide flex flex-col'>

                {notifications.length !== 0 ? <>
                    {notifications?.map((curr) => <div key={curr._id} className='flex m-3 p-2 '>
                        <div className='md:w-1/6 w-2/6 my-auto'>
                            <img className=' max-h-[100%] rounded-full' src={curr.friend?.picture} alt='profile' />
                        </div>
                        <div className='  w-full flex flex-col mx-4'>
                            <p className='w-full p-2  rounded-xl flex-grow overflow-y-auto scrollbar-hide'>
                                <span>{curr.friend?.first_name}</span>
                                <span className='text-slate-600 max-h-[100px]'>{curr.text}</span>
                            </p>
                            <span className='ml-2 '>
                                <span><Moment className=' mx-2 w-[80px]' element="span" fromNow ago>{curr.time}</Moment>  ago</span>
                            </span>

                        </div>
                    </div>)}
                </> : <div className='my-auto mx-auto'>you don't have any notification...</div>
                }
            </div>

        </div>
    )
}

export default Notification