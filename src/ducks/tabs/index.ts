import {ActionInterface, ActionPayload} from "../types";
import {RootStateOrAny} from "react-redux";


export interface Tab {
    id: string,
    title: string,
    icon?: string,
    to?: string|object|((any:any) => string|object),
    canClose?: boolean,
    disabled?: boolean,
    active?: boolean,
}

export interface TabSet {
    list: Tab[],
    selected: string,
}

export interface TabPayload extends ActionPayload {
    key: string,
    id?: string,
    tab?: Tab,
    list?: Tab[]
}

export interface TabAction extends ActionInterface {
    payload?: TabPayload
}

export interface TabsState {
    [key: string]: TabSet
}

interface RootState extends RootStateOrAny {
    tabs: TabsState
}

const initialState: TabsState = {
    app: {list: [], selected: ''},
};

const defaultTabsKey = '_';

export const tabListCreated = 'tabs/tabs-created';
export const tabSelected = 'tabs/tab-selected';
export const tabAdded = 'tabs/tab-added';
export const tabRemoved = 'tabs/tab-removed';
export const tabDisabled = 'tabs/tab-disabled';


export const tabListCreatedAction = (list: Tab[], key: string = defaultTabsKey, selectedId?: string): TabAction => ({
    type: tabListCreated,
    payload: {key, list, id: selectedId}
});

export const tabSelectedAction = (id: string, key: string = defaultTabsKey): TabAction => ({
    type: tabSelected,
    payload: {key, id}
});

export const tabAddedAction = (tab: Tab, key: string = defaultTabsKey): TabAction => ({
    type: tabAdded,
    payload: {key, tab}
});

export const tabRemovedAction = (id: string, key: string = defaultTabsKey): TabAction => ({
    type: tabRemoved,
    payload: {key, id}
})

export const tabDisabledAction = (id: string, key: string = defaultTabsKey): TabAction => ({
    type: tabDisabled,
    payload: {key, id}
})

export const tabListSelector = (key: string = defaultTabsKey) => (state: RootState) => state.tabs[key]?.list || [];

export const selectedTabSelector = (key: string = defaultTabsKey) => (state: RootState): string => {
    if (!state.tabs[key]) {
        return '';
    }
    const {list = [], selected = ''} = state.tabs[key];
    const [id] = list.filter(tab => tab.id === selected).map(tab => tab.id);
    return id || '';
}

export const tabSelector = (id: string, key: string = defaultTabsKey) => (state: RootState): Tab => {
    if (!state.tabs[key]) {
        return {id: '', title: ''};
    }
    const [tab] = state.tabs[key].list.filter(tab => tab.id === id);
    return tab;
}

const nextTabId = (tabSet: TabSet, id: string) => {
    if (tabSet.selected === id) {
        let found: boolean = false;
        let newIndex: number = -1;
        tabSet.list.forEach((tab, index) => {
            if (found && newIndex === -1) {
                newIndex = index;
            }
            if (tab.id === id) {
                found = true;
            }
        });
        if (newIndex === -1) {
            newIndex = Math.max(tabSet.list.length - 1, 0);
        }
        return tabSet.list[newIndex].id;
    }
    return id;
}

const tabsReducer = (state: TabsState = initialState, action: TabAction): TabsState => {
    const {type, payload} = action;
    const {key = defaultTabsKey, tab, list = [], id = ''} = payload || {};
    const tabSet: TabSet = state[key];
    switch (type) {
    case tabListCreated:
        if (!state[key]) {
            return {
                ...state,
                [key]: {
                    list: [...list],
                    selected: id || (list.length === 0 ? '' : list[0].id),
                }
            }
        }
        return state;
    case tabAdded:
        if (tabSet && tab) {
            return {
                ...state,
                [key]: {
                    list: [...tabSet.list, tab],
                    selected: tabSet.selected,
                }
            }
        }
        return state;
    case tabRemoved:
        if (tabSet) {
            const list = tabSet.list.filter(tab => tab.id !== id);
            const selected = nextTabId(tabSet, id);
            return {
                ...state,
                [key]: {
                    list: [...list],
                    selected: selected,
                }
            }
        }
        return state;
    case tabDisabled:
        if (tabSet) {
            const selected = nextTabId(tabSet, id);
            return {
                ...state,
                [key]: {
                    list: list.map(tab => ({...tab, disabled: tab.id === id})),
                    selected: selected,
                }
            }
        }
        return state;
    case tabSelected:
        if (tabSet) {
            return {
                ...state,
                [key]: {...tabSet, selected: id}
            }
        }
        return state;
    default:
        return state;
    }
}

export default tabsReducer;
