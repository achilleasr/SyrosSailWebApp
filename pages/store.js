import { createStore } from 'redux';

const initialState = {
    requestBody: {}
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_REQUEST_BODY':
            return { ...state, requestBody: action.payload };
        default:
            return state;
    }
}

const store = createStore(reducer);

export default store;