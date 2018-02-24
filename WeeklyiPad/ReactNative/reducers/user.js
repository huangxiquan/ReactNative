'use strict'

import * as TYPES from '../actions/index';

const initialState = {
    user: {},
}

const userReducer = (state=initialState,action) => {
    // console.log("user reducer ...:");
    // console.log(action);
    switch (action.type) {
        case TYPES.USER_UPDATE:
            return {
                ...state,
                user: action.user
            };
        default :
            return state;
    }
}

export default userReducer;