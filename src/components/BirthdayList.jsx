import React, { useEffect, useState } from 'react'
import BirthdayItem from './BirthdayItem'
import DeleteDialog from './DeleteDialog'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List } from '@mui/material'

function BirthdayList({ item, handleItemDelete }) {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false);
    const [deleteItem, setDeleteItem] = useState('')

    const handleClickOpen = (item) => {
        setDeleteItem(item);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = (e) => {
        setOpen(false);
        handleItemDelete(deleteItem);
    };

    useEffect(() => {
        setData([item])
    }, [])

    return (
        <React.Fragment>
            <List sx={{ width: '100%', bgcolor: 'background.paper', display: 'flex', flexDirection: 'column', flex: 1 }}>
                {
                    data &&
                    data.map((item, index) => (
                        <BirthdayItem item={item} key={index} handleClickOpen={handleClickOpen} />
                    ))
                }
            </List>
            <DeleteDialog open={open} handleClose={handleClose} handleDelete={handleDelete} />
            {/* <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this item?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog> */}
        </React.Fragment>
    )
}

export default BirthdayList