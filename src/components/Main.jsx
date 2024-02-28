import React, { useContext, useEffect, useMemo, useState } from 'react'
import MonthList from './MonthList';
import { Box, Typography } from '@mui/material';
import { DataContext } from '../App';


function Main() {
    const [BirthDayData, setBirthDayData] = useState([]);
    const { localData, localDispatch } = useContext(DataContext)

    useEffect(() => {
        setBirthDayData(localData.items);
    }, [localData.items]);

    const handleDelete = (deleteItem) => {
        let updatedList = BirthDayData.filter(item => item.id !== deleteItem)
        localStorage.setItem('BirthDayData', JSON.stringify(updatedList))
        localDispatch({ type: 'DELETE_ITEM', payload: { deleteItem } });
        setBirthDayData(updatedList)
    }

    return (
        <Box flex={4} p={2} justifyContent={'center'} alignItems={'center'}>
            {
                BirthDayData.length !== 0 ?
                    <MonthList data={BirthDayData} handleDelete={(item) => handleDelete(item)} />
                    :
                    <Typography variant='h5' textAlign={'center'}>No Data Available...<br /> Add New Data</Typography>
            }

        </Box>
    )
}

export default Main