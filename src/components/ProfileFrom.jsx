import { Box, Typography, TextField, Button } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'

// icons
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import styled from '@emotion/styled';
import { DataContext } from '../App';
import SuccessSnackBar from './SuccessSnackBar';
import FailureSnackBar from './FailureSnackBar';

const InputBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    marginBottom: 10
}))

const errorStyle = {
    color: '#E14949'
}

const profileInitial = {
    fullName: '',
    day: '',
    month: '',
    year: '',
    phoneNumber: ''
}

function ProfileFrom({ inputData, handleToggle }) {
    const [data, setData] = useState([])
    const [dayList, setDayList] = useState([])
    const [monthList, setMonthList] = useState([])
    const [yearList, setYearList] = useState([])
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')
    const [successOpen, setSuccessOpen] = useState(false);
    const [failureOpen, setFailureOpen] = useState(false);
    const { profileDispatch } = useContext(DataContext)

    useEffect(() => {
        inputData ? setData(inputData) : setData(profileInitial);
        setDayList(([...Array(32).keys()].map((item) => item !== 0 && item)))
        setMonthList(['', 'January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'Septmeber', 'October', 'November', 'December'])
        let years = [''].concat([...Array(2025 - 1960)].map((_, index) => 1960 + index))
        setYearList(years)
    }, [])

    const handleChange = (e, fieldName) => {
        const { value } = e.target;
        fieldName === 'phoneNumber' ? value.replace('e', '') && setData({ ...data, [fieldName]: value }) :
            fieldName === 'fullName' ? /^[a-zA-Z .]*$/.test(value) && setData({ ...data, [fieldName]: value }) : setData({ ...data, [fieldName]: value });
    };

    const handleSubmit = () => {
        // Form submit
        // console.log('form data', data);
        let { iserror, isValid, errorMsg } = validateForm()
        setErrorMsg(errorMsg)
        setIsError(iserror)
        if (isValid) {
            data.id = data.fullName.slice(0, 2) + data.day + data.month
            profileDispatch({ type: 'EDIT_PROFILE', payload: data });
            try {
                localStorage.setItem('Profile', JSON.stringify(data))
                setSuccessOpen(true)
            }
            catch (error) {
                setFailureOpen(true)
            }
        }
        isValid && handleClose()
    };

    const validateForm = () => {
        let iserror = false;
        let isValid = true;
        let errorFields = [];
        let errorMsg = '';
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (data.fullName === '') {
            iserror = true;
            isValid = false;
            errorFields.push('Name')
        }
        // if (data.phoneNumber !== '') {
        //     if (!(/^\d+$/.test(data.phoneNumber) && data.phoneNumber.length == 10)) {
        //         iserror = true;
        //         isValid = false;
        //         errorMsg += ' Invalid Phone number'
        //     }
        // }
        if (data.day === '') {
            iserror = true;
            isValid = false;
            errorFields.push('Day')
        }
        if (data.month === '') {
            iserror = true;
            isValid = false;
            errorFields.push('Month')
        }
        errorMsg = errorFields.length > 0 ? errorFields.join(', ') + errorMsg + 'cannot be empty' : errorMsg;
        return { iserror, isValid, errorMsg };
    }

    const handleClose = () => {
        setErrorMsg('')
        handleToggle()
    }

    const handleSnackBar = () => {
        setSuccessOpen(false);
        setFailureOpen(false);
    }

    return (
        <Box flex={1} gap={2}>
            <Typography variant={"h4"} sx={{}}>Profile</Typography>
            <form>
                <Box flex={1} gap={5} flexWrap={'wrap'} mt={2} mb={2} >
                    <InputBox>
                        <PersonOutlineOutlinedIcon sx={{ marginTop: 2 }} />
                        <TextField
                            id="fullName"
                            name="fullName"
                            label="Full Name"
                            variant="standard"
                            required
                            sx={{ flex: 1 }}
                            value={data.fullName}
                            onChange={(e) => handleChange(e, 'fullName')}
                        />
                    </InputBox>
                    <InputBox>
                        <LocalPhoneOutlinedIcon sx={{ marginTop: 2 }} />
                        <TextField
                            id="phoneNumber"
                            name="phoneNumber"
                            type="number"
                            label="Phone"
                            variant="standard"
                            sx={{ flex: 1 }}
                            value={data.phoneNumber}
                            onChange={(e) => handleChange(e, 'phoneNumber')}
                        />
                    </InputBox>
                    <InputBox sx={{ gap: 8 }}>
                        <CalendarMonthOutlinedIcon sx={{ marginTop: 2 }} />
                        <TextField
                            id="day"
                            select
                            label="Day"
                            SelectProps={{
                                native: true,
                            }}
                            variant="standard"
                            required
                            sx={{ flex: 1 }}
                            value={data.day}
                            onChange={(e) => handleChange(e, 'day')}
                        >
                            {dayList && dayList.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            id="month"
                            select
                            label="Month"
                            SelectProps={{
                                native: true,
                            }}
                            variant="standard"
                            required
                            sx={{ flex: 1 }}
                            value={data.month}
                            onChange={(e) => handleChange(e, 'month')}
                        >
                            {monthList && monthList.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            id="year"
                            select
                            label="Year"
                            SelectProps={{
                                native: true,
                            }}
                            variant="standard"
                            sx={{ flex: 1 }}
                            value={data.year}
                            onChange={(e) => handleChange(e, 'year')}
                        >
                            {yearList && yearList.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </TextField>
                    </InputBox>
                    <InputBox>
                        <Typography sx={errorStyle}>{isError && errorMsg}</Typography>
                    </InputBox>
                    <Button variant='contained' sx={{ backgroundColor: '#E14949' }} onClick={handleSubmit}>Save</Button>
                </Box>
            </form>
            {
                successOpen &&
                <SuccessSnackBar open={successOpen} handleSnackBar={handleSnackBar} />
            }
            {
                failureOpen &&
                <FailureSnackBar open={failureOpen} handleSnackBar={handleSnackBar} />
            }
        </Box>
    )
}

export default ProfileFrom