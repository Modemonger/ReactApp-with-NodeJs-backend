import React, { useContext, useEffect } from 'react'
import {ApartmentsContext } from "../context/ApartmentsContext";

export const ClientApartmentList = () => {
    const { apartments } = useContext(ApartmentsContext);
    const { RetrieveData } = useContext(ApartmentsContext);
    useEffect(() => {
        RetrieveData()
    }, [])
    if(apartments.length>0)
    return (<div>
        <table>
                <thead>
                    <tr>
                        <th>Įrašas</th>
                        <th>Vieta</th>
                        <th>Aukštas</th>
                        <th>Miegamieji</th>
                        <th>Gyvenamieji</th>
                        <th>Mašinos vietos</th>
                        <th>Teritorija</th>
                        <th>Kaina</th>
                    </tr>
                </thead>
                <tbody>
                {
                apartments[0].map(apartment => {
                    return(
                        <tr key={apartment._id}>
                            <th>{apartment.name}</th>
                            <th>{apartment.location}</th>
                            <th>{apartment.floor}</th>
                            <th>{apartment.bedrooms}</th>
                            <th>{apartment.living_spaces}</th>
                            <th>{apartment.car_spaces}</th>
                            <th>{apartment.area}m²</th>
                            <th>{apartment.price}€</th>
                        </tr>
                    )
                })
                }
                </tbody>
            </table>
        
    </div>
    
    )
    else return ('Loading...')
}