import { Action } from "redux";
import AppConstants from "./constants"

export interface ActionShowLoader extends Action {
    type: string;
}

export function showLoader(): ActionShowLoader {
    return {
        type: AppConstants.ShowLoader
    }
};

export interface ActionHideLoader extends Action {

}

export function hideLoader(): ActionHideLoader {
    return {
        type: AppConstants.HideLoader
    }
};

export type AppActions = ActionShowLoader | ActionHideLoader; 