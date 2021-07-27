import { ActionInterface } from "../types";
import { ReactElement } from "react";
import { RootStateOrAny } from "react-redux";
export interface SortableTable {
    key: string;
    field: string;
    ascending: boolean;
}
export interface SortableTablesAction extends ActionInterface {
    payload: {
        key: string;
        field: string;
        ascending: boolean;
    };
}
export interface SortableTablesState {
    [key: string]: SortableTable;
}
export interface SortableTableField {
    field: string;
    title: string;
    sortable?: boolean;
    render?: (row: any) => ReactElement | Element | string;
    className?: string | object | ((any: any) => string | object);
}
interface RootState extends RootStateOrAny {
    sortableTables: SortableTablesState;
}
export declare const tablesSortChanged = "tables/categorySortChanged";
export declare const tablesTableAdded = "tables/tableAdded";
export declare const sortableTableSelector: (key: string) => (state: RootState) => SortableTable;
export declare const sortChangedAction: ({ key, field, ascending }: SortableTable) => SortableTablesAction;
export declare const tableAddedAction: ({ key, field, ascending }: SortableTable) => SortableTablesAction;
declare const sortableTablesReducer: (state: SortableTablesState | undefined, action: SortableTablesAction) => SortableTablesState;
export default sortableTablesReducer;
