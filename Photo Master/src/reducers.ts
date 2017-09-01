import { combineReducers } from 'redux';
import appReducer, { AppReducerState } from "./app/components/app/reducer";

const photoMasterApp = combineReducers({
    appReducer
})

export default photoMasterApp;

export interface PhotoMasterApp {
    appReducer: AppReducerState;
}