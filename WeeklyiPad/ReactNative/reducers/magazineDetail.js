'use strict'

import * as TYPES from '../actions/index';

const initialState = {
    magazineDetail: {},
    isJumpToLogin: false,
};

const magazineDetailReducer = (state = initialState,action) => {
    // console.log(action.type)
    switch (action.type) {
        case TYPES.MAGAZINE_DETAIL_GET:
            return {
                ...state,
                magazineDetail: action.body.data,
            }
        case TYPES.MAGAZINE_DETAIL_CLEAR:
            return initialState;
        case TYPES.MAGAZINE_LIST_LOGIN:
            return {
                ...state,
                isJumpToLogin: true,
            }
        default:
            return state;
    }
}

export default magazineDetailReducer;