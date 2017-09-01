import { AppActions } from "./app-actions";
import AppConstants from "./constants"

export interface AppReducerState {
    loading: boolean;
}

export default function appReducer(state: AppReducerState = {
    loading: false
}, action: AppActions): AppReducerState {
        if( action.type === AppConstants.ShowLoader) {
            return {...state, loading: true};
        }
        if( action.type ===AppConstants.HideLoader) {
            return {...state, loading: false};
        }
        else {
            return state;
        }
}