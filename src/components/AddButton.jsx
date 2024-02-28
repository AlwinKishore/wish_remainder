import { Fab, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import FormModal from './FormModal';

function AddButton() {
    const [open, setOpen] = useState(false)
    const handleClose = () => setOpen(false);
    return (
        <>
            <Tooltip title='Add' onClick={(e) => setOpen(true)}>
                <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: '20px', right: { xs: "20px", sm: 90 }, backgroundColor: '#E14949' }} >
                    <AddIcon />
                </Fab>
            </Tooltip>
            {
                open &&
                <FormModal isOpen={open} handleClose={handleClose} purpose={'Add'} />
            }
        </>
    )
}

export default AddButton