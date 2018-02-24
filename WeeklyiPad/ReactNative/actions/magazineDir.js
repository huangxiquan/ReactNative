'use strict'
import * as TYPES from './index';
import {changeDataToBlog} from "../util";

export function getMagazineDir(id) {
    // console.log("getMagazineDir...");
    return (dispatch) => {
        fetch(TYPES.BASE_URL + "magazines/" + id + "/articles")
            .then((res) => {
                res.json().then(json => {
                    // console.log(json);
                    const data = json.data.map(changeDataToBlog);
                    dispatch({
                        'type': TYPES.MAGAZINE_DIR_GET,
                        'data': data,
                    });
                })
            });
    }
}

export function clearMagazineDir() {
    return dispatch => {
        dispatch({
            'type': TYPES.MAGAZINE_DIR_CLEAR,
        });
    }
}