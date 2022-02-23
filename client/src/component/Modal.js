import { Backdrop, Box, Fade, Typography } from '@material-ui/core';
import React, { useState } from 'react'

function Modal() {
    const [open, setOpen] = useState(true);
    const [logged,setLogged]=useState('incorrect password')
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    const handleClose = () => setOpen(false);

  return (
    <div>
         <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
             Notification
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {logged}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default Modal