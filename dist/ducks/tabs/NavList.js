import React from 'react';
import { selectedTabSelector, tabListSelector, tabRemovedAction, tabSelectedAction } from "./index";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import NavItem from "./NavItem";
import './TabList.css';
import { noop } from "../../utils";
var NavList = function (_a) {
    var tabKey = _a.tabKey, className = _a.className, itemClassName = _a.itemClassName, _b = _a.onSelectTab, onSelectTab = _b === void 0 ? noop : _b, children = _a.children;
    var dispatch = useDispatch();
    var list = useSelector(tabListSelector(tabKey));
    var selected = useSelector(selectedTabSelector(tabKey));
    var tabClickHandler = function (id) {
        console.log(id, tabKey);
        dispatch(tabSelectedAction(id, tabKey));
        onSelectTab(id);
    };
    var tabCloseHandler = function (id) { return dispatch(tabRemovedAction(id, tabKey)); };
    return (React.createElement("ul", { className: classNames('nav', className) },
        list.map(function (tab) { return (React.createElement(NavItem, { key: tab.id, id: tab.id, title: tab.title, className: itemClassName, icon: tab.icon, onSelect: function () { return tabClickHandler(tab.id); }, disabled: tab.disabled, active: tab.id === selected, canClose: tab.canClose, onClose: function () { return tabCloseHandler(tab.id); } })); }),
        children));
};
export default NavList;
//# sourceMappingURL=NavList.js.map