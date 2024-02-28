import React, { useState } from 'react';
import { Avatar, Typography, Grid, Paper, Button } from '@mui/material';
import styled from '@emotion/styled';

const useStyles = styled((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(5),
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'flex-start',
    },
    avatar: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        margin: '0 auto',
    },
}));

function ViewProfile({ data }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3} mt={2}>
                {
                    data?.fullName &&
                    <Grid item xs={12}>
                        <Paper className={classes.paper} style={{ padding: '15px' }}>
                            <Avatar alt="Profile Picture" src="" className={classes.avatar} >{data.fullName[0]}</Avatar>
                            <Typography variant="h4">{data.fullName}</Typography>
                            <Typography variant="subtitle1">Date of Birth: {data.day + '/' + data.month + '/' + data.year}</Typography>
                            <Typography variant="subtitle1">Phone Number: {data.phoneNumber}</Typography>
                        </Paper>
                    </Grid>
                }
            </Grid>
        </div>
    )
}

export default ViewProfile