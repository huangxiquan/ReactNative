
import { combineReducers } from 'redux';
import articleReducer from './article';


export default combineReducers({
    articleStore: articleReducer,
});
