import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import ModalClose from '@mui/joy/ModalClose';
import { useNavigate } from 'react-router-dom'
import { auth } from "./Firebase";
import './homestyle.css';
import './modalStyle.css';


// import Button from '@mui/material/Button';
import Button from 'react-bootstrap/Button';
import Typography from '@mui/material/Typography';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faSubtract } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { UserDataContext, UserContext, AppDataContext, UpdateUserDataContext } from './ContextStuff';
import { useContext } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: "#3d4450",
//   border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function PhoneAppModal(props) {
  const screenWidth = window.innerWidth;
  const isMobile = screenWidth < 768;

  const [messageShown, setMessageShown] = useState(false);
  const [isModal, setIsModal] = useState(isMobile && !messageShown);
  const handleClose = () => {setIsModal(false); setMessageShown(true);}

  

  return (
    <div className='d-inline-block'>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isModal}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
            backdrop: {
                timeout: 500,
            },
            }}
        >
            <Fade in={isModal}>
            <Box sx={style} className='col-lg-6 col-12 modal-box'>
                <ModalClose onClick={handleClose}/>
                <div className='d-flex justify-content-center flex-column'>
                    <h1 style={{color: '#ff8210'}}>Were Mobile!</h1>
                    <div>
                        The app is better {String.fromCodePoint('0x1F609')} Try it out!
                    </div>
                    <div className='my-2'>
                        <img src='/googlePlay.png' className='store-icon' alt='google playstore'
                            onClick={()=>{window.location.href = 'https://play.google.com/store/apps/details?id=com.cherryhana.animeway'; }}
                            />
                    </div>
                    <div className='my-2'>
                        <img src='/Download_on_the_App_Store_Badge.png' className='store-icon' alt='Apple App Store'
                            onClick={()=>{window.location.href = 'https://apps.apple.com/us/app/animeway-anime-guide/id6470202806'; }}
                            />
                    </div>
                    <div className='my-4'>
                        <button className='btn btn-info my-1' onClick={handleClose}>Continue to AnimeWay</button>
                    </div>
                </div>
            </Box>
            </Fade>
        </Modal>
    </div>
  );
}