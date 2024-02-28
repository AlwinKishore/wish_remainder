import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useState } from 'react'

function DeleteDialog({ open, handleClose, handleDelete }) {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
                Are you sure you want to delete this item?
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleDelete} sx={{ color: '#E14949' }}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteDialog