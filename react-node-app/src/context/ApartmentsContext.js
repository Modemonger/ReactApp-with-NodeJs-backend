import { createContext, useReducer } from "react";
import ApartmentsReducer from "../reducers/ApartmentsReducer";
import axios from 'axios';

const initialState = {
    apartments:[

    ]
}

export const ApartmentsContext = createContext(initialState);



export const ApartmentsProvider = ({children}) => {
    const [state, dispatch] = useReducer(ApartmentsReducer,initialState);

    function deleteApartment(data) {
        dispatch({
            type: 'DELETE_APARTMENTS',
            payload: data
        });
    }

    function addApartment(data){
        dispatch({
            type: 'ADD_APARTMENTS',
            payload: data
        });
    }

    function RetrieveData(){
        axios.get('/api/v1/apartments')
        .then(res => res.data)
        .then((data) => addApartment(data));
    }

    return(
        <ApartmentsContext.Provider value={{
            apartments: state.apartments,
            deleteApartment,
            addApartment,
            RetrieveData
        }}>
            {children}
        </ApartmentsContext.Provider>
    )
}