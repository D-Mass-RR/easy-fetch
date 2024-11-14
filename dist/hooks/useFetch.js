"use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFetch = void 0;
var react_1 = require("react");
var axios_1 = __importDefault(require("axios"));
var helpers_1 = require("../helpers");
function useFetch(_a) {
    var _this = this;
    var request = _a.request, callback = _a.callback, _b = _a.fetchOnInit, fetchOnInit = _b === void 0 ? false : _b, onError = _a.onError, _c = _a.client, client = _c === void 0 ? axios_1.default : _c;
    var _d = (0, react_1.useState)(false), loading = _d[0], setLoading = _d[1];
    var _e = (0, react_1.useState)(), data = _e[0], setData = _e[1];
    var _f = (0, react_1.useState)(), error = _f[0], setError = _f[1];
    var _g = (0, react_1.useState)(), status = _g[0], setStatus = _g[1];
    var handleFetch = function (params) { return __awaiter(_this, void 0, void 0, function () {
        var response, configWithParams, isSuccess, result, errorMessage, err_1, errorMessage;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    setLoading(true);
                    setError(undefined);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 6, , 7]);
                    response = void 0;
                    if (!(typeof request === 'function')) return [3 /*break*/, 3];
                    return [4 /*yield*/, request()];
                case 2:
                    response = _c.sent();
                    return [3 /*break*/, 5];
                case 3:
                    configWithParams = params ? __assign(__assign({}, request), { params: params }) : request;
                    return [4 /*yield*/, (0, helpers_1.createRequest)(configWithParams, client)];
                case 4:
                    response = _c.sent();
                    _c.label = 5;
                case 5:
                    isSuccess = response.status >= 200 && response.status < 300;
                    setData(response.data);
                    setStatus(response.status);
                    result = {
                        isSuccess: isSuccess,
                        data: response.data,
                        error: isSuccess ? undefined : (0, helpers_1.extractErrorMessage)(response),
                        status: response.status,
                        statusText: response.statusText,
                    };
                    callback === null || callback === void 0 ? void 0 : callback(result);
                    if (!isSuccess) {
                        errorMessage = (0, helpers_1.extractErrorMessage)(response);
                        setError(errorMessage);
                        onError === null || onError === void 0 ? void 0 : onError(new Error(errorMessage));
                    }
                    return [3 /*break*/, 7];
                case 6:
                    err_1 = _c.sent();
                    errorMessage = void 0;
                    if ((0, helpers_1.isAxiosError)(err_1)) {
                        errorMessage = (0, helpers_1.extractErrorMessage)(err_1.response) || err_1.message;
                        setStatus((_a = err_1.response) === null || _a === void 0 ? void 0 : _a.status);
                    }
                    else if (err_1 instanceof Error) {
                        errorMessage = err_1.message;
                    }
                    else {
                        errorMessage = 'Unknown error occurred';
                    }
                    setError(errorMessage);
                    onError === null || onError === void 0 ? void 0 : onError(err_1 instanceof Error ? err_1 : new Error(errorMessage));
                    callback === null || callback === void 0 ? void 0 : callback({
                        isSuccess: false,
                        error: errorMessage,
                        status: (0, helpers_1.isAxiosError)(err_1) ? (_b = err_1.response) === null || _b === void 0 ? void 0 : _b.status : undefined,
                    });
                    return [3 /*break*/, 7];
                case 7:
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        if (fetchOnInit) {
            handleFetch();
        }
    }, []);
    return {
        fetch: handleFetch,
        loading: loading,
        data: data,
        error: error,
        status: status,
    };
}
exports.useFetch = useFetch;
//# sourceMappingURL=useFetch.js.map