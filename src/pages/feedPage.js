
import React, { useEffect } from 'react';
import Sidebar from '../layout/sidebar';
import Feed from '../components/feed';
import { userReducer } from '../redux/userSlice';
import { useDispatch } from 'react-redux'
function FeedPage() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(userReducer())
  },[])
  return (
    <>
      <Sidebar component={<Feed />} />
    </>
  )
}

export default FeedPage