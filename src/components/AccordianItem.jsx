import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BirthdayList from './BirthdayList'
import styled from '@emotion/styled';

const CustomAccordion = styled(Accordion)({
    margin: 7
})

function AccordianItem({ data, month, handleDelete }) {
    return (
        <>
            {
                <CustomAccordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ margin: '0' }}
                    >
                        <Typography variant='h5'>{month}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <BirthdayList item={data} handleItemDelete={(item) => handleDelete(item)} />
                    </AccordionDetails>
                </CustomAccordion>
            }
        </>
    )
}

export default AccordianItem