import React from 'react';
import Sidebar from '../layout/sidebar';
import Notification from '../components/notification';

function notification() {
  return (
    <Sidebar component={<Notification/>}/>
  )
}

export default notification