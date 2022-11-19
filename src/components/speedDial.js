import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import Settings from '@mui/icons-material/Settings';

const actions = [
    { icon:<span className='w-full hlo' id='sp1'> <FileCopyIcon id='hello' /></span>, name: 'Copy', },
    { icon: <SaveIcon id='hello1' />, name: 'Save', },
    { icon: <PrintIcon id='hello2' />, name: 'Print', },
    { icon: <ShareIcon id='hello3' />, name: 'Share' },
];

export default function OpenSpeedDial() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
            <SpeedDial
                ariaLabel="SpeedDial controlled open example"
                sx={{ position: 'absolute', bottom: 16, left: 16 }}
                icon={<Settings />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                direction={'down'}
            >

                {actions.map((action, i) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={handleClose}
                            
                        />
                ))}
            </SpeedDial>
        </Box>
    );
}
