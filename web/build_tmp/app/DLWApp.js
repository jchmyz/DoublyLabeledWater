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
var NUM_SAMPLE_TIMES = 6;
var NUM_DELTAS = 5;
exports.DATE_LABELS = ['Background', 'Dose', 'PDA', 'PDB', 'EDA', 'EDB'];
exports.SAMPLE_LABELS = [exports.DATE_LABELS[0]].concat(exports.DATE_LABELS.slice(2, 6));
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
                        if (results.calculations && results.error_flags && results.schoeller) {
                            this.setState({
                                results: {
                                    calculations: results.calculations,
                                    schoeller: {
                                        rco2_ee_int: results.schoeller.rco2_ee_int,
                                        rco2_ee_plat: results.schoeller.rco2_ee_plat,
                                    },
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
                clear_popup_open: false,
                input_csv_name: "",
                deuterium_deltas: ["", "", "", "", ""],
                oxygen_deltas: ["", "", "", "", ""],
                datetimes: [_this.now, _this.now, _this.now, _this.now, _this.now, _this.now],
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
                results: { calculations: null, schoeller: null, error_flags: null },
            });
            // @ts-ignore
            document.getElementById('file-input').value = null;
        };
        _this.handle_csv_upload = function (event) { return __awaiter(_this, void 0, void 0, function () {
            var file, inputs, r, hit_error, inputted_d_deltas, inputted_o_deltas, i, inputted_dates, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('into handle csv upload');
                        file = event.target.files[0];
                        if (!(file.type === "text/csv")) return [3 /*break*/, 2];
                        return [4 /*yield*/, Requests_1.load_from_csv(file)];
                    case 1:
                        inputs = _a.sent();
                        if (inputs.error || (inputs.results == null)) {
                            AppToaster.show({
                                message: "Error reading input CSV file. For formatting help, press 'Help' in the upper right hand corner",
                                intent: "danger",
                                timeout: 0
                            });
                        }
                        else {
                            this.clear();
                            this.setState({ input_csv_name: file.name });
                            r = inputs.results;
                            hit_error = false;
                            try {
                                inputted_d_deltas = [r.d_meas_1, r.d_meas_2, r.d_meas_3, r.d_meas_4, r.d_meas_5];
                                inputted_o_deltas = [r.o_meas_1, r.o_meas_2, r.o_meas_3, r.o_meas_4, r.o_meas_5];
                                for (i = 0; i < NUM_DELTAS; i++) {
                                    this.handle_deuterium_delta_change(i, inputted_d_deltas[i]);
                                    this.handle_oxygen_delta_change(i, inputted_o_deltas[i]);
                                }
                            }
                            catch (e) {
                                hit_error = true;
                            }
                            try {
                                inputted_dates = [r.sample_time_1, r.sample_time_2, r.sample_time_3, r.sample_time_4, r.sample_time_5, r.sample_time_6];
                                for (i = 0; i < NUM_SAMPLE_TIMES; i++) {
                                    if (inputted_dates[i]) {
                                        this.handle_date_change(i, inputted_dates[i]);
                                    }
                                }
                            }
                            catch (e) {
                                hit_error = true;
                            }
                            try {
                                if (r.dose_weight) {
                                    this.setState({ mixed_dose: true });
                                    this.handle_dose_weight_change(0, r.dose_weight);
                                }
                                else if (r.dose_weight_d && r.dose_weight_o) {
                                    this.handle_dose_weight_change(0, r.dose_weight_d);
                                    this.handle_dose_weight_change(1, r.dose_weight_o);
                                }
                            }
                            catch (e) {
                                hit_error = true;
                            }
                            try {
                                this.handle_dose_enrichment_change(0, r.dose_enrichment_d);
                                this.handle_dose_enrichment_change(1, r.dose_enrichment_o);
                                this.handle_subject_weight_change(0, r.subject_weight_initial);
                                this.handle_subject_weight_change(1, r.subject_weight_final);
                                this.handle_subject_id_change(r.subject_id);
                            }
                            catch (e) {
                                hit_error = true;
                            }
                            if (hit_error) {
                                AppToaster.show({
                                    message: "One or more values not inputted automatically. Add manually, or fix CSV format." +
                                        " For formatting help, press 'Help' in the upper right hand corner",
                                    intent: "danger",
                                    timeout: 0
                                });
                            }
                            else {
                                console.log('filename is ', this.state.input_csv_name);
                                AppToaster.show({
                                    message: "Inputs successfully loaded from ".concat(this.state.input_csv_name),
                                    intent: "primary",
                                    timeout: 3000
                                });
                            }
                        }
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
        _this.handle_subject_id_change = function (event) {
            if (_this.state.results.calculations) {
                _this.setState({ clear_popup_open: true });
            }
            var value = (typeof event == "string") ? event : event.target.value;
            _this.setState({ subject_id: value });
        };
        _this.now = moment();
        _this.scroll_anchor_ref = React.createRef();
        _this.state = {
            input_csv_name: "",
            info_overlay_open: false,
            clear_popup_open: false,
            delta_units: DeltaUnits.permil,
            deuterium_deltas: ["", "", "", "", ""],
            oxygen_deltas: ["", "", "", "", ""],
            datetimes: [_this.now, _this.now, _this.now, _this.now, _this.now, _this.now],
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
            results: { calculations: null, schoeller: null, error_flags: null },
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
            collection_time_inputs.push(React.createElement(DateTimePicker, { onChange: function (value) { return _this.handle_date_change(i, value); }, inputProps: {
                    className: 'date-input-box .bp3-input',
                    placeholder: ' ' + exports.DATE_LABELS[i] + ' sample date and time',
                    value: (this_1.state.datetimes[i] === this_1.now) ? "" : this_1.state.datetimes[i].format('YYYY-MM-DD HH:mm')
                }, key: i, value: this_1.state.datetimes[i], dateFormat: "YYYY-MM-DD", timeFormat: "HH:mm" }));
        };
        var this_1 = this;
        for (var i = 0; i < NUM_SAMPLE_TIMES; i++) {
            _loop_1(i);
        }
        for (var i = 0; i < NUM_DELTAS; i++) {
            deuterium_delta_inputs.push(React.createElement(NumberInput_1.NumberInput, { placeholder: exports.SAMPLE_LABELS[i] + " Deuterium delta", index: i, key: i, change_function: this.handle_deuterium_delta_change, unit: this.state.delta_units, value: this.state.deuterium_deltas[i] }));
            oxygen_delta_inputs.push(React.createElement(NumberInput_1.NumberInput, { placeholder: exports.SAMPLE_LABELS[i] + ' Oxygen 18 delta', index: i, key: i, unit: this.state.delta_units, change_function: this.handle_oxygen_delta_change, value: this.state.oxygen_deltas[i] }));
        }
        deuterium_delta_inputs.splice(1, 0, React.createElement("div", { className: 'delta-space' }));
        oxygen_delta_inputs.splice(1, 0, React.createElement("div", { className: 'delta-space' }));
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
        if (this.state.results.calculations && this.state.results.schoeller && this.state.results.error_flags) {
            var results_calculations = [];
            var results_rco2_ee_int = [];
            var results_rco2_ee_plat = [];
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
            function push_schoeller_results(element, result_set) {
                element.push(React.createElement("div", { className: 'result-pair' },
                    React.createElement("p", { className: "result-label" }, result_set.rco2_mol_day[0] + ":"),
                    React.createElement("p", { className: "result-value" }, result_set.rco2_mol_day[1] + " mol/day")));
                element.push(React.createElement("div", { className: 'result-pair' },
                    React.createElement("p", { className: "result-label" }, result_set.rco2_l_hr[0] + ":"),
                    React.createElement("p", { className: "result-value" }, result_set.rco2_l_hr[1] + " L/day")));
                element.push(React.createElement("div", { className: 'result-pair' },
                    React.createElement("p", { className: "result-label" }, result_set.ee_kcal_day[0] + ":"),
                    React.createElement("p", { className: "result-value" }, result_set.ee_kcal_day[1] + " kcal/day")));
                element.push(React.createElement("div", { className: 'result-pair' },
                    React.createElement("p", { className: "result-label" }, result_set.ee_mj_day[0] + ":"),
                    React.createElement("p", { className: "result-value" }, result_set.ee_mj_day[1] + " MJ/day")));
            }
            push_schoeller_results(results_rco2_ee_int, this.state.results.schoeller.rco2_ee_int);
            push_schoeller_results(results_rco2_ee_plat, this.state.results.schoeller.rco2_ee_plat);
            var error_okay = "error-okay";
            var outside_error_bars = "error-not-okay";
            var error_class = ((parseFloat(this.state.results.error_flags.plateau_2h[1]) < 0.05) ? error_okay : outside_error_bars);
            results_error_flags.push(React.createElement("div", { className: 'result-pair' },
                React.createElement("p", { className: "result-label" }, this.state.results.error_flags.plateau_2h[0] + ":"),
                React.createElement("p", { className: "result-value " + error_class }, this.state.results.error_flags.plateau_2h[1] + '%')));
            error_class = ((parseFloat(this.state.results.error_flags.plateau_180[1]) < 0.05) ? error_okay : outside_error_bars);
            results_error_flags.push(React.createElement("div", { className: 'result-pair' },
                React.createElement("p", { className: "result-label" }, this.state.results.error_flags.plateau_180[0] + ":"),
                React.createElement("p", { className: "result-value " + error_class }, this.state.results.error_flags.plateau_180[1] + '%')));
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
                            results_rco2_ee_int,
                            React.createElement("h5", { className: 'result-header-calc' }, "rCO2 and EE, plateau method"),
                            results_rco2_ee_plat),
                        React.createElement("div", { className: 'result-section' },
                            React.createElement("h5", { className: 'result-header-error' }, "Error Flags"),
                            results_error_flags))),
                React.createElement(cjs_1.Card, { className: 'results-card' },
                    React.createElement("div", { className: 'result-sections' },
                        React.createElement("div", { className: 'result-section' },
                            React.createElement("h5", { className: 'chart-title' }, "Deuterium/O18 Measured Enrichments"),
                            deltas_chart)))));
        }
        return (React.createElement(cjs_1.Navbar, { className: 'dlw-nav' },
            React.createElement(core_1.Dialog, { isOpen: this.state.info_overlay_open, canEscapeKeyClose: true, canOutsideClickClose: false, hasBackdrop: true, isCloseButtonShown: true, onClose: function () {
                    _this.setState({ info_overlay_open: false });
                }, title: 'How to use the Doubly Labeled Water App' },
                React.createElement("p", { className: 'help-paragraph' },
                    "Mixed Dose: If checked, enter 18O and 2H enrichments of the dose as measured ",
                    React.createElement("strong", null, "after"),
                    " mixing.")),
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
                        React.createElement(core_1.Popover, { isOpen: this.state.clear_popup_open, position: "right", content: React.createElement("div", { className: 'clear-popover' },
                                React.createElement("p", { className: 'help-paragraph' }, "Entering a new subject ID. Clear data inputs?"),
                                React.createElement("div", { className: 'popover-button-container' },
                                    React.createElement(core_1.Button, { className: 'popover-button', onClick: this.clear }, "CLEAR INPUTS"),
                                    React.createElement(core_1.Button, { className: 'popover-button', onClick: function () { return _this.setState({ clear_popup_open: false }); } }, "KEEP INPUTS"))) },
                            React.createElement(core_1.InputGroup, { leftIcon: (this.state.subject_id ? "tick" : "circle-arrow-right"), className: '.bp3-fill subject-id', onChange: this.handle_subject_id_change, placeholder: 'ID', value: this.state.subject_id }))),
                    React.createElement("div", null,
                        React.createElement(core_1.Button, { className: 'clear-button', onClick: this.clear }, "CLEAR INPUTS"))),
                React.createElement("div", { className: 'load-from-csv' },
                    React.createElement("h5", null, "Load input data from .csv file"),
                    React.createElement(core_1.FileInput, { text: this.state.input_csv_name || "Choose file...", inputProps: {
                            'accept': '.csv',
                            'id': 'file-input'
                        }, onInputChange: this.handle_csv_upload, disabled: !!(this.state.input_csv_name) })),
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
                    React.createElement("div", { className: 'mixed-dose' },
                        React.createElement("div", { className: 'mixed-dose-box' },
                            React.createElement(core_1.Checkbox, { checked: this.state.mixed_dose, labelElement: React.createElement("h5", null, "Mixed Dose"), large: true, onChange: function () {
                                    _this.setState({ mixed_dose: !_this.state.mixed_dose });
                                }, alignIndicator: core_1.Alignment.RIGHT })),
                        React.createElement(core_1.Button, { icon: "help", minimal: true, className: 'mixed-dose-help-button', onClick: function () { return _this.setState({ info_overlay_open: true }); } }))),
                React.createElement("div", { className: 'element-wise-inputs' },
                    React.createElement("div", { className: 'inputs-by-element' },
                        React.createElement("h5", null, ((this.state.mixed_dose) ? 'Dose Weight' : 'Dose Weights')),
                        dose_weight_inputs),
                    React.createElement("div", { className: 'inputs-by-element' },
                        React.createElement("h5", null, ((this.state.mixed_dose) ? 'Mixed Dose Enrichments' : 'Dose Enrichments')),
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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UyxFQUFDLFdBQVcsRUFDaEQsUUFBUSxFQUFFLFVBQUMsS0FBNkI7Z0NBQ3BDLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLFlBQVksRUFBRyxLQUFLLENBQUMsTUFBMkIsQ0FBQyxLQUFLLEVBQUMsQ0FBQzs0QkFBdkUsQ0FBdUUsR0FBRyxDQUN4RjtvQkFDTiw2QkFBSyxTQUFTLEVBQUMsWUFBWTt3QkFDdkIsd0ZBQThEO3dCQUM5RCxvQkFBQyxnQkFBUyxJQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsSUFBSSxnQkFBZ0IsRUFDcEQsYUFBYSxFQUFFLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxTQUFTLEVBQUMsV0FBVyxHQUFFLENBQzlFO29CQUNOLG9CQUFDLGFBQU0sSUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsRUFDN0gsU0FBUyxFQUFDLGVBQWUsRUFBQyxNQUFNLEVBQUUsYUFBTSxDQUFDLE9BQU8sb0JBQXdCLENBQzlFO2dCQUNMLGVBQWUsQ0FDUixDQUNQLENBQ1osQ0FDSTtJQUNULENBQUM7SUFnWkwsYUFBQztBQUFELENBdHdCQSxBQXN3QkMsQ0F0d0IyQixLQUFLLENBQUMsU0FBUyxHQXN3QjFDO0FBdHdCWSx3QkFBTSIsImZpbGUiOiJETFdBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7XG4gICAgQnV0dG9uR3JvdXAsIFBvcG92ZXIsXG4gICAgRm9ybUdyb3VwLFxuICAgIE51bWVyaWNJbnB1dCxcbiAgICBCdXR0b24sIFRvYXN0ZXIsIFBvc2l0aW9uLFxuICAgIElucHV0R3JvdXAsIEFsaWdubWVudCwgVGFnLCBGaWxlSW5wdXQsIERpYWxvZywgQ2hlY2tib3gsIFJhZGlvLCBSYWRpb0dyb3VwLCBJbnRlbnRcbn0gZnJvbSBcIkBibHVlcHJpbnRqcy9jb3JlXCI7XG5pbXBvcnQgKiBhcyBEYXRlVGltZVBpY2tlciBmcm9tICdyZWFjdC1kYXRldGltZSc7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7Y2FsY3VsYXRlX2Zyb21faW5wdXRzLCBleHBvcnRfdG9fY3N2LCBsb2FkX2Zyb21fY3N2LCBMb2FkZWRDU1ZSZXN1bHRzfSBmcm9tIFwiLi9SZXF1ZXN0c1wiO1xuaW1wb3J0IHtGb3JtRXZlbnQsIFJlZk9iamVjdH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge0NhcmQsIEljb24sIE5hdmJhciwgTmF2YmFyRGl2aWRlciwgTmF2YmFyR3JvdXAsIE5hdmJhckhlYWRpbmd9IGZyb20gXCJAYmx1ZXByaW50anMvY29yZS9saWIvY2pzXCI7XG5pbXBvcnQge051bWJlcklucHV0fSBmcm9tIFwiLi9OdW1iZXJJbnB1dFwiO1xuaW1wb3J0IGNvbnZlcnRfc3RyaW5nX3RvX21vbWVudCBmcm9tIFwiLi91dGlsaXRpZXNcIjtcbmltcG9ydCB7RGVsdGFTY2F0dGVyQ2hhcnR9IGZyb20gXCIuL0RlbHRhU2NhdHRlckNoYXJ0XCI7XG5pbXBvcnQge0VYUEVDVEVEX0NTVl9GSUVMRFMsIExvYWRlZENTVklucHV0c30gZnJvbSBcIi4vdHlwZXMvQ2FsY3VsYXRpb25JbnB1dHNcIjtcblxuY29uc3QgREVVVEVSSVVNID0gXCJEZXV0ZXJpdW1cIjtcbmNvbnN0IE9YWUdFTiA9IFwiT3h5Z2VuIDE4XCI7XG5jb25zdCBFTEVNRU5UUyA9IFtERVVURVJJVU0sIE9YWUdFTl07XG5cbmNvbnN0IE5VTV9TQU1QTEVfVElNRVMgPSA2O1xuY29uc3QgTlVNX0RFTFRBUyA9IDU7XG5leHBvcnQgY29uc3QgREFURV9MQUJFTFMgPSBbJ0JhY2tncm91bmQnLCAnRG9zZScsICdQREEnLCAnUERCJywgJ0VEQScsICdFREInXTtcbmV4cG9ydCBjb25zdCBTQU1QTEVfTEFCRUxTID0gW0RBVEVfTEFCRUxTWzBdXS5jb25jYXQoREFURV9MQUJFTFMuc2xpY2UoMiwgNikpO1xuXG5pbnRlcmZhY2UgUkNPMl9SRVNVTFRTIHtcbiAgICByY28yX21vbF9kYXk6IHN0cmluZ1tdLFxuICAgIHJjbzJfbF9ocjogc3RyaW5nW10sXG4gICAgZWVfa2NhbF9kYXk6IHN0cmluZ1tdLFxuICAgIGVlX21qX2RheTogc3RyaW5nW11cbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZXN1bHRzIHtcbiAgICBjYWxjdWxhdGlvbnM6IHtcbiAgICAgICAgbmRwX2tnOiBzdHJpbmdbXSxcbiAgICAgICAga2RfaHI6IHN0cmluZ1tdLFxuICAgICAgICBub3Bfa2c6IHN0cmluZ1tdLFxuICAgICAgICBrb19ocjogc3RyaW5nW10sXG4gICAgICAgIGJvZHlfd2F0ZXJfYXZnX2tnOiBzdHJpbmdbXSxcbiAgICAgICAgZmF0X2ZyZWVfbWFzc19rZzogc3RyaW5nW10sXG4gICAgICAgIGZhdF9tYXNzX2tnOiBzdHJpbmdbXSxcbiAgICAgICAgYm9keV9mYXRfcGVyY2VudGFnZTogc3RyaW5nW11cbiAgICB9IHwgbnVsbCxcbiAgICBzY2hvZWxsZXI6IHtcbiAgICAgICAgcmNvMl9lZV9pbnQ6IFJDTzJfUkVTVUxUUywgcmNvMl9lZV9wbGF0OiBSQ08yX1JFU1VMVFNcbiAgICB9IHwgbnVsbFxuICAgIGVycm9yX2ZsYWdzOiB7XG4gICAgICAgIHBsYXRlYXVfMmg6IHN0cmluZ1tdLFxuICAgICAgICBwbGF0ZWF1XzE4MDogc3RyaW5nW10sXG4gICAgICAgIGRzX3JhdGlvOiBzdHJpbmdbXSxcbiAgICAgICAgZWU6IHN0cmluZ1tdLFxuICAgICAgICBrb19rZDogc3RyaW5nW11cbiAgICB9IHwgbnVsbFxufVxuXG5lbnVtIERlbHRhVW5pdHMge1xuICAgIHBlcm1pbCA9IFwicGVybWlsXCIsXG4gICAgcHBtID0gXCJwcG1cIlxufVxuXG5pbnRlcmZhY2UgRExXU3RhdGUge1xuICAgIGlucHV0X2Nzdl9uYW1lOiBzdHJpbmc7XG4gICAgaW5mb19vdmVybGF5X29wZW46IGJvb2xlYW47XG4gICAgY2xlYXJfcG9wdXBfb3BlbjogYm9vbGVhbjtcblxuICAgIGRlbHRhX3VuaXRzOiBEZWx0YVVuaXRzO1xuICAgIGRldXRlcml1bV9kZWx0YXM6IHN0cmluZ1tdLFxuICAgIG94eWdlbl9kZWx0YXM6IHN0cmluZ1tdLFxuICAgIGRhdGV0aW1lczogbW9tZW50Lk1vbWVudFtdLFxuICAgIGRvc2Vfd2VpZ2h0czogc3RyaW5nW10sXG4gICAgZG9zZV9lbnJpY2htZW50czogc3RyaW5nW10sXG4gICAgc3ViamVjdF93ZWlnaHRzOiBzdHJpbmdbXSxcbiAgICBzdWJqZWN0X2lkOiBzdHJpbmc7XG4gICAgbWl4ZWRfZG9zZTogYm9vbGVhbjtcblxuICAgIGRldXRlcml1bV9kZWx0YXNfdmFsaWRhdGVkOiBib29sZWFuLFxuICAgIG94eWdlbl9kZWx0YXNfdmFsaWRhdGVkOiBib29sZWFuLFxuICAgIGRhdGV0aW1lc192YWxpZGF0ZWQ6IGJvb2xlYW4sXG4gICAgZG9zZV93ZWlnaHRzX3ZhbGlkYXRlZDogYm9vbGVhbixcbiAgICBkb3NlX2VucmljaG1lbnRzX3ZhbGlkYXRlZDogYm9vbGVhbixcbiAgICBzdWJqZWN0X3dlaWdodHNfdmFsaWRhdGVkOiBib29sZWFuLFxuXG4gICAgcmVzdWx0czogUmVzdWx0c1xuICAgIG5ld19jc3ZfbmFtZTogc3RyaW5nLFxuICAgIGFwcGVuZF9jc3ZfbmFtZTogc3RyaW5nXG59XG5cbmNvbnN0IEFwcFRvYXN0ZXIgPSBUb2FzdGVyLmNyZWF0ZSh7Y2xhc3NOYW1lOiBcImFwcC10b2FzdGVyXCIsIHBvc2l0aW9uOiBQb3NpdGlvbi5UT1BfUklHSFR9KTtcblxuZXhwb3J0IGNsYXNzIERMV0FwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxhbnksIERMV1N0YXRlPiB7XG4gICAgbm93OiBtb21lbnQuTW9tZW50O1xuICAgIHNjcm9sbF9hbmNob3JfcmVmOiBSZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQ+O1xuXG4gICAgY29uc3RydWN0b3IocHJvcHM6IGFueSkge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMubm93ID0gbW9tZW50KCk7XG4gICAgICAgIHRoaXMuc2Nyb2xsX2FuY2hvcl9yZWYgPSBSZWFjdC5jcmVhdGVSZWYoKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGlucHV0X2Nzdl9uYW1lOiBcIlwiLFxuICAgICAgICAgICAgaW5mb19vdmVybGF5X29wZW46IGZhbHNlLFxuICAgICAgICAgICAgY2xlYXJfcG9wdXBfb3BlbjogZmFsc2UsXG5cbiAgICAgICAgICAgIGRlbHRhX3VuaXRzOiBEZWx0YVVuaXRzLnBlcm1pbCxcbiAgICAgICAgICAgIGRldXRlcml1bV9kZWx0YXM6IFtcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiXSxcbiAgICAgICAgICAgIG94eWdlbl9kZWx0YXM6IFtcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiXSxcbiAgICAgICAgICAgIGRhdGV0aW1lczogW3RoaXMubm93LCB0aGlzLm5vdywgdGhpcy5ub3csIHRoaXMubm93LCB0aGlzLm5vdywgdGhpcy5ub3ddLFxuICAgICAgICAgICAgZG9zZV93ZWlnaHRzOiBbXCJcIiwgXCJcIl0sXG4gICAgICAgICAgICBkb3NlX2VucmljaG1lbnRzOiBbXCJcIiwgXCJcIl0sXG4gICAgICAgICAgICBtaXhlZF9kb3NlOiBmYWxzZSxcbiAgICAgICAgICAgIHN1YmplY3Rfd2VpZ2h0czogW1wiXCIsIFwiXCJdLFxuICAgICAgICAgICAgc3ViamVjdF9pZDogXCJcIixcblxuICAgICAgICAgICAgZGV1dGVyaXVtX2RlbHRhc192YWxpZGF0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgb3h5Z2VuX2RlbHRhc192YWxpZGF0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgZGF0ZXRpbWVzX3ZhbGlkYXRlZDogZmFsc2UsXG4gICAgICAgICAgICBkb3NlX3dlaWdodHNfdmFsaWRhdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGRvc2VfZW5yaWNobWVudHNfdmFsaWRhdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIHN1YmplY3Rfd2VpZ2h0c192YWxpZGF0ZWQ6IGZhbHNlLFxuXG4gICAgICAgICAgICByZXN1bHRzOiB7Y2FsY3VsYXRpb25zOiBudWxsLCBzY2hvZWxsZXI6IG51bGwsIGVycm9yX2ZsYWdzOiBudWxsfSxcbiAgICAgICAgICAgIG5ld19jc3ZfbmFtZTogXCJcIiwgYXBwZW5kX2Nzdl9uYW1lOiBcIlwiXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgYWxsX2lucHV0c192YWxpZGF0ZWQgPVxuICAgICAgICAgICAgKHRoaXMuc3RhdGUuZGV1dGVyaXVtX2RlbHRhc192YWxpZGF0ZWQgJiYgdGhpcy5zdGF0ZS5veHlnZW5fZGVsdGFzX3ZhbGlkYXRlZFxuICAgICAgICAgICAgICAgICYmIHRoaXMuc3RhdGUuZGF0ZXRpbWVzX3ZhbGlkYXRlZCAmJiB0aGlzLnN0YXRlLmRvc2Vfd2VpZ2h0c192YWxpZGF0ZWRcbiAgICAgICAgICAgICAgICAmJiB0aGlzLnN0YXRlLmRvc2VfZW5yaWNobWVudHNfdmFsaWRhdGVkICYmIHRoaXMuc3RhdGUuc3ViamVjdF93ZWlnaHRzX3ZhbGlkYXRlZFxuICAgICAgICAgICAgICAgICYmIHRoaXMuc3RhdGUuc3ViamVjdF9pZCk7XG5cbiAgICAgICAgbGV0IGRldXRlcml1bV9kZWx0YV9pbnB1dHM6IEpTWC5FbGVtZW50W10gPSBbXTtcbiAgICAgICAgbGV0IG94eWdlbl9kZWx0YV9pbnB1dHM6IEpTWC5FbGVtZW50W10gPSBbXTtcbiAgICAgICAgbGV0IGNvbGxlY3Rpb25fdGltZV9pbnB1dHM6IEpTWC5FbGVtZW50W10gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOVU1fU0FNUExFX1RJTUVTOyBpKyspIHtcbiAgICAgICAgICAgIGNvbGxlY3Rpb25fdGltZV9pbnB1dHMucHVzaChcbiAgICAgICAgICAgICAgICA8RGF0ZVRpbWVQaWNrZXIgb25DaGFuZ2U9eyh2YWx1ZSkgPT4gdGhpcy5oYW5kbGVfZGF0ZV9jaGFuZ2UoaSwgdmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdkYXRlLWlucHV0LWJveCAuYnAzLWlucHV0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnICcgKyBEQVRFX0xBQkVMU1tpXSArICcgc2FtcGxlIGRhdGUgYW5kIHRpbWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICh0aGlzLnN0YXRlLmRhdGV0aW1lc1tpXSA9PT0gdGhpcy5ub3cpID8gXCJcIiA6IHRoaXMuc3RhdGUuZGF0ZXRpbWVzW2ldLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aX0gdmFsdWU9e3RoaXMuc3RhdGUuZGF0ZXRpbWVzW2ldfSBkYXRlRm9ybWF0PVwiWVlZWS1NTS1ERFwiIHRpbWVGb3JtYXQ9XCJISDptbVwiLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOVU1fREVMVEFTOyBpKyspIHtcbiAgICAgICAgICAgIGRldXRlcml1bV9kZWx0YV9pbnB1dHMucHVzaChcbiAgICAgICAgICAgICAgICA8TnVtYmVySW5wdXQgcGxhY2Vob2xkZXI9e1NBTVBMRV9MQUJFTFNbaV0gKyBcIiBEZXV0ZXJpdW0gZGVsdGFcIn0gaW5kZXg9e2l9IGtleT17aX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlX2Z1bmN0aW9uPXt0aGlzLmhhbmRsZV9kZXV0ZXJpdW1fZGVsdGFfY2hhbmdlfSB1bml0PXt0aGlzLnN0YXRlLmRlbHRhX3VuaXRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5kZXV0ZXJpdW1fZGVsdGFzW2ldfS8+KTtcbiAgICAgICAgICAgIG94eWdlbl9kZWx0YV9pbnB1dHMucHVzaChcbiAgICAgICAgICAgICAgICA8TnVtYmVySW5wdXQgcGxhY2Vob2xkZXI9e1NBTVBMRV9MQUJFTFNbaV0gKyAnIE94eWdlbiAxOCBkZWx0YSd9IGluZGV4PXtpfSBrZXk9e2l9IHVuaXQ9e3RoaXMuc3RhdGUuZGVsdGFfdW5pdHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZV9mdW5jdGlvbj17dGhpcy5oYW5kbGVfb3h5Z2VuX2RlbHRhX2NoYW5nZX0gdmFsdWU9e3RoaXMuc3RhdGUub3h5Z2VuX2RlbHRhc1tpXX0vPik7XG4gICAgICAgIH1cbiAgICAgICAgZGV1dGVyaXVtX2RlbHRhX2lucHV0cy5zcGxpY2UoMSwgMCwgPGRpdiBjbGFzc05hbWU9J2RlbHRhLXNwYWNlJy8+KTtcbiAgICAgICAgb3h5Z2VuX2RlbHRhX2lucHV0cy5zcGxpY2UoMSwgMCwgPGRpdiBjbGFzc05hbWU9J2RlbHRhLXNwYWNlJy8+KTtcblxuICAgICAgICBsZXQgZG9zZV93ZWlnaHRfaW5wdXRzOiBKU1guRWxlbWVudFtdID0gW107XG4gICAgICAgIGxldCBkb3NlX2VucmljaG1lbnRfaW5wdXRzOiBKU1guRWxlbWVudFtdID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgRUxFTUVOVFMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZS5taXhlZF9kb3NlKSB7XG4gICAgICAgICAgICAgICAgZG9zZV93ZWlnaHRfaW5wdXRzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIDxOdW1iZXJJbnB1dCBwbGFjZWhvbGRlcj17RUxFTUVOVFNbaV0gKyAnIGRvc2Ugd2VpZ2h0IChnKSd9IGluZGV4PXtpfSBrZXk9e2l9IHVuaXQ9e1wiZ1wifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlX2Z1bmN0aW9uPXt0aGlzLmhhbmRsZV9kb3NlX3dlaWdodF9jaGFuZ2V9IHZhbHVlPXt0aGlzLnN0YXRlLmRvc2Vfd2VpZ2h0c1tpXX0vPik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb3NlX2VucmljaG1lbnRfaW5wdXRzLnB1c2goXG4gICAgICAgICAgICAgICAgPE51bWJlcklucHV0IHBsYWNlaG9sZGVyPXtFTEVNRU5UU1tpXSArICcgZG9zZSBlbnJpY2htZW50IChwcG0pJ30gaW5kZXg9e2l9IGtleT17aX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlX2Z1bmN0aW9uPXt0aGlzLmhhbmRsZV9kb3NlX2VucmljaG1lbnRfY2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5kb3NlX2VucmljaG1lbnRzW2ldfSB1bml0PXtcInBwbVwifS8+KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5taXhlZF9kb3NlKSB7XG4gICAgICAgICAgICBkb3NlX3dlaWdodF9pbnB1dHMucHVzaChcbiAgICAgICAgICAgICAgICA8TnVtYmVySW5wdXQgcGxhY2Vob2xkZXI9e1wiRG9zZSB3ZWlnaHQgKGcpXCJ9IGluZGV4PXswfSB2YWx1ZT17dGhpcy5zdGF0ZS5kb3NlX3dlaWdodHNbMF19IHVuaXQ9e1wiZ1wifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VfZnVuY3Rpb249e3RoaXMuaGFuZGxlX2Rvc2Vfd2VpZ2h0X2NoYW5nZX0vPik7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlc3VsdHNfZGlzcGxheTogSlNYLkVsZW1lbnQgPSA8ZGl2Lz47XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnJlc3VsdHMuY2FsY3VsYXRpb25zICYmIHRoaXMuc3RhdGUucmVzdWx0cy5zY2hvZWxsZXIgJiYgdGhpcy5zdGF0ZS5yZXN1bHRzLmVycm9yX2ZsYWdzKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0c19jYWxjdWxhdGlvbnM6IEpTWC5FbGVtZW50W10gPSBbXTtcbiAgICAgICAgICAgIGxldCByZXN1bHRzX3JjbzJfZWVfaW50OiBKU1guRWxlbWVudFtdID0gW107XG4gICAgICAgICAgICBsZXQgcmVzdWx0c19yY28yX2VlX3BsYXQ6IEpTWC5FbGVtZW50W10gPSBbXTtcbiAgICAgICAgICAgIGxldCByZXN1bHRzX2Vycm9yX2ZsYWdzOiBKU1guRWxlbWVudFtdID0gW107XG4gICAgICAgICAgICByZXN1bHRzX2NhbGN1bGF0aW9ucy5wdXNoKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyZXN1bHQtcGFpcic+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJlc3VsdC1sYWJlbFwiPnt0aGlzLnN0YXRlLnJlc3VsdHMuY2FsY3VsYXRpb25zLm5kcF9rZ1swXSArIFwiOlwifTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicmVzdWx0LXZhbHVlXCI+e3RoaXMuc3RhdGUucmVzdWx0cy5jYWxjdWxhdGlvbnMubmRwX2tnWzFdICsgXCIga2dcIn08L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+KTtcbiAgICAgICAgICAgIHJlc3VsdHNfY2FsY3VsYXRpb25zLnB1c2goXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jlc3VsdC1wYWlyJz5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicmVzdWx0LWxhYmVsXCI+e3RoaXMuc3RhdGUucmVzdWx0cy5jYWxjdWxhdGlvbnMua2RfaHJbMF0gKyBcIjpcIn08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJlc3VsdC12YWx1ZVwiPnt0aGlzLnN0YXRlLnJlc3VsdHMuY2FsY3VsYXRpb25zLmtkX2hyWzFdfTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj4pO1xuICAgICAgICAgICAgcmVzdWx0c19jYWxjdWxhdGlvbnMucHVzaChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncmVzdWx0LXBhaXInPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJyZXN1bHQtbGFiZWxcIj57dGhpcy5zdGF0ZS5yZXN1bHRzLmNhbGN1bGF0aW9ucy5ub3Bfa2dbMF0gKyBcIjpcIn08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJlc3VsdC12YWx1ZVwiPnt0aGlzLnN0YXRlLnJlc3VsdHMuY2FsY3VsYXRpb25zLm5vcF9rZ1sxXSArIFwiIGtnXCJ9PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2Pik7XG4gICAgICAgICAgICByZXN1bHRzX2NhbGN1bGF0aW9ucy5wdXNoKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyZXN1bHQtcGFpcic+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJlc3VsdC1sYWJlbFwiPnt0aGlzLnN0YXRlLnJlc3VsdHMuY2FsY3VsYXRpb25zLmtvX2hyWzBdICsgXCI6XCJ9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJyZXN1bHQtdmFsdWVcIj57dGhpcy5zdGF0ZS5yZXN1bHRzLmNhbGN1bGF0aW9ucy5rb19oclsxXX08L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+KTtcbiAgICAgICAgICAgIHJlc3VsdHNfY2FsY3VsYXRpb25zLnB1c2goXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jlc3VsdC1wYWlyJz5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicmVzdWx0LWxhYmVsXCI+e3RoaXMuc3RhdGUucmVzdWx0cy5jYWxjdWxhdGlvbnMuYm9keV93YXRlcl9hdmdfa2dbMF0gKyBcIjpcIn08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJlc3VsdC12YWx1ZVwiPnt0aGlzLnN0YXRlLnJlc3VsdHMuY2FsY3VsYXRpb25zLmJvZHlfd2F0ZXJfYXZnX2tnWzFdICsgXCIga2dcIn08L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+KTtcbiAgICAgICAgICAgIHJlc3VsdHNfY2FsY3VsYXRpb25zLnB1c2goXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jlc3VsdC1wYWlyJz5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicmVzdWx0LWxhYmVsXCI+e3RoaXMuc3RhdGUucmVzdWx0cy5jYWxjdWxhdGlvbnMuZmF0X2ZyZWVfbWFzc19rZ1swXSArIFwiOlwifTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicmVzdWx0LXZhbHVlXCI+e3RoaXMuc3RhdGUucmVzdWx0cy5jYWxjdWxhdGlvbnMuZmF0X2ZyZWVfbWFzc19rZ1sxXSArIFwiIGtnXCJ9PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2Pik7XG4gICAgICAgICAgICByZXN1bHRzX2NhbGN1bGF0aW9ucy5wdXNoKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyZXN1bHQtcGFpcic+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJlc3VsdC1sYWJlbFwiPnt0aGlzLnN0YXRlLnJlc3VsdHMuY2FsY3VsYXRpb25zLmZhdF9tYXNzX2tnWzBdICsgXCI6XCJ9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJyZXN1bHQtdmFsdWVcIj57dGhpcy5zdGF0ZS5yZXN1bHRzLmNhbGN1bGF0aW9ucy5mYXRfbWFzc19rZ1sxXSArIFwiIGtnXCJ9PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2Pik7XG4gICAgICAgICAgICByZXN1bHRzX2NhbGN1bGF0aW9ucy5wdXNoKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyZXN1bHQtcGFpcic+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJlc3VsdC1sYWJlbFwiPnt0aGlzLnN0YXRlLnJlc3VsdHMuY2FsY3VsYXRpb25zLmJvZHlfZmF0X3BlcmNlbnRhZ2VbMF0gKyBcIjpcIn08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJlc3VsdC12YWx1ZVwiPnt0aGlzLnN0YXRlLnJlc3VsdHMuY2FsY3VsYXRpb25zLmJvZHlfZmF0X3BlcmNlbnRhZ2VbMV0gKyBcIiVcIn08L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+KTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gcHVzaF9zY2hvZWxsZXJfcmVzdWx0cyhlbGVtZW50OiBKU1guRWxlbWVudFtdLCByZXN1bHRfc2V0OiBSQ08yX1JFU1VMVFMpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnB1c2goXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyZXN1bHQtcGFpcic+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJyZXN1bHQtbGFiZWxcIj57cmVzdWx0X3NldC5yY28yX21vbF9kYXlbMF0gKyBcIjpcIn08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJyZXN1bHQtdmFsdWVcIj57cmVzdWx0X3NldC5yY28yX21vbF9kYXlbMV0gKyBcIiBtb2wvZGF5XCJ9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj4pO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQucHVzaChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jlc3VsdC1wYWlyJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJlc3VsdC1sYWJlbFwiPntyZXN1bHRfc2V0LnJjbzJfbF9oclswXSArIFwiOlwifTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJlc3VsdC12YWx1ZVwiPntyZXN1bHRfc2V0LnJjbzJfbF9oclsxXSArIFwiIEwvZGF5XCJ9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj4pO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQucHVzaChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jlc3VsdC1wYWlyJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJlc3VsdC1sYWJlbFwiPntyZXN1bHRfc2V0LmVlX2tjYWxfZGF5WzBdICsgXCI6XCJ9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicmVzdWx0LXZhbHVlXCI+e3Jlc3VsdF9zZXQuZWVfa2NhbF9kYXlbMV0gKyBcIiBrY2FsL2RheVwifTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+KTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnB1c2goXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyZXN1bHQtcGFpcic+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJyZXN1bHQtbGFiZWxcIj57cmVzdWx0X3NldC5lZV9tal9kYXlbMF0gKyBcIjpcIn08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJyZXN1bHQtdmFsdWVcIj57cmVzdWx0X3NldC5lZV9tal9kYXlbMV0gKyBcIiBNSi9kYXlcIn08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2Pik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHB1c2hfc2Nob2VsbGVyX3Jlc3VsdHMocmVzdWx0c19yY28yX2VlX2ludCwgdGhpcy5zdGF0ZS5yZXN1bHRzLnNjaG9lbGxlci5yY28yX2VlX2ludCk7XG4gICAgICAgICAgICBwdXNoX3NjaG9lbGxlcl9yZXN1bHRzKHJlc3VsdHNfcmNvMl9lZV9wbGF0LCB0aGlzLnN0YXRlLnJlc3VsdHMuc2Nob2VsbGVyLnJjbzJfZWVfcGxhdCk7XG5cbiAgICAgICAgICAgIGxldCBlcnJvcl9va2F5ID0gXCJlcnJvci1va2F5XCI7XG4gICAgICAgICAgICBsZXQgb3V0c2lkZV9lcnJvcl9iYXJzID0gXCJlcnJvci1ub3Qtb2theVwiO1xuICAgICAgICAgICAgbGV0IGVycm9yX2NsYXNzID0gKChwYXJzZUZsb2F0KHRoaXMuc3RhdGUucmVzdWx0cy5lcnJvcl9mbGFncy5wbGF0ZWF1XzJoWzFdKSA8IDAuMDUpID8gZXJyb3Jfb2theSA6IG91dHNpZGVfZXJyb3JfYmFycyk7XG4gICAgICAgICAgICByZXN1bHRzX2Vycm9yX2ZsYWdzLnB1c2goXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jlc3VsdC1wYWlyJz5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicmVzdWx0LWxhYmVsXCI+e3RoaXMuc3RhdGUucmVzdWx0cy5lcnJvcl9mbGFncy5wbGF0ZWF1XzJoWzBdICsgXCI6XCJ9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9e1wicmVzdWx0LXZhbHVlIFwiICsgZXJyb3JfY2xhc3N9Pnt0aGlzLnN0YXRlLnJlc3VsdHMuZXJyb3JfZmxhZ3MucGxhdGVhdV8yaFsxXSArICclJ308L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+KTtcbiAgICAgICAgICAgIGVycm9yX2NsYXNzID0gKChwYXJzZUZsb2F0KHRoaXMuc3RhdGUucmVzdWx0cy5lcnJvcl9mbGFncy5wbGF0ZWF1XzE4MFsxXSkgPCAwLjA1KSA/IGVycm9yX29rYXkgOiBvdXRzaWRlX2Vycm9yX2JhcnMpO1xuICAgICAgICAgICAgcmVzdWx0c19lcnJvcl9mbGFncy5wdXNoKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyZXN1bHQtcGFpcic+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJlc3VsdC1sYWJlbFwiPnt0aGlzLnN0YXRlLnJlc3VsdHMuZXJyb3JfZmxhZ3MucGxhdGVhdV8xODBbMF0gKyBcIjpcIn08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17XCJyZXN1bHQtdmFsdWUgXCIgKyBlcnJvcl9jbGFzc30+e3RoaXMuc3RhdGUucmVzdWx0cy5lcnJvcl9mbGFncy5wbGF0ZWF1XzE4MFsxXSArICclJ308L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+KTtcbiAgICAgICAgICAgIGVycm9yX2NsYXNzID0gKChwYXJzZUZsb2F0KHRoaXMuc3RhdGUucmVzdWx0cy5lcnJvcl9mbGFncy5kc19yYXRpb1sxXSkgPCAxLjA3MCAmJlxuICAgICAgICAgICAgICAgIHBhcnNlRmxvYXQodGhpcy5zdGF0ZS5yZXN1bHRzLmVycm9yX2ZsYWdzLmRzX3JhdGlvWzFdKSA+IDEpID8gZXJyb3Jfb2theSA6IG91dHNpZGVfZXJyb3JfYmFycyk7XG4gICAgICAgICAgICByZXN1bHRzX2Vycm9yX2ZsYWdzLnB1c2goXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jlc3VsdC1wYWlyJz5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicmVzdWx0LWxhYmVsXCI+e3RoaXMuc3RhdGUucmVzdWx0cy5lcnJvcl9mbGFncy5kc19yYXRpb1swXSArIFwiOlwifTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtcInJlc3VsdC12YWx1ZSBcIiArIGVycm9yX2NsYXNzfT57dGhpcy5zdGF0ZS5yZXN1bHRzLmVycm9yX2ZsYWdzLmRzX3JhdGlvWzFdfTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj4pO1xuICAgICAgICAgICAgZXJyb3JfY2xhc3MgPSAoKHBhcnNlRmxvYXQodGhpcy5zdGF0ZS5yZXN1bHRzLmVycm9yX2ZsYWdzLmVlWzFdKSA8IDEwKSA/IGVycm9yX29rYXkgOiBvdXRzaWRlX2Vycm9yX2JhcnMpO1xuICAgICAgICAgICAgcmVzdWx0c19lcnJvcl9mbGFncy5wdXNoKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyZXN1bHQtcGFpcic+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJlc3VsdC1sYWJlbFwiPnt0aGlzLnN0YXRlLnJlc3VsdHMuZXJyb3JfZmxhZ3MuZWVbMF0gKyBcIjpcIn08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17XCJyZXN1bHQtdmFsdWUgXCIgKyBlcnJvcl9jbGFzc30+e3RoaXMuc3RhdGUucmVzdWx0cy5lcnJvcl9mbGFncy5lZVsxXSArIFwiJVwifTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj4pO1xuICAgICAgICAgICAgZXJyb3JfY2xhc3MgPSAoKHBhcnNlRmxvYXQodGhpcy5zdGF0ZS5yZXN1bHRzLmVycm9yX2ZsYWdzLmtvX2tkWzFdKSA8IDEuNyAmJlxuICAgICAgICAgICAgICAgIHBhcnNlRmxvYXQodGhpcy5zdGF0ZS5yZXN1bHRzLmVycm9yX2ZsYWdzLmtvX2tkWzFdKSA+IDEuMSkgPyBlcnJvcl9va2F5IDogb3V0c2lkZV9lcnJvcl9iYXJzKTtcbiAgICAgICAgICAgIHJlc3VsdHNfZXJyb3JfZmxhZ3MucHVzaChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncmVzdWx0LXBhaXInPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJyZXN1bHQtbGFiZWxcIj57dGhpcy5zdGF0ZS5yZXN1bHRzLmVycm9yX2ZsYWdzLmtvX2tkWzBdICsgXCI6XCJ9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9e1wicmVzdWx0LXZhbHVlIFwiICsgZXJyb3JfY2xhc3N9Pnt0aGlzLnN0YXRlLnJlc3VsdHMuZXJyb3JfZmxhZ3Mua29fa2RbMV19PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2Pik7XG4gICAgICAgICAgICBsZXQgY2hhcnRfZGF0YV9kX21lYXMgPSBbXTtcbiAgICAgICAgICAgIGxldCBjaGFydF9kYXRhX28xOF9tZWFzID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3RhdGUuZGV1dGVyaXVtX2RlbHRhcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNoYXJ0X2RhdGFfZF9tZWFzLnB1c2goe3g6IGksIHk6IHRoaXMuc3RhdGUuZGV1dGVyaXVtX2RlbHRhc1tpXX0pO1xuICAgICAgICAgICAgICAgIGNoYXJ0X2RhdGFfbzE4X21lYXMucHVzaCh7eDogaSwgeTogdGhpcy5zdGF0ZS5veHlnZW5fZGVsdGFzW2ldfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZGVsdGFzX2NoYXJ0OiBKU1guRWxlbWVudCA9IChcbiAgICAgICAgICAgICAgICA8RGVsdGFTY2F0dGVyQ2hhcnQgZGVsdGFfdW5pdHM9e3RoaXMuc3RhdGUuZGVsdGFfdW5pdHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJ0X2RhdGFfZF9tZWFzPXtjaGFydF9kYXRhX2RfbWVhc30gY2hhcnRfZGF0YV9vMThfbWVhcz17Y2hhcnRfZGF0YV9vMThfbWVhc30vPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJlc3VsdHNfZGlzcGxheSA9IChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncmVzdWx0cy1kaXNwbGF5JyByZWY9e3RoaXMuc2Nyb2xsX2FuY2hvcl9yZWZ9PlxuICAgICAgICAgICAgICAgICAgICA8Q2FyZCBjbGFzc05hbWU9J3Jlc3VsdHMtY2FyZCc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDE+eydSZXN1bHRzIGZvciBzdWJqZWN0ICcgKyB0aGlzLnN0YXRlLnN1YmplY3RfaWR9PC9oMT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyZXN1bHQtc2VjdGlvbnMnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyZXN1bHQtc2VjdGlvbic+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNSBjbGFzc05hbWU9J3Jlc3VsdC1oZWFkZXItY2FsYyc+Q2FsY3VsYXRpb25zPC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Jlc3VsdHNfY2FsY3VsYXRpb25zfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyZXN1bHQtc2VjdGlvbic+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNSBjbGFzc05hbWU9J3Jlc3VsdC1oZWFkZXItY2FsYyc+ckNPMiBhbmQgRUUsIGludGVyY2VwdCBtZXRob2Q8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cmVzdWx0c19yY28yX2VlX2ludH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1IGNsYXNzTmFtZT0ncmVzdWx0LWhlYWRlci1jYWxjJz5yQ08yIGFuZCBFRSwgcGxhdGVhdSBtZXRob2Q8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cmVzdWx0c19yY28yX2VlX3BsYXR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jlc3VsdC1zZWN0aW9uJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1IGNsYXNzTmFtZT0ncmVzdWx0LWhlYWRlci1lcnJvcic+RXJyb3IgRmxhZ3M8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cmVzdWx0c19lcnJvcl9mbGFnc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L0NhcmQ+XG4gICAgICAgICAgICAgICAgICAgIDxDYXJkIGNsYXNzTmFtZT0ncmVzdWx0cy1jYXJkJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyZXN1bHQtc2VjdGlvbnMnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyZXN1bHQtc2VjdGlvbic+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNSBjbGFzc05hbWU9J2NoYXJ0LXRpdGxlJz5EZXV0ZXJpdW0vTzE4IE1lYXN1cmVkIEVucmljaG1lbnRzPC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2RlbHRhc19jaGFydH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L0NhcmQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPE5hdmJhciBjbGFzc05hbWU9J2Rsdy1uYXYnPlxuICAgICAgICAgICAgICAgIDxEaWFsb2cgaXNPcGVuPXt0aGlzLnN0YXRlLmluZm9fb3ZlcmxheV9vcGVufSBjYW5Fc2NhcGVLZXlDbG9zZT17dHJ1ZX0gY2FuT3V0c2lkZUNsaWNrQ2xvc2U9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICAgICAgaGFzQmFja2Ryb3A9e3RydWV9IGlzQ2xvc2VCdXR0b25TaG93bj17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpbmZvX292ZXJsYXlfb3BlbjogZmFsc2V9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXsnSG93IHRvIHVzZSB0aGUgRG91Ymx5IExhYmVsZWQgV2F0ZXIgQXBwJ30+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0naGVscC1wYXJhZ3JhcGgnPk1peGVkIERvc2U6IElmIGNoZWNrZWQsIGVudGVyIDE4TyBhbmQgMkggZW5yaWNobWVudHMgb2YgdGhlIGRvc2UgYXNcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lYXN1cmVkIDxzdHJvbmc+YWZ0ZXI8L3N0cm9uZz4gbWl4aW5nLjwvcD5cbiAgICAgICAgICAgICAgICA8L0RpYWxvZz5cbiAgICAgICAgICAgICAgICA8TmF2YmFyR3JvdXAgYWxpZ249e0FsaWdubWVudC5MRUZUfT5cbiAgICAgICAgICAgICAgICAgICAgPE5hdmJhci5IZWFkaW5nIGNsYXNzTmFtZT0nZGx3LXRpdGxlJz5Eb3VibHkgTGFiZWxlZCBXYXRlcjwvTmF2YmFyLkhlYWRpbmc+XG4gICAgICAgICAgICAgICAgPC9OYXZiYXJHcm91cD5cbiAgICAgICAgICAgICAgICA8TmF2YmFyR3JvdXAgYWxpZ249e0FsaWdubWVudC5SSUdIVH0+XG4gICAgICAgICAgICAgICAgICAgIDxOYXZiYXJIZWFkaW5nIGNsYXNzTmFtZT0ndGFnbGluZSc+YW4gb3BlbiBzb3VyY2UgcHJvamVjdDwvTmF2YmFySGVhZGluZz5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCJhc3NldHMvbG9nb19jdWhzLnBuZ1wiIGFsdD1cIlVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQW5zY2h1dHogTWVkaWNhbCBDYW1wdXMgbG9nb1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3snaGVpZ2h0JzogMzB9fS8+XG4gICAgICAgICAgICAgICAgICAgIDxOYXZiYXJEaXZpZGVyLz5cbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9qY2hteXovRG91Ymx5TGFiZWxlZFdhdGVyXCIgdGFyZ2V0PVwiX2JsYW5rXCI+RG91Ymx5TGFiZWxlZFdhdGVyIG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBHaXRIdWI8L2E+XG4gICAgICAgICAgICAgICAgICAgIDxOYXZiYXJEaXZpZGVyLz5cbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBpY29uPXtcImhlbHBcIn0gbWluaW1hbD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLnNldFN0YXRlKHtpbmZvX292ZXJsYXlfb3BlbjogdHJ1ZX0pfT5IZWxwPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgPC9OYXZiYXJHcm91cD5cbiAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwIGNsYXNzTmFtZT0nZGx3LWFwcCc+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzdWJqZWN0LWNsZWFyJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1PlN1YmplY3QgSUQ8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxQb3BvdmVyIGlzT3Blbj17dGhpcy5zdGF0ZS5jbGVhcl9wb3B1cF9vcGVufSBwb3NpdGlvbj1cInJpZ2h0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50PXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NsZWFyLXBvcG92ZXInPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdoZWxwLXBhcmFncmFwaCc+RW50ZXJpbmcgYSBuZXcgc3ViamVjdCBJRC4gQ2xlYXIgZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0cz88L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncG9wb3Zlci1idXR0b24tY29udGFpbmVyJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGNsYXNzTmFtZT0ncG9wb3Zlci1idXR0b24nIG9uQ2xpY2s9e3RoaXMuY2xlYXJ9PkNMRUFSXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElOUFVUUzwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gY2xhc3NOYW1lPSdwb3BvdmVyLWJ1dHRvbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0U3RhdGUoe2NsZWFyX3BvcHVwX29wZW46IGZhbHNlfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPktFRVAgSU5QVVRTPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0R3JvdXAgbGVmdEljb249eyh0aGlzLnN0YXRlLnN1YmplY3RfaWQgPyBcInRpY2tcIiA6IFwiY2lyY2xlLWFycm93LXJpZ2h0XCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eycuYnAzLWZpbGwgc3ViamVjdC1pZCd9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZV9zdWJqZWN0X2lkX2NoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9J0lEJyB2YWx1ZT17dGhpcy5zdGF0ZS5zdWJqZWN0X2lkfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Qb3BvdmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gY2xhc3NOYW1lPSdjbGVhci1idXR0b24nIG9uQ2xpY2s9e3RoaXMuY2xlYXJ9PkNMRUFSIElOUFVUUzwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbG9hZC1mcm9tLWNzdic+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDU+TG9hZCBpbnB1dCBkYXRhIGZyb20gLmNzdiBmaWxlPC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGaWxlSW5wdXQgdGV4dD17dGhpcy5zdGF0ZS5pbnB1dF9jc3ZfbmFtZSB8fCBcIkNob29zZSBmaWxlLi4uXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdhY2NlcHQnOiAnLmNzdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaWQnOiAnZmlsZS1pbnB1dCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0gb25JbnB1dENoYW5nZT17dGhpcy5oYW5kbGVfY3N2X3VwbG9hZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyEhKHRoaXMuc3RhdGUuaW5wdXRfY3N2X25hbWUpfS8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc2FtcGxlcyc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZGF0ZS1pbnB1dHMnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNT5Db2xsZWN0aW9uIERhdGVzIGFuZCBUaW1lczwvaDU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2NvbGxlY3Rpb25fdGltZV9pbnB1dHN9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdkZWx0YS1pbnB1dHMnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNT5EZXV0ZXJpdW0gRGVsdGEgVmFsdWVzPC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZGV1dGVyaXVtX2RlbHRhX2lucHV0c31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2RlbHRhLWlucHV0cyc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1Pk94eWdlbiAxOCBEZWx0YSBWYWx1ZXM8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtveHlnZW5fZGVsdGFfaW5wdXRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZGVsdGEtdW5pdC1yYWRpbyc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFJhZGlvR3JvdXAgb25DaGFuZ2U9eyhldmVudDogRm9ybUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2RlbHRhX3VuaXRzOiAoZXZlbnQudGFyZ2V0IGFzIGFueSkudmFsdWV9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IHNlbGVjdGVkVmFsdWU9e3RoaXMuc3RhdGUuZGVsdGFfdW5pdHN9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UmFkaW8gbGFiZWw9XCJwZXJtaWxcIiB2YWx1ZT17RGVsdGFVbml0cy5wZXJtaWx9IGxhcmdlPXt0cnVlfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxSYWRpbyBsYWJlbD1cInBwbVwiIHZhbHVlPXtEZWx0YVVuaXRzLnBwbX0gbGFyZ2U9e3RydWV9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1JhZGlvR3JvdXA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdlbGVtZW50LXdpc2UtaW5wdXRzJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdtaXhlZC1kb3NlJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbWl4ZWQtZG9zZS1ib3gnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2tib3ggY2hlY2tlZD17dGhpcy5zdGF0ZS5taXhlZF9kb3NlfSBsYWJlbEVsZW1lbnQ9ezxoNT5NaXhlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRG9zZTwvaDU+fSBsYXJnZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bWl4ZWRfZG9zZTogIXRoaXMuc3RhdGUubWl4ZWRfZG9zZX0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSBhbGlnbkluZGljYXRvcj17QWxpZ25tZW50LlJJR0hUfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBpY29uPVwiaGVscFwiIG1pbmltYWw9e3RydWV9IGNsYXNzTmFtZT0nbWl4ZWQtZG9zZS1oZWxwLWJ1dHRvbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0U3RhdGUoe2luZm9fb3ZlcmxheV9vcGVuOiB0cnVlfSl9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2VsZW1lbnQtd2lzZS1pbnB1dHMnPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0cy1ieS1lbGVtZW50Jz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDU+eygodGhpcy5zdGF0ZS5taXhlZF9kb3NlKSA/ICdEb3NlIFdlaWdodCcgOiAnRG9zZSBXZWlnaHRzJyl9PC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZG9zZV93ZWlnaHRfaW5wdXRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXRzLWJ5LWVsZW1lbnQnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNT57KCh0aGlzLnN0YXRlLm1peGVkX2Rvc2UpID8gJ01peGVkIERvc2UgRW5yaWNobWVudHMnIDogJ0Rvc2UgRW5yaWNobWVudHMnKX08L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkb3NlX2VucmljaG1lbnRfaW5wdXRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZWxlbWVudC13aXNlLWlucHV0cyc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXRzLWJ5LWVsZW1lbnQnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNT5TdWJqZWN0IFdlaWdodDwvaDU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE51bWJlcklucHV0IHBsYWNlaG9sZGVyPXtcIkluaXRpYWwgc3ViamVjdCB3ZWlnaHQgKGtnKVwifSBpbmRleD17MH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlX2Z1bmN0aW9uPXt0aGlzLmhhbmRsZV9zdWJqZWN0X3dlaWdodF9jaGFuZ2V9IHVuaXQ9eydrZyd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnN1YmplY3Rfd2VpZ2h0c1swXX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxOdW1iZXJJbnB1dCBwbGFjZWhvbGRlcj17XCJGaW5hbCBzdWJqZWN0IHdlaWdodCAoa2cpXCJ9IGluZGV4PXsxfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VfZnVuY3Rpb249e3RoaXMuaGFuZGxlX3N1YmplY3Rfd2VpZ2h0X2NoYW5nZX0gdW5pdD17J2tnJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuc3ViamVjdF93ZWlnaHRzWzFdfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gY2xhc3NOYW1lPSdjYWxjdWxhdGUtYnV0dG9uJyBvbkNsaWNrPXt0aGlzLnN1Ym1pdF9pbnB1dHN9IGludGVudD17SW50ZW50LlNVQ0NFU1N9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshYWxsX2lucHV0c192YWxpZGF0ZWR9PkNBTENVTEFURSBSRVNVTFRTPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc3VibWl0LWdyb3VwJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjc3YtaW5wdXQtbmV3Jz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDU+SW5wdXQgYSBuYW1lIGZvciBhIG5ldyAuY3N2IGZpbGU8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dEdyb3VwIHBsYWNlaG9sZGVyPSdDU1YgZmlsZW5hbWUnIGNsYXNzTmFtZT0nY3N2X2lucHV0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQ6IEZvcm1FdmVudDxIVE1MRWxlbWVudD4pID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe25ld19jc3ZfbmFtZTogKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZX0pfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjc3YtYXBwZW5kJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDU+T3IsIHNlbGVjdCBhbiBleGlzdGluZyAuY3N2IGZpbGUgdG8gYXBwZW5kIHJlc3VsdHMgdG88L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGaWxlSW5wdXQgdGV4dD17dGhpcy5zdGF0ZS5hcHBlbmRfY3N2X25hbWUgfHwgXCJDaG9vc2UgZmlsZS4uLlwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25JbnB1dENoYW5nZT17dGhpcy5oYW5kbGVfY3N2X2FwcGVuZF9jaG9pY2V9IGNsYXNzTmFtZT0nY3N2LWlucHV0Jy8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5leHBvcnR9IGRpc2FibGVkPXshKHRoaXMuc3RhdGUucmVzdWx0cy5jYWxjdWxhdGlvbnMgJiYgKHRoaXMuc3RhdGUubmV3X2Nzdl9uYW1lIHx8IHRoaXMuc3RhdGUuYXBwZW5kX2Nzdl9uYW1lKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nZXhwb3J0LWJ1dHRvbicgaW50ZW50PXtJbnRlbnQuU1VDQ0VTU30+RVhQT1JUIFRPIENTVjwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAge3Jlc3VsdHNfZGlzcGxheX1cbiAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgICAgIDwvTmF2YmFyPlxuICAgICAgICApXG4gICAgICAgICAgICA7XG4gICAgfVxuXG4gICAgZXhwb3J0ID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBsZXQgcmVzdWx0cyA9IGF3YWl0IGV4cG9ydF90b19jc3YodGhpcy5zdGF0ZS5uZXdfY3N2X25hbWUpO1xuICAgICAgICBpZiAocmVzdWx0cy5lcnJvcikge1xuICAgICAgICAgICAgQXBwVG9hc3Rlci5zaG93KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJFcnJvciBleHBvcnRpbmcgcmVzdWx0cyB0byBjc3YuIFBsZWFzZSBmaWxlIGEgYnVnIHJlcG9ydCBhdCBodHRwczovL2dpdGh1Yi5jb20vamNobXl6L0RvdWJseUxhYmVsZWRXYXRlci9pc3N1ZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50ZW50OiBcImRhbmdlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0OiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBBcHBUb2FzdGVyLnNob3coe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlJlc3VsdHMgc3VjY2Vzc2Z1bGx5IGV4cG9ydGVkIHRvIFwiICsgcmVzdWx0cy5zYXZlZF9maWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRlbnQ6IFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0OiAzMDAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgc3VibWl0X2lucHV0cyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgbGV0IGRhdGV0aW1lcyA9IHRoaXMuc3RhdGUuZGF0ZXRpbWVzLm1hcCgodmFsdWU6IG1vbWVudC5Nb21lbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS50b0FycmF5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBtb250aHMgYXJlIHplcm8taW5kZXhlZCBpbiBNb21lbnQuanNcbiAgICAgICAgZGF0ZXRpbWVzLm1hcCgodmFsdWU6IG51bWJlcltdKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuc3BsaWNlKDEsIDEsIHZhbHVlWzFdICsgMSk7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgcmVzdWx0cyA9IGF3YWl0IGNhbGN1bGF0ZV9mcm9tX2lucHV0cyhcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkX21lYXM6IHRoaXMuc3RhdGUuZGV1dGVyaXVtX2RlbHRhcyxcbiAgICAgICAgICAgICAgICBvMThfbWVhczogdGhpcy5zdGF0ZS5veHlnZW5fZGVsdGFzLFxuICAgICAgICAgICAgICAgIGRhdGV0aW1lczogZGF0ZXRpbWVzLFxuICAgICAgICAgICAgICAgIGRvc2Vfd2VpZ2h0czogdGhpcy5zdGF0ZS5kb3NlX3dlaWdodHMsXG4gICAgICAgICAgICAgICAgZG9zZV9lbnJpY2htZW50czogdGhpcy5zdGF0ZS5kb3NlX2VucmljaG1lbnRzLFxuICAgICAgICAgICAgICAgIHN1YmplY3Rfd2VpZ2h0czogdGhpcy5zdGF0ZS5zdWJqZWN0X3dlaWdodHMsXG4gICAgICAgICAgICAgICAgc3ViamVjdF9pZDogdGhpcy5zdGF0ZS5zdWJqZWN0X2lkLFxuICAgICAgICAgICAgICAgIG1peGVkX2Rvc2U6IHRoaXMuc3RhdGUubWl4ZWRfZG9zZSxcbiAgICAgICAgICAgICAgICBpbl9wZXJtaWw6ICh0aGlzLnN0YXRlLmRlbHRhX3VuaXRzID09PSBEZWx0YVVuaXRzLnBlcm1pbClcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHJlc3VsdHMuY2FsY3VsYXRpb25zICYmIHJlc3VsdHMuZXJyb3JfZmxhZ3MgJiYgcmVzdWx0cy5zY2hvZWxsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0aW9uczogcmVzdWx0cy5jYWxjdWxhdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nob2VsbGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJjbzJfZWVfaW50OiByZXN1bHRzLnNjaG9lbGxlci5yY28yX2VlX2ludCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmNvMl9lZV9wbGF0OiByZXN1bHRzLnNjaG9lbGxlci5yY28yX2VlX3BsYXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcl9mbGFnczogcmVzdWx0cy5lcnJvcl9mbGFnc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIEFwcFRvYXN0ZXIuc2hvdyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiUmVzdWx0cyBjYWxjdWxhdGVkIHN1Y2Nlc3NmdWxseVwiLCBpbnRlbnQ6IFwic3VjY2Vzc1wiLCB0aW1lb3V0OiAzMDAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxfYW5jaG9yX3JlZi5jdXJyZW50KSB0aGlzLnNjcm9sbF9hbmNob3JfcmVmLmN1cnJlbnQuc2Nyb2xsSW50b1ZpZXcoe2JlaGF2aW9yOiBcInNtb290aFwifSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY2xlYXIgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhcl9wb3B1cF9vcGVuOiBmYWxzZSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dF9jc3ZfbmFtZTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGV1dGVyaXVtX2RlbHRhczogW1wiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBveHlnZW5fZGVsdGFzOiBbXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGV0aW1lczogW3RoaXMubm93LCB0aGlzLm5vdywgdGhpcy5ub3csIHRoaXMubm93LCB0aGlzLm5vdywgdGhpcy5ub3ddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBkb3NlX3dlaWdodHM6IFtcIlwiLCBcIlwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZG9zZV9lbnJpY2htZW50czogW1wiXCIsIFwiXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJqZWN0X3dlaWdodHM6IFtcIlwiLCBcIlwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdF9pZDogXCJcIixcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBkZXV0ZXJpdW1fZGVsdGFzX3ZhbGlkYXRlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG94eWdlbl9kZWx0YXNfdmFsaWRhdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZXRpbWVzX3ZhbGlkYXRlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRvc2Vfd2VpZ2h0c192YWxpZGF0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBkb3NlX2VucmljaG1lbnRzX3ZhbGlkYXRlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3Rfd2VpZ2h0c192YWxpZGF0ZWQ6IGZhbHNlLFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHM6IHtjYWxjdWxhdGlvbnM6IG51bGwsIHNjaG9lbGxlcjogbnVsbCwgZXJyb3JfZmxhZ3M6IG51bGx9LFxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlLWlucHV0JykudmFsdWUgPSBudWxsO1xuICAgIH07XG5cbiAgICBoYW5kbGVfY3N2X3VwbG9hZCA9IGFzeW5jIChldmVudDogRm9ybUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdpbnRvIGhhbmRsZSBjc3YgdXBsb2FkJyk7XG4gICAgICAgIGxldCBmaWxlID0gKGV2ZW50LnRhcmdldCBhcyBhbnkpLmZpbGVzWzBdO1xuICAgICAgICBpZiAoZmlsZS50eXBlID09PSBcInRleHQvY3N2XCIpIHtcbiAgICAgICAgICAgIGxldCBpbnB1dHMgPSBhd2FpdCBsb2FkX2Zyb21fY3N2KGZpbGUpO1xuICAgICAgICAgICAgaWYgKGlucHV0cy5lcnJvciB8fCAoaW5wdXRzLnJlc3VsdHMgPT0gbnVsbCkpIHtcbiAgICAgICAgICAgICAgICBBcHBUb2FzdGVyLnNob3coe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJFcnJvciByZWFkaW5nIGlucHV0IENTViBmaWxlLiBGb3IgZm9ybWF0dGluZyBoZWxwLCBwcmVzcyAnSGVscCcgaW4gdGhlIHVwcGVyIHJpZ2h0IGhhbmQgY29ybmVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRlbnQ6IFwiZGFuZ2VyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0OiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXRfY3N2X25hbWU6IGZpbGUubmFtZX0pO1xuICAgICAgICAgICAgICAgIGxldCByID0gaW5wdXRzLnJlc3VsdHM7XG4gICAgICAgICAgICAgICAgbGV0IGhpdF9lcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dHRlZF9kX2RlbHRhcyA9IFtyLmRfbWVhc18xLCByLmRfbWVhc18yLCByLmRfbWVhc18zLCByLmRfbWVhc180LCByLmRfbWVhc181XTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0dGVkX29fZGVsdGFzID0gW3Iub19tZWFzXzEsIHIub19tZWFzXzIsIHIub19tZWFzXzMsIHIub19tZWFzXzQsIHIub19tZWFzXzVdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE5VTV9ERUxUQVM7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVfZGV1dGVyaXVtX2RlbHRhX2NoYW5nZShpLCBpbnB1dHRlZF9kX2RlbHRhc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZV9veHlnZW5fZGVsdGFfY2hhbmdlKGksIGlucHV0dGVkX29fZGVsdGFzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaGl0X2Vycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0dGVkX2RhdGVzID0gW3Iuc2FtcGxlX3RpbWVfMSwgci5zYW1wbGVfdGltZV8yLCByLnNhbXBsZV90aW1lXzMsIHIuc2FtcGxlX3RpbWVfNCwgci5zYW1wbGVfdGltZV81LCByLnNhbXBsZV90aW1lXzZdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE5VTV9TQU1QTEVfVElNRVM7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0dGVkX2RhdGVzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVfZGF0ZV9jaGFuZ2UoaSwgaW5wdXR0ZWRfZGF0ZXNbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBoaXRfZXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoci5kb3NlX3dlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bWl4ZWRfZG9zZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVfZG9zZV93ZWlnaHRfY2hhbmdlKDAsIHIuZG9zZV93ZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHIuZG9zZV93ZWlnaHRfZCAmJiByLmRvc2Vfd2VpZ2h0X28pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlX2Rvc2Vfd2VpZ2h0X2NoYW5nZSgwLCByLmRvc2Vfd2VpZ2h0X2QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVfZG9zZV93ZWlnaHRfY2hhbmdlKDEsIHIuZG9zZV93ZWlnaHRfbyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGhpdF9lcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlX2Rvc2VfZW5yaWNobWVudF9jaGFuZ2UoMCwgci5kb3NlX2VucmljaG1lbnRfZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlX2Rvc2VfZW5yaWNobWVudF9jaGFuZ2UoMSwgci5kb3NlX2VucmljaG1lbnRfbyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlX3N1YmplY3Rfd2VpZ2h0X2NoYW5nZSgwLCByLnN1YmplY3Rfd2VpZ2h0X2luaXRpYWwpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZV9zdWJqZWN0X3dlaWdodF9jaGFuZ2UoMSwgci5zdWJqZWN0X3dlaWdodF9maW5hbCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlX3N1YmplY3RfaWRfY2hhbmdlKHIuc3ViamVjdF9pZCk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBoaXRfZXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaGl0X2Vycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIEFwcFRvYXN0ZXIuc2hvdyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJPbmUgb3IgbW9yZSB2YWx1ZXMgbm90IGlucHV0dGVkIGF1dG9tYXRpY2FsbHkuIEFkZCBtYW51YWxseSwgb3IgZml4IENTViBmb3JtYXQuXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiBGb3IgZm9ybWF0dGluZyBoZWxwLCBwcmVzcyAnSGVscCcgaW4gdGhlIHVwcGVyIHJpZ2h0IGhhbmQgY29ybmVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50ZW50OiBcImRhbmdlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVvdXQ6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmaWxlbmFtZSBpcyAnLCB0aGlzLnN0YXRlLmlucHV0X2Nzdl9uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgQXBwVG9hc3Rlci5zaG93KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIklucHV0cyBzdWNjZXNzZnVsbHkgbG9hZGVkIGZyb20gXCIuY29uY2F0KHRoaXMuc3RhdGUuaW5wdXRfY3N2X25hbWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludGVudDogXCJwcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dDogMzAwMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgQXBwVG9hc3Rlci5zaG93KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJTZWxlY3QgYSAuY3N2IGZpbGUuIEZvciBmb3JtYXR0aW5nIGhlbHAsIHByZXNzICdIZWxwJyBpbiB0aGUgdXBwZXIgcmlnaHQgaGFuZCBjb3JuZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50ZW50OiBcImRhbmdlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0OiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgaGFuZGxlX2Nzdl9hcHBlbmRfY2hvaWNlID0gKGV2ZW50OiBGb3JtRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcbiAgICAgICAgbGV0IGZpbGUgPSAoZXZlbnQudGFyZ2V0IGFzIGFueSkuZmlsZXNbMF07XG4gICAgICAgIGlmIChmaWxlLnR5cGUgPT09IFwidGV4dC9jc3ZcIikge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YXBwZW5kX2Nzdl9uYW1lOiBmaWxlLm5hbWV9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEFwcFRvYXN0ZXIuc2hvdyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiU2VsZWN0IGFuIGV4aXN0aW5nIC5jc3YgZmlsZS5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50ZW50OiBcImRhbmdlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0OiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgX2JhZF9mb3JtYXQgPSAoc3BlY2lmaWNfZXJyb3I6IHN0cmluZykgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbnB1dF9jc3ZfbmFtZTogXCJcIn0pO1xuICAgICAgICBsZXQgZGlzcGxheV9tc2cgPSBcIkluY29ycmVjdCAuY3N2IGZvcm1hdC5cIiArIHNwZWNpZmljX2Vycm9yICsgXCIgU2VlICdIZWxwJyBmb3IgZXhwZWN0ZWQgZm9ybWF0LlwiO1xuICAgICAgICBBcHBUb2FzdGVyLnNob3coe21lc3NhZ2U6IGRpc3BsYXlfbXNnLCBpbnRlbnQ6IFwiZGFuZ2VyXCIsIHRpbWVvdXQ6IDB9KTtcbiAgICB9O1xuXG4gICAgX2Vycm9yX2hhbmRsZXIgPSAoZXZlbnQ6IFByb2dyZXNzRXZlbnQpID0+IHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmVycm9yLm5hbWUgPT0gXCJOb3RSZWFkYWJsZUVycm9yXCIpIHtcbiAgICAgICAgICAgIEFwcFRvYXN0ZXIuc2hvdyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiRmlsZSBub3QgcmVhZGFibGUuIEZvciBmb3JtYXR0aW5nIGhlbHAsIHByZXNzICdIZWxwJyBpbiB0aGUgdXBwZXIgcmlnaHQgaGFuZCBjb3JuZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50ZW50OiBcImRhbmdlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0OiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY2hlY2tfbnVtZXJpY2FsX2lucHV0cyA9IChpbnB1dF9hcmF5OiAoc3RyaW5nIHwgbnVtYmVyKVtdKSA9PiB7XG4gICAgICAgIGZvciAobGV0IHZhbHVlIG9mIGlucHV0X2FyYXkpIHtcbiAgICAgICAgICAgIGlmIChpc05hTigrdmFsdWUpIHx8IHZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBfZmxhZ19ub25fbnVtZXJpY2FsX2lucHV0ID0gKCkgPT4ge1xuICAgICAgICBBcHBUb2FzdGVyLnNob3coe21lc3NhZ2U6IFwiRW50ZXIgYSBudW1lcmljIHZhbHVlXCIsIGludGVudDogXCJkYW5nZXJcIiwgdGltZW91dDogMzAwMH0pO1xuICAgIH07XG5cbiAgICBfZmxhZ19ub25fZGF0ZV9pbnB1dCA9ICgpID0+IHtcbiAgICAgICAgQXBwVG9hc3Rlci5zaG93KHttZXNzYWdlOiBcIkVudGVyIGEgdmFsaWQgZGF0ZVwiLCBpbnRlbnQ6IFwiZGFuZ2VyXCIsIHRpbWVvdXQ6IDMwMDB9KTtcbiAgICB9O1xuXG4gICAgaGFuZGxlX2RldXRlcml1bV9kZWx0YV9jaGFuZ2UgPSAoaW5kZXg6IG51bWJlciwgZXZlbnQ6IEZvcm1FdmVudDxIVE1MRWxlbWVudD4gfCBzdHJpbmcpID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gKHR5cGVvZiBldmVudCA9PT0gXCJzdHJpbmdcIikgPyBldmVudCA6IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgICAgIGxldCB2YWx1ZXNfc2VwX2J5X3NwYWNlcyA9IHZhbHVlLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgdmFsdWVzX3NlcF9ieV9zcGFjZXMgPSB2YWx1ZXNfc2VwX2J5X3NwYWNlcy5maWx0ZXIoKHZhbHVlOiBzdHJpbmcpID0+IHZhbHVlICE9PSBcIlwiKTtcbiAgICAgICAgaWYgKHZhbHVlc19zZXBfYnlfc3BhY2VzLmxlbmd0aCA9PT0gMSB8fCB2YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgaWYgKCFpc05hTigrdmFsdWUpIHx8IHZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5ld19kZWx0YXMgPSB0aGlzLnN0YXRlLmRldXRlcml1bV9kZWx0YXM7XG4gICAgICAgICAgICAgICAgbmV3X2RlbHRhcy5zcGxpY2UoaW5kZXgsIDEsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXV0ZXJpdW1fZGVsdGFzOiBuZXdfZGVsdGFzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldXRlcml1bV9kZWx0YXNfdmFsaWRhdGVkOiB0aGlzLmNoZWNrX251bWVyaWNhbF9pbnB1dHMobmV3X2RlbHRhcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHRoaXMuX2ZsYWdfbm9uX251bWVyaWNhbF9pbnB1dCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXNfc2VwX2J5X3NwYWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlX2RldXRlcml1bV9kZWx0YV9jaGFuZ2UoaW5kZXggKyBpLCB2YWx1ZXNfc2VwX2J5X3NwYWNlc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgaGFuZGxlX294eWdlbl9kZWx0YV9jaGFuZ2UgPSAoaW5kZXg6IG51bWJlciwgZXZlbnQ6IEZvcm1FdmVudDxIVE1MRWxlbWVudD4gfCBzdHJpbmcpID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gKHR5cGVvZiBldmVudCA9PT0gXCJzdHJpbmdcIikgPyBldmVudCA6IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgICAgIGxldCB2YWx1ZXNfc2VwX2J5X3NwYWNlcyA9IHZhbHVlLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgdmFsdWVzX3NlcF9ieV9zcGFjZXMgPSB2YWx1ZXNfc2VwX2J5X3NwYWNlcy5maWx0ZXIoKHZhbHVlOiBzdHJpbmcpID0+IHZhbHVlICE9PSBcIlwiKTtcbiAgICAgICAgaWYgKHZhbHVlc19zZXBfYnlfc3BhY2VzLmxlbmd0aCA9PT0gMSB8fCB2YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgaWYgKCFpc05hTigrdmFsdWUpIHx8ICh2YWx1ZSA9PT0gXCJcIikpIHtcbiAgICAgICAgICAgICAgICBsZXQgbmV3X2RlbHRhcyA9IHRoaXMuc3RhdGUub3h5Z2VuX2RlbHRhcztcbiAgICAgICAgICAgICAgICBuZXdfZGVsdGFzLnNwbGljZShpbmRleCwgMSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG94eWdlbl9kZWx0YXM6IG5ld19kZWx0YXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3h5Z2VuX2RlbHRhc192YWxpZGF0ZWQ6IHRoaXMuY2hlY2tfbnVtZXJpY2FsX2lucHV0cyhuZXdfZGVsdGFzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgdGhpcy5fZmxhZ19ub25fbnVtZXJpY2FsX2lucHV0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlc19zZXBfYnlfc3BhY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVfb3h5Z2VuX2RlbHRhX2NoYW5nZShpbmRleCArIGksIHZhbHVlc19zZXBfYnlfc3BhY2VzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBoYW5kbGVfZGF0ZV9jaGFuZ2UgPSAoaW5kZXg6IG51bWJlciwgdmFsdWU6IHN0cmluZyB8IG1vbWVudC5Nb21lbnQpID0+IHtcbiAgICAgICAgbGV0IG5ld19kYXRlX2FycmF5ID0gdGhpcy5zdGF0ZS5kYXRldGltZXM7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgbGV0IGFsbF9kYXRlc19maWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBpbmRleDsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKChuZXdfZGF0ZV9hcnJheVtqXSAhPSB0aGlzLm5vdykgJiYgdmFsdWUuaXNCZWZvcmUobmV3X2RhdGVfYXJyYXlbal0pKSB7XG4gICAgICAgICAgICAgICAgICAgIEFwcFRvYXN0ZXIuc2hvdyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJDb2xsZWN0aW9uIGRhdGVzIG11c3QgYmUgaW4gY2hyb25vbG9naWNhbCBvcmRlci5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRlbnQ6IFwiZGFuZ2VyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dDogMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUuaXNTYW1lKG5ld19kYXRlX2FycmF5W2pdKSkge1xuICAgICAgICAgICAgICAgICAgICBBcHBUb2FzdGVyLnNob3coe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiRHVwbGljYXRlIGNvbGxlY3Rpb24gZGF0ZXMgZW50ZXJlZFwiLCBpbnRlbnQ6IFwiZGFuZ2VyXCIsIHRpbWVvdXQ6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3X2RhdGVfYXJyYXkuc3BsaWNlKGluZGV4LCAxLCB2YWx1ZSk7XG4gICAgICAgICAgICBmb3IgKGxldCBkYXRlIG9mIG5ld19kYXRlX2FycmF5KSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGUgPT09IHRoaXMubm93KSB7XG4gICAgICAgICAgICAgICAgICAgIGFsbF9kYXRlc19maWxsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRldGltZXM6IG5ld19kYXRlX2FycmF5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZXRpbWVzX3ZhbGlkYXRlZDogYWxsX2RhdGVzX2ZpbGxlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBzcGxpdF92YWx1ZXMgPSB2YWx1ZS5zcGxpdChcIiBcIik7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICBuZXdfZGF0ZV9hcnJheS5zcGxpY2UoaW5kZXgsIDEsIHRoaXMubm93KTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtkYXRldGltZXM6IG5ld19kYXRlX2FycmF5LCBkYXRldGltZXNfdmFsaWRhdGVkOiBmYWxzZX0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgICAgICAgbGV0IHNraXBwZWRfaW5kaWNlcyA9IDA7IC8vIHRyYWNrIGluZGljZXMgdG8gcGxhY2UgZGF0ZXMgaW4gY29ycmVjdCBib3hlc1xuICAgICAgICAgICAgICAgIHdoaWxlIChpIDwgc3BsaXRfdmFsdWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBkZWFsIHdpdGggc3BhY2VzIGJldHdlZW4gZGF0ZSBhbmQgdGltZVxuICAgICAgICAgICAgICAgICAgICBpZiAobW9tZW50LnBhcnNlWm9uZShuZXcgRGF0ZShzcGxpdF92YWx1ZXNbaV0pKS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpIDwgc3BsaXRfdmFsdWVzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9tZW50LnBhcnNlWm9uZShuZXcgRGF0ZShzcGxpdF92YWx1ZXNbaSArIDFdKSkuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYm90aCB2YWxpZCBkYXRlcy0gZG9uJ3QgbmVlZCB0byB3b3JyeSBhYm91dCBzcGFjZXMsIHRyZWF0IHRoZW0gYXMgc2VwYXJhdGUgZGF0ZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFzX21vbWVudCA9IGNvbnZlcnRfc3RyaW5nX3RvX21vbWVudChzcGxpdF92YWx1ZXNbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFzX21vbWVudCAhPT0gXCJib29sZWFuXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlX2RhdGVfY2hhbmdlKGluZGV4ICsgaSwgYXNfbW9tZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gbmV4dCB2YWx1ZSBpc24ndCBhIHZhbGlkIGRhdGUtIGxpa2VseSBhIHRpbWUuIHRhY2sgaXQgb250byB0aGUgZGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXNfbW9tZW50ID0gY29udmVydF9zdHJpbmdfdG9fbW9tZW50KHNwbGl0X3ZhbHVlc1tpXS5jb25jYXQoXCIgXCIsIHNwbGl0X3ZhbHVlc1tpICsgMV0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhc19tb21lbnQgIT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZV9kYXRlX2NoYW5nZShpbmRleCArIGkgLSBza2lwcGVkX2luZGljZXMsIGFzX21vbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tpcHBlZF9pbmRpY2VzKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgKz0gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhc19tb21lbnQgPSBjb252ZXJ0X3N0cmluZ190b19tb21lbnQoc3BsaXRfdmFsdWVzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFzX21vbWVudCAhPT0gXCJib29sZWFuXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVfZGF0ZV9jaGFuZ2UoaW5kZXggKyBpLCBhc19tb21lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9mbGFnX25vbl9kYXRlX2lucHV0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgaGFuZGxlX2Rvc2Vfd2VpZ2h0X2NoYW5nZSA9IChpbmRleDogbnVtYmVyLCBldmVudDogRm9ybUV2ZW50PEhUTUxFbGVtZW50PiB8IHN0cmluZykgPT4ge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5taXhlZF9kb3NlKSB7XG4gICAgICAgICAgICAvLyBpZiBtaXhlZCwgc2V0IGJvdGggdmFsdWVzIHRvIHRoaXNcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlX2Rvc2Vfd2VpZ2h0X2NoYW5nZSgxLCBldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHZhbHVlID0gKHR5cGVvZiBldmVudCA9PSBcInN0cmluZ1wiKSA/IGV2ZW50IDogKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICAgICAgbGV0IHZhbHVlc19zZXBfYnlfc3BhY2VzID0gdmFsdWUuc3BsaXQoXCIgXCIpO1xuICAgICAgICB2YWx1ZXNfc2VwX2J5X3NwYWNlcyA9IHZhbHVlc19zZXBfYnlfc3BhY2VzLmZpbHRlcigodmFsdWU6IHN0cmluZykgPT4gdmFsdWUgIT09IFwiXCIpO1xuICAgICAgICBpZiAodmFsdWVzX3NlcF9ieV9zcGFjZXMubGVuZ3RoID09PSAxIHx8IHZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKCt2YWx1ZSkgfHwgdmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgbmV3X2Rvc2Vfd2VpZ2h0cyA9IHRoaXMuc3RhdGUuZG9zZV93ZWlnaHRzO1xuICAgICAgICAgICAgICAgIG5ld19kb3NlX3dlaWdodHMuc3BsaWNlKGluZGV4LCAxLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9zZV93ZWlnaHRzOiBuZXdfZG9zZV93ZWlnaHRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvc2Vfd2VpZ2h0c192YWxpZGF0ZWQ6IHRoaXMuY2hlY2tfbnVtZXJpY2FsX2lucHV0cyhuZXdfZG9zZV93ZWlnaHRzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgdGhpcy5fZmxhZ19ub25fbnVtZXJpY2FsX2lucHV0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlc19zZXBfYnlfc3BhY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVfZG9zZV93ZWlnaHRfY2hhbmdlKGluZGV4ICsgaSwgdmFsdWVzX3NlcF9ieV9zcGFjZXNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGhhbmRsZV9kb3NlX2VucmljaG1lbnRfY2hhbmdlID0gKGluZGV4OiBudW1iZXIsIGV2ZW50OiBGb3JtRXZlbnQ8SFRNTEVsZW1lbnQ+IHwgc3RyaW5nKSA9PiB7XG4gICAgICAgIGxldCB2YWx1ZSA9ICh0eXBlb2YgZXZlbnQgPT0gXCJzdHJpbmdcIikgPyBldmVudCA6IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgICAgIGxldCB2YWx1ZXNfc2VwX2J5X3NwYWNlcyA9IHZhbHVlLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgdmFsdWVzX3NlcF9ieV9zcGFjZXMgPSB2YWx1ZXNfc2VwX2J5X3NwYWNlcy5maWx0ZXIoKHZhbHVlOiBzdHJpbmcpID0+IHZhbHVlICE9PSBcIlwiKTtcbiAgICAgICAgaWYgKHZhbHVlc19zZXBfYnlfc3BhY2VzLmxlbmd0aCA9PT0gMSB8fCB2YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgaWYgKCFpc05hTigrdmFsdWUpIHx8IHZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5ld19lbnJpY2htZW50cyA9IHRoaXMuc3RhdGUuZG9zZV9lbnJpY2htZW50cztcbiAgICAgICAgICAgICAgICBuZXdfZW5yaWNobWVudHMuc3BsaWNlKGluZGV4LCAxLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9zZV9lbnJpY2htZW50czogbmV3X2VucmljaG1lbnRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvc2VfZW5yaWNobWVudHNfdmFsaWRhdGVkOiB0aGlzLmNoZWNrX251bWVyaWNhbF9pbnB1dHMobmV3X2VucmljaG1lbnRzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgdGhpcy5fZmxhZ19ub25fbnVtZXJpY2FsX2lucHV0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlc19zZXBfYnlfc3BhY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVfZG9zZV9lbnJpY2htZW50X2NoYW5nZShpbmRleCArIGksIHZhbHVlc19zZXBfYnlfc3BhY2VzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBoYW5kbGVfc3ViamVjdF93ZWlnaHRfY2hhbmdlID0gKGluZGV4OiBudW1iZXIsIGV2ZW50OiBGb3JtRXZlbnQ8SFRNTEVsZW1lbnQ+IHwgc3RyaW5nKSA9PiB7XG4gICAgICAgIGxldCB2YWx1ZSA9ICh0eXBlb2YgZXZlbnQgPT0gXCJzdHJpbmdcIikgPyBldmVudCA6IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgICAgIGxldCB2YWx1ZXNfc2VwX2J5X3NwYWNlcyA9IHZhbHVlLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgdmFsdWVzX3NlcF9ieV9zcGFjZXMgPSB2YWx1ZXNfc2VwX2J5X3NwYWNlcy5maWx0ZXIoKHZhbHVlOiBzdHJpbmcpID0+IHZhbHVlICE9PSBcIlwiKTtcbiAgICAgICAgaWYgKHZhbHVlc19zZXBfYnlfc3BhY2VzLmxlbmd0aCA9PT0gMSB8fCB2YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgaWYgKCFpc05hTigrdmFsdWUpIHx8IHZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5ld193ZWlnaHRzID0gdGhpcy5zdGF0ZS5zdWJqZWN0X3dlaWdodHM7XG4gICAgICAgICAgICAgICAgbmV3X3dlaWdodHMuc3BsaWNlKGluZGV4LCAxLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdF93ZWlnaHRzOiBuZXdfd2VpZ2h0cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJqZWN0X3dlaWdodHNfdmFsaWRhdGVkOiB0aGlzLmNoZWNrX251bWVyaWNhbF9pbnB1dHMobmV3X3dlaWdodHMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB0aGlzLl9mbGFnX25vbl9udW1lcmljYWxfaW5wdXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWVzX3NlcF9ieV9zcGFjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZV9zdWJqZWN0X3dlaWdodF9jaGFuZ2UoaW5kZXggKyBpLCB2YWx1ZXNfc2VwX2J5X3NwYWNlc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgaGFuZGxlX3N1YmplY3RfaWRfY2hhbmdlID0gKGV2ZW50OiBGb3JtRXZlbnQ8SFRNTEVsZW1lbnQ+IHwgc3RyaW5nKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnJlc3VsdHMuY2FsY3VsYXRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtjbGVhcl9wb3B1cF9vcGVuOiB0cnVlfSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHZhbHVlID0gKHR5cGVvZiBldmVudCA9PSBcInN0cmluZ1wiKSA/IGV2ZW50IDogKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3ViamVjdF9pZDogdmFsdWV9KTtcbiAgICB9XG5cbn1cbiJdfQ==
