"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
function calculate_from_inputs(inputs) {
    return __awaiter(this, void 0, void 0, function () {
        var fetch_args, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fetch_args = {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(inputs)
                    };
                    return [4 /*yield*/, fetch('/calculate', fetch_args)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.json()];
            }
        });
    });
}
exports.calculate_from_inputs = calculate_from_inputs;
function export_to_csv(filename) {
    return __awaiter(this, void 0, void 0, function () {
        var fetch_args, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fetch_args = {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ "filename": filename })
                    };
                    return [4 /*yield*/, fetch('/export', fetch_args)];
                case 1:
                    response = _a.sent();
                    if (response.ok) {
                        return [2 /*return*/, response.json()];
                    }
                    else {
                        return [2 /*return*/, { saved_file: "ERROR", error: true }];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.export_to_csv = export_to_csv;
function load_from_csv(file) {
    return __awaiter(this, void 0, void 0, function () {
        var fetch_args, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fetch_args = { method: 'POST', body: file };
                    return [4 /*yield*/, fetch('/load', fetch_args)];
                case 1:
                    response = _a.sent();
                    if (response.ok) {
                        return [2 /*return*/, response.json()];
                    }
                    else {
                        return [2 /*return*/, { error: true, results: null }];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.load_from_csv = load_from_csv;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlcXVlc3RzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBLFNBQXNCLHFCQUFxQixDQUFDLE1BQXlCOzs7Ozs7b0JBQzdELFVBQVUsR0FBRzt3QkFDYixNQUFNLEVBQUUsTUFBTTt3QkFDZCxPQUFPLEVBQUU7NEJBQ0wsUUFBUSxFQUFFLGtCQUFrQjs0QkFDNUIsY0FBYyxFQUFFLGtCQUFrQjt5QkFDckM7d0JBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO3FCQUMvQixDQUFDO29CQUNhLHFCQUFNLEtBQUssQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLEVBQUE7O29CQUFoRCxRQUFRLEdBQUcsU0FBcUM7b0JBQ3BELHNCQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBQzs7OztDQUMxQjtBQVhELHNEQVdDO0FBRUQsU0FBc0IsYUFBYSxDQUFDLFFBQWdCOzs7Ozs7b0JBQzVDLFVBQVUsR0FBRzt3QkFDYixNQUFNLEVBQUUsTUFBTTt3QkFDZCxPQUFPLEVBQUU7NEJBQ0wsUUFBUSxFQUFFLGtCQUFrQjs0QkFDNUIsY0FBYyxFQUFFLGtCQUFrQjt5QkFDckM7d0JBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxVQUFVLEVBQUUsUUFBUSxFQUFDLENBQUM7cUJBQy9DLENBQUM7b0JBQ2EscUJBQU0sS0FBSyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsRUFBQTs7b0JBQTdDLFFBQVEsR0FBRyxTQUFrQztvQkFDakQsSUFBSSxRQUFRLENBQUMsRUFBRSxFQUFFO3dCQUNiLHNCQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBQztxQkFDMUI7eUJBQU07d0JBQ0gsc0JBQU8sRUFBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsRUFBQztxQkFDN0M7Ozs7O0NBQ0o7QUFmRCxzQ0FlQztBQUVELFNBQXNCLGFBQWEsQ0FBQyxJQUFVOzs7Ozs7b0JBQ3RDLFVBQVUsR0FBRyxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDO29CQUMvQixxQkFBTSxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxFQUFBOztvQkFBM0MsUUFBUSxHQUFHLFNBQWdDO29CQUMvQyxJQUFJLFFBQVEsQ0FBQyxFQUFFLEVBQUU7d0JBQ2Isc0JBQU8sUUFBUSxDQUFDLElBQUksRUFBRSxFQUFDO3FCQUMxQjt5QkFBTTt3QkFDSCxzQkFBTyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBQyxFQUFDO3FCQUN2Qzs7Ozs7Q0FDSjtBQVJELHNDQVFDIiwiZmlsZSI6IlJlcXVlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge0NhbGN1bGF0aW9uSW5wdXRzLCBMb2FkZWRDU1ZJbnB1dHN9IGZyb20gXCIuL3R5cGVzL0NhbGN1bGF0aW9uSW5wdXRzXCI7XG5pbXBvcnQge1Jlc3VsdHN9IGZyb20gXCIuL0RMV0FwcFwiO1xuXG5pbnRlcmZhY2UgQ1NWUmVzdWx0cyB7XG4gICAgZXJyb3I/OiBib29sZWFuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ1NWRXhwb3J0UmVzdWx0cyBleHRlbmRzIENTVlJlc3VsdHMge1xuICAgIHNhdmVkX2ZpbGU6IHN0cmluZ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExvYWRlZENTVlJlc3VsdHMgZXh0ZW5kcyBDU1ZSZXN1bHRzIHtcbiAgICByZXN1bHRzOiBMb2FkZWRDU1ZJbnB1dHMgfCBudWxsXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjYWxjdWxhdGVfZnJvbV9pbnB1dHMoaW5wdXRzOiBDYWxjdWxhdGlvbklucHV0cyk6IFByb21pc2U8UmVzdWx0cz4ge1xuICAgIGxldCBmZXRjaF9hcmdzID0ge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGlucHV0cylcbiAgICB9O1xuICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvY2FsY3VsYXRlJywgZmV0Y2hfYXJncyk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4cG9ydF90b19jc3YoZmlsZW5hbWU6IHN0cmluZyk6IFByb21pc2U8Q1NWRXhwb3J0UmVzdWx0cz4ge1xuICAgIGxldCBmZXRjaF9hcmdzID0ge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcImZpbGVuYW1lXCI6IGZpbGVuYW1lfSlcbiAgICB9O1xuICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvZXhwb3J0JywgZmV0Y2hfYXJncyk7XG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtzYXZlZF9maWxlOiBcIkVSUk9SXCIsIGVycm9yOiB0cnVlfTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkX2Zyb21fY3N2KGZpbGU6IEZpbGUpOiBQcm9taXNlPExvYWRlZENTVlJlc3VsdHM+IHtcbiAgICBsZXQgZmV0Y2hfYXJncyA9IHttZXRob2Q6ICdQT1NUJywgYm9keTogZmlsZX07XG4gICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9sb2FkJywgZmV0Y2hfYXJncyk7XG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtlcnJvcjogdHJ1ZSwgcmVzdWx0czogbnVsbH07XG4gICAgfVxufVxuXG4iXX0=
