import styled from '@emotion/styled';
import { Box, Paper, Stack, Typography } from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
import UpcomingItem from './UpcomingItem';
import { DataContext } from '../App';

const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'left',
    padding: 7,
}));

function RigthBar() {
    const [data, setData] = useState([])
    const { localData, localDispatch } = useContext(DataContext)
    const [recent, setRecent] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [today, setToday] = useState([])

    const currentDate = new Date();
    const recentThreshold = new Date(currentDate);
    recentThreshold.setDate(currentDate.getDate() - 10);
    const upcomingThreshold = new Date(currentDate);
    upcomingThreshold.setDate(currentDate.getDate() + 15);

    useEffect(() => {
        setData(localData.items)
    }, [localData.items])

    useEffect(() => {
        const todayBirthdays = data.filter(item => {
            const birthdayDate = new Date(`${item.month} ${item.day}, ${currentDate.getFullYear()}`);
            const isSame = birthdayDate.getDate() === currentDate.getDate() &&
                birthdayDate.getMonth() === currentDate.getMonth()
            return isSame;
        })
        const recentBirthdays = data.filter(item => {
            const birthdayDate = new Date(`${item.month} ${item.day}, ${currentDate.getFullYear()}`);
            return birthdayDate > recentThreshold && birthdayDate < currentDate;
        });

        const upcomingBirthdays = data.filter(item => {
            const birthdayDate = new Date(`${item.month} ${item.day}, ${currentDate.getFullYear()}`);
            return birthdayDate > currentDate && birthdayDate <= upcomingThreshold;
        });
        setRecent(recentBirthdays)
        setUpcoming(upcomingBirthdays)
        setToday(todayBirthdays);
    }, [data])

    return (
        <Box flex={2} p={2}>
            <Stack spacing={2}>
                <Item>
                    <Typography variant='h6'>
                        Today's BirthDays
                    </Typography>
                    {
                        today &&
                        today.map((i, index) => (
                            <UpcomingItem item={i} key={index} />
                        ))
                    }
                </Item>
                <Item>
                    <Typography variant='h6'>
                        Upcoming BirthDays
                    </Typography>
                    {
                        upcoming &&
                        upcoming.map((i, index) => (
                            <UpcomingItem item={i} key={index} />
                        ))
                    }
                </Item>
                <Item>
                    <Typography variant='h6'>
                        Recent BirthDays
                    </Typography>
                    {
                        recent &&
                        recent.map((i, index) => (
                            <UpcomingItem item={i} key={index} />
                        ))
                    }
                </Item>
            </Stack>
        </Box>
    )
}

export default RigthBar