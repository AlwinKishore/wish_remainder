import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupsIcon from '@mui/icons-material/Groups';
import React from 'react'

function SideBar() {
    return (
        <Box flex={1} p={2}>
            <nav>
                <List>
                    {/* <ListItem disablePadding>
                        <ListItemButton component="a" href="#home">
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" sx={{ marginBottom: '0' }} />
                        </ListItemButton>
                    </ListItem> */}
                    {/* <Divider /> */}
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="/">
                            <ListItemIcon>
                                <GroupsIcon />
                            </ListItemIcon>
                            <ListItemText primary="List-wise" sx={{ marginBottom: '0' }} />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="/month">
                            <ListItemIcon>
                                <CalendarMonthIcon />
                            </ListItemIcon>
                            <ListItemText primary="Month-wise" sx={{ marginBottom: '0' }} />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="profile">
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary="Profile" sx={{ marginBottom: '0' }} />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    {/* <ListItem disablePadding>
                        <ListItemButton component="a" href="settings">
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Settings" sx={{ marginBottom: '0' }} />
                        </ListItemButton>
                    </ListItem>
                    <Divider /> */}
                </List>
            </nav>
        </Box>
    )
}

export default SideBar