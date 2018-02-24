'use strict'

import * as TYPES from '../actions/index';

const initialState = {
    magazineDir: [],
    offlineMagazineDir: [],
};

const magazineDirReducer = (state = initialState,action) => {
    switch (action.type) {
        case TYPES.MAGAZINE_DIR_GET:
            return {
                ...state,
                magazineDir: action.data,
            }
        case TYPES.MAGAZINE_DIR_CLEAR:
            return initialState;
        case TYPES.MAGAZINE_DIR_OFFLINE:
            return {
                ...state,
                offlineMagazineDir: action.data,
            }
        default:
            return state;
    }
    return state;
}

export default magazineDirReducer;