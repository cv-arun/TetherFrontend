import React from 'react';
import Sidebar from '../layout/sidebar';
import Settings from '../components/settings';

function SettingsPage() {
  return (
  <Sidebar component={<Settings/>}/>
  )
}

export default SettingsPage