import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ApartmentList } from './ApartmentList';
import { MainPage } from './MainPage';
import { ClientApartmentList } from './ClientApartmentList';


const NavBar = () => {
  return (
        <div className='navBar'>
            <Router>
                <Link to='/'>Pagrindinis</Link>
                <br/>
                <Link to='/manager'>Vadybininkas</Link>
                <br/>
                <Link to='/client'>Klientas</Link>
                <Routes>
                    <Route path='/' element={<MainPage/>} />
                    <Route path='/manager' element={<ApartmentList />} />
                    <Route path='/client' element={<ClientApartmentList />} />
                </Routes>
            </Router>
            
        </div>
    );
};

export default NavBar;