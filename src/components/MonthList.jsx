import React, { useContext, useEffect, useState } from 'react'
import AccordianItem from './AccordianItem'
import { DataContext } from '../App'

function MonthList({ data, handleDelete }) {
    const [months, setMonths] = useState([])
    const { localData, localDispatch } = useContext(DataContext)
    const [transformedData, setTransformedData] = useState([])

    useEffect(() => {
        setMonths(['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'Septmeber', 'October', 'November', 'December'])
        let organisedData = localData.items.length > 0 ? localData.items.reduce((acc, obj) => {
            const { month, ...rest } = obj;
            if (!acc[month]) {
                acc[month] = [];
            }
            acc[month].push({ ...rest, month });
            return acc;
        }, []) : [];
        setTransformedData(organisedData)
    }, [localData])

    useEffect(() => {
    }, [transformedData])

    return (
        <React.Fragment>
            {Object.keys(transformedData).length > 0 && months.map((month, index) => (
                transformedData[month] &&
                <AccordianItem month={month} data={transformedData[month]} key={month} handleDelete={(item) => handleDelete(item)} />
            ))}
        </React.Fragment>
    )
}

export default MonthList