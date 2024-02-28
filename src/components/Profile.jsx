import React, { useContext, useEffect, useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography, Grid, Paper, Button } from '@mui/material';
import styled from '@emotion/styled';
import { Box } from '@mui/system';
import ViewProfile from './ViewProfile';
import { DataContext } from '../App';
import ProfileFrom from './ProfileFrom';

const useStyles = styled((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    avatar: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        margin: '0 auto',
    },
}));

const Profile = () => {
    const [isEdit, setEdit] = useState(false)
    const [btnText, setBtnText] = useState('')
    const { profileData, profileDispatch } = useContext(DataContext)

    useEffect(() => {
        console.log('From Profile ----', profileData)
        let txt = profileData.profile.length > 0 || profileData.profile.fullName ? 'Edit' : 'Create Profile';
        setBtnText(txt)
    }, [profileData])

    const handleToggle = () => {
        setEdit(prevState => !isEdit)
        setBtnText('Edit');
    }

    return (
        <Box flex={4} p={2} justifyContent={'center'} alignItems={'center'}>
            <Button variant='contained' color='primary' onClick={() => handleToggle()}>{isEdit ? 'Cancel' : btnText}</Button>
            {
                isEdit ?
                    <ProfileFrom inputData={profileData.profile} handleToggle={handleToggle} />
                    :
                    <ViewProfile data={profileData.profile} />
            }
        </Box>
    );
};

export default Profile;
