import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function StoriesThumbnails() {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='shadow bg-white rounded-lg'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Stories" {...a11yProps(0)} />
          <Tab label="Reels" {...a11yProps(1)} />


        </Tabs>
      </Box>
      <TabPanel value={value} index={0} >
        <div className='flex flex-row  py-1 border-black-500 md:min-w-[650px] md:max-w-[650px] max-w-[265px] overflow-x-auto scrollbar-hide ' >
          <div className='bg-gray-100 min-w-[150px] h-48 mx-1 rounded outline outline-offset-2 outline-1 outline-blue-500'>
            <img className='max-h-full' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSCE79BJZPDkIwUqnSkBqPyEe5wnz30vw_5Q&usqp=CAU' alt='reels'/>
          </div>
          <div className='bg-gray-100 min-w-[150px] h-48 mx-1 rounded outline outline-offset-2 outline-1 outline-blue-500'>
            <img className='max-h-full' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSCE79BJZPDkIwUqnSkBqPyEe5wnz30vw_5Q&usqp=CAU' alt='reels'/>
          </div>
          <div className='bg-gray-100 min-w-[150px] h-48 mx-1 rounded outline outline-offset-2 outline-1 outline-blue-500'>
            <img className='max-h-full' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSCE79BJZPDkIwUqnSkBqPyEe5wnz30vw_5Q&usqp=CAU' alt='reels'/>
          </div>
          <div className='bg-gray-100 min-w-[150px] h-48 mx-1 rounded outline outline-offset-2 outline-1 outline-blue-500'>
            <img className='max-h-full' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSCE79BJZPDkIwUqnSkBqPyEe5wnz30vw_5Q&usqp=CAU' alt='reels'/>
          </div>
          <div className='bg-gray-100 min-w-[150px] h-48 mx-1 rounded outline outline-offset-2 outline-1 outline-blue-500'>
            <img className='max-h-full' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSCE79BJZPDkIwUqnSkBqPyEe5wnz30vw_5Q&usqp=CAU' alt='reels'/>
          </div>
          <div className='bg-gray-100 min-w-[150px] h-48 mx-1 rounded outline outline-offset-2 outline-1 outline-blue-500'>
            <img className='max-h-full' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSCE79BJZPDkIwUqnSkBqPyEe5wnz30vw_5Q&usqp=CAU' alt='reels'/>
          </div>
          <div className='bg-gray-100 min-w-[150px] h-48 mx-1 rounded outline outline-offset-2 outline-1 outline-blue-500'>
            <img className='max-h-full' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSCE79BJZPDkIwUqnSkBqPyEe5wnz30vw_5Q&usqp=CAU' alt='reels'/>
          </div>
          <div className='bg-gray-100 min-w-[150px] h-48 mx-1 rounded outline outline-offset-2 outline-1 outline-blue-500'>
            <img className='max-h-full' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSCE79BJZPDkIwUqnSkBqPyEe5wnz30vw_5Q&usqp=CAU' alt='reels'/>
          </div>
          <div className='bg-gray-100 min-w-[150px] h-48 mx-1 rounded outline outline-offset-2 outline-1 outline-blue-500'>
            <img className='max-h-full' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSCE79BJZPDkIwUqnSkBqPyEe5wnz30vw_5Q&usqp=CAU' alt='reels'/>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className='flex  py-1 border-black-500 md:min-w-[650px] md:max-w-[650px] max-w-[265px] overflow-x-auto scrollbar-hide'    >
          <div  className='bg-gray-100 min-w-[150px] h-48 mx-1 rounded outline outline-offset-2 outline-1 outline-blue-500 '>
            reels
          </div>
          <div  className='bg-gray-100 min-w-[150px] h-48 mx-1 rounded outline outline-offset-2 outline-1 outline-blue-500 '>
            reels
          </div>
          <div  className='bg-gray-100 min-w-[150px] h-48 mx-1 rounded outline outline-offset-2 outline-1 outline-blue-500 '>
            reels
          </div>
        </div>
      </TabPanel>

    </div>
  );
}
