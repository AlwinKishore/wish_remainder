import { Box, Modal, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
// icons
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import styled from '@emotion/styled';
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

const InputBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    margin: '10px 0',
}))

const ModalTitle = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between'
}))

function ViewModal({ isOpen, handleClose, data }) {
    const [formData, setFormData] = useState({});
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setFormData(data)
        setOpen(isOpen)
    }, [isOpen, formData])

    useEffect(() => {
        isOpen && setOpen(true)
    }, [isOpen])

    const handleModalClose = () => {
        setOpen(false)
        setFormData({})
        handleClose();
    }

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
                        <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ textAlign: 'center' }}>
                            View
                        </Typography>
                        <CloseOutlinedIcon sx={{ alignItems: 'center' }} onClick={() => handleModalClose()} />
                    </ModalTitle>
                    <form>
                        <Box flex={1} gap={5} flexWrap={'wrap'} mt={2} >
                            <InputBox>
                                <PersonOutlineOutlinedIcon />
                                <Typography variant="h6" element="h6">{formData.fullName}</Typography>
                            </InputBox>
                            <InputBox sx={{ gap: 8 }}>
                                <CalendarMonthOutlinedIcon />
                                <Typography variant="h6" element="h4">{formData.day}</Typography>
                                <Typography variant="h6" element="h4">{formData.month}</Typography>
                                <Typography variant="h6" element="h4">{formData.year}</Typography>
                            </InputBox>
                            <InputBox>
                                <GroupOutlinedIcon />
                                <Typography variant="h6" element="h4">{formData.relationship}</Typography>
                            </InputBox>
                            <InputBox>
                                <LocalPhoneOutlinedIcon />
                                <Typography variant="h6" element="h4">{formData.phoneNumber}</Typography>
                            </InputBox>
                            <InputBox>
                                <EmailOutlinedIcon />
                                <Typography variant="h6" element="h4">{formData.email}</Typography>
                            </InputBox>
                            <InputBox>
                                <EditOutlinedIcon />
                                <Typography variant="h6" element="h4">{formData.note}</Typography>
                            </InputBox>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </>
    )
}

export default ViewModal