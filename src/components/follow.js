import React, { useEffect,useState } from 'react';
import getFollow from '../api.js/getFollow';

function Follow({ Following, Followers }) {
const [follow,setFollow]=useState([])

  useEffect(() => {
    getFollow().then(data => {
      console.log(data)
      Following?setFollow(data.following):setFollow(data.followers)
    })
  }, [])



  return (
    <>  <div className='text-center font-sans text-2xl'>{Following ? 'Following' : 'Followers'}</div>
      <hr />
      <div className='flex flex-col p-1 overflow-y-auto scrollbar-hide gap-2 h-64'>
        {follow?.map((curr) => <div className='flex'>
          <div className='md:w-1/6 w-2/6 my-auto'>
            <img className=' max-h-[100%] rounded-full' src={curr.picture} alt='profile' />
          </div>
          <div className='  w-full flex flex-col mx-4'>
            <p className='w-full p-2  rounded-xl '>
              {curr.first_name}
            </p>
          </div>
        </div>
        )}



      </div>


    </>
  )
}

export default Follow