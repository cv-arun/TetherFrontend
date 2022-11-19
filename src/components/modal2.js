import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import { openReducer } from '../redux/modal2';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    shadow: ''
};


export default function Modal2() {
    const obj = useSelector(state => state.openModal2.openModal);
    const open = obj.open
    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch(openReducer(false))

    };
    return (
        <div>
            <Button ></Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <div className=' bg-white'>
                        <span className='w-full flex flex-row-reverse '><CloseIcon onClick={handleClose} /></span>
                        {obj && obj.component}
                    </div>


                </Box>
            </Modal>
        </div>
    );
}

