import styled from '@emotion/styled'
import { Avatar, Box, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react'
import FormModal from './FormModal';
import ViewModal from './ViewModal';

const CustomListItem = styled(ListItem)({
    display: 'flex',
    alignItems: 'center',
    boxShadow: '5px 5px 10px lightgray',
    padding: 5,
    margin: 5,
    flexGrow: 1,
    // flexShrink: 1,
})

const ActionIcons = styled(Box)({
    display: 'flex',
    padding: 2,
    marginRight: 5,
    gap: 20,
})

function BirthdayItem({ item, handleClickOpen }) {
    const [editOpen, setEditOpen] = useState(false)
    const [editData, setEditData] = useState({})
    // view
    const [viewOpen, setViewOpen] = useState(false)
    const [viewData, setViewData] = useState({})

    const handleEdit = (i) => {
        setEditOpen(true)
        setEditData(i);
        // console.log(i);
    }

    const handleEditClose = () => {
        setEditOpen(false);
        setEditData({})
    }

    const handleView = (i) => {
        // console.log(i)
        setViewOpen(true)
        setViewData(i)
    }

    const handleViewClose = () => {
        setViewOpen(false)
        setViewData({})
    }

    return (
        <>
            {
                item.map((i, index) => (
                    <CustomListItem alignItems="flex-start" key={i.id}>
                        <ListItemAvatar onClick={() => handleView(i)}>
                            <Avatar alt={i.name} src="" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={i.fullName}
                            secondary={
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginRight: '20px' }}>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body1"
                                        color="text.primary"
                                    >
                                        {i.relationship}<br />
                                        {i.day + '-' + i.month + '-' + i.year}
                                    </Typography>
                                    <ActionIcons>
                                        <EditIcon onClick={() => handleEdit(i)} />
                                        <DeleteIcon onClick={() => handleClickOpen(i.id)} sx={{ pointer: 'cursor' }} />
                                    </ActionIcons>
                                </div>
                            }
                        />
                    </CustomListItem >
                ))
            }
            {
                editData.id &&
                <FormModal isOpen={editOpen} handleClose={() => handleEditClose()} purpose={'Edit'} data={editData} id={editData.id} />
            }
            {
                <ViewModal isOpen={viewOpen} data={viewData} handleClose={() => handleViewClose()} />
            }
        </>
    )
}

export default BirthdayItem