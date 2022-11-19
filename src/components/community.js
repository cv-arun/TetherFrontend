import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import getPeople from '../api.js/getPeople';
import requestFollow from '../api.js/requestFollow';
import getFollow from '../api.js/getFollow';
import requestUnFollow from '../api.js/requestUnFollow';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import removeFollow from '../api.js/removeFollower';




function Community() {
    const [tabs, setTabs] = useState(3);
    const [people, setPeople] = useState([])
    const [followers, setfollowers] = useState([])
    const [following, setfollowing] = useState([])

    useEffect(() => {
        tabs === 3 && getPeople().then(data => {
            console.log(data, "pople you may know")
            setPeople(data)
        }).catch(err => { console.log(err, 'errrrrrrr') });

        tabs !== 3 && getFollow().then(data => {
            console.log(data, 'data')
            setfollowers(data.followers)
            setfollowing(data.following)
        });

    }, [tabs])
    const handleClick = (e) => {

        e.target.id !== '' && e.target.innerText === 'FOLLOWING' ?
            requestUnFollow(e.target.id).then(data => {
                e.target.style.opacity = '100%'
                e.target.innerText = 'FOLLOW';
            }) : requestFollow(e.target.id).then(data => {
                e.target.style.opacity = '70%'
                e.target.innerText = 'FOLLOWING'
            })


    }
    const handleClick2 = (e) => {

        console.log(e.target)
        e.target.id !== '' && e.target.innerText === 'FOLLOWING' ?
            requestUnFollow(e.target.id).then(data => {
                e.target.style.opacity = '80%'
                e.target.innerText = 'FOLLOW';
            }) : requestFollow(e.target.id).then(data => {
                e.target.style.opacity = '100%'
                e.target.innerText = 'FOLLOWING'
            })

    }

    const confirm = (friendId) => {
        confirmAlert({
            title: 'Confirm to Remove',
            message: 'Are you sure, You want remove this user from your following',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => removeFollow(friendId).then(data=>setTabs(3)).catch(err=>console.log(err))
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    };
   
    return (
        <>
            <div className="flex flex-col justify-center mx-auto md:max-w-[690px] w-full  rounded-lg gap-2 ">
                <div className='flex h-16 bg-white'>
                    <button onClick={() => setTabs(1)} className='w-1/3 text-center md:text-2xl  text-sm py-4 focus:border-2 focus:border-b-blue-500'>
                        Followers
                    </button>
                    <button onClick={() => setTabs(2)} className='w-1/3 text-center md:text-2xl  text-sm py-4 focus:border-2 focus:border-b-blue-500'>
                        Following
                    </button>
                    <button onClick={() => setTabs(3)} className='w-1/3 text-center md:text-xl text-xs py-4 focus:border-2 focus:border-b-blue-500'>
                        People you may know
                    </button>
                </div>
                <hr />
                {tabs === 1 && <div className='flex flex-wrap gap-2 '>
                    {followers?.map((curr, index) => {
                        return <div key={index} className='bg-white shadow-lg w-[150px] md:w-[180px] mx-auto flex flex-col gap-3 h-fit p-2 rounded-xl'>
                            <img src={curr.picture} alt='profile' className='rounded-xl' />
                            <p className='px-1'>{curr.first_name}</p>
                            <div className='px-1'><Button className='w-full' variant="contained"
                                onClick={()=>confirm(curr._id)}>Remove</Button></div>
                        </div>
                    })}

                    {followers?.length === 0 && <p className='mx-auto mt-[30vh]'>you dont have any followers</p>}


                </div>}
                {tabs === 2 && <div className='flex flex-wrap gap-2 ' onClick={handleClick2}>
                    {following?.map((curr, index) => {
                        return <div key={index} className='bg-white shadow-lg w-[150px] md:w-[180px] mx-auto flex flex-col gap-3 h-fit p-2 rounded-xl'>
                            <img src={curr.picture} alt='profile' className='rounded-xl shadow-inner' />
                            <p className='px-1'>{`${curr.first_name} ${curr.last_name}`}</p>
                            <div className='px-1'><Button id={`${curr._id}`} className='w-full' variant="contained">Following</Button></div>
                        </div>
                    })}
                    {following?.length === 0 && <Button onClick={() => setTabs(3)} sx={{ marginX: 'auto', marginTop: '30vh' }} >Find people you may know</Button>}
                </div>}
                {tabs === 3 && <div className='flex flex-wrap gap-4' onClick={handleClick}>
                    {people?.map((curr, index) => {
                        return <div key={index} className='bg-white shadow-lg w-[150px] md:w-[180px]  mx-auto flex flex-col gap-2 h-fit p-2 rounded-xl'>
                            <img src={curr.picture} alt='profile' className='rounded-xl shadow-inner' />
                            <p className='px-1'>{curr.first_name + ' ' + curr.last_name}</p>
                            <div className='px-1'><Button id={`${curr._id}`} className='w-full' variant="contained">Follow</Button></div>
                        </div>
                    })}
                </div>}

            </div>
            <div className='w-full h-28'></div>
        </>
    )
}

export default Community