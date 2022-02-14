export default (state, action) => {
    switch (action.type) {
        case 'DELETE_APARTMENTS':
            return {
                ...state, apartments: state.apartments.filter(apartment => apartment.id !== action.payload)
            }
        case 'ADD_APARTMENTS':
            return {
                ...state, apartments: [action.payload, ...state.apartments]
            }
        default:
            return state;
    }
}