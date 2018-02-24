'use strict'

import * as TYPES from '../actions/type';

const initialState = {
    articles: [],
    isLoadingMore:false,
    isRefreshing:false,
    magazines:[],
};

const articleReducer = (state=initialState,action) => {
    console.log('process action')
    switch (action.type) {
        case TYPES.ARTICLE_FLOW:
                if(action.page == 1) {
                    return {
                        ...state,
                        articles: action.body.data,
                        isRefreshing: false
                    }
                }else {
                    return {
                        ...state,
                        articles: state.articles.concat(action.body.data),
                        isLoadingMore:false
                    }
                }
        case TYPES.FLOW_LOAD_MORE:
            return {
                ...state,
                isLoadingMore:action.loadMore,

            }
        case TYPES.FLOW_REFRESH:
            return {
                ...state,
                isRefreshing:action.refresh
            }
        case TYPES.ARTICLE_DETAIL:
            return {
                ...state,
                articleDetail:action.detail,
            }
        case TYPES.MAGAZINES:
            return {
                ...state,
                magazines:action.magazines,
            }
        default:
            return state;
    }
}

export default articleReducer;