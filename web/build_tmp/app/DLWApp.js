"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = require("react");
var core_1 = require("@blueprintjs/core");
var DateTimePicker = require("react-datetime");
var moment = require("moment");
var Requests_1 = require("./Requests");
var cjs_1 = require("@blueprintjs/core/lib/cjs");
var NumberInput_1 = require("./NumberInput");
var utilities_1 = require("./utilities");
var DeltaScatterChart_1 = require("./DeltaScatterChart");
var DEUTERIUM = "Deuterium";
var OXYGEN = "Oxygen 18";
var ELEMENTS = [DEUTERIUM, OXYGEN];
var NUM_SAMPLE_TIMES = 5;
exports.SAMPLE_LABELS = ['Background', 'PD4', 'PD5', 'ED4', 'ED5'];
var DeltaUnits;
(function (DeltaUnits) {
    DeltaUnits["permil"] = "permil";
    DeltaUnits["ppm"] = "ppm";
})(DeltaUnits || (DeltaUnits = {}));
var AppToaster = core_1.Toaster.create({ className: "app-toaster", position: core_1.Position.TOP_RIGHT });
var DLWApp = /** @class */ (function (_super) {
    __extends(DLWApp, _super);
    function DLWApp(props) {
        var _this = _super.call(this, props) || this;
        _this.export = function () { return __awaiter(_this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Requests_1.export_to_csv(this.state.new_csv_name)];
                    case 1:
                        results = _a.sent();
                        if (results.error) {
                            AppToaster.show({
                                message: "Error exporting results to csv. Please file a bug report at https://github.com/jchmyz/DoublyLabeledWater/issues",
                                intent: "danger",
                                timeout: 0
                            });
                        }
                        else {
                            AppToaster.show({
                                message: "Results successfully exported to " + results.saved_file,
                                intent: "success",
                                timeout: 3000
                            });
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        _this.submit_inputs = function () { return __awaiter(_this, void 0, void 0, function () {
            var datetimes, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        datetimes = this.state.datetimes.map(function (value) {
                            return value.toArray();
                        });
                        // months are zero-indexed in Moment.js
                        datetimes.map(function (value) {
                            return value.splice(1, 1, value[1] + 1);
                        });
                        return [4 /*yield*/, Requests_1.calculate_from_inputs({
                                d_meas: this.state.deuterium_deltas,
                                o18_meas: this.state.oxygen_deltas,
                                datetimes: datetimes,
                                dose_weights: this.state.dose_weights,
                                dose_enrichments: this.state.dose_enrichments,
                                subject_weights: this.state.subject_weights,
                                subject_id: this.state.subject_id,
                                mixed_dose: this.state.mixed_dose,
                                in_permil: (this.state.delta_units === DeltaUnits.permil)
                            })];
                    case 1:
                        results = _a.sent();
                        if (results.calculations && results.error_flags && results.rco2_ee) {
                            this.setState({
                                results: {
                                    calculations: results.calculations,
                                    rco2_ee: results.rco2_ee,
                                    error_flags: results.error_flags
                                }
                            });
                            AppToaster.show({
                                message: "Results calculated successfully", intent: "success", timeout: 3000
                            });
                            if (this.scroll_anchor_ref.current)
                                this.scroll_anchor_ref.current.scrollIntoView({ behavior: "smooth" });
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        _this.clear = function () {
            _this.setState({
                input_csv_name: "",
                deuterium_deltas: ["", "", "", "", ""],
                oxygen_deltas: ["", "", "", "", ""],
                datetimes: [_this.now, _this.now, _this.now, _this.now, _this.now],
                dose_weights: ["", ""],
                dose_enrichments: ["", ""],
                subject_weights: ["", ""],
                subject_id: "",
                deuterium_deltas_validated: false,
                oxygen_deltas_validated: false,
                datetimes_validated: false,
                dose_weights_validated: false,
                dose_enrichments_validated: false,
                subject_weights_validated: false,
                results: { calculations: null, rco2_ee: null, error_flags: null },
            });
        };
        _this.handle_csv_upload = function (event) { return __awaiter(_this, void 0, void 0, function () {
            var file, reader;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        file = event.target.files[0];
                        if (!(file.type === "text/csv")) return [3 /*break*/, 2];
                        this.setState({ input_csv_name: file.name });
                        reader = new FileReader();
                        reader.onload = this._load_handler;
                        reader.onerror = this._error_handler;
                        return [4 /*yield*/, reader.readAsText(file)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        AppToaster.show({
                            message: "Select a .csv file. For formatting help, press 'Help' in the upper right hand corner",
                            intent: "danger",
                            timeout: 0
                        });
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.handle_csv_append_choice = function (event) {
            var file = event.target.files[0];
            if (file.type === "text/csv") {
                _this.setState({ append_csv_name: file.name });
            }
            else {
                AppToaster.show({
                    message: "Select an existing .csv file.",
                    intent: "danger",
                    timeout: 0
                });
            }
        };
        _this._load_handler = function (event) {
            console.log("into load handler");
            // @ts-ignore
            var csv = event.target.result;
            var all_text_lines = csv.split(/\r\n|\n/);
            var columns = all_text_lines[0].split(',');
            console.log('columns', columns);
            try {
                var data = all_text_lines[1].split(',');
                console.log('data is', data);
                //TODO: make this deal with other csv orders
                var d_deltas = data.slice(0, 5);
                var o_deltas = data.slice(5, 10);
                var sample_times = data.slice(10, 15);
                var dose_weights = data.slice(15, 17);
                var dose_enrichments = data.slice(17, 19);
                var subject_weights = data.slice(19, 21);
                var subject_id = data.slice(21, 22);
                for (var i = 0; i < d_deltas.length; i++) {
                    _this.handle_deuterium_delta_change(i, d_deltas[i]);
                    _this.handle_oxygen_delta_change(i, o_deltas[i]);
                    _this.handle_date_change(i, moment.utc(sample_times[i]));
                }
                for (var i = 0; i < dose_weights.length; i++) {
                    _this.handle_dose_weight_change(i, dose_weights[i]);
                    _this.handle_dose_enrichment_change(i, dose_enrichments[i]);
                    _this.handle_subject_weight_change(i, subject_weights[i]);
                }
                _this.setState({ subject_id: subject_id });
            }
            catch (e) {
                _this._bad_format("");
            }
        };
        _this._bad_format = function (specific_error) {
            _this.setState({ input_csv_name: "" });
            var display_msg = "Incorrect .csv format." + specific_error + " See 'Help' for expected format.";
            AppToaster.show({ message: display_msg, intent: "danger", timeout: 0 });
        };
        _this._error_handler = function (event) {
            // @ts-ignore
            if (event.target.error.name == "NotReadableError") {
                AppToaster.show({
                    message: "File not readable. For formatting help, press 'Help' in the upper right hand corner",
                    intent: "danger",
                    timeout: 0
                });
            }
        };
        _this.check_numerical_inputs = function (input_aray) {
            for (var _i = 0, input_aray_1 = input_aray; _i < input_aray_1.length; _i++) {
                var value = input_aray_1[_i];
                if (isNaN(+value) || value === "") {
                    return false;
                }
            }
            return true;
        };
        _this._flag_non_numerical_input = function () {
            AppToaster.show({ message: "Enter a numeric value", intent: "danger", timeout: 3000 });
        };
        _this._flag_non_date_input = function () {
            AppToaster.show({ message: "Enter a valid date", intent: "danger", timeout: 3000 });
        };
        _this.handle_deuterium_delta_change = function (index, event) {
            var value = (typeof event === "string") ? event : event.target.value;
            var values_sep_by_spaces = value.split(" ");
            values_sep_by_spaces = values_sep_by_spaces.filter(function (value) { return value !== ""; });
            if (values_sep_by_spaces.length === 1 || value === "") {
                if (!isNaN(+value) || value === "") {
                    var new_deltas = _this.state.deuterium_deltas;
                    new_deltas.splice(index, 1, value);
                    _this.setState({
                        deuterium_deltas: new_deltas,
                        deuterium_deltas_validated: _this.check_numerical_inputs(new_deltas)
                    });
                }
                else
                    _this._flag_non_numerical_input();
            }
            else {
                for (var i = 0; i < values_sep_by_spaces.length; i++) {
                    _this.handle_deuterium_delta_change(index + i, values_sep_by_spaces[i]);
                }
            }
        };
        _this.handle_oxygen_delta_change = function (index, event) {
            var value = (typeof event === "string") ? event : event.target.value;
            var values_sep_by_spaces = value.split(" ");
            values_sep_by_spaces = values_sep_by_spaces.filter(function (value) { return value !== ""; });
            if (values_sep_by_spaces.length === 1 || value === "") {
                if (!isNaN(+value) || (value === "")) {
                    var new_deltas = _this.state.oxygen_deltas;
                    new_deltas.splice(index, 1, value);
                    _this.setState({
                        oxygen_deltas: new_deltas,
                        oxygen_deltas_validated: _this.check_numerical_inputs(new_deltas)
                    });
                }
                else
                    _this._flag_non_numerical_input();
            }
            else {
                for (var i = 0; i < values_sep_by_spaces.length; i++) {
                    _this.handle_oxygen_delta_change(index + i, values_sep_by_spaces[i]);
                }
            }
        };
        _this.handle_date_change = function (index, value) {
            var new_date_array = _this.state.datetimes;
            if (typeof value != "string") {
                var all_dates_filled = true;
                for (var j = 0; j < index; j++) {
                    if ((new_date_array[j] != _this.now) && value.isBefore(new_date_array[j])) {
                        AppToaster.show({
                            message: "Collection dates must be in chronological order.",
                            intent: "danger",
                            timeout: 0
                        });
                        return;
                    }
                    else if (value.isSame(new_date_array[j])) {
                        AppToaster.show({
                            message: "Duplicate collection dates entered", intent: "danger", timeout: 0
                        });
                        return;
                    }
                }
                new_date_array.splice(index, 1, value);
                for (var _i = 0, new_date_array_1 = new_date_array; _i < new_date_array_1.length; _i++) {
                    var date = new_date_array_1[_i];
                    if (date === _this.now) {
                        all_dates_filled = false;
                        break;
                    }
                }
                _this.setState({
                    datetimes: new_date_array,
                    datetimes_validated: all_dates_filled,
                });
            }
            else {
                var split_values = value.split(" ");
                if (value === "") {
                    new_date_array.splice(index, 1, _this.now);
                    _this.setState({ datetimes: new_date_array, datetimes_validated: false });
                }
                else {
                    var i = 0;
                    var skipped_indices = 0; // track indices to place dates in correct boxes
                    while (i < split_values.length) {
                        // deal with spaces between date and time
                        if (moment.parseZone(new Date(split_values[i])).isValid()) {
                            if (i < split_values.length - 1) {
                                if (moment.parseZone(new Date(split_values[i + 1])).isValid()) {
                                    //both valid dates- don't need to worry about spaces, treat them as separate dates
                                    var as_moment = utilities_1.default(split_values[i]);
                                    if (typeof as_moment !== "boolean") {
                                        _this.handle_date_change(index + i, as_moment);
                                    }
                                    i++;
                                }
                                else { // next value isn't a valid date- likely a time. tack it onto the date
                                    var as_moment = utilities_1.default(split_values[i].concat(" ", split_values[i + 1]));
                                    if (typeof as_moment !== "boolean") {
                                        _this.handle_date_change(index + i - skipped_indices, as_moment);
                                    }
                                    skipped_indices++;
                                    i += 2;
                                }
                            }
                            else {
                                var as_moment = utilities_1.default(split_values[i]);
                                if (typeof as_moment !== "boolean") {
                                    _this.handle_date_change(index + i, as_moment);
                                }
                                i++;
                            }
                        }
                        else {
                            _this._flag_non_date_input();
                            i++;
                        }
                    }
                }
            }
        };
        _this.handle_dose_weight_change = function (index, event) {
            if (_this.state.mixed_dose) {
                // if mixed, set both values to this
                _this.handle_dose_weight_change(1, event);
            }
            var value = (typeof event == "string") ? event : event.target.value;
            var values_sep_by_spaces = value.split(" ");
            values_sep_by_spaces = values_sep_by_spaces.filter(function (value) { return value !== ""; });
            if (values_sep_by_spaces.length === 1 || value === "") {
                if (!isNaN(+value) || value === "") {
                    var new_dose_weights = _this.state.dose_weights;
                    new_dose_weights.splice(index, 1, value);
                    _this.setState({
                        dose_weights: new_dose_weights,
                        dose_weights_validated: _this.check_numerical_inputs(new_dose_weights)
                    });
                }
                else
                    _this._flag_non_numerical_input();
            }
            else {
                for (var i = 0; i < values_sep_by_spaces.length; i++) {
                    _this.handle_dose_weight_change(index + i, values_sep_by_spaces[i]);
                }
            }
        };
        _this.handle_dose_enrichment_change = function (index, event) {
            var value = (typeof event == "string") ? event : event.target.value;
            var values_sep_by_spaces = value.split(" ");
            values_sep_by_spaces = values_sep_by_spaces.filter(function (value) { return value !== ""; });
            if (values_sep_by_spaces.length === 1 || value === "") {
                if (!isNaN(+value) || value === "") {
                    var new_enrichments = _this.state.dose_enrichments;
                    new_enrichments.splice(index, 1, value);
                    _this.setState({
                        dose_enrichments: new_enrichments,
                        dose_enrichments_validated: _this.check_numerical_inputs(new_enrichments)
                    });
                }
                else
                    _this._flag_non_numerical_input();
            }
            else {
                for (var i = 0; i < values_sep_by_spaces.length; i++) {
                    _this.handle_dose_enrichment_change(index + i, values_sep_by_spaces[i]);
                }
            }
        };
        _this.handle_subject_weight_change = function (index, event) {
            var value = (typeof event == "string") ? event : event.target.value;
            var values_sep_by_spaces = value.split(" ");
            values_sep_by_spaces = values_sep_by_spaces.filter(function (value) { return value !== ""; });
            if (values_sep_by_spaces.length === 1 || value === "") {
                if (!isNaN(+value) || value === "") {
                    var new_weights = _this.state.subject_weights;
                    new_weights.splice(index, 1, value);
                    _this.setState({
                        subject_weights: new_weights,
                        subject_weights_validated: _this.check_numerical_inputs(new_weights)
                    });
                }
                else
                    _this._flag_non_numerical_input();
            }
            else {
                for (var i = 0; i < values_sep_by_spaces.length; i++) {
                    _this.handle_subject_weight_change(index + i, values_sep_by_spaces[i]);
                }
            }
        };
        _this.now = moment();
        _this.scroll_anchor_ref = React.createRef();
        _this.state = {
            input_csv_name: "",
            info_overlay_open: false,
            delta_units: DeltaUnits.permil,
            deuterium_deltas: ["", "", "", "", ""],
            oxygen_deltas: ["", "", "", "", ""],
            datetimes: [_this.now, _this.now, _this.now, _this.now, _this.now],
            dose_weights: ["", ""],
            dose_enrichments: ["", ""],
            mixed_dose: false,
            subject_weights: ["", ""],
            subject_id: "",
            deuterium_deltas_validated: false,
            oxygen_deltas_validated: false,
            datetimes_validated: false,
            dose_weights_validated: false,
            dose_enrichments_validated: false,
            subject_weights_validated: false,
            results: { calculations: null, rco2_ee: null, error_flags: null },
            new_csv_name: "", append_csv_name: ""
        };
        return _this;
    }
    DLWApp.prototype.render = function () {
        var _this = this;
        var all_inputs_validated = (this.state.deuterium_deltas_validated && this.state.oxygen_deltas_validated
            && this.state.datetimes_validated && this.state.dose_weights_validated
            && this.state.dose_enrichments_validated && this.state.subject_weights_validated
            && this.state.subject_id);
        var deuterium_delta_inputs = [];
        var oxygen_delta_inputs = [];
        var collection_time_inputs = [];
        var _loop_1 = function (i) {
            deuterium_delta_inputs.push(React.createElement(NumberInput_1.NumberInput, { placeholder: exports.SAMPLE_LABELS[i] + " Deuterium delta", index: i, key: i, change_function: this_1.handle_deuterium_delta_change, unit: this_1.state.delta_units, value: this_1.state.deuterium_deltas[i] }));
            oxygen_delta_inputs.push(React.createElement(NumberInput_1.NumberInput, { placeholder: exports.SAMPLE_LABELS[i] + ' Oxygen 18 delta', index: i, key: i, unit: this_1.state.delta_units, change_function: this_1.handle_oxygen_delta_change, value: this_1.state.oxygen_deltas[i] }));
            collection_time_inputs.push(React.createElement(DateTimePicker, { onChange: function (value) { return _this.handle_date_change(i, value); }, inputProps: {
                    className: 'date-input-box .bp3-input',
                    placeholder: ' ' + exports.SAMPLE_LABELS[i] + ' sample date and time',
                    value: (this_1.state.datetimes[i] === this_1.now) ? "" : this_1.state.datetimes[i].format('YYYY-MM-DD HH:mm')
                }, key: i, value: this_1.state.datetimes[i], dateFormat: "YYYY-MM-DD", timeFormat: "HH:mm" }));
        };
        var this_1 = this;
        for (var i = 0; i < NUM_SAMPLE_TIMES; i++) {
            _loop_1(i);
        }
        var dose_weight_inputs = [];
        var dose_enrichment_inputs = [];
        for (var i = 0; i < ELEMENTS.length; i++) {
            if (!this.state.mixed_dose) {
                dose_weight_inputs.push(React.createElement(NumberInput_1.NumberInput, { placeholder: ELEMENTS[i] + ' dose weight (g)', index: i, key: i, unit: "g", change_function: this.handle_dose_weight_change, value: this.state.dose_weights[i] }));
            }
            dose_enrichment_inputs.push(React.createElement(NumberInput_1.NumberInput, { placeholder: ELEMENTS[i] + ' dose enrichment (ppm)', index: i, key: i, change_function: this.handle_dose_enrichment_change, value: this.state.dose_enrichments[i], unit: "ppm" }));
        }
        if (this.state.mixed_dose) {
            dose_weight_inputs.push(React.createElement(NumberInput_1.NumberInput, { placeholder: "Dose weight (g)", index: 0, value: this.state.dose_weights[0], unit: "g", change_function: this.handle_dose_weight_change }));
        }
        var results_display = React.createElement("div", null);
        if (this.state.results.calculations && this.state.results.rco2_ee && this.state.results.error_flags) {
            var results_calculations = [];
            var results_rco2_ee = [];
            var results_error_flags = [];
            results_calculations.push(React.createElement("div", { className: 'result-pair' },
                React.createElement("p", { className: "result-label" }, this.state.results.calculations.ndp_kg[0] + ":"),
                React.createElement("p", { className: "result-value" }, this.state.results.calculations.ndp_kg[1] + " kg")));
            results_calculations.push(React.createElement("div", { className: 'result-pair' },
                React.createElement("p", { className: "result-label" }, this.state.results.calculations.kd_hr[0] + ":"),
                React.createElement("p", { className: "result-value" }, this.state.results.calculations.kd_hr[1])));
            results_calculations.push(React.createElement("div", { className: 'result-pair' },
                React.createElement("p", { className: "result-label" }, this.state.results.calculations.nop_kg[0] + ":"),
                React.createElement("p", { className: "result-value" }, this.state.results.calculations.nop_kg[1] + " kg")));
            results_calculations.push(React.createElement("div", { className: 'result-pair' },
                React.createElement("p", { className: "result-label" }, this.state.results.calculations.ko_hr[0] + ":"),
                React.createElement("p", { className: "result-value" }, this.state.results.calculations.ko_hr[1])));
            results_calculations.push(React.createElement("div", { className: 'result-pair' },
                React.createElement("p", { className: "result-label" }, this.state.results.calculations.body_water_avg_kg[0] + ":"),
                React.createElement("p", { className: "result-value" }, this.state.results.calculations.body_water_avg_kg[1] + " kg")));
            results_calculations.push(React.createElement("div", { className: 'result-pair' },
                React.createElement("p", { className: "result-label" }, this.state.results.calculations.fat_free_mass_kg[0] + ":"),
                React.createElement("p", { className: "result-value" }, this.state.results.calculations.fat_free_mass_kg[1] + " kg")));
            results_calculations.push(React.createElement("div", { className: 'result-pair' },
                React.createElement("p", { className: "result-label" }, this.state.results.calculations.fat_mass_kg[0] + ":"),
                React.createElement("p", { className: "result-value" }, this.state.results.calculations.fat_mass_kg[1] + " kg")));
            results_calculations.push(React.createElement("div", { className: 'result-pair' },
                React.createElement("p", { className: "result-label" }, this.state.results.calculations.body_fat_percentage[0] + ":"),
                React.createElement("p", { className: "result-value" }, this.state.results.calculations.body_fat_percentage[1] + "%")));
            results_rco2_ee.push(React.createElement("div", { className: 'result-pair' },
                React.createElement("p", { className: "result-label" }, this.state.results.rco2_ee.rco2_mol_day[0] + ":"),
                React.createElement("p", { className: "result-value" }, this.state.results.rco2_ee.rco2_mol_day[1] + " mol/day")));
            results_rco2_ee.push(React.createElement("div", { className: 'result-pair' },
                React.createElement("p", { className: "result-label" }, this.state.results.rco2_ee.rco2_l_hr[0] + ":"),
                React.createElement("p", { className: "result-value" }, this.state.results.rco2_ee.rco2_l_hr[1] + " L/hour")));
            results_rco2_ee.push(React.createElement("div", { className: 'result-pair' },
                React.createElement("p", { className: "result-label" }, this.state.results.rco2_ee.ee_kcal_day[0] + ":"),
                React.createElement("p", { className: "result-value" }, this.state.results.rco2_ee.ee_kcal_day[1] + " kcal/day")));
            results_rco2_ee.push(React.createElement("div", { className: 'result-pair' },
                React.createElement("p", { className: "result-label" }, this.state.results.rco2_ee.ee_mj_day[0] + ":"),
                React.createElement("p", { className: "result-value" }, this.state.results.rco2_ee.ee_mj_day[1] + " MJ/day")));
            var error_okay = "error-okay";
            var outside_error_bars = "error_not_okay";
            var error_class = ((parseFloat(this.state.results.error_flags.plateau_2h[1]) < 0.05) ? error_okay : outside_error_bars);
            results_error_flags.push(React.createElement("div", { className: 'result-pair' },
                React.createElement("p", { className: "result-label" }, this.state.results.error_flags.plateau_2h[0] + ":"),
                React.createElement("p", { className: "result-value " + error_class }, this.state.results.error_flags.plateau_2h[1])));
            error_class = ((parseFloat(this.state.results.error_flags.plateau_180[1]) < 0.05) ? error_okay : outside_error_bars);
            results_error_flags.push(React.createElement("div", { className: 'result-pair' },
                React.createElement("p", { className: "result-label" }, this.state.results.error_flags.plateau_180[0] + ":"),
                React.createElement("p", { className: "result-value " + error_class }, this.state.results.error_flags.plateau_180[1])));
            error_class = ((parseFloat(this.state.results.error_flags.ds_ratio[1]) < 1.070 &&
                parseFloat(this.state.results.error_flags.ds_ratio[1]) > 1) ? error_okay : outside_error_bars);
            results_error_flags.push(React.createElement("div", { className: 'result-pair' },
                React.createElement("p", { className: "result-label" }, this.state.results.error_flags.ds_ratio[0] + ":"),
                React.createElement("p", { className: "result-value " + error_class }, this.state.results.error_flags.ds_ratio[1])));
            error_class = ((parseFloat(this.state.results.error_flags.ee[1]) < 10) ? error_okay : outside_error_bars);
            results_error_flags.push(React.createElement("div", { className: 'result-pair' },
                React.createElement("p", { className: "result-label" }, this.state.results.error_flags.ee[0] + ":"),
                React.createElement("p", { className: "result-value " + error_class }, this.state.results.error_flags.ee[1] + "%")));
            error_class = ((parseFloat(this.state.results.error_flags.ko_kd[1]) < 1.7 &&
                parseFloat(this.state.results.error_flags.ko_kd[1]) > 1.1) ? error_okay : outside_error_bars);
            results_error_flags.push(React.createElement("div", { className: 'result-pair' },
                React.createElement("p", { className: "result-label" }, this.state.results.error_flags.ko_kd[0] + ":"),
                React.createElement("p", { className: "result-value " + error_class }, this.state.results.error_flags.ko_kd[1])));
            var chart_data_d_meas = [];
            var chart_data_o18_meas = [];
            for (var i = 0; i < this.state.deuterium_deltas.length; i++) {
                chart_data_d_meas.push({ x: i, y: this.state.deuterium_deltas[i] });
                chart_data_o18_meas.push({ x: i, y: this.state.oxygen_deltas[i] });
            }
            var deltas_chart = (React.createElement(DeltaScatterChart_1.DeltaScatterChart, { delta_units: this.state.delta_units, chart_data_d_meas: chart_data_d_meas, chart_data_o18_meas: chart_data_o18_meas }));
            results_display = (React.createElement("div", { className: 'results-display', ref: this.scroll_anchor_ref },
                React.createElement(cjs_1.Card, { className: 'results-card' },
                    React.createElement("h1", null, 'Results for subject ' + this.state.subject_id),
                    React.createElement("div", { className: 'result-sections' },
                        React.createElement("div", { className: 'result-section' },
                            React.createElement("h5", { className: 'result-header-calc' }, "Calculations"),
                            results_calculations),
                        React.createElement("div", { className: 'result-section' },
                            React.createElement("h5", { className: 'result-header-calc' }, "rCO2 and EE, intercept method"),
                            results_rco2_ee),
                        React.createElement("div", { className: 'result-section' },
                            React.createElement("h5", { className: 'result-header-error' }, "Error Flags"),
                            results_error_flags))),
                React.createElement(cjs_1.Card, { className: 'results-card' },
                    React.createElement("div", { className: 'result-sections' },
                        React.createElement("div", { className: 'result-section' }, deltas_chart)))));
        }
        return (React.createElement(cjs_1.Navbar, { className: 'dlw-nav' },
            React.createElement(core_1.Dialog, { isOpen: this.state.info_overlay_open, canEscapeKeyClose: true, canOutsideClickClose: false, hasBackdrop: true, isCloseButtonShown: true, onClose: function () {
                    _this.setState({ info_overlay_open: false });
                }, title: 'How to use the Doubly Labeled Water App' },
                React.createElement("p", null, "some helpful text- include CSV formatting")),
            React.createElement(cjs_1.NavbarGroup, { align: core_1.Alignment.LEFT },
                React.createElement(cjs_1.Navbar.Heading, { className: 'dlw-title' }, "Doubly Labeled Water")),
            React.createElement(cjs_1.NavbarGroup, { align: core_1.Alignment.RIGHT },
                React.createElement(cjs_1.NavbarHeading, { className: 'tagline' }, "an open source project"),
                React.createElement("img", { src: "assets/logo_cuhs.png", alt: "University of Colorado Anschutz Medical Campus logo", style: { 'height': 30 } }),
                React.createElement(cjs_1.NavbarDivider, null),
                React.createElement("a", { href: "https://github.com/jchmyz/DoublyLabeledWater", target: "_blank" }, "DoublyLabeledWater on GitHub"),
                React.createElement(cjs_1.NavbarDivider, null),
                React.createElement(core_1.Button, { icon: "help", minimal: true, onClick: function () { return _this.setState({ info_overlay_open: true }); } }, "Help")),
            React.createElement(core_1.FormGroup, { className: 'dlw-app' },
                React.createElement("div", { className: 'subject-clear' },
                    React.createElement("div", null,
                        React.createElement("h5", null, "Subject ID"),
                        React.createElement(core_1.InputGroup, { leftIcon: (this.state.subject_id ? "tick" : "circle-arrow-right"), className: '.bp3-fill subject-id', onChange: function (event) { return _this.setState({ subject_id: event.target.value }); }, placeholder: 'ID', value: this.state.subject_id })),
                    React.createElement("div", null,
                        React.createElement(core_1.Button, { className: 'clear-button', onClick: this.clear }, "CLEAR INPUTS"))),
                React.createElement("div", { className: 'load-from-csv' },
                    React.createElement("h5", null, "Load input data from .csv file"),
                    React.createElement(core_1.FileInput, { text: this.state.input_csv_name || "Choose file...", onInputChange: this.handle_csv_upload, disabled: !!(this.state.input_csv_name) })),
                React.createElement("div", { className: 'samples' },
                    React.createElement("div", { className: 'date-inputs' },
                        React.createElement("h5", null, "Collection Dates and Times"),
                        collection_time_inputs),
                    React.createElement("div", { className: 'delta-inputs' },
                        React.createElement("h5", null, "Deuterium Delta Values"),
                        deuterium_delta_inputs),
                    React.createElement("div", { className: 'delta-inputs' },
                        React.createElement("h5", null, "Oxygen 18 Delta Values"),
                        oxygen_delta_inputs),
                    React.createElement("div", { className: 'delta-unit-radio' },
                        React.createElement(core_1.RadioGroup, { onChange: function (event) {
                                _this.setState({ delta_units: event.target.value });
                            }, selectedValue: this.state.delta_units },
                            React.createElement(core_1.Radio, { label: "permil", value: DeltaUnits.permil, large: true }),
                            React.createElement(core_1.Radio, { label: "ppm", value: DeltaUnits.ppm, large: true })))),
                React.createElement("div", { className: 'element-wise-inputs' },
                    React.createElement("div", { className: 'mixed-dose-box' },
                        React.createElement(core_1.Checkbox, { checked: this.state.mixed_dose, labelElement: React.createElement("h5", null, "Mixed Dose"), large: true, onChange: function () {
                                _this.setState({ mixed_dose: !_this.state.mixed_dose });
                            }, alignIndicator: core_1.Alignment.RIGHT }))),
                React.createElement("div", { className: 'element-wise-inputs' },
                    React.createElement("div", { className: 'inputs-by-element' },
                        React.createElement("h5", null, "Dose Weights"),
                        dose_weight_inputs),
                    React.createElement("div", { className: 'inputs-by-element' },
                        React.createElement("h5", null, "Dose Enrichments"),
                        dose_enrichment_inputs)),
                React.createElement("div", { className: 'element-wise-inputs' },
                    React.createElement("div", { className: 'inputs-by-element' },
                        React.createElement("h5", null, "Subject Weight"),
                        React.createElement(NumberInput_1.NumberInput, { placeholder: "Initial subject weight (kg)", index: 0, change_function: this.handle_subject_weight_change, unit: 'kg', value: this.state.subject_weights[0] }),
                        React.createElement(NumberInput_1.NumberInput, { placeholder: "Final subject weight (kg)", index: 1, change_function: this.handle_subject_weight_change, unit: 'kg', value: this.state.subject_weights[1] })),
                    React.createElement(core_1.Button, { className: 'calculate-button', onClick: this.submit_inputs, intent: core_1.Intent.SUCCESS, disabled: !all_inputs_validated }, "CALCULATE RESULTS")),
                React.createElement("div", { className: 'submit-group' },
                    React.createElement("div", { className: 'csv-input-new' },
                        React.createElement("h5", null, "Input a name for a new .csv file"),
                        React.createElement(core_1.InputGroup, { placeholder: 'CSV filename', className: 'csv_input', onChange: function (event) {
                                return _this.setState({ new_csv_name: event.target.value });
                            } })),
                    React.createElement("div", { className: 'csv-append' },
                        React.createElement("h5", null, "Or, select an existing .csv file to append results to"),
                        React.createElement(core_1.FileInput, { text: this.state.append_csv_name || "Choose file...", onInputChange: this.handle_csv_append_choice, className: 'csv-input' })),
                    React.createElement(core_1.Button, { onClick: this.export, disabled: !(this.state.results.calculations && (this.state.new_csv_name || this.state.append_csv_name)), className: 'export-button', intent: core_1.Intent.SUCCESS }, "EXPORT TO CSV")),
                results_display)));
    };
    return DLWApp;
}(React.Component));
exports.DLWApp = DLWApp;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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Y0FBYztvQkFDekIsNkJBQUssU0FBUyxFQUFDLGVBQWU7d0JBQzFCLG1FQUF5Qzt3QkFDekMsb0JBQUMsaUJBQVUsSUFBQyxXQUFXLEVBQUMsY0FBYyxFQUFDLFNBQVMsRUFBQyxXQUFXLEVBQ2hELFFBQVEsRUFBRSxVQUFDLEtBQTZCO2dDQUNwQyxPQUFBLEtBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxZQUFZLEVBQUcsS0FBSyxDQUFDLE1BQTJCLENBQUMsS0FBSyxFQUFDLENBQUM7NEJBQXZFLENBQXVFLEdBQUcsQ0FDeEY7b0JBQ04sNkJBQUssU0FBUyxFQUFDLFlBQVk7d0JBQ3ZCLHdGQUE4RDt3QkFDOUQsb0JBQUMsZ0JBQVMsSUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLElBQUksZ0JBQWdCLEVBQ3BELGFBQWEsRUFBRSxJQUFJLENBQUMsd0JBQXdCLEVBQUUsU0FBUyxFQUFDLFdBQVcsR0FBRSxDQUM5RTtvQkFDTixvQkFBQyxhQUFNLElBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQzdILFNBQVMsRUFBQyxlQUFlLEVBQUMsTUFBTSxFQUFFLGFBQU0sQ0FBQyxPQUFPLG9CQUF3QixDQUM5RTtnQkFDTCxlQUFlLENBQ1IsQ0FDUCxDQUNaLENBQUM7SUFDTixDQUFDO0lBa1dMLGFBQUM7QUFBRCxDQW5yQkEsQUFtckJDLENBbnJCMkIsS0FBSyxDQUFDLFNBQVMsR0FtckIxQztBQW5yQlksd0JBQU0iLCJmaWxlIjoiRExXQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge1xuICAgIEJ1dHRvbkdyb3VwLCBQb3BvdmVyLFxuICAgIEZvcm1Hcm91cCxcbiAgICBOdW1lcmljSW5wdXQsXG4gICAgQnV0dG9uLCBUb2FzdGVyLCBQb3NpdGlvbixcbiAgICBJbnB1dEdyb3VwLCBBbGlnbm1lbnQsIFRhZywgRmlsZUlucHV0LCBEaWFsb2csIENoZWNrYm94LCBSYWRpbywgUmFkaW9Hcm91cCwgSW50ZW50XG59IGZyb20gXCJAYmx1ZXByaW50anMvY29yZVwiO1xuaW1wb3J0ICogYXMgRGF0ZVRpbWVQaWNrZXIgZnJvbSAncmVhY3QtZGF0ZXRpbWUnO1xuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQge2NhbGN1bGF0ZV9mcm9tX2lucHV0cywgZXhwb3J0X3RvX2Nzdn0gZnJvbSBcIi4vUmVxdWVzdHNcIjtcbmltcG9ydCB7Rm9ybUV2ZW50LCBSZWZPYmplY3R9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtDYXJkLCBJY29uLCBOYXZiYXIsIE5hdmJhckRpdmlkZXIsIE5hdmJhckdyb3VwLCBOYXZiYXJIZWFkaW5nfSBmcm9tIFwiQGJsdWVwcmludGpzL2NvcmUvbGliL2Nqc1wiO1xuaW1wb3J0IHtOdW1iZXJJbnB1dH0gZnJvbSBcIi4vTnVtYmVySW5wdXRcIjtcbmltcG9ydCBjb252ZXJ0X3N0cmluZ190b19tb21lbnQgZnJvbSBcIi4vdXRpbGl0aWVzXCI7XG5pbXBvcnQge0RlbHRhU2NhdHRlckNoYXJ0fSBmcm9tIFwiLi9EZWx0YVNjYXR0ZXJDaGFydFwiO1xuXG5jb25zdCBERVVURVJJVU0gPSBcIkRldXRlcml1bVwiO1xuY29uc3QgT1hZR0VOID0gXCJPeHlnZW4gMThcIjtcbmNvbnN0IEVMRU1FTlRTID0gW0RFVVRFUklVTSwgT1hZR0VOXTtcblxuY29uc3QgTlVNX1NBTVBMRV9USU1FUyA9IDU7XG5leHBvcnQgY29uc3QgU0FNUExFX0xBQkVMUyA9IFsnQmFja2dyb3VuZCcsICdQRDQnLCAnUEQ1JywgJ0VENCcsICdFRDUnXTtcblxuXG5leHBvcnQgaW50ZXJmYWNlIFJlc3VsdHMge1xuICAgIGNhbGN1bGF0aW9uczoge1xuICAgICAgICBuZHBfa2c6IHN0cmluZ1tdLFxuICAgICAgICBrZF9ocjogc3RyaW5nW10sXG4gICAgICAgIG5vcF9rZzogc3RyaW5nW10sXG4gICAgICAgIGtvX2hyOiBzdHJpbmdbXSxcbiAgICAgICAgYm9keV93YXRlcl9hdmdfa2c6IHN0cmluZ1tdLFxuICAgICAgICBmYXRfZnJlZV9tYXNzX2tnOiBzdHJpbmdbXSxcbiAgICAgICAgZmF0X21hc3Nfa2c6IHN0cmluZ1tdLFxuICAgICAgICBib2R5X2ZhdF9wZXJjZW50YWdlOiBzdHJpbmdbXVxuICAgIH0gfCBudWxsLFxuICAgIHJjbzJfZWU6IHtcbiAgICAgICAgcmNvMl9tb2xfZGF5OiBzdHJpbmdbXSxcbiAgICAgICAgcmNvMl9sX2hyOiBzdHJpbmdbXSxcbiAgICAgICAgZWVfa2NhbF9kYXk6IHN0cmluZ1tdLFxuICAgICAgICBlZV9tal9kYXk6IHN0cmluZ1tdXG4gICAgfSB8IG51bGwsXG4gICAgZXJyb3JfZmxhZ3M6IHtcbiAgICAgICAgcGxhdGVhdV8yaDogc3RyaW5nW10sXG4gICAgICAgIHBsYXRlYXVfMTgwOiBzdHJpbmdbXSxcbiAgICAgICAgZHNfcmF0aW86IHN0cmluZ1tdLFxuICAgICAgICBlZTogc3RyaW5nW10sXG4gICAgICAgIGtvX2tkOiBzdHJpbmdbXVxuICAgIH0gfCBudWxsXG59XG5cbmVudW0gRGVsdGFVbml0cyB7XG4gICAgcGVybWlsID0gXCJwZXJtaWxcIixcbiAgICBwcG0gPSBcInBwbVwiXG59XG5cbmludGVyZmFjZSBETFdTdGF0ZSB7XG4gICAgaW5wdXRfY3N2X25hbWU6IHN0cmluZztcbiAgICBpbmZvX292ZXJsYXlfb3BlbjogYm9vbGVhbjtcblxuICAgIGRlbHRhX3VuaXRzOiBEZWx0YVVuaXRzO1xuICAgIGRldXRlcml1bV9kZWx0YXM6IHN0cmluZ1tdLFxuICAgIG94eWdlbl9kZWx0YXM6IHN0cmluZ1tdLFxuICAgIGRhdGV0aW1lczogbW9tZW50Lk1vbWVudFtdLFxuICAgIGRvc2Vfd2VpZ2h0czogc3RyaW5nW10sXG4gICAgZG9zZV9lbnJpY2htZW50czogc3RyaW5nW10sXG4gICAgc3ViamVjdF93ZWlnaHRzOiBzdHJpbmdbXSxcbiAgICBzdWJqZWN0X2lkOiBzdHJpbmc7XG4gICAgbWl4ZWRfZG9zZTogYm9vbGVhbjtcblxuICAgIGRldXRlcml1bV9kZWx0YXNfdmFsaWRhdGVkOiBib29sZWFuLFxuICAgIG94eWdlbl9kZWx0YXNfdmFsaWRhdGVkOiBib29sZWFuLFxuICAgIGRhdGV0aW1lc192YWxpZGF0ZWQ6IGJvb2xlYW4sXG4gICAgZG9zZV93ZWlnaHRzX3ZhbGlkYXRlZDogYm9vbGVhbixcbiAgICBkb3NlX2VucmljaG1lbnRzX3ZhbGlkYXRlZDogYm9vbGVhbixcbiAgICBzdWJqZWN0X3dlaWdodHNfdmFsaWRhdGVkOiBib29sZWFuLFxuXG4gICAgcmVzdWx0czogUmVzdWx0c1xuICAgIG5ld19jc3ZfbmFtZTogc3RyaW5nLFxuICAgIGFwcGVuZF9jc3ZfbmFtZTogc3RyaW5nXG59XG5cbmNvbnN0IEFwcFRvYXN0ZXIgPSBUb2FzdGVyLmNyZWF0ZSh7Y2xhc3NOYW1lOiBcImFwcC10b2FzdGVyXCIsIHBvc2l0aW9uOiBQb3NpdGlvbi5UT1BfUklHSFR9KTtcblxuZXhwb3J0IGNsYXNzIERMV0FwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxhbnksIERMV1N0YXRlPiB7XG4gICAgbm93OiBtb21lbnQuTW9tZW50O1xuICAgIHNjcm9sbF9hbmNob3JfcmVmOiBSZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQ+O1xuXG4gICAgY29uc3RydWN0b3IocHJvcHM6IGFueSkge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMubm93ID0gbW9tZW50KCk7XG4gICAgICAgIHRoaXMuc2Nyb2xsX2FuY2hvcl9yZWYgPSBSZWFjdC5jcmVhdGVSZWYoKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGlucHV0X2Nzdl9uYW1lOiBcIlwiLFxuICAgICAgICAgICAgaW5mb19vdmVybGF5X29wZW46IGZhbHNlLFxuXG4gICAgICAgICAgICBkZWx0YV91bml0czogRGVsdGFVbml0cy5wZXJtaWwsXG4gICAgICAgICAgICBkZXV0ZXJpdW1fZGVsdGFzOiBbXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIl0sXG4gICAgICAgICAgICBveHlnZW5fZGVsdGFzOiBbXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIl0sXG4gICAgICAgICAgICBkYXRldGltZXM6IFt0aGlzLm5vdywgdGhpcy5ub3csIHRoaXMubm93LCB0aGlzLm5vdywgdGhpcy5ub3ddLFxuICAgICAgICAgICAgZG9zZV93ZWlnaHRzOiBbXCJcIiwgXCJcIl0sXG4gICAgICAgICAgICBkb3NlX2VucmljaG1lbnRzOiBbXCJcIiwgXCJcIl0sXG4gICAgICAgICAgICBtaXhlZF9kb3NlOiBmYWxzZSxcbiAgICAgICAgICAgIHN1YmplY3Rfd2VpZ2h0czogW1wiXCIsIFwiXCJdLFxuICAgICAgICAgICAgc3ViamVjdF9pZDogXCJcIixcblxuICAgICAgICAgICAgZGV1dGVyaXVtX2RlbHRhc192YWxpZGF0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgb3h5Z2VuX2RlbHRhc192YWxpZGF0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgZGF0ZXRpbWVzX3ZhbGlkYXRlZDogZmFsc2UsXG4gICAgICAgICAgICBkb3NlX3dlaWdodHNfdmFsaWRhdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGRvc2VfZW5yaWNobWVudHNfdmFsaWRhdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIHN1YmplY3Rfd2VpZ2h0c192YWxpZGF0ZWQ6IGZhbHNlLFxuXG4gICAgICAgICAgICByZXN1bHRzOiB7Y2FsY3VsYXRpb25zOiBudWxsLCByY28yX2VlOiBudWxsLCBlcnJvcl9mbGFnczogbnVsbH0sXG4gICAgICAgICAgICBuZXdfY3N2X25hbWU6IFwiXCIsIGFwcGVuZF9jc3ZfbmFtZTogXCJcIlxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IGFsbF9pbnB1dHNfdmFsaWRhdGVkID1cbiAgICAgICAgICAgICh0aGlzLnN0YXRlLmRldXRlcml1bV9kZWx0YXNfdmFsaWRhdGVkICYmIHRoaXMuc3RhdGUub3h5Z2VuX2RlbHRhc192YWxpZGF0ZWRcbiAgICAgICAgICAgICAgICAmJiB0aGlzLnN0YXRlLmRhdGV0aW1lc192YWxpZGF0ZWQgJiYgdGhpcy5zdGF0ZS5kb3NlX3dlaWdodHNfdmFsaWRhdGVkXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5zdGF0ZS5kb3NlX2VucmljaG1lbnRzX3ZhbGlkYXRlZCAmJiB0aGlzLnN0YXRlLnN1YmplY3Rfd2VpZ2h0c192YWxpZGF0ZWRcbiAgICAgICAgICAgICAgICAmJiB0aGlzLnN0YXRlLnN1YmplY3RfaWQpO1xuXG4gICAgICAgIGxldCBkZXV0ZXJpdW1fZGVsdGFfaW5wdXRzOiBKU1guRWxlbWVudFtdID0gW107XG4gICAgICAgIGxldCBveHlnZW5fZGVsdGFfaW5wdXRzOiBKU1guRWxlbWVudFtdID0gW107XG4gICAgICAgIGxldCBjb2xsZWN0aW9uX3RpbWVfaW5wdXRzOiBKU1guRWxlbWVudFtdID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTlVNX1NBTVBMRV9USU1FUzsgaSsrKSB7XG4gICAgICAgICAgICBkZXV0ZXJpdW1fZGVsdGFfaW5wdXRzLnB1c2goXG4gICAgICAgICAgICAgICAgPE51bWJlcklucHV0IHBsYWNlaG9sZGVyPXtTQU1QTEVfTEFCRUxTW2ldICsgXCIgRGV1dGVyaXVtIGRlbHRhXCJ9IGluZGV4PXtpfSBrZXk9e2l9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZV9mdW5jdGlvbj17dGhpcy5oYW5kbGVfZGV1dGVyaXVtX2RlbHRhX2NoYW5nZX0gdW5pdD17dGhpcy5zdGF0ZS5kZWx0YV91bml0c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuZGV1dGVyaXVtX2RlbHRhc1tpXX0vPik7XG4gICAgICAgICAgICBveHlnZW5fZGVsdGFfaW5wdXRzLnB1c2goXG4gICAgICAgICAgICAgICAgPE51bWJlcklucHV0IHBsYWNlaG9sZGVyPXtTQU1QTEVfTEFCRUxTW2ldICsgJyBPeHlnZW4gMTggZGVsdGEnfSBpbmRleD17aX0ga2V5PXtpfSB1bml0PXt0aGlzLnN0YXRlLmRlbHRhX3VuaXRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VfZnVuY3Rpb249e3RoaXMuaGFuZGxlX294eWdlbl9kZWx0YV9jaGFuZ2V9IHZhbHVlPXt0aGlzLnN0YXRlLm94eWdlbl9kZWx0YXNbaV19Lz4pO1xuICAgICAgICAgICAgY29sbGVjdGlvbl90aW1lX2lucHV0cy5wdXNoKFxuICAgICAgICAgICAgICAgIDxEYXRlVGltZVBpY2tlciBvbkNoYW5nZT17KHZhbHVlKSA9PiB0aGlzLmhhbmRsZV9kYXRlX2NoYW5nZShpLCB2YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2RhdGUtaW5wdXQtYm94IC5icDMtaW5wdXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICcgJyArIFNBTVBMRV9MQUJFTFNbaV0gKyAnIHNhbXBsZSBkYXRlIGFuZCB0aW1lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAodGhpcy5zdGF0ZS5kYXRldGltZXNbaV0gPT09IHRoaXMubm93KSA/IFwiXCIgOiB0aGlzLnN0YXRlLmRhdGV0aW1lc1tpXS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW0nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2l9IHZhbHVlPXt0aGlzLnN0YXRlLmRhdGV0aW1lc1tpXX0gZGF0ZUZvcm1hdD1cIllZWVktTU0tRERcIiB0aW1lRm9ybWF0PVwiSEg6bW1cIi8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRvc2Vfd2VpZ2h0X2lucHV0czogSlNYLkVsZW1lbnRbXSA9IFtdO1xuICAgICAgICBsZXQgZG9zZV9lbnJpY2htZW50X2lucHV0czogSlNYLkVsZW1lbnRbXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEVMRU1FTlRTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhdGUubWl4ZWRfZG9zZSkge1xuICAgICAgICAgICAgICAgIGRvc2Vfd2VpZ2h0X2lucHV0cy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICA8TnVtYmVySW5wdXQgcGxhY2Vob2xkZXI9e0VMRU1FTlRTW2ldICsgJyBkb3NlIHdlaWdodCAoZyknfSBpbmRleD17aX0ga2V5PXtpfSB1bml0PXtcImdcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZV9mdW5jdGlvbj17dGhpcy5oYW5kbGVfZG9zZV93ZWlnaHRfY2hhbmdlfSB2YWx1ZT17dGhpcy5zdGF0ZS5kb3NlX3dlaWdodHNbaV19Lz4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZG9zZV9lbnJpY2htZW50X2lucHV0cy5wdXNoKFxuICAgICAgICAgICAgICAgIDxOdW1iZXJJbnB1dCBwbGFjZWhvbGRlcj17RUxFTUVOVFNbaV0gKyAnIGRvc2UgZW5yaWNobWVudCAocHBtKSd9IGluZGV4PXtpfSBrZXk9e2l9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZV9mdW5jdGlvbj17dGhpcy5oYW5kbGVfZG9zZV9lbnJpY2htZW50X2NoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuZG9zZV9lbnJpY2htZW50c1tpXX0gdW5pdD17XCJwcG1cIn0vPik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUubWl4ZWRfZG9zZSkge1xuICAgICAgICAgICAgZG9zZV93ZWlnaHRfaW5wdXRzLnB1c2goXG4gICAgICAgICAgICAgICAgPE51bWJlcklucHV0IHBsYWNlaG9sZGVyPXtcIkRvc2Ugd2VpZ2h0IChnKVwifSBpbmRleD17MH0gdmFsdWU9e3RoaXMuc3RhdGUuZG9zZV93ZWlnaHRzWzBdfSB1bml0PXtcImdcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlX2Z1bmN0aW9uPXt0aGlzLmhhbmRsZV9kb3NlX3dlaWdodF9jaGFuZ2V9Lz4pO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZXN1bHRzX2Rpc3BsYXk6IEpTWC5FbGVtZW50ID0gPGRpdi8+O1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5yZXN1bHRzLmNhbGN1bGF0aW9ucyAmJiB0aGlzLnN0YXRlLnJlc3VsdHMucmNvMl9lZSAmJiB0aGlzLnN0YXRlLnJlc3VsdHMuZXJyb3JfZmxhZ3MpIHtcbiAgICAgICAgICAgIGxldCByZXN1bHRzX2NhbGN1bGF0aW9uczogSlNYLkVsZW1lbnRbXSA9IFtdO1xuICAgICAgICAgICAgbGV0IHJlc3VsdHNfcmNvMl9lZTogSlNYLkVsZW1lbnRbXSA9IFtdO1xuICAgICAgICAgICAgbGV0IHJlc3VsdHNfZXJyb3JfZmxhZ3M6IEpTWC5FbGVtZW50W10gPSBbXTtcbiAgICAgICAgICAgIHJlc3VsdHNfY2FsY3VsYXRpb25zLnB1c2goXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jlc3VsdC1wYWlyJz5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicmVzdWx0LWxhYmVsXCI+e3RoaXMuc3RhdGUucmVzdWx0cy5jYWxjdWxhdGlvbnMubmRwX2tnWzBdICsgXCI6XCJ9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJyZXN1bHQtdmFsdWVcIj57dGhpcy5zdGF0ZS5yZXN1bHRzLmNhbGN1bGF0aW9ucy5uZHBfa2dbMV0gKyBcIiBrZ1wifTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj4pO1xuICAgICAgICAgICAgcmVzdWx0c19jYWxjdWxhdGlvbnMucHVzaChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncmVzdWx0LXBhaXInPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJyZXN1bHQtbGFiZWxcIj57dGhpcy5zdGF0ZS5yZXN1bHRzLmNhbGN1bGF0aW9ucy5rZF9oclswXSArIFwiOlwifTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicmVzdWx0LXZhbHVlXCI+e3RoaXMuc3RhdGUucmVzdWx0cy5jYWxjdWxhdGlvbnMua2RfaHJbMV19PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2Pik7XG4gICAgICAgICAgICByZXN1bHRzX2NhbGN1bGF0aW9ucy5wdXNoKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyZXN1bHQtcGFpcic+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJlc3VsdC1sYWJlbFwiPnt0aGlzLnN0YXRlLnJlc3VsdHMuY2FsY3VsYXRpb25zLm5vcF9rZ1swXSArIFwiOlwifTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicmVzdWx0LXZhbHVlXCI+e3RoaXMuc3RhdGUucmVzdWx0cy5jYWxjdWxhdGlvbnMubm9wX2tnWzFdICsgXCIga2dcIn08L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+KTtcbiAgICAgICAgICAgIHJlc3VsdHNfY2FsY3VsYXRpb25zLnB1c2goXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jlc3VsdC1wYWlyJz5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicmVzdWx0LWxhYmVsXCI+e3RoaXMuc3RhdGUucmVzdWx0cy5jYWxjdWxhdGlvbnMua29faHJbMF0gKyBcIjpcIn08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJlc3VsdC12YWx1ZVwiPnt0aGlzLnN0YXRlLnJlc3VsdHMuY2FsY3VsYXRpb25zLmtvX2hyWzFdfTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj4pO1xuICAgICAgICAgICAgcmVzdWx0c19jYWxjdWxhdGlvbnMucHVzaChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncmVzdWx0LXBhaXInPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJyZXN1bHQtbGFiZWxcIj57dGhpcy5zdGF0ZS5yZXN1bHRzLmNhbGN1bGF0aW9ucy5ib2R5X3dhdGVyX2F2Z19rZ1swXSArIFwiOlwifTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicmVzdWx0LXZhbHVlXCI+e3RoaXMuc3RhdGUucmVzdWx0cy5jYWxjdWxhdGlvbnMuYm9keV93YXRlcl9hdmdfa2dbMV0gKyBcIiBrZ1wifTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj4pO1xuICAgICAgICAgICAgcmVzdWx0c19jYWxjdWxhdGlvbnMucHVzaChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncmVzdWx0LXBhaXInPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJyZXN1bHQtbGFiZWxcIj57dGhpcy5zdGF0ZS5yZXN1bHRzLmNhbGN1bGF0aW9ucy5mYXRfZnJlZV9tYXNzX2tnWzBdICsgXCI6XCJ9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJyZXN1bHQtdmFsdWVcIj57dGhpcy5zdGF0ZS5yZXN1bHRzLmNhbGN1bGF0aW9ucy5mYXRfZnJlZV9tYXNzX2tnWzFdICsgXCIga2dcIn08L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+KTtcbiAgICAgICAgICAgIHJlc3VsdHNfY2FsY3VsYXRpb25zLnB1c2goXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jlc3VsdC1wYWlyJz5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicmVzdWx0LWxhYmVsXCI+e3RoaXMuc3RhdGUucmVzdWx0cy5jYWxjdWxhdGlvbnMuZmF0X21hc3Nfa2dbMF0gKyBcIjpcIn08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJlc3VsdC12YWx1ZVwiPnt0aGlzLnN0YXRlLnJlc3VsdHMuY2FsY3VsYXRpb25zLmZhdF9tYXNzX2tnWzFdICsgXCIga2dcIn08L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+KTtcbiAgICAgICAgICAgIHJlc3VsdHNfY2FsY3VsYXRpb25zLnB1c2goXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jlc3VsdC1wYWlyJz5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicmVzdWx0LWxhYmVsXCI+e3RoaXMuc3RhdGUucmVzdWx0cy5jYWxjdWxhdGlvbnMuYm9keV9mYXRfcGVyY2VudGFnZVswXSArIFwiOlwifTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicmVzdWx0LXZhbHVlXCI+e3RoaXMuc3RhdGUucmVzdWx0cy5jYWxjdWxhdGlvbnMuYm9keV9mYXRfcGVyY2VudGFnZVsxXSArIFwiJVwifTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj4pO1xuXG4gICAgICAgICAgICByZXN1bHRzX3JjbzJfZWUucHVzaChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncmVzdWx0LXBhaXInPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJyZXN1bHQtbGFiZWxcIj57dGhpcy5zdGF0ZS5yZXN1bHRzLnJjbzJfZWUucmNvMl9tb2xfZGF5WzBdICsgXCI6XCJ9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJyZXN1bHQtdmFsdWVcIj57dGhpcy5zdGF0ZS5yZXN1bHRzLnJjbzJfZWUucmNvMl9tb2xfZGF5WzFdICsgXCIgbW9sL2RheVwifTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj4pO1xuICAgICAgICAgICAgcmVzdWx0c19yY28yX2VlLnB1c2goXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jlc3VsdC1wYWlyJz5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicmVzdWx0LWxhYmVsXCI+e3RoaXMuc3RhdGUucmVzdWx0cy5yY28yX2VlLnJjbzJfbF9oclswXSArIFwiOlwifTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicmVzdWx0LXZhbHVlXCI+e3RoaXMuc3RhdGUucmVzdWx0cy5yY28yX2VlLnJjbzJfbF9oclsxXSArIFwiIEwvaG91clwifTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj4pO1xuICAgICAgICAgICAgcmVzdWx0c19yY28yX2VlLnB1c2goXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jlc3VsdC1wYWlyJz5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicmVzdWx0LWxhYmVsXCI+e3RoaXMuc3RhdGUucmVzdWx0cy5yY28yX2VlLmVlX2tjYWxfZGF5WzBdICsgXCI6XCJ9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJyZXN1bHQtdmFsdWVcIj57dGhpcy5zdGF0ZS5yZXN1bHRzLnJjbzJfZWUuZWVfa2NhbF9kYXlbMV0gKyBcIiBrY2FsL2RheVwifTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj4pO1xuICAgICAgICAgICAgcmVzdWx0c19yY28yX2VlLnB1c2goXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jlc3VsdC1wYWlyJz5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicmVzdWx0LWxhYmVsXCI+e3RoaXMuc3RhdGUucmVzdWx0cy5yY28yX2VlLmVlX21qX2RheVswXSArIFwiOlwifTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicmVzdWx0LXZhbHVlXCI+e3RoaXMuc3RhdGUucmVzdWx0cy5yY28yX2VlLmVlX21qX2RheVsxXSArIFwiIE1KL2RheVwifTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj4pO1xuXG4gICAgICAgICAgICBsZXQgZXJyb3Jfb2theSA9IFwiZXJyb3Itb2theVwiO1xuICAgICAgICAgICAgbGV0IG91dHNpZGVfZXJyb3JfYmFycyA9IFwiZXJyb3Jfbm90X29rYXlcIjtcbiAgICAgICAgICAgIGxldCBlcnJvcl9jbGFzcyA9ICgocGFyc2VGbG9hdCh0aGlzLnN0YXRlLnJlc3VsdHMuZXJyb3JfZmxhZ3MucGxhdGVhdV8yaFsxXSkgPCAwLjA1KSA/IGVycm9yX29rYXkgOiBvdXRzaWRlX2Vycm9yX2JhcnMpO1xuICAgICAgICAgICAgcmVzdWx0c19lcnJvcl9mbGFncy5wdXNoKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyZXN1bHQtcGFpcic+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJlc3VsdC1sYWJlbFwiPnt0aGlzLnN0YXRlLnJlc3VsdHMuZXJyb3JfZmxhZ3MucGxhdGVhdV8yaFswXSArIFwiOlwifTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtcInJlc3VsdC12YWx1ZSBcIiArIGVycm9yX2NsYXNzfT57dGhpcy5zdGF0ZS5yZXN1bHRzLmVycm9yX2ZsYWdzLnBsYXRlYXVfMmhbMV19PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2Pik7XG4gICAgICAgICAgICBlcnJvcl9jbGFzcyA9ICgocGFyc2VGbG9hdCh0aGlzLnN0YXRlLnJlc3VsdHMuZXJyb3JfZmxhZ3MucGxhdGVhdV8xODBbMV0pIDwgMC4wNSkgPyBlcnJvcl9va2F5IDogb3V0c2lkZV9lcnJvcl9iYXJzKTtcbiAgICAgICAgICAgIHJlc3VsdHNfZXJyb3JfZmxhZ3MucHVzaChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncmVzdWx0LXBhaXInPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJyZXN1bHQtbGFiZWxcIj57dGhpcy5zdGF0ZS5yZXN1bHRzLmVycm9yX2ZsYWdzLnBsYXRlYXVfMTgwWzBdICsgXCI6XCJ9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9e1wicmVzdWx0LXZhbHVlIFwiICsgZXJyb3JfY2xhc3N9Pnt0aGlzLnN0YXRlLnJlc3VsdHMuZXJyb3JfZmxhZ3MucGxhdGVhdV8xODBbMV19PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2Pik7XG4gICAgICAgICAgICBlcnJvcl9jbGFzcyA9ICgocGFyc2VGbG9hdCh0aGlzLnN0YXRlLnJlc3VsdHMuZXJyb3JfZmxhZ3MuZHNfcmF0aW9bMV0pIDwgMS4wNzAgJiZcbiAgICAgICAgICAgICAgICBwYXJzZUZsb2F0KHRoaXMuc3RhdGUucmVzdWx0cy5lcnJvcl9mbGFncy5kc19yYXRpb1sxXSkgPiAxKSA/IGVycm9yX29rYXkgOiBvdXRzaWRlX2Vycm9yX2JhcnMpO1xuICAgICAgICAgICAgcmVzdWx0c19lcnJvcl9mbGFncy5wdXNoKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyZXN1bHQtcGFpcic+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJlc3VsdC1sYWJlbFwiPnt0aGlzLnN0YXRlLnJlc3VsdHMuZXJyb3JfZmxhZ3MuZHNfcmF0aW9bMF0gKyBcIjpcIn08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17XCJyZXN1bHQtdmFsdWUgXCIgKyBlcnJvcl9jbGFzc30+e3RoaXMuc3RhdGUucmVzdWx0cy5lcnJvcl9mbGFncy5kc19yYXRpb1sxXX08L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+KTtcbiAgICAgICAgICAgIGVycm9yX2NsYXNzID0gKChwYXJzZUZsb2F0KHRoaXMuc3RhdGUucmVzdWx0cy5lcnJvcl9mbGFncy5lZVsxXSkgPCAxMCkgPyBlcnJvcl9va2F5IDogb3V0c2lkZV9lcnJvcl9iYXJzKTtcbiAgICAgICAgICAgIHJlc3VsdHNfZXJyb3JfZmxhZ3MucHVzaChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncmVzdWx0LXBhaXInPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJyZXN1bHQtbGFiZWxcIj57dGhpcy5zdGF0ZS5yZXN1bHRzLmVycm9yX2ZsYWdzLmVlWzBdICsgXCI6XCJ9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9e1wicmVzdWx0LXZhbHVlIFwiICsgZXJyb3JfY2xhc3N9Pnt0aGlzLnN0YXRlLnJlc3VsdHMuZXJyb3JfZmxhZ3MuZWVbMV0gKyBcIiVcIn08L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+KTtcbiAgICAgICAgICAgIGVycm9yX2NsYXNzID0gKChwYXJzZUZsb2F0KHRoaXMuc3RhdGUucmVzdWx0cy5lcnJvcl9mbGFncy5rb19rZFsxXSkgPCAxLjcgJiZcbiAgICAgICAgICAgICAgICBwYXJzZUZsb2F0KHRoaXMuc3RhdGUucmVzdWx0cy5lcnJvcl9mbGFncy5rb19rZFsxXSkgPiAxLjEpID8gZXJyb3Jfb2theSA6IG91dHNpZGVfZXJyb3JfYmFycyk7XG4gICAgICAgICAgICByZXN1bHRzX2Vycm9yX2ZsYWdzLnB1c2goXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jlc3VsdC1wYWlyJz5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicmVzdWx0LWxhYmVsXCI+e3RoaXMuc3RhdGUucmVzdWx0cy5lcnJvcl9mbGFncy5rb19rZFswXSArIFwiOlwifTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtcInJlc3VsdC12YWx1ZSBcIiArIGVycm9yX2NsYXNzfT57dGhpcy5zdGF0ZS5yZXN1bHRzLmVycm9yX2ZsYWdzLmtvX2tkWzFdfTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj4pO1xuICAgICAgICAgICAgbGV0IGNoYXJ0X2RhdGFfZF9tZWFzID0gW107XG4gICAgICAgICAgICBsZXQgY2hhcnRfZGF0YV9vMThfbWVhcyA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN0YXRlLmRldXRlcml1bV9kZWx0YXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjaGFydF9kYXRhX2RfbWVhcy5wdXNoKHt4OiBpLCB5OiB0aGlzLnN0YXRlLmRldXRlcml1bV9kZWx0YXNbaV19KTtcbiAgICAgICAgICAgICAgICBjaGFydF9kYXRhX28xOF9tZWFzLnB1c2goe3g6IGksIHk6IHRoaXMuc3RhdGUub3h5Z2VuX2RlbHRhc1tpXX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGRlbHRhc19jaGFydDogSlNYLkVsZW1lbnQgPSAoXG4gICAgICAgICAgICAgICAgPERlbHRhU2NhdHRlckNoYXJ0IGRlbHRhX3VuaXRzPXt0aGlzLnN0YXRlLmRlbHRhX3VuaXRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFydF9kYXRhX2RfbWVhcz17Y2hhcnRfZGF0YV9kX21lYXN9IGNoYXJ0X2RhdGFfbzE4X21lYXM9e2NoYXJ0X2RhdGFfbzE4X21lYXN9Lz5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXN1bHRzX2Rpc3BsYXkgPSAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jlc3VsdHMtZGlzcGxheScgcmVmPXt0aGlzLnNjcm9sbF9hbmNob3JfcmVmfT5cbiAgICAgICAgICAgICAgICAgICAgPENhcmQgY2xhc3NOYW1lPSdyZXN1bHRzLWNhcmQnPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgxPnsnUmVzdWx0cyBmb3Igc3ViamVjdCAnICsgdGhpcy5zdGF0ZS5zdWJqZWN0X2lkfTwvaDE+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncmVzdWx0LXNlY3Rpb25zJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncmVzdWx0LXNlY3Rpb24nPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDUgY2xhc3NOYW1lPSdyZXN1bHQtaGVhZGVyLWNhbGMnPkNhbGN1bGF0aW9uczwvaDU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyZXN1bHRzX2NhbGN1bGF0aW9uc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncmVzdWx0LXNlY3Rpb24nPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDUgY2xhc3NOYW1lPSdyZXN1bHQtaGVhZGVyLWNhbGMnPnJDTzIgYW5kIEVFLCBpbnRlcmNlcHQgbWV0aG9kPC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Jlc3VsdHNfcmNvMl9lZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncmVzdWx0LXNlY3Rpb24nPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDUgY2xhc3NOYW1lPSdyZXN1bHQtaGVhZGVyLWVycm9yJz5FcnJvciBGbGFnczwvaDU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyZXN1bHRzX2Vycm9yX2ZsYWdzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvQ2FyZD5cbiAgICAgICAgICAgICAgICAgICAgPENhcmQgY2xhc3NOYW1lPSdyZXN1bHRzLWNhcmQnPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jlc3VsdC1zZWN0aW9ucyc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jlc3VsdC1zZWN0aW9uJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2RlbHRhc19jaGFydH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L0NhcmQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPE5hdmJhciBjbGFzc05hbWU9J2Rsdy1uYXYnPlxuICAgICAgICAgICAgICAgIDxEaWFsb2cgaXNPcGVuPXt0aGlzLnN0YXRlLmluZm9fb3ZlcmxheV9vcGVufSBjYW5Fc2NhcGVLZXlDbG9zZT17dHJ1ZX0gY2FuT3V0c2lkZUNsaWNrQ2xvc2U9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICAgICAgaGFzQmFja2Ryb3A9e3RydWV9IGlzQ2xvc2VCdXR0b25TaG93bj17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpbmZvX292ZXJsYXlfb3BlbjogZmFsc2V9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXsnSG93IHRvIHVzZSB0aGUgRG91Ymx5IExhYmVsZWQgV2F0ZXIgQXBwJ30+XG4gICAgICAgICAgICAgICAgICAgIDxwPnNvbWUgaGVscGZ1bCB0ZXh0LSBpbmNsdWRlIENTViBmb3JtYXR0aW5nPC9wPlxuICAgICAgICAgICAgICAgIDwvRGlhbG9nPlxuICAgICAgICAgICAgICAgIDxOYXZiYXJHcm91cCBhbGlnbj17QWxpZ25tZW50LkxFRlR9PlxuICAgICAgICAgICAgICAgICAgICA8TmF2YmFyLkhlYWRpbmcgY2xhc3NOYW1lPSdkbHctdGl0bGUnPkRvdWJseSBMYWJlbGVkIFdhdGVyPC9OYXZiYXIuSGVhZGluZz5cbiAgICAgICAgICAgICAgICA8L05hdmJhckdyb3VwPlxuICAgICAgICAgICAgICAgIDxOYXZiYXJHcm91cCBhbGlnbj17QWxpZ25tZW50LlJJR0hUfT5cbiAgICAgICAgICAgICAgICAgICAgPE5hdmJhckhlYWRpbmcgY2xhc3NOYW1lPSd0YWdsaW5lJz5hbiBvcGVuIHNvdXJjZSBwcm9qZWN0PC9OYXZiYXJIZWFkaW5nPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cImFzc2V0cy9sb2dvX2N1aHMucG5nXCIgYWx0PVwiVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBBbnNjaHV0eiBNZWRpY2FsIENhbXB1cyBsb2dvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eydoZWlnaHQnOiAzMH19Lz5cbiAgICAgICAgICAgICAgICAgICAgPE5hdmJhckRpdmlkZXIvPlxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2pjaG15ei9Eb3VibHlMYWJlbGVkV2F0ZXJcIiB0YXJnZXQ9XCJfYmxhbmtcIj5Eb3VibHlMYWJlbGVkV2F0ZXIgb25cbiAgICAgICAgICAgICAgICAgICAgICAgIEdpdEh1YjwvYT5cbiAgICAgICAgICAgICAgICAgICAgPE5hdmJhckRpdmlkZXIvPlxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGljb249e1wiaGVscFwifSBtaW5pbWFsPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0U3RhdGUoe2luZm9fb3ZlcmxheV9vcGVuOiB0cnVlfSl9PkhlbHA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L05hdmJhckdyb3VwPlxuICAgICAgICAgICAgICAgIDxGb3JtR3JvdXAgY2xhc3NOYW1lPSdkbHctYXBwJz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3N1YmplY3QtY2xlYXInPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDU+U3ViamVjdCBJRDwvaDU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0R3JvdXAgbGVmdEljb249eyh0aGlzLnN0YXRlLnN1YmplY3RfaWQgPyBcInRpY2tcIiA6IFwiY2lyY2xlLWFycm93LXJpZ2h0XCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Jy5icDMtZmlsbCBzdWJqZWN0LWlkJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50OiBGb3JtRXZlbnQ8SFRNTEVsZW1lbnQ+KSA9PiB0aGlzLnNldFN0YXRlKHtzdWJqZWN0X2lkOiAoZXZlbnQudGFyZ2V0IGFzIGFueSkudmFsdWV9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj0nSUQnIHZhbHVlPXt0aGlzLnN0YXRlLnN1YmplY3RfaWR9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGNsYXNzTmFtZT0nY2xlYXItYnV0dG9uJyBvbkNsaWNrPXt0aGlzLmNsZWFyfT5DTEVBUlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJTlBVVFM8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2xvYWQtZnJvbS1jc3YnPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGg1PkxvYWQgaW5wdXQgZGF0YSBmcm9tIC5jc3YgZmlsZTwvaDU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RmlsZUlucHV0IHRleHQ9e3RoaXMuc3RhdGUuaW5wdXRfY3N2X25hbWUgfHwgXCJDaG9vc2UgZmlsZS4uLlwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbklucHV0Q2hhbmdlPXt0aGlzLmhhbmRsZV9jc3ZfdXBsb2FkfSBkaXNhYmxlZD17ISEodGhpcy5zdGF0ZS5pbnB1dF9jc3ZfbmFtZSl9Lz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzYW1wbGVzJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdkYXRlLWlucHV0cyc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1PkNvbGxlY3Rpb24gRGF0ZXMgYW5kIFRpbWVzPC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y29sbGVjdGlvbl90aW1lX2lucHV0c31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2RlbHRhLWlucHV0cyc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1PkRldXRlcml1bSBEZWx0YSBWYWx1ZXM8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkZXV0ZXJpdW1fZGVsdGFfaW5wdXRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZGVsdGEtaW5wdXRzJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDU+T3h5Z2VuIDE4IERlbHRhIFZhbHVlczwvaDU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge294eWdlbl9kZWx0YV9pbnB1dHN9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdkZWx0YS11bml0LXJhZGlvJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UmFkaW9Hcm91cCBvbkNoYW5nZT17KGV2ZW50OiBGb3JtRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZGVsdGFfdW5pdHM6IChldmVudC50YXJnZXQgYXMgYW55KS52YWx1ZX0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0gc2VsZWN0ZWRWYWx1ZT17dGhpcy5zdGF0ZS5kZWx0YV91bml0c30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxSYWRpbyBsYWJlbD1cInBlcm1pbFwiIHZhbHVlPXtEZWx0YVVuaXRzLnBlcm1pbH0gbGFyZ2U9e3RydWV9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFJhZGlvIGxhYmVsPVwicHBtXCIgdmFsdWU9e0RlbHRhVW5pdHMucHBtfSBsYXJnZT17dHJ1ZX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvUmFkaW9Hcm91cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2VsZW1lbnQtd2lzZS1pbnB1dHMnPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J21peGVkLWRvc2UtYm94Jz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2tib3ggY2hlY2tlZD17dGhpcy5zdGF0ZS5taXhlZF9kb3NlfSBsYWJlbEVsZW1lbnQ9ezxoNT5NaXhlZCBEb3NlPC9oNT59IGxhcmdlPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bWl4ZWRfZG9zZTogIXRoaXMuc3RhdGUubWl4ZWRfZG9zZX0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IGFsaWduSW5kaWNhdG9yPXtBbGlnbm1lbnQuUklHSFR9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2VsZW1lbnQtd2lzZS1pbnB1dHMnPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0cy1ieS1lbGVtZW50Jz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDU+RG9zZSBXZWlnaHRzPC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZG9zZV93ZWlnaHRfaW5wdXRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXRzLWJ5LWVsZW1lbnQnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNT5Eb3NlIEVucmljaG1lbnRzPC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZG9zZV9lbnJpY2htZW50X2lucHV0c31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2VsZW1lbnQtd2lzZS1pbnB1dHMnPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0cy1ieS1lbGVtZW50Jz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDU+U3ViamVjdCBXZWlnaHQ8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxOdW1iZXJJbnB1dCBwbGFjZWhvbGRlcj17XCJJbml0aWFsIHN1YmplY3Qgd2VpZ2h0IChrZylcIn0gaW5kZXg9ezB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZV9mdW5jdGlvbj17dGhpcy5oYW5kbGVfc3ViamVjdF93ZWlnaHRfY2hhbmdlfSB1bml0PXsna2cnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5zdWJqZWN0X3dlaWdodHNbMF19Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TnVtYmVySW5wdXQgcGxhY2Vob2xkZXI9e1wiRmluYWwgc3ViamVjdCB3ZWlnaHQgKGtnKVwifSBpbmRleD17MX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlX2Z1bmN0aW9uPXt0aGlzLmhhbmRsZV9zdWJqZWN0X3dlaWdodF9jaGFuZ2V9IHVuaXQ9eydrZyd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnN1YmplY3Rfd2VpZ2h0c1sxXX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGNsYXNzTmFtZT0nY2FsY3VsYXRlLWJ1dHRvbicgb25DbGljaz17dGhpcy5zdWJtaXRfaW5wdXRzfSBpbnRlbnQ9e0ludGVudC5TVUNDRVNTfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWFsbF9pbnB1dHNfdmFsaWRhdGVkfT5DQUxDVUxBVEUgUkVTVUxUUzwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3N1Ym1pdC1ncm91cCc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY3N2LWlucHV0LW5ldyc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1PklucHV0IGEgbmFtZSBmb3IgYSBuZXcgLmNzdiBmaWxlPC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRHcm91cCBwbGFjZWhvbGRlcj0nQ1NWIGZpbGVuYW1lJyBjbGFzc05hbWU9J2Nzdl9pbnB1dCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50OiBGb3JtRXZlbnQ8SFRNTEVsZW1lbnQ+KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtuZXdfY3N2X25hbWU6IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWV9KX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY3N2LWFwcGVuZCc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1Pk9yLCBzZWxlY3QgYW4gZXhpc3RpbmcgLmNzdiBmaWxlIHRvIGFwcGVuZCByZXN1bHRzIHRvPC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RmlsZUlucHV0IHRleHQ9e3RoaXMuc3RhdGUuYXBwZW5kX2Nzdl9uYW1lIHx8IFwiQ2hvb3NlIGZpbGUuLi5cIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uSW5wdXRDaGFuZ2U9e3RoaXMuaGFuZGxlX2Nzdl9hcHBlbmRfY2hvaWNlfSBjbGFzc05hbWU9J2Nzdi1pbnB1dCcvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMuZXhwb3J0fSBkaXNhYmxlZD17ISh0aGlzLnN0YXRlLnJlc3VsdHMuY2FsY3VsYXRpb25zICYmICh0aGlzLnN0YXRlLm5ld19jc3ZfbmFtZSB8fCB0aGlzLnN0YXRlLmFwcGVuZF9jc3ZfbmFtZSkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2V4cG9ydC1idXR0b24nIGludGVudD17SW50ZW50LlNVQ0NFU1N9PkVYUE9SVCBUTyBDU1Y8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtyZXN1bHRzX2Rpc3BsYXl9XG4gICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICAgICAgICA8L05hdmJhcj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBleHBvcnQgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGxldCByZXN1bHRzID0gYXdhaXQgZXhwb3J0X3RvX2Nzdih0aGlzLnN0YXRlLm5ld19jc3ZfbmFtZSk7XG4gICAgICAgIGlmIChyZXN1bHRzLmVycm9yKSB7XG4gICAgICAgICAgICBBcHBUb2FzdGVyLnNob3coe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkVycm9yIGV4cG9ydGluZyByZXN1bHRzIHRvIGNzdi4gUGxlYXNlIGZpbGUgYSBidWcgcmVwb3J0IGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9qY2hteXovRG91Ymx5TGFiZWxlZFdhdGVyL2lzc3Vlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRlbnQ6IFwiZGFuZ2VyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVvdXQ6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEFwcFRvYXN0ZXIuc2hvdyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiUmVzdWx0cyBzdWNjZXNzZnVsbHkgZXhwb3J0ZWQgdG8gXCIgKyByZXN1bHRzLnNhdmVkX2ZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludGVudDogXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVvdXQ6IDMwMDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBzdWJtaXRfaW5wdXRzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBsZXQgZGF0ZXRpbWVzID0gdGhpcy5zdGF0ZS5kYXRldGltZXMubWFwKCh2YWx1ZTogbW9tZW50Lk1vbWVudCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvQXJyYXkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIG1vbnRocyBhcmUgemVyby1pbmRleGVkIGluIE1vbWVudC5qc1xuICAgICAgICBkYXRldGltZXMubWFwKCh2YWx1ZTogbnVtYmVyW10pID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5zcGxpY2UoMSwgMSwgdmFsdWVbMV0gKyAxKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCByZXN1bHRzID0gYXdhaXQgY2FsY3VsYXRlX2Zyb21faW5wdXRzKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRfbWVhczogdGhpcy5zdGF0ZS5kZXV0ZXJpdW1fZGVsdGFzLFxuICAgICAgICAgICAgICAgIG8xOF9tZWFzOiB0aGlzLnN0YXRlLm94eWdlbl9kZWx0YXMsXG4gICAgICAgICAgICAgICAgZGF0ZXRpbWVzOiBkYXRldGltZXMsXG4gICAgICAgICAgICAgICAgZG9zZV93ZWlnaHRzOiB0aGlzLnN0YXRlLmRvc2Vfd2VpZ2h0cyxcbiAgICAgICAgICAgICAgICBkb3NlX2VucmljaG1lbnRzOiB0aGlzLnN0YXRlLmRvc2VfZW5yaWNobWVudHMsXG4gICAgICAgICAgICAgICAgc3ViamVjdF93ZWlnaHRzOiB0aGlzLnN0YXRlLnN1YmplY3Rfd2VpZ2h0cyxcbiAgICAgICAgICAgICAgICBzdWJqZWN0X2lkOiB0aGlzLnN0YXRlLnN1YmplY3RfaWQsXG4gICAgICAgICAgICAgICAgbWl4ZWRfZG9zZTogdGhpcy5zdGF0ZS5taXhlZF9kb3NlLFxuICAgICAgICAgICAgICAgIGluX3Blcm1pbDogKHRoaXMuc3RhdGUuZGVsdGFfdW5pdHMgPT09IERlbHRhVW5pdHMucGVybWlsKVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICBpZiAocmVzdWx0cy5jYWxjdWxhdGlvbnMgJiYgcmVzdWx0cy5lcnJvcl9mbGFncyAmJiByZXN1bHRzLnJjbzJfZWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0aW9uczogcmVzdWx0cy5jYWxjdWxhdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmNvMl9lZTogcmVzdWx0cy5yY28yX2VlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yX2ZsYWdzOiByZXN1bHRzLmVycm9yX2ZsYWdzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgQXBwVG9hc3Rlci5zaG93KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJSZXN1bHRzIGNhbGN1bGF0ZWQgc3VjY2Vzc2Z1bGx5XCIsIGludGVudDogXCJzdWNjZXNzXCIsIHRpbWVvdXQ6IDMwMDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjcm9sbF9hbmNob3JfcmVmLmN1cnJlbnQpIHRoaXMuc2Nyb2xsX2FuY2hvcl9yZWYuY3VycmVudC5zY3JvbGxJbnRvVmlldyh7YmVoYXZpb3I6IFwic21vb3RoXCJ9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjbGVhciA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0X2Nzdl9uYW1lOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBkZXV0ZXJpdW1fZGVsdGFzOiBbXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG94eWdlbl9kZWx0YXM6IFtcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZXRpbWVzOiBbdGhpcy5ub3csIHRoaXMubm93LCB0aGlzLm5vdywgdGhpcy5ub3csIHRoaXMubm93XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZG9zZV93ZWlnaHRzOiBbXCJcIiwgXCJcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRvc2VfZW5yaWNobWVudHM6IFtcIlwiLCBcIlwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdF93ZWlnaHRzOiBbXCJcIiwgXCJcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3RfaWQ6IFwiXCIsXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGV1dGVyaXVtX2RlbHRhc192YWxpZGF0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBveHlnZW5fZGVsdGFzX3ZhbGlkYXRlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGV0aW1lc192YWxpZGF0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBkb3NlX3dlaWdodHNfdmFsaWRhdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZG9zZV9lbnJpY2htZW50c192YWxpZGF0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJqZWN0X3dlaWdodHNfdmFsaWRhdGVkOiBmYWxzZSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzOiB7Y2FsY3VsYXRpb25zOiBudWxsLCByY28yX2VlOiBudWxsLCBlcnJvcl9mbGFnczogbnVsbH0sXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGhhbmRsZV9jc3ZfdXBsb2FkID0gYXN5bmMgKGV2ZW50OiBGb3JtRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcbiAgICAgICAgbGV0IGZpbGUgPSAoZXZlbnQudGFyZ2V0IGFzIGFueSkuZmlsZXNbMF07XG4gICAgICAgIGlmIChmaWxlLnR5cGUgPT09IFwidGV4dC9jc3ZcIikge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXRfY3N2X25hbWU6IGZpbGUubmFtZX0pO1xuICAgICAgICAgICAgbGV0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgICAgICByZWFkZXIub25sb2FkID0gdGhpcy5fbG9hZF9oYW5kbGVyO1xuICAgICAgICAgICAgcmVhZGVyLm9uZXJyb3IgPSB0aGlzLl9lcnJvcl9oYW5kbGVyO1xuICAgICAgICAgICAgYXdhaXQgcmVhZGVyLnJlYWRBc1RleHQoZmlsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBBcHBUb2FzdGVyLnNob3coe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlNlbGVjdCBhIC5jc3YgZmlsZS4gRm9yIGZvcm1hdHRpbmcgaGVscCwgcHJlc3MgJ0hlbHAnIGluIHRoZSB1cHBlciByaWdodCBoYW5kIGNvcm5lclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRlbnQ6IFwiZGFuZ2VyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVvdXQ6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBoYW5kbGVfY3N2X2FwcGVuZF9jaG9pY2UgPSAoZXZlbnQ6IEZvcm1FdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xuICAgICAgICBsZXQgZmlsZSA9IChldmVudC50YXJnZXQgYXMgYW55KS5maWxlc1swXTtcbiAgICAgICAgaWYgKGZpbGUudHlwZSA9PT0gXCJ0ZXh0L2NzdlwiKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHthcHBlbmRfY3N2X25hbWU6IGZpbGUubmFtZX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgQXBwVG9hc3Rlci5zaG93KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJTZWxlY3QgYW4gZXhpc3RpbmcgLmNzdiBmaWxlLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRlbnQ6IFwiZGFuZ2VyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVvdXQ6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIF9sb2FkX2hhbmRsZXIgPSAoZXZlbnQ6IFByb2dyZXNzRXZlbnQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJpbnRvIGxvYWQgaGFuZGxlclwiKTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBsZXQgY3N2ID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgbGV0IGFsbF90ZXh0X2xpbmVzID0gY3N2LnNwbGl0KC9cXHJcXG58XFxuLyk7XG4gICAgICAgIGxldCBjb2x1bW5zID0gYWxsX3RleHRfbGluZXNbMF0uc3BsaXQoJywnKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2NvbHVtbnMnLCBjb2x1bW5zKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gYWxsX3RleHRfbGluZXNbMV0uc3BsaXQoJywnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkYXRhIGlzJywgZGF0YSk7XG4gICAgICAgICAgICAvL1RPRE86IG1ha2UgdGhpcyBkZWFsIHdpdGggb3RoZXIgY3N2IG9yZGVyc1xuICAgICAgICAgICAgbGV0IGRfZGVsdGFzID0gZGF0YS5zbGljZSgwLCA1KTtcbiAgICAgICAgICAgIGxldCBvX2RlbHRhcyA9IGRhdGEuc2xpY2UoNSwgMTApO1xuICAgICAgICAgICAgbGV0IHNhbXBsZV90aW1lcyA9IGRhdGEuc2xpY2UoMTAsIDE1KTtcbiAgICAgICAgICAgIGxldCBkb3NlX3dlaWdodHMgPSBkYXRhLnNsaWNlKDE1LCAxNyk7XG4gICAgICAgICAgICBsZXQgZG9zZV9lbnJpY2htZW50cyA9IGRhdGEuc2xpY2UoMTcsIDE5KTtcbiAgICAgICAgICAgIGxldCBzdWJqZWN0X3dlaWdodHMgPSBkYXRhLnNsaWNlKDE5LCAyMSk7XG4gICAgICAgICAgICBsZXQgc3ViamVjdF9pZCA9IGRhdGEuc2xpY2UoMjEsIDIyKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZF9kZWx0YXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZV9kZXV0ZXJpdW1fZGVsdGFfY2hhbmdlKGksIGRfZGVsdGFzW2ldKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZV9veHlnZW5fZGVsdGFfY2hhbmdlKGksIG9fZGVsdGFzW2ldKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZV9kYXRlX2NoYW5nZShpLCBtb21lbnQudXRjKHNhbXBsZV90aW1lc1tpXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkb3NlX3dlaWdodHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZV9kb3NlX3dlaWdodF9jaGFuZ2UoaSwgZG9zZV93ZWlnaHRzW2ldKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZV9kb3NlX2VucmljaG1lbnRfY2hhbmdlKGksIGRvc2VfZW5yaWNobWVudHNbaV0pO1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlX3N1YmplY3Rfd2VpZ2h0X2NoYW5nZShpLCBzdWJqZWN0X3dlaWdodHNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3ViamVjdF9pZDogc3ViamVjdF9pZH0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLl9iYWRfZm9ybWF0KFwiXCIpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIF9iYWRfZm9ybWF0ID0gKHNwZWNpZmljX2Vycm9yOiBzdHJpbmcpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXRfY3N2X25hbWU6IFwiXCJ9KTtcbiAgICAgICAgbGV0IGRpc3BsYXlfbXNnID0gXCJJbmNvcnJlY3QgLmNzdiBmb3JtYXQuXCIgKyBzcGVjaWZpY19lcnJvciArIFwiIFNlZSAnSGVscCcgZm9yIGV4cGVjdGVkIGZvcm1hdC5cIjtcbiAgICAgICAgQXBwVG9hc3Rlci5zaG93KHttZXNzYWdlOiBkaXNwbGF5X21zZywgaW50ZW50OiBcImRhbmdlclwiLCB0aW1lb3V0OiAwfSk7XG4gICAgfTtcblxuICAgIF9lcnJvcl9oYW5kbGVyID0gKGV2ZW50OiBQcm9ncmVzc0V2ZW50KSA9PiB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5lcnJvci5uYW1lID09IFwiTm90UmVhZGFibGVFcnJvclwiKSB7XG4gICAgICAgICAgICBBcHBUb2FzdGVyLnNob3coe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkZpbGUgbm90IHJlYWRhYmxlLiBGb3IgZm9ybWF0dGluZyBoZWxwLCBwcmVzcyAnSGVscCcgaW4gdGhlIHVwcGVyIHJpZ2h0IGhhbmQgY29ybmVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludGVudDogXCJkYW5nZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dDogMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNoZWNrX251bWVyaWNhbF9pbnB1dHMgPSAoaW5wdXRfYXJheTogKHN0cmluZyB8IG51bWJlcilbXSkgPT4ge1xuICAgICAgICBmb3IgKGxldCB2YWx1ZSBvZiBpbnB1dF9hcmF5KSB7XG4gICAgICAgICAgICBpZiAoaXNOYU4oK3ZhbHVlKSB8fCB2YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgX2ZsYWdfbm9uX251bWVyaWNhbF9pbnB1dCA9ICgpID0+IHtcbiAgICAgICAgQXBwVG9hc3Rlci5zaG93KHttZXNzYWdlOiBcIkVudGVyIGEgbnVtZXJpYyB2YWx1ZVwiLCBpbnRlbnQ6IFwiZGFuZ2VyXCIsIHRpbWVvdXQ6IDMwMDB9KTtcbiAgICB9O1xuXG4gICAgX2ZsYWdfbm9uX2RhdGVfaW5wdXQgPSAoKSA9PiB7XG4gICAgICAgIEFwcFRvYXN0ZXIuc2hvdyh7bWVzc2FnZTogXCJFbnRlciBhIHZhbGlkIGRhdGVcIiwgaW50ZW50OiBcImRhbmdlclwiLCB0aW1lb3V0OiAzMDAwfSk7XG4gICAgfTtcblxuICAgIGhhbmRsZV9kZXV0ZXJpdW1fZGVsdGFfY2hhbmdlID0gKGluZGV4OiBudW1iZXIsIGV2ZW50OiBGb3JtRXZlbnQ8SFRNTEVsZW1lbnQ+IHwgc3RyaW5nKSA9PiB7XG4gICAgICAgIGxldCB2YWx1ZSA9ICh0eXBlb2YgZXZlbnQgPT09IFwic3RyaW5nXCIpID8gZXZlbnQgOiAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuICAgICAgICBsZXQgdmFsdWVzX3NlcF9ieV9zcGFjZXMgPSB2YWx1ZS5zcGxpdChcIiBcIik7XG4gICAgICAgIHZhbHVlc19zZXBfYnlfc3BhY2VzID0gdmFsdWVzX3NlcF9ieV9zcGFjZXMuZmlsdGVyKCh2YWx1ZTogc3RyaW5nKSA9PiB2YWx1ZSAhPT0gXCJcIik7XG4gICAgICAgIGlmICh2YWx1ZXNfc2VwX2J5X3NwYWNlcy5sZW5ndGggPT09IDEgfHwgdmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIGlmICghaXNOYU4oK3ZhbHVlKSB8fCB2YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgICAgIGxldCBuZXdfZGVsdGFzID0gdGhpcy5zdGF0ZS5kZXV0ZXJpdW1fZGVsdGFzO1xuICAgICAgICAgICAgICAgIG5ld19kZWx0YXMuc3BsaWNlKGluZGV4LCAxLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV1dGVyaXVtX2RlbHRhczogbmV3X2RlbHRhcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXV0ZXJpdW1fZGVsdGFzX3ZhbGlkYXRlZDogdGhpcy5jaGVja19udW1lcmljYWxfaW5wdXRzKG5ld19kZWx0YXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB0aGlzLl9mbGFnX25vbl9udW1lcmljYWxfaW5wdXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWVzX3NlcF9ieV9zcGFjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZV9kZXV0ZXJpdW1fZGVsdGFfY2hhbmdlKGluZGV4ICsgaSwgdmFsdWVzX3NlcF9ieV9zcGFjZXNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGhhbmRsZV9veHlnZW5fZGVsdGFfY2hhbmdlID0gKGluZGV4OiBudW1iZXIsIGV2ZW50OiBGb3JtRXZlbnQ8SFRNTEVsZW1lbnQ+IHwgc3RyaW5nKSA9PiB7XG4gICAgICAgIGxldCB2YWx1ZSA9ICh0eXBlb2YgZXZlbnQgPT09IFwic3RyaW5nXCIpID8gZXZlbnQgOiAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuICAgICAgICBsZXQgdmFsdWVzX3NlcF9ieV9zcGFjZXMgPSB2YWx1ZS5zcGxpdChcIiBcIik7XG4gICAgICAgIHZhbHVlc19zZXBfYnlfc3BhY2VzID0gdmFsdWVzX3NlcF9ieV9zcGFjZXMuZmlsdGVyKCh2YWx1ZTogc3RyaW5nKSA9PiB2YWx1ZSAhPT0gXCJcIik7XG4gICAgICAgIGlmICh2YWx1ZXNfc2VwX2J5X3NwYWNlcy5sZW5ndGggPT09IDEgfHwgdmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIGlmICghaXNOYU4oK3ZhbHVlKSB8fCAodmFsdWUgPT09IFwiXCIpKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5ld19kZWx0YXMgPSB0aGlzLnN0YXRlLm94eWdlbl9kZWx0YXM7XG4gICAgICAgICAgICAgICAgbmV3X2RlbHRhcy5zcGxpY2UoaW5kZXgsIDEsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBveHlnZW5fZGVsdGFzOiBuZXdfZGVsdGFzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG94eWdlbl9kZWx0YXNfdmFsaWRhdGVkOiB0aGlzLmNoZWNrX251bWVyaWNhbF9pbnB1dHMobmV3X2RlbHRhcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHRoaXMuX2ZsYWdfbm9uX251bWVyaWNhbF9pbnB1dCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXNfc2VwX2J5X3NwYWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlX294eWdlbl9kZWx0YV9jaGFuZ2UoaW5kZXggKyBpLCB2YWx1ZXNfc2VwX2J5X3NwYWNlc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgaGFuZGxlX2RhdGVfY2hhbmdlID0gKGluZGV4OiBudW1iZXIsIHZhbHVlOiBzdHJpbmcgfCBtb21lbnQuTW9tZW50KSA9PiB7XG4gICAgICAgIGxldCBuZXdfZGF0ZV9hcnJheSA9IHRoaXMuc3RhdGUuZGF0ZXRpbWVzO1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGxldCBhbGxfZGF0ZXNfZmlsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgaW5kZXg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmICgobmV3X2RhdGVfYXJyYXlbal0gIT0gdGhpcy5ub3cpICYmIHZhbHVlLmlzQmVmb3JlKG5ld19kYXRlX2FycmF5W2pdKSkge1xuICAgICAgICAgICAgICAgICAgICBBcHBUb2FzdGVyLnNob3coe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiQ29sbGVjdGlvbiBkYXRlcyBtdXN0IGJlIGluIGNocm9ub2xvZ2ljYWwgb3JkZXIuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50ZW50OiBcImRhbmdlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVvdXQ6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlLmlzU2FtZShuZXdfZGF0ZV9hcnJheVtqXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgQXBwVG9hc3Rlci5zaG93KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkR1cGxpY2F0ZSBjb2xsZWN0aW9uIGRhdGVzIGVudGVyZWRcIiwgaW50ZW50OiBcImRhbmdlclwiLCB0aW1lb3V0OiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld19kYXRlX2FycmF5LnNwbGljZShpbmRleCwgMSwgdmFsdWUpO1xuICAgICAgICAgICAgZm9yIChsZXQgZGF0ZSBvZiBuZXdfZGF0ZV9hcnJheSkge1xuICAgICAgICAgICAgICAgIGlmIChkYXRlID09PSB0aGlzLm5vdykge1xuICAgICAgICAgICAgICAgICAgICBhbGxfZGF0ZXNfZmlsbGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZXRpbWVzOiBuZXdfZGF0ZV9hcnJheSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGV0aW1lc192YWxpZGF0ZWQ6IGFsbF9kYXRlc19maWxsZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgc3BsaXRfdmFsdWVzID0gdmFsdWUuc3BsaXQoXCIgXCIpO1xuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgbmV3X2RhdGVfYXJyYXkuc3BsaWNlKGluZGV4LCAxLCB0aGlzLm5vdyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZGF0ZXRpbWVzOiBuZXdfZGF0ZV9hcnJheSwgZGF0ZXRpbWVzX3ZhbGlkYXRlZDogZmFsc2V9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgICAgICAgIGxldCBza2lwcGVkX2luZGljZXMgPSAwOyAvLyB0cmFjayBpbmRpY2VzIHRvIHBsYWNlIGRhdGVzIGluIGNvcnJlY3QgYm94ZXNcbiAgICAgICAgICAgICAgICB3aGlsZSAoaSA8IHNwbGl0X3ZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVhbCB3aXRoIHNwYWNlcyBiZXR3ZWVuIGRhdGUgYW5kIHRpbWVcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vbWVudC5wYXJzZVpvbmUobmV3IERhdGUoc3BsaXRfdmFsdWVzW2ldKSkuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA8IHNwbGl0X3ZhbHVlcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vbWVudC5wYXJzZVpvbmUobmV3IERhdGUoc3BsaXRfdmFsdWVzW2kgKyAxXSkpLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2JvdGggdmFsaWQgZGF0ZXMtIGRvbid0IG5lZWQgdG8gd29ycnkgYWJvdXQgc3BhY2VzLCB0cmVhdCB0aGVtIGFzIHNlcGFyYXRlIGRhdGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhc19tb21lbnQgPSBjb252ZXJ0X3N0cmluZ190b19tb21lbnQoc3BsaXRfdmFsdWVzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhc19tb21lbnQgIT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZV9kYXRlX2NoYW5nZShpbmRleCArIGksIGFzX21vbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIG5leHQgdmFsdWUgaXNuJ3QgYSB2YWxpZCBkYXRlLSBsaWtlbHkgYSB0aW1lLiB0YWNrIGl0IG9udG8gdGhlIGRhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFzX21vbWVudCA9IGNvbnZlcnRfc3RyaW5nX3RvX21vbWVudChzcGxpdF92YWx1ZXNbaV0uY29uY2F0KFwiIFwiLCBzcGxpdF92YWx1ZXNbaSArIDFdKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYXNfbW9tZW50ICE9PSBcImJvb2xlYW5cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVfZGF0ZV9jaGFuZ2UoaW5kZXggKyBpIC0gc2tpcHBlZF9pbmRpY2VzLCBhc19tb21lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNraXBwZWRfaW5kaWNlcysrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpICs9IDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXNfbW9tZW50ID0gY29udmVydF9zdHJpbmdfdG9fbW9tZW50KHNwbGl0X3ZhbHVlc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhc19tb21lbnQgIT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlX2RhdGVfY2hhbmdlKGluZGV4ICsgaSwgYXNfbW9tZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmxhZ19ub25fZGF0ZV9pbnB1dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGhhbmRsZV9kb3NlX3dlaWdodF9jaGFuZ2UgPSAoaW5kZXg6IG51bWJlciwgZXZlbnQ6IEZvcm1FdmVudDxIVE1MRWxlbWVudD4gfCBzdHJpbmcpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUubWl4ZWRfZG9zZSkge1xuICAgICAgICAgICAgLy8gaWYgbWl4ZWQsIHNldCBib3RoIHZhbHVlcyB0byB0aGlzXG4gICAgICAgICAgICB0aGlzLmhhbmRsZV9kb3NlX3dlaWdodF9jaGFuZ2UoMSwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGxldCB2YWx1ZSA9ICh0eXBlb2YgZXZlbnQgPT0gXCJzdHJpbmdcIikgPyBldmVudCA6IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgICAgIGxldCB2YWx1ZXNfc2VwX2J5X3NwYWNlcyA9IHZhbHVlLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgdmFsdWVzX3NlcF9ieV9zcGFjZXMgPSB2YWx1ZXNfc2VwX2J5X3NwYWNlcy5maWx0ZXIoKHZhbHVlOiBzdHJpbmcpID0+IHZhbHVlICE9PSBcIlwiKTtcbiAgICAgICAgaWYgKHZhbHVlc19zZXBfYnlfc3BhY2VzLmxlbmd0aCA9PT0gMSB8fCB2YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgaWYgKCFpc05hTigrdmFsdWUpIHx8IHZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5ld19kb3NlX3dlaWdodHMgPSB0aGlzLnN0YXRlLmRvc2Vfd2VpZ2h0cztcbiAgICAgICAgICAgICAgICBuZXdfZG9zZV93ZWlnaHRzLnNwbGljZShpbmRleCwgMSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvc2Vfd2VpZ2h0czogbmV3X2Rvc2Vfd2VpZ2h0cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3NlX3dlaWdodHNfdmFsaWRhdGVkOiB0aGlzLmNoZWNrX251bWVyaWNhbF9pbnB1dHMobmV3X2Rvc2Vfd2VpZ2h0cylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHRoaXMuX2ZsYWdfbm9uX251bWVyaWNhbF9pbnB1dCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXNfc2VwX2J5X3NwYWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlX2Rvc2Vfd2VpZ2h0X2NoYW5nZShpbmRleCArIGksIHZhbHVlc19zZXBfYnlfc3BhY2VzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBoYW5kbGVfZG9zZV9lbnJpY2htZW50X2NoYW5nZSA9IChpbmRleDogbnVtYmVyLCBldmVudDogRm9ybUV2ZW50PEhUTUxFbGVtZW50PiB8IHN0cmluZykgPT4ge1xuICAgICAgICBsZXQgdmFsdWUgPSAodHlwZW9mIGV2ZW50ID09IFwic3RyaW5nXCIpID8gZXZlbnQgOiAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuICAgICAgICBsZXQgdmFsdWVzX3NlcF9ieV9zcGFjZXMgPSB2YWx1ZS5zcGxpdChcIiBcIik7XG4gICAgICAgIHZhbHVlc19zZXBfYnlfc3BhY2VzID0gdmFsdWVzX3NlcF9ieV9zcGFjZXMuZmlsdGVyKCh2YWx1ZTogc3RyaW5nKSA9PiB2YWx1ZSAhPT0gXCJcIik7XG4gICAgICAgIGlmICh2YWx1ZXNfc2VwX2J5X3NwYWNlcy5sZW5ndGggPT09IDEgfHwgdmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIGlmICghaXNOYU4oK3ZhbHVlKSB8fCB2YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgICAgIGxldCBuZXdfZW5yaWNobWVudHMgPSB0aGlzLnN0YXRlLmRvc2VfZW5yaWNobWVudHM7XG4gICAgICAgICAgICAgICAgbmV3X2VucmljaG1lbnRzLnNwbGljZShpbmRleCwgMSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvc2VfZW5yaWNobWVudHM6IG5ld19lbnJpY2htZW50cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3NlX2VucmljaG1lbnRzX3ZhbGlkYXRlZDogdGhpcy5jaGVja19udW1lcmljYWxfaW5wdXRzKG5ld19lbnJpY2htZW50cylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHRoaXMuX2ZsYWdfbm9uX251bWVyaWNhbF9pbnB1dCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXNfc2VwX2J5X3NwYWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlX2Rvc2VfZW5yaWNobWVudF9jaGFuZ2UoaW5kZXggKyBpLCB2YWx1ZXNfc2VwX2J5X3NwYWNlc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgaGFuZGxlX3N1YmplY3Rfd2VpZ2h0X2NoYW5nZSA9IChpbmRleDogbnVtYmVyLCBldmVudDogRm9ybUV2ZW50PEhUTUxFbGVtZW50PiB8IHN0cmluZykgPT4ge1xuICAgICAgICBsZXQgdmFsdWUgPSAodHlwZW9mIGV2ZW50ID09IFwic3RyaW5nXCIpID8gZXZlbnQgOiAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuICAgICAgICBsZXQgdmFsdWVzX3NlcF9ieV9zcGFjZXMgPSB2YWx1ZS5zcGxpdChcIiBcIik7XG4gICAgICAgIHZhbHVlc19zZXBfYnlfc3BhY2VzID0gdmFsdWVzX3NlcF9ieV9zcGFjZXMuZmlsdGVyKCh2YWx1ZTogc3RyaW5nKSA9PiB2YWx1ZSAhPT0gXCJcIik7XG4gICAgICAgIGlmICh2YWx1ZXNfc2VwX2J5X3NwYWNlcy5sZW5ndGggPT09IDEgfHwgdmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIGlmICghaXNOYU4oK3ZhbHVlKSB8fCB2YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgICAgIGxldCBuZXdfd2VpZ2h0cyA9IHRoaXMuc3RhdGUuc3ViamVjdF93ZWlnaHRzO1xuICAgICAgICAgICAgICAgIG5ld193ZWlnaHRzLnNwbGljZShpbmRleCwgMSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3Rfd2VpZ2h0czogbmV3X3dlaWdodHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdF93ZWlnaHRzX3ZhbGlkYXRlZDogdGhpcy5jaGVja19udW1lcmljYWxfaW5wdXRzKG5ld193ZWlnaHRzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgdGhpcy5fZmxhZ19ub25fbnVtZXJpY2FsX2lucHV0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlc19zZXBfYnlfc3BhY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVfc3ViamVjdF93ZWlnaHRfY2hhbmdlKGluZGV4ICsgaSwgdmFsdWVzX3NlcF9ieV9zcGFjZXNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxufVxuIl19
