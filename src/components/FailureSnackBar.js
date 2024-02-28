import { Alert, Snackbar } from '@mui/material'
import React from 'react'

function FailureSnackBar({ open }) {
    return (
        <Snackbar open={open} autoHideDuration={6000}>
            <Alert
                severity="Error"
                variant="filled"
                sx={{ width: '100%' }}
            >
                Submission Failed!
            </Alert>
        </Snackbar>
    )
}

export default FailureSnackBar