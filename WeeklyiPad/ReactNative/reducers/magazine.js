'use strict'

import * as TYPES from '../actions/index';
import DBStore from '../store/DBStore';
const initialState = {
    magazines: [],
    isLoading: false,
    currentYear: new Date().getFullYear(),
    data: [],
    page: 0,
};

const magazineReducer = (state = initialState, action) => {
    // console.log('magazineReducer...');
    switch (action.type) {
        case TYPES.MAGAZINE_LIST_GET:
            return {
                ...state,
                magazines: action.data,
                currentYear: action.year,
                page: 0,
                data: action.data.slice(0, 10),
            }
            case TYPES.MAGAZINE_LIST_LOAD:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case TYPES.MAGAZINE_LOAD_MORE:
            return {
                ...state,
                page: state.page + 1,
                data: [...state.data,...state.magazines.slice((state.page + 1)*10,(state.page + 2)*10)],
            };
        case TYPES.MAGAZINE_LIST_CLEAR :
            return {
                ...state,
                data: [],
            }
        default:
            return state;
    }
}

export default magazineReducer;
