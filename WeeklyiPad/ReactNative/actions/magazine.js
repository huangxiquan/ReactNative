'use strict'
import * as TYPES from './index';
import {changeDataToBlog} from "../util";


export function getMagazineList(year) {
  //magazines?scope=default&page=1
  // console.log('getMagazineList... ...');
  return (dispatch) => {
      dispatch({
          'type': TYPES.MAGAZINE_LIST_CLEAR,
      });
    fetch(TYPES.BASE_URL + "magazines?scope=default&year=" + year)
      .then((res) => {
          res.json().then((json) => {
            // console.log(json)
              // let i = 0;
              console.log(json.data)
              const dataArray = json.data.map(changeDataToBlog)
            dispatch({
              'type': TYPES.MAGAZINE_LIST_GET,
              'data': dataArray,
              'year': year,
            });
          });
      });
  }
}

export function loadMoreMagazine() {
    // console.log('loadMoreMagazine... ...');
    return (dispatch) => {
      dispatch({
          'type': TYPES.MAGAZINE_LOAD_MORE,
      });
    }
}



