import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import ViewModal from './ViewModal'

const CustomListItem = styled(ListItem)({
    display: 'flex',
    padding: 2,
    margin: 5,
    flexGrow: 1,
})

function UpcomingItem({ item }) {
    // view
    const [viewOpen, setViewOpen] = useState(false)
    const [viewData, setViewData] = useState({})
    const handleView = (i) => {
        setViewOpen(true)
        setViewData(i)
    }

    const handleViewClose = () => {
        setViewOpen(false)
        setViewData({})
    }
    return (
        <>
            <CustomListItem alignItems="flex-start" onClick={() => handleView(item)}>
                <ListItemAvatar>
                    <Avatar alt={item.name} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary={item.fullName}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body1"
                                color="text.primary"
                            >
                                {item.day + '-' + item.month + '-' + item.year}
                            </Typography>
                        </React.Fragment>
                    }
                />
            </CustomListItem>
            {
                <ViewModal isOpen={viewOpen} data={viewData} handleClose={() => handleViewClose()} />
            }
        </>

    )
}

export default UpcomingItem