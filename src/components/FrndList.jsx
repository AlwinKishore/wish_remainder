import { List, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import BirthdayItem from './BirthdayItem';
import DeleteDialog from './DeleteDialog';
import { DataContext } from '../App';

function FrndList() {
    const [open, setOpen] = useState(false)
    const [deleteItem, setDeleteItem] = useState('')
    const [BirthDayData, setBirthDayData] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const { localData, localDispatch } = useContext(DataContext)

    const handleClickOpen = (item) => {
        setDeleteItem(item);
        setOpen(true);
    };

    useEffect(() => {
        const fetchDataFromLocalStorage = () => {
            const storedData = localStorage.getItem('BirthDayData') !== null && JSON.parse(localStorage.getItem('BirthDayData'));
            if (storedData.length > 0) {
                setBirthDayData(storedData);
            }
        };
        fetchDataFromLocalStorage();
        const handleStorageChange = () => {
            fetchDataFromLocalStorage();
        };
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        setBirthDayData(localData.items);
    }, [localData.items])

    useEffect(() => {
        let sortedData = [...BirthDayData]
        sortedData.sort((a, b) => {
            const nameA = a.fullName.toLowerCase();
            const nameB = b.fullName.toLowerCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        setSortedData(sortedData)
    }, [BirthDayData])

    const handleDelete = () => {
        let updatedList = BirthDayData.filter(item => item.id !== deleteItem)
        localStorage.setItem('BirthDayData', JSON.stringify(updatedList))
        setBirthDayData(updatedList)
        setOpen(false);
    }
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper', display: 'flex', flexDirection: 'column', flex: 4, p: 2 }}>
            {
                sortedData.length > 0 ?
                    <BirthdayItem item={sortedData} handleClickOpen={(item) => handleClickOpen(item)} />
                    :
                    <Typography variant='h5' textAlign={'center'}>No Data Available...<br /> Add New Data</Typography>
            }
            <DeleteDialog open={open} handleClose={(e) => setOpen(false)} handleDelete={handleDelete} />
        </List>
    )
}

export default FrndList