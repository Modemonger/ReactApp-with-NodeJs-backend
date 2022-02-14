import axios from 'axios';
import { ApartmentsContext } from '../context/ApartmentsContext';
import { useContext } from 'react';
  //send data to api
export function sendPost(e, post){
    e.preventDefault();
    axios.post('/post', post)
    .then(response => response.data)
    .then(data => console.log(data))
    .catch(err => console.log(err.data))
}

export function removeApartment(e, quote){
    e.preventDefault();
    console.log('Removing');
    axios.delete(`/remove:${quote}`)
    .then(response => console.log(response.data))
    .catch(err => console.log(err.data))
}

export function updateApartment(e, apartment){
    e.preventDefault();
    console.log('Updating');
    axios.put(`/update:${apartment}`)
    .then(response => console.log(response.data))
    .catch(err => console.log(err.data))
}
