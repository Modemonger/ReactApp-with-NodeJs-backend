import React, { useContext, useState } from 'react'
import { ApartmentsContext } from '../context/ApartmentsContext'
import { sendPost } from '../apiCalls/ApiCalls';

export const ApartmentForm = () => {

    const { RetrieveData } = useContext(ApartmentsContext);

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [floor, setFloor] = useState('');
    const [bedrooms, setBedRooms] = useState('');
    const [living_spaces, setLivingRooms] = useState('');
    const [car_spaces, setCarSpaces] = useState('');
    const [area, setArea] = useState('');
    const [price, setPrice] = useState('');
    const [state, setState] = useState('available');

    const submit = e =>{
        e.preventDefault();

        const payload = {
            name,
            location,
            floor,
            bedrooms,
            living_spaces,
            car_spaces,
            area,
            price,
            state
        }

        sendPost(e, payload);

        setName('');
        setLocation('');
        setFloor('');
        setBedRooms('');
        setLivingRooms('');
        setCarSpaces('');
        setArea('');
        setPrice('');
        setState('');

        RetrieveData();
    }

    return (
        <div>
            <form onSubmit={submit}>
                <label htmlFor="name">Įrašas</label>
                <input type="text" name="name" id="name" value={name} onChange={(e)=> setName(e.target.value)}/>
                <label htmlFor="location">Vieta</label>
                <input type="text" name="location" id="location" value={location} onChange={(e)=> setLocation(e.target.value)} />
                <label htmlFor="floor">Aukštas</label>
                <input type="number" name="floor" id="floor" value={floor} onChange={(e)=> setFloor(e.target.value)} />
                <label htmlFor="bedrooms">Miegamieji</label>
                <input type="number" name="bedrooms" id="bedrooms" value={bedrooms} onChange={(e)=> setBedRooms(e.target.value)}/>
                <label htmlFor="living_spaces">Givenamieji</label>
                <input type="number" name="living_spaces" id="living_spaces" value={living_spaces} onChange={(e)=> setLivingRooms(e.target.value)}/>
                <label htmlFor="car_spaces">Vietų mašinoms</label>
                <input type="number" name="car_spaces" id="car_spaces" value={car_spaces} onChange={(e)=> setCarSpaces(e.target.value)}/>
                <label htmlFor="area">Teritorija</label>
                <input type="number" name="area" id="area" value={area} onChange={(e)=> setArea(e.target.value)}/>
                <label htmlFor="price">Kaina</label>
                <input type="number" name="price" id="price" value={price} onChange={(e)=> setPrice(e.target.value)}/>
                <label htmlFor="status">Būsena</label>
                <select name="status" id="status" value={state} onChange={(e)=> setState(`${e.target.value}`)}>
                    <option value="available">laisvas</option>
                    <option value="sold">parduotas</option>
                </select>
                <button type='submit'>PRIDĖTI</button>
            </form>
        </div>
    )
}
