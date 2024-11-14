"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractErrorMessage = exports.isAxiosError = exports.createRequest = void 0;
var isAxiosError = function (error) {
    return (error === null || error === void 0 ? void 0 : error.isAxiosError) === true;
};
exports.isAxiosError = isAxiosError;
var createRequest = function (config, client) {
    var _a = config, url = _a.url, _b = _a.method, method = _b === void 0 ? 'GET' : _b, params = _a.params, data = _a.data, headers = _a.headers;
    return client({
        url: url,
        method: method,
        params: params,
        data: data,
        headers: headers,
    });
};
exports.createRequest = createRequest;
var extractErrorMessage = function (response) {
    var _a;
    if (typeof (response === null || response === void 0 ? void 0 : response.data) === 'string')
        return response.data;
    if (typeof ((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.message) === 'string')
        return response.data.message;
    if (typeof (response === null || response === void 0 ? void 0 : response.statusText) === 'string')
        return response.statusText;
    return 'Request failed';
};
exports.extractErrorMessage = extractErrorMessage;
//# sourceMappingURL=helpers.js.map