import React, { useContext, useEffect } from 'react'
import {ApartmentsContext } from "../context/ApartmentsContext";
import ReactPaginate from 'react-paginate';
import { BsTrash } from "@react-icons/all-files/bs/BsTrash";
import { removeApartment, updateApartment } from '../apiCalls/ApiCalls'

export const ApartmentList = () => {
    const { apartments } = useContext(ApartmentsContext);
    const { RetrieveData } = useContext(ApartmentsContext);
    useEffect(() => {
        RetrieveData()
    }, [])

    const handleRezervation = (e, str) => {
        e.preventDefault();
        if (window.confirm(`Ar tikrai norite ${str == 'Laisvas' ? 'rezervuoti' : 'atlaisvinti'} šį butą?`)){
            console.log('confirmed');
            updateApartment(e,str);
        } else{
            console.log('canceled');
        }
    }

    if(apartments.length>0)
    return (
        <div>
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
                        <th>Būsena</th>
                        <th>Pašalinti</th>
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
                                <th onClick={(event) => {handleRezervation(event, apartment._id)}} className={apartment.status.slice(1, -1) == 'available' ? 'available' : 'sold'}>{apartment.status.slice(1, -1) == 'available' ? 'Laisvas' : 'Rezervuotas'}</th>
                                <th><button onClick={(event) => {removeApartment(event, apartment._id)}}><BsTrash /></button></th>
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
