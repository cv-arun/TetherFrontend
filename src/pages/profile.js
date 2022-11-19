import React from 'react';
import Sidebar from '../layout/sidebar';
import Profile from '../components/profile';

function profile() {
  return (
    <Sidebar component={<Profile/>}/>
  )
}

export default profile