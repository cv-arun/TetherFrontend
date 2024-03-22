import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';
import { getFrirndDetails, getFrirndPostDetails } from '../api.js/getFriendDetails';
import Post from './post';


function FriendProfile() {
    const mobile = useMediaQuery({ maxWidth: 450 })
    const [userData, setUserData] = useState({})
    const [post, setPost] = useState([])
    const { id } = useParams()
    useEffect(() => {
        id && getFrirndDetails(id).then(data => {
            console.log(data, "postfsfsdfdfds")
            setUserData(data)
        })
        id && getFrirndPostDetails(id).then(data => {
            
            setPost(data)
        })
    }, [id])
    return (
        <>
            <div className='border-x-2 bg-white  max-w-[690px] h-[100%] mx-auto shadow-md flex flex-col rounded-md p-3'>
                <div>
                    <div className='flex mt-5'>
                        <div className='w-1/4 '>
                            <img className='rounded-full md:h-36 md:w-36 h-20 w-20 ml-2' src={userData?.picture} alt='profle pic' />
                        </div>
                        <div className='w-3/4 pl-5'>
                            <div className='flex '>
                                <h1 className='text-[28px] place-self-center'>{userData?.name} </h1>

                            </div>
                            <div>
                                <button
                                    className='m-2 ml-0 p-1 bg-slate-100 rounded-md'>{userData?.following} Following</button>
                                <button
                                    className='m-2 p-1 bg-slate-100 rounded-md'>{userData?.followers} Followers</button>

                            </div>
                            {!mobile && <div >
                                {userData?.bio}
                            </div>}
                        </div>
                    </div>
                    {mobile && <div className='m-3'>
                        {userData?.bio}
                    </div>}
                </div>



            </div>
            <div className='border-x-2  max-w-[690px]  mx-auto shadow-md flex flex-col rounded-md'>
                {post?.map((post) => <Post key={post._id} curr={post} />)}
            </div>
        </>
    )
}

export default FriendProfile