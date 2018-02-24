import { combineReducers } from 'redux';
import magazineReducer from './magazine';
import magazineDirReducer from "./magazineDir";
import magazineDetailReducer from "./magazineDetail";
import userReducer from "./user";

export default combineReducers({
	magazineStore: magazineReducer,
	magazineDirStore: magazineDirReducer,
	magazineDetailStore: magazineDetailReducer,
	userStore: userReducer,
});
