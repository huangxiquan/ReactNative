'use strict'

import * as TYPES from './type';

const BASE_URL = "https://api.cbnweek.com/v1/";

export function getArticleFlow(page) {
    console.log('hahahhh:' + page)
    return (dispatch) => {
            if(page == 1) {
                dispatch({
                    'type': TYPES.FLOW_REFRESH,
                    'refresh': true,
                })
            }
            fetch(BASE_URL + 'first_page_infos' + "?page=" + page)
                .then((res) => {
                  res.json().then((json) => {
                      console.log(json);
                      dispatch({
                          'type': TYPES.ARTICLE_FLOW,
                          'body': json,
                          'page': page,
                      });
                  })
                })
                .catch((e) => {
                    console.log(e)
                })
        }

}


export function changeLoadMoreState(loadMore) {
    return {
        'type': TYPES.FLOW_LOAD_MORE,
        'loadMore':loadMore,
    }
}



export function getArticleDetail(id) {
    return (dispatch) => {
        fetch(BASE_URL + "articles/" + id)
            .then((res) => {
                res.json().then(
                    (json) => {
                        console.log(json)
                        dispatch(
                            {
                                'type': TYPES.ARTICLE_DETAIL,
                                'detail': json.data
                            }
                        )
                    }
                )
            })
            .catch(
                (e) => {console.log(e);}
            )
    }
}

export function getMagazines() {
    return (dispatch) => {
        fetch(BASE_URL + "magazines?&scope=default")
            .then(
                (res) => {
                    res.json().then(
                        (json) => {
                            console.log(json)
                            dispatch({
                                'type': TYPES.MAGAZINES,
                                'magazines': json.data,
                            });
                        }
                    )
                }
            )
            .catch(
                (e) => {console.log(e)}
            )
    }
}
