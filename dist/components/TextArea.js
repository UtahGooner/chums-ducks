var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from "classnames";
import debounce from 'lodash.debounce';
var noop = function () {
};
var TextArea = function (_a) {
    var _b;
    var _c = _a.bsSize, bsSize = _c === void 0 ? 'sm' : _c, _d = _a.wait, wait = _d === void 0 ? 350 : _d, myRef = _a.myRef, className = _a.className, value = _a.value, _e = _a.onChange, onChange = _e === void 0 ? noop : _e, onBlur = _a.onBlur, rest = __rest(_a, ["bsSize", "wait", "myRef", "className", "value", "onChange", "onBlur"]);
    var _debounced;
    var delayedChange = useCallback(debounce(function (ev) {
        console.log('useCallback (debounced)', ev.target, ev.target.value);
        onChange(ev);
    }, wait), []);
    var inputRef = useRef(null);
    var _f = useState(String(value)), localValue = _f[0], setLocalValue = _f[1];
    useEffect(function () {
        return function () {
            _debounced === null || _debounced === void 0 ? void 0 : _debounced.cancel();
        };
    }, []);
    useEffect(function () {
        setLocalValue(String(value));
    }, [value]);
    var inputClassName = (_b = {
            'form-control': true
        },
        _b["form-control-" + bsSize] = !!bsSize,
        _b);
    var changeHandler = function (ev) {
        setLocalValue(ev.target.value);
        delayedChange(ev);
    };
    var blurHandler = function (ev) {
        _debounced === null || _debounced === void 0 ? void 0 : _debounced.flush();
        if (onBlur) {
            onBlur(ev);
        }
    };
    return (React.createElement("textarea", __assign({ className: classNames(inputClassName, className), value: localValue || '', 
        // onInput={changeHandler}
        onBlur: blurHandler, onChange: changeHandler, ref: myRef || inputRef }, rest)));
};
export default TextArea;
//# sourceMappingURL=TextArea.js.map