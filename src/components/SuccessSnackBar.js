import { Alert, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'

function SuccessSnackBar({ open, handleSnackBar }) {
    const [openSnackBar, setOpenSnackBar] = useState(false)

    useEffect(() => {
        setOpenSnackBar(open)
    }, [])

    const handleClose = (event, reason) => {
        setOpenSnackBar(false);
        handleSnackBar()
    };

    return (
        <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
            >
                Submitted Successfully!
            </Alert>
        </Snackbar>
    )
}

export default SuccessSnackBar