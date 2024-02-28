import { Box, Button, Fab, Modal, SnackbarContent, TextField, Tooltip, Typography } from '@mui/material'
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
import SuccessSnackBar from './SuccessSnackBar'
import FailureSnackBar from './FailureSnackBar'
import { DataContext } from '../App';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    maxWidth: 500,
    maxheigh: '90%',
    bgcolor: 'background.paper',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
};

const errorStyle = {
    color: '#E14949'
}

const InputBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    marginBottom: 10
}))

const ModalTitle = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between'
}))

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const initialForm = {
    id: '',
    fullName: '',
    phoneNumber: '',
    email: '',
    day: '',
    month: '',
    year: '',
    relationship: 'Friend',
    note: '',
    imageName: '',
    imageUrl: '',
    imageData: ''
}

function FormModal({ isOpen, handleClose, purpose, data, id }) {
    const [open, setOpen] = useState(false)
    const [dayList, setDayList] = useState([])
    const [monthList, setMonthList] = useState([])
    const [yearList, setYearList] = useState([])
    const [relationshipList, setRelationshipList] = useState([])
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')
    const [formData, setFormData] = useState({});
    const [BirthDayData, setBirthDayData] = useState([])
    const [successOpen, setSuccessOpen] = useState(false);
    const [failureOpen, setFailureOpen] = useState(false);
    const { localData, localDispatch } = useContext(DataContext)

    useEffect(() => {
        isOpen && setOpen(true)
        setDayList(([...Array(32).keys()].map((item) => item !== 0 && item)))
        setMonthList(['', 'January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'Septmeber', 'October', 'November', 'December'])
        let years = [''].concat([...Array(2025 - 1960)].map((_, index) => 1960 + index))
        setYearList(years)
        setRelationshipList(['Friend', 'Best Friend', 'Family', 'Family Friend', 'Colleague', 'Others'])
        setErrorMsg('')
        purpose == 'Add' && setFormData(initialForm);
        purpose == 'Edit' && setFormData(data);
        localStorage.getItem('BirthDayData') && setBirthDayData(JSON.parse(localStorage.getItem('BirthDayData')))

        return () => {
            setDayList([]);
            setMonthList([]);
            setYearList([])
            setRelationshipList([])
            // setFormData(initialForm)
        }
    }, [])

    useEffect(() => {
        isOpen && setOpen(true)
    }, [isOpen])

    // useEffect(() => {
    //     console.log(successOpen, failureOpen)
    // }, [successOpen, failureOpen])

    const handleModalClose = () => {
        setOpen(false)
        setFormData(initialForm)
        setErrorMsg('')
        handleClose()
    }

    const handleChange = (e, fieldName) => {
        const { value } = e.target;
        fieldName === 'phoneNumber' ? value.replace('e', '') && setFormData({ ...formData, [fieldName]: value }) :
            fieldName === 'fullName' ? /^[a-zA-Z .]*$/.test(value) && setFormData({ ...formData, [fieldName]: value }) : setFormData({ ...formData, [fieldName]: value });
    };

    const UpdateNewData = () => {
        const index = BirthDayData.findIndex(obj => obj.id === id);
        if (index !== -1) {
            BirthDayData[index] = formData
            return;
        }
    }

    const handleSubmit = () => {
        // Form submit
        let { iserror, isValid, errorMsg } = validateForm()
        setErrorMsg(errorMsg)
        setIsError(iserror)
        if (isValid) {
            formData.id = formData.fullName.slice(0, 2) + formData.day + formData.month
            purpose === 'Add' ?
                BirthDayData.push(formData)
                :
                UpdateNewData()
                ;
            purpose === 'Add' &&
                localDispatch({ type: 'ADD_ITEM', payload: formData });
            purpose === 'Edit' &&
                localDispatch({ type: 'EDIT_ITEM', payload: { id: id, updatedItem: formData } });
            try {
                localStorage.setItem('BirthDayData', JSON.stringify(BirthDayData))
                // console.log('saved');
                setSuccessOpen(true)
            }
            catch (error) {
                setFailureOpen(true)
            }
            handleModalClose();
        }
    };

    const validateForm = () => {
        let iserror = false;
        let isValid = true;
        let errorFields = [];
        let errorMsg = '';
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (formData.fullName === '') {
            iserror = true;
            isValid = false;
            errorFields.push('Name')
        }
        if (formData.phoneNumber !== '') {
            if (/^\d+$/.test(formData.phoneNumber) && formData.phoneNumber.length == 10) {
                // formData.phoneNumber = parseInt(formData.phoneNumber, 10)
            }
            else {
                iserror = true;
                isValid = false;
                errorMsg += ' Invalid Phone number'
            }
        }
        // if (formData.email === '') {
        //     iserror = true;
        //     isValid = false;
        //     errorFields.push('Email')
        // } else {
        //     console.log('amdfnsakjf')
        //     if (!(formData.email.match(validRegex))) {
        //         iserror = true;
        //         isValid = false;
        //         errorMsg += ' Invalid Email id'
        //     }
        // }
        if (formData.day === '') {
            iserror = true;
            isValid = false;
            errorFields.push('Day')
        }
        if (formData.month === '') {
            iserror = true;
            isValid = false;
            errorFields.push('Month')
        }
        if (formData.relationship === '') {
            iserror = true;
            isValid = false;
            errorFields.push('Relationship')
        }
        errorMsg = errorFields > 0 ? errorFields.join(', ') + 'cannot be empty.' : errorMsg;
        return { iserror, isValid, errorMsg };
    }

    const handleSnackBar = () => {
        setSuccessOpen(false);
        setFailureOpen(false);
    }

    // const handleImageChange = (e, fieldName) => {
    //     const file = e.target.files[0];
    //     console.log(file, fieldName);
    //     setFormData({ ...formData, [fieldName]: file.name })
    // };

    return (
        <>
            <Modal
                open={open}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ModalTitle>
                        <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ textAlign: 'center' }}>
                            {purpose} Form
                        </Typography>
                        <CloseOutlinedIcon sx={{ alignItems: 'center' }} onClick={() => handleModalClose()} />
                    </ModalTitle>
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
                                    value={formData.fullName}
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
                                    value={formData.phoneNumber}
                                    onChange={(e) => handleChange(e, 'phoneNumber')}
                                />
                            </InputBox>
                            <InputBox>
                                <EmailOutlinedIcon sx={{ marginTop: 2 }} />
                                <TextField
                                    id="email"
                                    name="email"
                                    label="Email"
                                    variant="standard"
                                    sx={{ flex: 1 }}
                                    value={formData.email}
                                    onChange={(e) => handleChange(e, 'email')}
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
                                    // helperText="Please select day"
                                    variant="standard"
                                    required
                                    sx={{ flex: 1 }}
                                    value={formData.day}
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
                                    // helperText="Please select day"
                                    variant="standard"
                                    required
                                    sx={{ flex: 1 }}
                                    value={formData.month}
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
                                    // helperText="Please select day"
                                    variant="standard"
                                    sx={{ flex: 1 }}
                                    value={formData.year}
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
                                <GroupOutlinedIcon sx={{ marginTop: 2 }} />
                                <TextField
                                    id="relationship"
                                    select
                                    label="Relationship"
                                    SelectProps={{
                                        native: true,
                                    }}
                                    // helperText="Please select day"
                                    variant="standard"
                                    required
                                    sx={{ flex: 1 }}
                                    value={formData.relationship}
                                    onChange={(e) => handleChange(e, 'relationship')}
                                >
                                    {relationshipList && relationshipList.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </TextField>
                            </InputBox>
                            <InputBox>
                                <EditOutlinedIcon />
                                <TextField
                                    id="note"
                                    label="Note"
                                    multiline
                                    rows={4}
                                    variant="standard"
                                    sx={{ flex: 1 }}
                                    value={formData.note}
                                    onChange={(e) => handleChange(e, 'note')}
                                />
                            </InputBox>
                            {/* <InputBox>
                                <ImageOutlinedIcon />
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                    sx={{
                                        backgroundColor: '#E14949'
                                    }}
                                    onChange={(e) => handleImageChange(e, 'imageName')}
                                >
                                    Upload file
                                    <VisuallyHiddenInput type="file" />
                                </Button>
                                <Typography variant='h6'>{formData.imageName}</Typography>
                            </InputBox> */}
                            <InputBox>
                                <Typography sx={errorStyle}>{isError && errorMsg}</Typography>
                            </InputBox>
                        </Box>
                    </form>
                    <Button variant='contained' sx={{ backgroundColor: '#E14949' }} onClick={handleSubmit}>Save</Button>
                </Box>
            </Modal>
            {
                successOpen &&
                <SuccessSnackBar open={successOpen} handleSnackBar={handleSnackBar} />
            }
            {
                failureOpen &&
                <FailureSnackBar open={failureOpen} handleSnackBar={handleSnackBar} />
            }
        </>
    )
}

export default FormModal