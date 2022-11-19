import React from 'react';
import Sidebar from '../layout/sidebar';
import Community from '../components/community';

function myCommunity() {
  return (
    <>
   <Sidebar component={<Community/>} />
    </>
  )
}

export default myCommunity