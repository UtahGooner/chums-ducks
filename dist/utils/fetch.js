/**
 * Created by steve on 8/24/2016.
 */
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import 'whatwg-fetch';
import { compile } from 'path-to-regexp';
export default self.fetch.bind(self);
export var Headers = self.Headers;
export var Request = self.Request;
export var Response = self.Response;
export var fetchOptions = {
    PostJSON: function (object, options) {
        options = options || {};
        var headers = (options === null || options === void 0 ? void 0 : options.headers) || {};
        if (options === null || options === void 0 ? void 0 : options.headers) {
            delete options.headers;
        }
        return __assign(__assign({ credentials: 'same-origin', method: 'post' }, options), { body: JSON.stringify(object), headers: __assign({ 'Accept': 'application/json', 'Content-Type': 'application/json' }, headers) });
    },
    Delete: function (options) {
        options = options || {};
        var headers = options.headers || {};
        delete options.headers;
        return __assign(__assign({ credentials: 'same-origin', method: 'DELETE' }, options), { headers: __assign({}, headers) });
    }
};
var onErrorResponse = function (response) {
    if (response.ok) {
        return response;
    }
    else {
        throw new Error(response.status + " " + response.statusText);
    }
};
function handleJSONResponse(res) {
    return __awaiter(this, void 0, void 0, function () {
        var text, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!res.ok) return [3 /*break*/, 2];
                    return [4 /*yield*/, res.text()];
                case 1:
                    text = _a.sent();
                    return [2 /*return*/, Promise.reject(new Error(text))];
                case 2: return [4 /*yield*/, res.json()];
                case 3:
                    json = _a.sent();
                    if (json.error) {
                        console.warn(json.error);
                        return [2 /*return*/, Promise.reject(new Error(json.error))];
                    }
                    return [2 /*return*/, json];
            }
        });
    });
}
export function fetchJSON(url, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var res, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(url, __assign({ credentials: 'same-origin' }, options))];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, handleJSONResponse(res)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    err_1 = _a.sent();
                    console.log("fetchJSON()", err_1.message);
                    return [2 /*return*/, Promise.reject(err_1)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
export function fetchHTML(url, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var res, text, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, fetch(url, __assign({ credentials: 'same-origin' }, options))];
                case 1:
                    res = _a.sent();
                    if (!!res.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, res.text()];
                case 2:
                    text = _a.sent();
                    return [2 /*return*/, Promise.reject(new Error(text))];
                case 3: return [4 /*yield*/, res.text()];
                case 4: return [2 /*return*/, _a.sent()];
                case 5:
                    err_2 = _a.sent();
                    console.log("fetchGET()", err_2.message);
                    return [2 /*return*/, Promise.reject(err_2)];
                case 6: return [2 /*return*/];
            }
        });
    });
}
export function fetchPOST(url, body, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var res, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(url, fetchOptions.PostJSON(body, options))];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, handleJSONResponse(res)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    err_3 = _a.sent();
                    console.log("fetchPOST()", err_3.message);
                    return [2 /*return*/, Promise.reject(err_3)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
export function fetchDELETE(url, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var res, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(url, fetchOptions.Delete(options))];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, handleJSONResponse(res)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    err_4 = _a.sent();
                    console.log("fetchDELETE()", err_4.message);
                    return [2 /*return*/, Promise.reject(err_4)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
export var buildPath = function (path, props) {
    if (props === void 0) { props = {}; }
    try {
        return compile(path, { encode: encodeURIComponent })(props || {});
    }
    catch (e) {
        console.trace(e.message, path, props);
        return path;
    }
};
//# sourceMappingURL=fetch.js.map