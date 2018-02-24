'use strict'
import * as TYPES from './index';
import {AlertIOS}    from "react-native";
import * as User from "../store/user";

export function getMagazineDetail(id,token) {
    // console.log("getMagazineDetail... ...");
    return (dispatch) => {
        fetch(TYPES.BASE_URL + "articles/" + id,{
            headers: {
                'Authorization': token
            }
        }).then((res) => {
            res.json().then((json) => {
                console.log(json);
                if(json.error) {
                    AlertIOS.alert(
                        '温馨提示',
                        json.error,
                        [
                            {text: 'OK', onPress: () => {
                               User.removeUser();
                            } },
                        ]
                    )

                }else {
                    dispatch({
                        type: TYPES.MAGAZINE_DETAIL_GET,
                        body: json,
                    })
                }
            });
        });
    }
}

export function clearMagazineDetail() {
    return (dispatch) => {
        dispatch({
            type: TYPES.MAGAZINE_DETAIL_CLEAR,
        });
    }
}