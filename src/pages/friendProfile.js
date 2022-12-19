import React from 'react';
import Sidebar from '../layout/sidebar';
import FriendProfile from '../components/friendProfile';

function FriendProfilePage() {
  return (
    <Sidebar component={<FriendProfile/>}/>
  )
}

export default FriendProfilePage