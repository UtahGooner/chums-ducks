import { ActionInterface } from "../types";
import { BasicAlert } from "../../types";
import { RootState } from '../index';
export interface Alert extends BasicAlert {
    id: number;
    count: number;
    timestamp: number;
}
export declare const defaultAlert: BasicAlert;
export interface AlertListState {
    counter: number;
    list: Alert[];
}
export interface AlertAction extends ActionInterface {
    payload?: {
        id?: number;
        alert?: BasicAlert;
        context?: string;
        error?: Error;
    };
}
export declare const alertAdded: string;
export declare const alertDismissed: string;
export declare const alertDismissedByContext: string;
export declare const addAlertAction: (alert: BasicAlert) => AlertAction;
export declare const dismissAlertAction: (id: number) => AlertAction;
export declare const dismissContextAlert: (context: string) => AlertAction;
export declare const onErrorAction: (err: Error, context?: string | undefined) => AlertAction;
export declare const alertListSelector: (state: RootState) => Alert[];
export declare const selectAlertList: (state: RootState) => Alert[];
export declare const alertListByContextSelector: (context: string) => (state: RootState) => Alert[];
export declare const alertContextFilter: (list: Alert[], context: string) => Alert[];
declare const alertReducer: (state: AlertListState | undefined, action: AlertAction) => AlertListState;
export default alertReducer;
