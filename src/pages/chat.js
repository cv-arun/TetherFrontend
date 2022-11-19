import React from 'react';
import Sidebar from '../layout/sidebar';
import Chats from '../components/chat';

function Chat() {
  return (
  <Sidebar component={<Chats/>} />
  )
}

export default Chat