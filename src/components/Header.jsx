import React, { useContext, useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import { Avatar, Box, Toolbar, Typography } from '@mui/material';
import styled from '@emotion/styled';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import { DataContext } from '../App';
import ProfileFrom from './ProfileFrom';
import { Link } from 'react-router-dom';

const StyledAppBar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
    margin: 5
})

const Search = styled("div")(({ theme }) => ({
    backgroundColor: 'white',
    color: 'black'
}));

const AvatarSyle = { bgcolor: 'white', color: '#E14949' }

const Icons = styled(Box)(({ theme }) => ({
    // backgroundColor: 'white',
    color: 'black',
    // borderRadius: '50%'
}));

const LinkStyle = {
    color: 'white', textDecoration: 'none', fontSize: '18px', fontWeight: 700
}

function Header() {
    const [registerOpen, setRegisterOpen] = useState(false);
    const { localData, profileData } = useContext(DataContext)

    // useEffect(() => { console.log(localData, profileData) }, [localData, profileData])

    return (
        <AppBar position="static" sx={{ backgroundColor: '#E14949' }}>
            <StyledAppBar>
                <Typography variant="h4" sx={{ display: { xs: "none", sm: "block" } }}>
                    Wish Remainder
                </Typography>
                <AccessAlarmsIcon sx={{ display: { xs: "block", sm: "none" } }} />
                {/* <Search>Search</Search> */}
                <Icons>
                    {
                        profileData?.profile?.fullName ?
                            <Avatar sx={AvatarSyle}>{profileData.profile.fullName[0]}</Avatar>
                            :
                            <Link to="/profile" style={LinkStyle}>Register</Link>
                    }
                </Icons>
            </StyledAppBar>
        </AppBar>
    )
}

export default Header