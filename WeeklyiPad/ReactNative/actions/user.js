'use strict'


import * as TYPES from './index';

export function updateUser(user) {
    return dispatch => {
        dispatch({
            type: TYPES.USER_UPDATE,
            user: user,
        });
    }
}