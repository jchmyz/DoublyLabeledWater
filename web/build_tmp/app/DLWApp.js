"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
var Requests_1 = require("./Requests");
var cjs_1 = require("@blueprintjs/core/lib/cjs");
var DEUTERIUM = "Deuterium";
var OXYGEN = "Oxygen 18";
var ELEMENTS = [DEUTERIUM, OXYGEN];
var NUM_SAMPLE_TIMES = 5;
var SAMPLE_LABELS = ['Background', 'PD4', 'PD5', 'ED4', 'ED5'];
var DLWApp = /** @class */ (function (_super) {
    __extends(DLWApp, _super);
    function DLWApp(props) {
        var _this = _super.call(this, props) || this;
        _this.submit_inputs = function () { return __awaiter(_this, void 0, void 0, function () {
            var datetimes, results, result_calculations_array, result_err_flags_array, result_rco2_ee_array, result_entries_calculations, result_entries_err_flags, result_entries_rco2_ee, result_calcuation_strings, result_err_flags_strings, result_rco2_ee_strings, _i, result_entries_calculations_1, _a, name_1, value, _b, result_entries_err_flags_1, _c, name_2, value, _d, result_entries_rco2_ee_1, _e, name_3, value;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        datetimes = this.state.datetimes.map(function (value) {
                            return value.toArray();
                        });
                        return [4 /*yield*/, Requests_1.calculate_from_inputs({
                                d_deltas: this.state.deuterium_deltas,
                                o_deltas: this.state.oxygen_deltas,
                                datetimes: datetimes,
                                dose_weights: this.state.dose_weights,
                                dose_enrichments: this.state.dose_enrichments,
                                mol_masses: this.state.mol_masses,
                                subject_weights: this.state.subject_weights,
                                csv_name: this.state.csv_name
                            })];
                    case 1:
                        results = _f.sent();
                        console.log('got results', results);
                        result_calculations_array = results.calculations;
                        result_err_flags_array = results.error_flags;
                        result_rco2_ee_array = results.rco2_ee;
                        result_entries_calculations = Object.entries(result_calculations_array);
                        result_entries_err_flags = Object.entries(result_err_flags_array);
                        result_entries_rco2_ee = Object.entries(result_rco2_ee_array);
                        result_calcuation_strings = [];
                        result_err_flags_strings = [];
                        result_rco2_ee_strings = [];
                        for (_i = 0, result_entries_calculations_1 = result_entries_calculations; _i < result_entries_calculations_1.length; _i++) {
                            _a = result_entries_calculations_1[_i], name_1 = _a[0], value = _a[1];
                            result_calcuation_strings.push({ label: name_1, value: value });
                        }
                        for (_b = 0, result_entries_err_flags_1 = result_entries_err_flags; _b < result_entries_err_flags_1.length; _b++) {
                            _c = result_entries_err_flags_1[_b], name_2 = _c[0], value = _c[1];
                            result_err_flags_strings.push({ label: name_2, value: value });
                        }
                        for (_d = 0, result_entries_rco2_ee_1 = result_entries_rco2_ee; _d < result_entries_rco2_ee_1.length; _d++) {
                            _e = result_entries_rco2_ee_1[_d], name_3 = _e[0], value = _e[1];
                            result_rco2_ee_strings.push({ label: name_3, value: value });
                        }
                        this.setState({
                            results: {
                                calculations: result_calcuation_strings,
                                rco2_ee: result_rco2_ee_strings,
                                error_flags: result_err_flags_strings
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.check_numerical_inputs = function (input_aray) {
            for (var _i = 0, input_aray_1 = input_aray; _i < input_aray_1.length; _i++) {
                var value = input_aray_1[_i];
                if (isNaN(+value) || value === "") {
                    return false;
                }
            }
            return true;
        };
        _this.handle_deuterium_delta_change = function (index, event) {
            var value = event.target.value;
            if (!isNaN(+value)) {
                var new_deltas = _this.state.deuterium_deltas;
                new_deltas.splice(index, 1, value);
                _this.setState({
                    deuterium_deltas: new_deltas,
                    deuterium_deltas_validated: _this.check_numerical_inputs(new_deltas)
                });
            }
        };
        _this.handle_oxygen_delta_change = function (index, event) {
            var value = event.target.value;
            if (!isNaN(+value)) {
                var new_deltas = _this.state.oxygen_deltas;
                new_deltas.splice(index, 1, value);
                _this.setState({
                    oxygen_deltas: new_deltas,
                    oxygen_deltas_validated: _this.check_numerical_inputs(new_deltas)
                });
            }
        };
        _this.handle_date_change = function (i, value) {
            if (typeof value != "string") {
                var new_date_array = _this.state.datetimes;
                new_date_array.splice(i, 1, value);
                var all_dates_filled = true;
                for (var _i = 0, new_date_array_1 = new_date_array; _i < new_date_array_1.length; _i++) {
                    var date = new_date_array_1[_i];
                    if (typeof date === "string") {
                        all_dates_filled = false;
                        break;
                    }
                }
                _this.setState({ datetimes: new_date_array, datetimes_validated: all_dates_filled });
            }
        };
        _this.handle_dose_weight_change = function (index, event) {
            var value = event.target.value;
            if (!isNaN(+value)) {
                var new_dose_weights = _this.state.dose_weights;
                new_dose_weights.splice(index, 1, value);
                _this.setState({
                    dose_weights: new_dose_weights,
                    dose_weights_validated: _this.check_numerical_inputs(new_dose_weights)
                });
            }
        };
        _this.handle_mol_mass_change = function (index, event) {
            var value = event.target.value;
            if (!isNaN(+value)) {
                var new_mol_masses = _this.state.mol_masses;
                new_mol_masses.splice(index, 1, value);
                _this.setState({
                    mol_masses: new_mol_masses,
                    mol_masses_validated: _this.check_numerical_inputs(new_mol_masses)
                });
            }
        };
        _this.handle_dose_enrichment_change = function (index, event) {
            var value = event.target.value;
            if (!isNaN(+value)) {
                var new_enrichments = _this.state.dose_enrichments;
                new_enrichments.splice(index, 1, value);
                _this.setState({
                    dose_enrichments: new_enrichments,
                    dose_enrichments_validated: _this.check_numerical_inputs(new_enrichments)
                });
            }
        };
        _this.handle_subject_weight_change = function (index, event) {
            var value = event.target.value;
            if (!isNaN(+value)) {
                var new_weights = _this.state.subject_weights;
                new_weights.splice(index, 1, value);
                _this.setState({
                    subject_weights: new_weights,
                    subject_weights_validated: _this.check_numerical_inputs(new_weights)
                });
            }
        };
        _this.state = {
            deuterium_deltas: ["", "", "", "", ""],
            oxygen_deltas: ["", "", "", "", ""],
            datetimes: ["", "", "", "", ""],
            dose_weights: ["", ""],
            mol_masses: ["", ""],
            dose_enrichments: ["", ""],
            subject_weights: ["", ""],
            deuterium_deltas_validated: false,
            oxygen_deltas_validated: false,
            datetimes_validated: false,
            dose_weights_validated: false,
            mol_masses_validated: false,
            dose_enrichments_validated: false,
            subject_weights_validated: false,
            results: { calculations: [], rco2_ee: [], error_flags: [] },
            csv_name: "",
        };
        return _this;
    }
    DLWApp.prototype.render = function () {
        var _this = this;
        var all_inputs_validated = (this.state.deuterium_deltas_validated && this.state.oxygen_deltas_validated
            && this.state.datetimes_validated && this.state.dose_weights_validated
            && this.state.mol_masses_validated && this.state.dose_enrichments_validated
            && this.state.subject_weights_validated);
        console.log('all inputs validated?', all_inputs_validated, ' state ', this.state);
        var deuterium_delta_inputs = [];
        var oxygen_delta_inputs = [];
        var collection_time_inputs = [];
        var _loop_1 = function (i) {
            deuterium_delta_inputs.push(React.createElement(NumberInput, { placeholder: SAMPLE_LABELS[i] + " Deuterium delta", index: i, key: i, change_function: this_1.handle_deuterium_delta_change, unit: "permil", value: this_1.state.deuterium_deltas[i] }));
            oxygen_delta_inputs.push(React.createElement(NumberInput, { placeholder: SAMPLE_LABELS[i] + ' Oxygen 18 delta', index: i, key: i, unit: "permil", change_function: this_1.handle_oxygen_delta_change, value: this_1.state.oxygen_deltas[i] }));
            collection_time_inputs.push(React.createElement(DateTimePicker, { onChange: function (value) { return _this.handle_date_change(i, value); }, inputProps: {
                    className: 'date-input-box .bp3-input',
                    placeholder: ' ' + SAMPLE_LABELS[i] + ' sample date and time'
                }, key: i, value: this_1.state.datetimes[i], dateFormat: "YYYY-MM-DD", timeFormat: "HH:mm" }));
        };
        var this_1 = this;
        for (var i = 0; i < NUM_SAMPLE_TIMES; i++) {
            _loop_1(i);
        }
        var dose_weight_inputs = [];
        var mol_mass_inputs = [];
        var dose_enrichment_inputs = [];
        for (var i = 0; i < ELEMENTS.length; i++) {
            dose_weight_inputs.push(React.createElement(NumberInput, { placeholder: ELEMENTS[i] + ' dose weight (g)', index: i, key: i, unit: "g", change_function: this.handle_dose_weight_change, value: this.state.dose_weights[i] }));
            mol_mass_inputs.push(React.createElement(NumberInput, { placeholder: ELEMENTS[i] + ' molecular mass (g/mol)', index: i, key: i, unit: "g/mol", change_function: this.handle_mol_mass_change, value: this.state.mol_masses[i] }));
            dose_enrichment_inputs.push(React.createElement(NumberInput, { placeholder: ELEMENTS[i] + ' dose enrichment (ppm)', index: i, key: i, change_function: this.handle_dose_enrichment_change, value: this.state.dose_enrichments[i], unit: "ppm" }));
        }
        var results_display = React.createElement("div", null);
        if (this.state.results.calculations.length > 0) {
            var results_calculations = [];
            var results_rco2_ee = [];
            var results_error_flags = [];
            for (var _i = 0, _a = this.state.results.calculations; _i < _a.length; _i++) {
                var result = _a[_i];
                results_calculations.push(React.createElement("div", { className: 'result-pair' },
                    React.createElement("p", { className: "result-label" }, result.label + ":"),
                    React.createElement("p", { className: "result-value" }, result.value)));
            }
            for (var _b = 0, _c = this.state.results.rco2_ee; _b < _c.length; _b++) {
                var result = _c[_b];
                results_rco2_ee.push(React.createElement("div", { className: 'result-pair' },
                    React.createElement("p", { className: "result-label" }, result.label + ":"),
                    React.createElement("p", { className: "result-value" }, result.value)));
            }
            for (var _d = 0, _e = this.state.results.error_flags; _d < _e.length; _d++) {
                var result = _e[_d];
                results_error_flags.push(React.createElement("div", { className: 'result-pair' },
                    React.createElement("p", { className: "result-label" }, result.label + ":"),
                    React.createElement("p", { className: "result-value" }, result.value)));
            }
            results_display = (React.createElement("div", { className: 'results-display' },
                React.createElement(cjs_1.Card, { className: 'results-card' },
                    React.createElement("div", { className: 'result-sections' },
                        React.createElement("div", { className: 'result-section' },
                            React.createElement("h5", { className: 'result-header-calc' }, "Calculations"),
                            results_calculations),
                        React.createElement("div", { className: 'result-section' },
                            React.createElement("h5", { className: 'result-header-calc' }, "rCO2 and EE, intercept method"),
                            results_rco2_ee),
                        React.createElement("div", { className: 'result-section' },
                            React.createElement("h5", { className: 'result-header-error' }, "Error Flags"),
                            results_error_flags)))));
        }
        return (React.createElement(cjs_1.Navbar, { className: 'dlw-nav' },
            React.createElement(cjs_1.NavbarGroup, { align: core_1.Alignment.LEFT },
                React.createElement(cjs_1.Navbar.Heading, { className: 'dlw-title' }, "Doubly Labeled Water")),
            React.createElement(cjs_1.NavbarGroup, { align: core_1.Alignment.RIGHT },
                React.createElement(cjs_1.NavbarHeading, { className: 'tagline' }, "an open source project by the University of Colorado School of Medicine"),
                React.createElement(cjs_1.NavbarDivider, null),
                React.createElement("a", { href: "https://github.com/jchmyz/DoublyLabeledWater", target: "_blank" }, "DoublyLabeledWater on GitHub")),
            React.createElement(core_1.FormGroup, { className: 'dlw-app' },
                React.createElement("div", { className: 'samples' },
                    React.createElement("div", { className: 'date-inputs' },
                        React.createElement("h5", null, "Collection Dates and Times"),
                        collection_time_inputs),
                    React.createElement("div", { className: 'delta-inputs' },
                        React.createElement("h5", null, "Deuterium Delta Values"),
                        deuterium_delta_inputs),
                    React.createElement("div", { className: 'delta-inputs' },
                        React.createElement("h5", null, "Oxygen 18 Delta Values"),
                        oxygen_delta_inputs)),
                React.createElement("div", { className: 'element-wise-inputs' },
                    React.createElement("div", { className: 'inputs-by-element' },
                        React.createElement("h5", null, "Dose Weights"),
                        dose_weight_inputs),
                    React.createElement("div", { className: 'inputs-by-element' },
                        React.createElement("h5", null, "Dose Enrichments"),
                        dose_enrichment_inputs),
                    React.createElement("div", { className: 'inputs-by-element' },
                        React.createElement("h5", null, "Molecular Mass"),
                        mol_mass_inputs)),
                React.createElement("div", { className: 'element-wise-inputs' },
                    React.createElement("div", { className: 'inputs-by-element' },
                        React.createElement("h5", null, "Subject Weight"),
                        React.createElement(NumberInput, { placeholder: "Initial subject weight (kg)", index: 0, change_function: this.handle_subject_weight_change, unit: 'kg', value: this.state.subject_weights[0] }),
                        React.createElement(NumberInput, { placeholder: "Final subject weight (kg)", index: 1, change_function: this.handle_subject_weight_change, unit: 'kg', value: this.state.subject_weights[1] }))),
                React.createElement("div", { className: 'submit-group' },
                    React.createElement(core_1.InputGroup, { placeholder: 'Results CSV filename (optional)', className: 'csv-name-input', onChange: function (event) {
                            return _this.setState({ csv_name: event.target.value });
                        } }),
                    React.createElement(core_1.Button, { onClick: this.submit_inputs, disabled: !all_inputs_validated }, "SUBMIT")),
                results_display)));
    };
    return DLWApp;
}(React.Component));
exports.DLWApp = DLWApp;
var NumberInput = /** @class */ (function (_super) {
    __extends(NumberInput, _super);
    function NumberInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumberInput.prototype.render = function () {
        var _this = this;
        var icon = "circle-arrow-right";
        if (this.props.value === "") {
            icon = "circle-arrow-right";
        }
        else if (!isNaN(+this.props.value)) {
            icon = "tick";
        }
        else {
            icon = "ban-circle";
        }
        return (React.createElement(core_1.ControlGroup, { fill: true },
            React.createElement(core_1.InputGroup, { leftIcon: icon, className: '.bp3-fill', rightElement: React.createElement(core_1.Tag, null, this.props.unit), onChange: function (event) { return _this.props.change_function(_this.props.index, event); }, placeholder: this.props.placeholder, value: this.props.value })));
    };
    return NumberInput;
}(React.Component));
exports.NumberInput = NumberInput;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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Q0gsSUFBSSxHQUFHLFlBQVksQ0FBQztTQUN2QjtRQUVELE9BQU8sQ0FDSCxvQkFBQyxtQkFBWSxJQUFDLElBQUksRUFBRSxJQUFJO1lBQ3BCLG9CQUFDLGlCQUFVLElBQ1AsUUFBUSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxvQkFBQyxVQUFHLFFBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQU8sRUFDbEYsUUFBUSxFQUFFLFVBQUMsS0FBNkIsSUFBSyxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFuRCxDQUFtRCxFQUNoRyxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQ3hELENBQ2xCLENBQUM7SUFDTixDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQXJCQSxBQXFCQyxDQXJCZ0MsS0FBSyxDQUFDLFNBQVMsR0FxQi9DO0FBckJZLGtDQUFXIiwiZmlsZSI6IkRMV0FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtcbiAgICBCdXR0b25Hcm91cCxcbiAgICBGb3JtR3JvdXAsXG4gICAgTnVtZXJpY0lucHV0LFxuICAgIEJ1dHRvbixcbiAgICBJbnRlbnQsXG4gICAgSWNvbk5hbWUsXG4gICAgQ29udHJvbEdyb3VwLFxuICAgIElucHV0R3JvdXAsIEFsaWdubWVudCwgVGFnXG59IGZyb20gXCJAYmx1ZXByaW50anMvY29yZVwiO1xuaW1wb3J0ICogYXMgRGF0ZVRpbWVQaWNrZXIgZnJvbSAncmVhY3QtZGF0ZXRpbWUnO1xuaW1wb3J0IHtNb21lbnR9IGZyb20gXCJtb21lbnRcIjtcbmltcG9ydCB7Y2FsY3VsYXRlX2Zyb21faW5wdXRzfSBmcm9tIFwiLi9SZXF1ZXN0c1wiO1xuaW1wb3J0IHtGb3JtRXZlbnR9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtDYXJkLCBJY29uLCBOYXZiYXIsIE5hdmJhckRpdmlkZXIsIE5hdmJhckdyb3VwLCBOYXZiYXJIZWFkaW5nfSBmcm9tIFwiQGJsdWVwcmludGpzL2NvcmUvbGliL2Nqc1wiO1xuXG5jb25zdCBERVVURVJJVU0gPSBcIkRldXRlcml1bVwiO1xuY29uc3QgT1hZR0VOID0gXCJPeHlnZW4gMThcIjtcbmNvbnN0IEVMRU1FTlRTID0gW0RFVVRFUklVTSwgT1hZR0VOXTtcblxuY29uc3QgTlVNX1NBTVBMRV9USU1FUyA9IDU7XG5jb25zdCBTQU1QTEVfTEFCRUxTID0gWydCYWNrZ3JvdW5kJywgJ1BENCcsICdQRDUnLCAnRUQ0JywgJ0VENSddO1xuXG5pbnRlcmZhY2UgUmVzdWx0UGFpciB7XG4gICAgbGFiZWw6IHN0cmluZyxcbiAgICB2YWx1ZTogc3RyaW5nIHwge31cbn1cblxuaW50ZXJmYWNlIFJlc3VsdFR5cGVzIHtcbiAgICBjYWxjdWxhdGlvbnM6IFJlc3VsdFBhaXJbXSxcbiAgICByY28yX2VlOiBSZXN1bHRQYWlyW10sXG4gICAgZXJyb3JfZmxhZ3M6IFJlc3VsdFBhaXJbXVxufVxuXG5cbmludGVyZmFjZSBETFdTdGF0ZSB7XG4gICAgZGV1dGVyaXVtX2RlbHRhczogc3RyaW5nW10sXG4gICAgb3h5Z2VuX2RlbHRhczogc3RyaW5nW10sXG4gICAgZGF0ZXRpbWVzOiAoc3RyaW5nIHwgTW9tZW50KVtdLFxuICAgIGRvc2Vfd2VpZ2h0czogc3RyaW5nW10sXG4gICAgbW9sX21hc3Nlczogc3RyaW5nW10sXG4gICAgZG9zZV9lbnJpY2htZW50czogc3RyaW5nW10sXG4gICAgc3ViamVjdF93ZWlnaHRzOiBzdHJpbmdbXSxcblxuICAgIGRldXRlcml1bV9kZWx0YXNfdmFsaWRhdGVkOiBib29sZWFuLFxuICAgIG94eWdlbl9kZWx0YXNfdmFsaWRhdGVkOiBib29sZWFuLFxuICAgIGRhdGV0aW1lc192YWxpZGF0ZWQ6IGJvb2xlYW4sXG4gICAgZG9zZV93ZWlnaHRzX3ZhbGlkYXRlZDogYm9vbGVhbixcbiAgICBtb2xfbWFzc2VzX3ZhbGlkYXRlZDogYm9vbGVhbixcbiAgICBkb3NlX2VucmljaG1lbnRzX3ZhbGlkYXRlZDogYm9vbGVhbixcbiAgICBzdWJqZWN0X3dlaWdodHNfdmFsaWRhdGVkOiBib29sZWFuLFxuXG4gICAgcmVzdWx0czogUmVzdWx0VHlwZXNcbiAgICBjc3ZfbmFtZTogc3RyaW5nLFxufVxuXG5leHBvcnQgY2xhc3MgRExXQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PGFueSwgRExXU3RhdGU+IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogYW55KSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGRldXRlcml1bV9kZWx0YXM6IFtcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiXSxcbiAgICAgICAgICAgIG94eWdlbl9kZWx0YXM6IFtcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiXSxcbiAgICAgICAgICAgIGRhdGV0aW1lczogW1wiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCJdLFxuICAgICAgICAgICAgZG9zZV93ZWlnaHRzOiBbXCJcIiwgXCJcIl0sXG4gICAgICAgICAgICBtb2xfbWFzc2VzOiBbXCJcIiwgXCJcIl0sXG4gICAgICAgICAgICBkb3NlX2VucmljaG1lbnRzOiBbXCJcIiwgXCJcIl0sXG4gICAgICAgICAgICBzdWJqZWN0X3dlaWdodHM6IFtcIlwiLCBcIlwiXSxcblxuICAgICAgICAgICAgZGV1dGVyaXVtX2RlbHRhc192YWxpZGF0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgb3h5Z2VuX2RlbHRhc192YWxpZGF0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgZGF0ZXRpbWVzX3ZhbGlkYXRlZDogZmFsc2UsXG4gICAgICAgICAgICBkb3NlX3dlaWdodHNfdmFsaWRhdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIG1vbF9tYXNzZXNfdmFsaWRhdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGRvc2VfZW5yaWNobWVudHNfdmFsaWRhdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIHN1YmplY3Rfd2VpZ2h0c192YWxpZGF0ZWQ6IGZhbHNlLFxuXG4gICAgICAgICAgICByZXN1bHRzOiB7Y2FsY3VsYXRpb25zOiBbXSwgcmNvMl9lZTogW10sIGVycm9yX2ZsYWdzOiBbXX0sXG4gICAgICAgICAgICBjc3ZfbmFtZTogXCJcIixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBhbGxfaW5wdXRzX3ZhbGlkYXRlZCA9XG4gICAgICAgICAgICAodGhpcy5zdGF0ZS5kZXV0ZXJpdW1fZGVsdGFzX3ZhbGlkYXRlZCAmJiB0aGlzLnN0YXRlLm94eWdlbl9kZWx0YXNfdmFsaWRhdGVkXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5zdGF0ZS5kYXRldGltZXNfdmFsaWRhdGVkICYmIHRoaXMuc3RhdGUuZG9zZV93ZWlnaHRzX3ZhbGlkYXRlZFxuICAgICAgICAgICAgICAgICYmIHRoaXMuc3RhdGUubW9sX21hc3Nlc192YWxpZGF0ZWQgJiYgdGhpcy5zdGF0ZS5kb3NlX2VucmljaG1lbnRzX3ZhbGlkYXRlZFxuICAgICAgICAgICAgICAgICYmIHRoaXMuc3RhdGUuc3ViamVjdF93ZWlnaHRzX3ZhbGlkYXRlZCk7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ2FsbCBpbnB1dHMgdmFsaWRhdGVkPycsIGFsbF9pbnB1dHNfdmFsaWRhdGVkLCAnIHN0YXRlICcsIHRoaXMuc3RhdGUpO1xuXG4gICAgICAgIGxldCBkZXV0ZXJpdW1fZGVsdGFfaW5wdXRzOiBKU1guRWxlbWVudFtdID0gW107XG4gICAgICAgIGxldCBveHlnZW5fZGVsdGFfaW5wdXRzOiBKU1guRWxlbWVudFtdID0gW107XG4gICAgICAgIGxldCBjb2xsZWN0aW9uX3RpbWVfaW5wdXRzOiBKU1guRWxlbWVudFtdID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTlVNX1NBTVBMRV9USU1FUzsgaSsrKSB7XG4gICAgICAgICAgICBkZXV0ZXJpdW1fZGVsdGFfaW5wdXRzLnB1c2goXG4gICAgICAgICAgICAgICAgPE51bWJlcklucHV0IHBsYWNlaG9sZGVyPXtTQU1QTEVfTEFCRUxTW2ldICsgXCIgRGV1dGVyaXVtIGRlbHRhXCJ9IGluZGV4PXtpfSBrZXk9e2l9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZV9mdW5jdGlvbj17dGhpcy5oYW5kbGVfZGV1dGVyaXVtX2RlbHRhX2NoYW5nZX0gdW5pdD17XCJwZXJtaWxcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuZGV1dGVyaXVtX2RlbHRhc1tpXX0vPik7XG4gICAgICAgICAgICBveHlnZW5fZGVsdGFfaW5wdXRzLnB1c2goXG4gICAgICAgICAgICAgICAgPE51bWJlcklucHV0IHBsYWNlaG9sZGVyPXtTQU1QTEVfTEFCRUxTW2ldICsgJyBPeHlnZW4gMTggZGVsdGEnfSBpbmRleD17aX0ga2V5PXtpfSB1bml0PXtcInBlcm1pbFwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VfZnVuY3Rpb249e3RoaXMuaGFuZGxlX294eWdlbl9kZWx0YV9jaGFuZ2V9IHZhbHVlPXt0aGlzLnN0YXRlLm94eWdlbl9kZWx0YXNbaV19Lz4pO1xuICAgICAgICAgICAgY29sbGVjdGlvbl90aW1lX2lucHV0cy5wdXNoKFxuICAgICAgICAgICAgICAgIDxEYXRlVGltZVBpY2tlciBvbkNoYW5nZT17KHZhbHVlKSA9PiB0aGlzLmhhbmRsZV9kYXRlX2NoYW5nZShpLCB2YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2RhdGUtaW5wdXQtYm94IC5icDMtaW5wdXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICcgJyArIFNBTVBMRV9MQUJFTFNbaV0gKyAnIHNhbXBsZSBkYXRlIGFuZCB0aW1lJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2l9IHZhbHVlPXt0aGlzLnN0YXRlLmRhdGV0aW1lc1tpXX0gZGF0ZUZvcm1hdD1cIllZWVktTU0tRERcIiB0aW1lRm9ybWF0PVwiSEg6bW1cIi8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRvc2Vfd2VpZ2h0X2lucHV0czogSlNYLkVsZW1lbnRbXSA9IFtdO1xuICAgICAgICBsZXQgbW9sX21hc3NfaW5wdXRzOiBKU1guRWxlbWVudFtdID0gW107XG4gICAgICAgIGxldCBkb3NlX2VucmljaG1lbnRfaW5wdXRzOiBKU1guRWxlbWVudFtdID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgRUxFTUVOVFMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGRvc2Vfd2VpZ2h0X2lucHV0cy5wdXNoKFxuICAgICAgICAgICAgICAgIDxOdW1iZXJJbnB1dCBwbGFjZWhvbGRlcj17RUxFTUVOVFNbaV0gKyAnIGRvc2Ugd2VpZ2h0IChnKSd9IGluZGV4PXtpfSBrZXk9e2l9IHVuaXQ9e1wiZ1wifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VfZnVuY3Rpb249e3RoaXMuaGFuZGxlX2Rvc2Vfd2VpZ2h0X2NoYW5nZX0gdmFsdWU9e3RoaXMuc3RhdGUuZG9zZV93ZWlnaHRzW2ldfS8+KTtcbiAgICAgICAgICAgIG1vbF9tYXNzX2lucHV0cy5wdXNoKFxuICAgICAgICAgICAgICAgIDxOdW1iZXJJbnB1dCBwbGFjZWhvbGRlcj17RUxFTUVOVFNbaV0gKyAnIG1vbGVjdWxhciBtYXNzIChnL21vbCknfSBpbmRleD17aX0ga2V5PXtpfSB1bml0PXtcImcvbW9sXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZV9mdW5jdGlvbj17dGhpcy5oYW5kbGVfbW9sX21hc3NfY2hhbmdlfSB2YWx1ZT17dGhpcy5zdGF0ZS5tb2xfbWFzc2VzW2ldfS8+KTtcbiAgICAgICAgICAgIGRvc2VfZW5yaWNobWVudF9pbnB1dHMucHVzaChcbiAgICAgICAgICAgICAgICA8TnVtYmVySW5wdXQgcGxhY2Vob2xkZXI9e0VMRU1FTlRTW2ldICsgJyBkb3NlIGVucmljaG1lbnQgKHBwbSknfSBpbmRleD17aX0ga2V5PXtpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VfZnVuY3Rpb249e3RoaXMuaGFuZGxlX2Rvc2VfZW5yaWNobWVudF9jaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmRvc2VfZW5yaWNobWVudHNbaV19IHVuaXQ9e1wicHBtXCJ9Lz4pO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlc3VsdHNfZGlzcGxheTogSlNYLkVsZW1lbnQgPSA8ZGl2Lz47XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnJlc3VsdHMuY2FsY3VsYXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCByZXN1bHRzX2NhbGN1bGF0aW9uczogSlNYLkVsZW1lbnRbXSA9IFtdO1xuICAgICAgICAgICAgbGV0IHJlc3VsdHNfcmNvMl9lZTogSlNYLkVsZW1lbnRbXSA9IFtdO1xuICAgICAgICAgICAgbGV0IHJlc3VsdHNfZXJyb3JfZmxhZ3M6IEpTWC5FbGVtZW50W10gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IHJlc3VsdCBvZiB0aGlzLnN0YXRlLnJlc3VsdHMuY2FsY3VsYXRpb25zKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0c19jYWxjdWxhdGlvbnMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jlc3VsdC1wYWlyJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJlc3VsdC1sYWJlbFwiPntyZXN1bHQubGFiZWwgKyBcIjpcIn08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJyZXN1bHQtdmFsdWVcIj57cmVzdWx0LnZhbHVlfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IHJlc3VsdCBvZiB0aGlzLnN0YXRlLnJlc3VsdHMucmNvMl9lZSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHNfcmNvMl9lZS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncmVzdWx0LXBhaXInPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicmVzdWx0LWxhYmVsXCI+e3Jlc3VsdC5sYWJlbCArIFwiOlwifTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJlc3VsdC12YWx1ZVwiPntyZXN1bHQudmFsdWV9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgcmVzdWx0IG9mIHRoaXMuc3RhdGUucmVzdWx0cy5lcnJvcl9mbGFncykge1xuICAgICAgICAgICAgICAgIHJlc3VsdHNfZXJyb3JfZmxhZ3MucHVzaChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jlc3VsdC1wYWlyJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJlc3VsdC1sYWJlbFwiPntyZXN1bHQubGFiZWwgKyBcIjpcIn08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJyZXN1bHQtdmFsdWVcIj57cmVzdWx0LnZhbHVlfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdHNfZGlzcGxheSA9IChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncmVzdWx0cy1kaXNwbGF5Jz5cbiAgICAgICAgICAgICAgICAgICAgPENhcmQgY2xhc3NOYW1lPSdyZXN1bHRzLWNhcmQnPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jlc3VsdC1zZWN0aW9ucyc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jlc3VsdC1zZWN0aW9uJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1IGNsYXNzTmFtZT0ncmVzdWx0LWhlYWRlci1jYWxjJz5DYWxjdWxhdGlvbnM8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cmVzdWx0c19jYWxjdWxhdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jlc3VsdC1zZWN0aW9uJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1IGNsYXNzTmFtZT0ncmVzdWx0LWhlYWRlci1jYWxjJz5yQ08yIGFuZCBFRSwgaW50ZXJjZXB0IG1ldGhvZDwvaDU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyZXN1bHRzX3JjbzJfZWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jlc3VsdC1zZWN0aW9uJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1IGNsYXNzTmFtZT0ncmVzdWx0LWhlYWRlci1lcnJvcic+RXJyb3IgRmxhZ3M8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cmVzdWx0c19lcnJvcl9mbGFnc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L0NhcmQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPE5hdmJhciBjbGFzc05hbWU9J2Rsdy1uYXYnPlxuICAgICAgICAgICAgICAgIDxOYXZiYXJHcm91cCBhbGlnbj17QWxpZ25tZW50LkxFRlR9PlxuICAgICAgICAgICAgICAgICAgICA8TmF2YmFyLkhlYWRpbmcgY2xhc3NOYW1lPSdkbHctdGl0bGUnPkRvdWJseSBMYWJlbGVkIFdhdGVyPC9OYXZiYXIuSGVhZGluZz5cbiAgICAgICAgICAgICAgICA8L05hdmJhckdyb3VwPlxuICAgICAgICAgICAgICAgIDxOYXZiYXJHcm91cCBhbGlnbj17QWxpZ25tZW50LlJJR0hUfT5cbiAgICAgICAgICAgICAgICAgICAgPE5hdmJhckhlYWRpbmcgY2xhc3NOYW1lPSd0YWdsaW5lJz5hbiBvcGVuIHNvdXJjZSBwcm9qZWN0IGJ5IHRoZSBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIFNjaG9vbCBvZlxuICAgICAgICAgICAgICAgICAgICAgICAgTWVkaWNpbmU8L05hdmJhckhlYWRpbmc+XG4gICAgICAgICAgICAgICAgICAgIDxOYXZiYXJEaXZpZGVyLz5cbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9qY2hteXovRG91Ymx5TGFiZWxlZFdhdGVyXCIgdGFyZ2V0PVwiX2JsYW5rXCI+RG91Ymx5TGFiZWxlZFdhdGVyIG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBHaXRIdWI8L2E+XG4gICAgICAgICAgICAgICAgPC9OYXZiYXJHcm91cD5cbiAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwIGNsYXNzTmFtZT0nZGx3LWFwcCc+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzYW1wbGVzJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdkYXRlLWlucHV0cyc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1PkNvbGxlY3Rpb24gRGF0ZXMgYW5kIFRpbWVzPC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y29sbGVjdGlvbl90aW1lX2lucHV0c31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2RlbHRhLWlucHV0cyc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1PkRldXRlcml1bSBEZWx0YSBWYWx1ZXM8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkZXV0ZXJpdW1fZGVsdGFfaW5wdXRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZGVsdGEtaW5wdXRzJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDU+T3h5Z2VuIDE4IERlbHRhIFZhbHVlczwvaDU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge294eWdlbl9kZWx0YV9pbnB1dHN9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdlbGVtZW50LXdpc2UtaW5wdXRzJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dHMtYnktZWxlbWVudCc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1PkRvc2UgV2VpZ2h0czwvaDU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2Rvc2Vfd2VpZ2h0X2lucHV0c31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0cy1ieS1lbGVtZW50Jz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDU+RG9zZSBFbnJpY2htZW50czwvaDU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2Rvc2VfZW5yaWNobWVudF9pbnB1dHN9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dHMtYnktZWxlbWVudCc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1Pk1vbGVjdWxhciBNYXNzPC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bW9sX21hc3NfaW5wdXRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZWxlbWVudC13aXNlLWlucHV0cyc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXRzLWJ5LWVsZW1lbnQnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNT5TdWJqZWN0IFdlaWdodDwvaDU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE51bWJlcklucHV0IHBsYWNlaG9sZGVyPXtcIkluaXRpYWwgc3ViamVjdCB3ZWlnaHQgKGtnKVwifSBpbmRleD17MH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlX2Z1bmN0aW9uPXt0aGlzLmhhbmRsZV9zdWJqZWN0X3dlaWdodF9jaGFuZ2V9IHVuaXQ9eydrZyd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnN1YmplY3Rfd2VpZ2h0c1swXX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxOdW1iZXJJbnB1dCBwbGFjZWhvbGRlcj17XCJGaW5hbCBzdWJqZWN0IHdlaWdodCAoa2cpXCJ9IGluZGV4PXsxfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VfZnVuY3Rpb249e3RoaXMuaGFuZGxlX3N1YmplY3Rfd2VpZ2h0X2NoYW5nZX0gdW5pdD17J2tnJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuc3ViamVjdF93ZWlnaHRzWzFdfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzdWJtaXQtZ3JvdXAnPlxuICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0R3JvdXAgcGxhY2Vob2xkZXI9J1Jlc3VsdHMgQ1NWIGZpbGVuYW1lIChvcHRpb25hbCknIGNsYXNzTmFtZT0nY3N2LW5hbWUtaW5wdXQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50OiBGb3JtRXZlbnQ8SFRNTEVsZW1lbnQ+KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2Nzdl9uYW1lOiAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlfSl9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5zdWJtaXRfaW5wdXRzfSBkaXNhYmxlZD17IWFsbF9pbnB1dHNfdmFsaWRhdGVkfT5TVUJNSVQ8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtyZXN1bHRzX2Rpc3BsYXl9XG4gICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICAgICAgICA8L05hdmJhcj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBzdWJtaXRfaW5wdXRzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBsZXQgZGF0ZXRpbWVzID0gdGhpcy5zdGF0ZS5kYXRldGltZXMubWFwKCh2YWx1ZTogTW9tZW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUudG9BcnJheSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IHJlc3VsdHMgPSBhd2FpdCBjYWxjdWxhdGVfZnJvbV9pbnB1dHMoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZF9kZWx0YXM6IHRoaXMuc3RhdGUuZGV1dGVyaXVtX2RlbHRhcyxcbiAgICAgICAgICAgICAgICBvX2RlbHRhczogdGhpcy5zdGF0ZS5veHlnZW5fZGVsdGFzLFxuICAgICAgICAgICAgICAgIGRhdGV0aW1lczogZGF0ZXRpbWVzLFxuICAgICAgICAgICAgICAgIGRvc2Vfd2VpZ2h0czogdGhpcy5zdGF0ZS5kb3NlX3dlaWdodHMsXG4gICAgICAgICAgICAgICAgZG9zZV9lbnJpY2htZW50czogdGhpcy5zdGF0ZS5kb3NlX2VucmljaG1lbnRzLFxuICAgICAgICAgICAgICAgIG1vbF9tYXNzZXM6IHRoaXMuc3RhdGUubW9sX21hc3NlcyxcbiAgICAgICAgICAgICAgICBzdWJqZWN0X3dlaWdodHM6IHRoaXMuc3RhdGUuc3ViamVjdF93ZWlnaHRzLFxuICAgICAgICAgICAgICAgIGNzdl9uYW1lOiB0aGlzLnN0YXRlLmNzdl9uYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdnb3QgcmVzdWx0cycsIHJlc3VsdHMpO1xuICAgICAgICBsZXQgcmVzdWx0X2NhbGN1bGF0aW9uc19hcnJheSA9IHJlc3VsdHMuY2FsY3VsYXRpb25zO1xuICAgICAgICBsZXQgcmVzdWx0X2Vycl9mbGFnc19hcnJheSA9IHJlc3VsdHMuZXJyb3JfZmxhZ3M7XG4gICAgICAgIGxldCByZXN1bHRfcmNvMl9lZV9hcnJheSA9IHJlc3VsdHMucmNvMl9lZTtcblxuICAgICAgICBsZXQgcmVzdWx0X2VudHJpZXNfY2FsY3VsYXRpb25zID0gT2JqZWN0LmVudHJpZXMocmVzdWx0X2NhbGN1bGF0aW9uc19hcnJheSk7XG4gICAgICAgIGxldCByZXN1bHRfZW50cmllc19lcnJfZmxhZ3MgPSBPYmplY3QuZW50cmllcyhyZXN1bHRfZXJyX2ZsYWdzX2FycmF5KTtcbiAgICAgICAgbGV0IHJlc3VsdF9lbnRyaWVzX3JjbzJfZWUgPSBPYmplY3QuZW50cmllcyhyZXN1bHRfcmNvMl9lZV9hcnJheSk7XG5cbiAgICAgICAgbGV0IHJlc3VsdF9jYWxjdWF0aW9uX3N0cmluZ3MgPSBbXTtcbiAgICAgICAgbGV0IHJlc3VsdF9lcnJfZmxhZ3Nfc3RyaW5ncyA9IFtdO1xuICAgICAgICBsZXQgcmVzdWx0X3JjbzJfZWVfc3RyaW5ncyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IFtuYW1lLCB2YWx1ZV0gb2YgcmVzdWx0X2VudHJpZXNfY2FsY3VsYXRpb25zKSB7XG4gICAgICAgICAgICByZXN1bHRfY2FsY3VhdGlvbl9zdHJpbmdzLnB1c2goe2xhYmVsOiBuYW1lLCB2YWx1ZTogdmFsdWV9KTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBbbmFtZSwgdmFsdWVdIG9mIHJlc3VsdF9lbnRyaWVzX2Vycl9mbGFncykge1xuICAgICAgICAgICAgcmVzdWx0X2Vycl9mbGFnc19zdHJpbmdzLnB1c2goe2xhYmVsOiBuYW1lLCB2YWx1ZTogdmFsdWV9KTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBbbmFtZSwgdmFsdWVdIG9mIHJlc3VsdF9lbnRyaWVzX3JjbzJfZWUpIHtcbiAgICAgICAgICAgIHJlc3VsdF9yY28yX2VlX3N0cmluZ3MucHVzaCh7bGFiZWw6IG5hbWUsIHZhbHVlOiB2YWx1ZX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0aW9uczogcmVzdWx0X2NhbGN1YXRpb25fc3RyaW5ncyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJjbzJfZWU6IHJlc3VsdF9yY28yX2VlX3N0cmluZ3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcl9mbGFnczogcmVzdWx0X2Vycl9mbGFnc19zdHJpbmdzXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgY2hlY2tfbnVtZXJpY2FsX2lucHV0cyA9IChpbnB1dF9hcmF5OiAoc3RyaW5nIHwgbnVtYmVyKVtdKSA9PiB7XG4gICAgICAgIGZvciAobGV0IHZhbHVlIG9mIGlucHV0X2FyYXkpIHtcbiAgICAgICAgICAgIGlmIChpc05hTigrdmFsdWUpIHx8IHZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBoYW5kbGVfZGV1dGVyaXVtX2RlbHRhX2NoYW5nZSA9IChpbmRleDogbnVtYmVyLCBldmVudDogRm9ybUV2ZW50PEhUTUxFbGVtZW50PikgPT4ge1xuICAgICAgICBsZXQgdmFsdWUgPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuICAgICAgICBpZiAoIWlzTmFOKCt2YWx1ZSkpIHtcbiAgICAgICAgICAgIGxldCBuZXdfZGVsdGFzID0gdGhpcy5zdGF0ZS5kZXV0ZXJpdW1fZGVsdGFzO1xuICAgICAgICAgICAgbmV3X2RlbHRhcy5zcGxpY2UoaW5kZXgsIDEsIHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV1dGVyaXVtX2RlbHRhczogbmV3X2RlbHRhcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldXRlcml1bV9kZWx0YXNfdmFsaWRhdGVkOiB0aGlzLmNoZWNrX251bWVyaWNhbF9pbnB1dHMobmV3X2RlbHRhcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgaGFuZGxlX294eWdlbl9kZWx0YV9jaGFuZ2UgPSAoaW5kZXg6IG51bWJlciwgZXZlbnQ6IEZvcm1FdmVudDxIVE1MRWxlbWVudD4pID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICAgICAgaWYgKCFpc05hTigrdmFsdWUpKSB7XG4gICAgICAgICAgICBsZXQgbmV3X2RlbHRhcyA9IHRoaXMuc3RhdGUub3h5Z2VuX2RlbHRhcztcbiAgICAgICAgICAgIG5ld19kZWx0YXMuc3BsaWNlKGluZGV4LCAxLCB2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG94eWdlbl9kZWx0YXM6IG5ld19kZWx0YXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBveHlnZW5fZGVsdGFzX3ZhbGlkYXRlZDogdGhpcy5jaGVja19udW1lcmljYWxfaW5wdXRzKG5ld19kZWx0YXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGhhbmRsZV9kYXRlX2NoYW5nZSA9IChpOiBudW1iZXIsIHZhbHVlOiBzdHJpbmcgfCBNb21lbnQpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBsZXQgbmV3X2RhdGVfYXJyYXkgPSB0aGlzLnN0YXRlLmRhdGV0aW1lcztcbiAgICAgICAgICAgIG5ld19kYXRlX2FycmF5LnNwbGljZShpLCAxLCB2YWx1ZSk7XG4gICAgICAgICAgICBsZXQgYWxsX2RhdGVzX2ZpbGxlZCA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKGxldCBkYXRlIG9mIG5ld19kYXRlX2FycmF5KSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsbF9kYXRlc19maWxsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZGF0ZXRpbWVzOiBuZXdfZGF0ZV9hcnJheSwgZGF0ZXRpbWVzX3ZhbGlkYXRlZDogYWxsX2RhdGVzX2ZpbGxlZH0pXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgaGFuZGxlX2Rvc2Vfd2VpZ2h0X2NoYW5nZSA9IChpbmRleDogbnVtYmVyLCBldmVudDogRm9ybUV2ZW50PEhUTUxFbGVtZW50PikgPT4ge1xuICAgICAgICBsZXQgdmFsdWUgPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuICAgICAgICBpZiAoIWlzTmFOKCt2YWx1ZSkpIHtcbiAgICAgICAgICAgIGxldCBuZXdfZG9zZV93ZWlnaHRzID0gdGhpcy5zdGF0ZS5kb3NlX3dlaWdodHM7XG4gICAgICAgICAgICBuZXdfZG9zZV93ZWlnaHRzLnNwbGljZShpbmRleCwgMSwgdmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3NlX3dlaWdodHM6IG5ld19kb3NlX3dlaWdodHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3NlX3dlaWdodHNfdmFsaWRhdGVkOiB0aGlzLmNoZWNrX251bWVyaWNhbF9pbnB1dHMobmV3X2Rvc2Vfd2VpZ2h0cylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgaGFuZGxlX21vbF9tYXNzX2NoYW5nZSA9IChpbmRleDogbnVtYmVyLCBldmVudDogRm9ybUV2ZW50PEhUTUxFbGVtZW50PikgPT4ge1xuICAgICAgICBsZXQgdmFsdWUgPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuICAgICAgICBpZiAoIWlzTmFOKCt2YWx1ZSkpIHtcbiAgICAgICAgICAgIGxldCBuZXdfbW9sX21hc3NlcyA9IHRoaXMuc3RhdGUubW9sX21hc3NlcztcbiAgICAgICAgICAgIG5ld19tb2xfbWFzc2VzLnNwbGljZShpbmRleCwgMSwgdmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2xfbWFzc2VzOiBuZXdfbW9sX21hc3NlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbF9tYXNzZXNfdmFsaWRhdGVkOiB0aGlzLmNoZWNrX251bWVyaWNhbF9pbnB1dHMobmV3X21vbF9tYXNzZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGhhbmRsZV9kb3NlX2VucmljaG1lbnRfY2hhbmdlID0gKGluZGV4OiBudW1iZXIsIGV2ZW50OiBGb3JtRXZlbnQ8SFRNTEVsZW1lbnQ+KSA9PiB7XG4gICAgICAgIGxldCB2YWx1ZSA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgICAgIGlmICghaXNOYU4oK3ZhbHVlKSkge1xuICAgICAgICAgICAgbGV0IG5ld19lbnJpY2htZW50cyA9IHRoaXMuc3RhdGUuZG9zZV9lbnJpY2htZW50cztcbiAgICAgICAgICAgIG5ld19lbnJpY2htZW50cy5zcGxpY2UoaW5kZXgsIDEsIHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9zZV9lbnJpY2htZW50czogbmV3X2VucmljaG1lbnRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9zZV9lbnJpY2htZW50c192YWxpZGF0ZWQ6IHRoaXMuY2hlY2tfbnVtZXJpY2FsX2lucHV0cyhuZXdfZW5yaWNobWVudHMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGhhbmRsZV9zdWJqZWN0X3dlaWdodF9jaGFuZ2UgPSAoaW5kZXg6IG51bWJlciwgZXZlbnQ6IEZvcm1FdmVudDxIVE1MRWxlbWVudD4pID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICAgICAgaWYgKCFpc05hTigrdmFsdWUpKSB7XG4gICAgICAgICAgICBsZXQgbmV3X3dlaWdodHMgPSB0aGlzLnN0YXRlLnN1YmplY3Rfd2VpZ2h0cztcbiAgICAgICAgICAgIG5ld193ZWlnaHRzLnNwbGljZShpbmRleCwgMSwgdmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJqZWN0X3dlaWdodHM6IG5ld193ZWlnaHRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdF93ZWlnaHRzX3ZhbGlkYXRlZDogdGhpcy5jaGVja19udW1lcmljYWxfaW5wdXRzKG5ld193ZWlnaHRzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbn1cblxuaW50ZXJmYWNlIE51bWJlcklucHV0UHJvcHMge1xuICAgIHBsYWNlaG9sZGVyOiBzdHJpbmcsXG4gICAgaW5kZXg6IG51bWJlcixcbiAgICBjaGFuZ2VfZnVuY3Rpb246IChpbmRleDogbnVtYmVyLCBldmVudDogRm9ybUV2ZW50PEhUTUxFbGVtZW50PikgPT4gdm9pZFxuICAgIHZhbHVlOiBzdHJpbmcsXG4gICAgdW5pdDogc3RyaW5nXG59XG5cbmV4cG9ydCBjbGFzcyBOdW1iZXJJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxOdW1iZXJJbnB1dFByb3BzPiB7XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBpY29uOiBJY29uTmFtZSA9IFwiY2lyY2xlLWFycm93LXJpZ2h0XCI7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgICAgICBpY29uID0gXCJjaXJjbGUtYXJyb3ctcmlnaHRcIjtcbiAgICAgICAgfSBlbHNlIGlmICghaXNOYU4oK3RoaXMucHJvcHMudmFsdWUpKSB7XG4gICAgICAgICAgICBpY29uID0gXCJ0aWNrXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpY29uID0gXCJiYW4tY2lyY2xlXCI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPENvbnRyb2xHcm91cCBmaWxsPXt0cnVlfT5cbiAgICAgICAgICAgICAgICA8SW5wdXRHcm91cFxuICAgICAgICAgICAgICAgICAgICBsZWZ0SWNvbj17aWNvbn0gY2xhc3NOYW1lPXsnLmJwMy1maWxsJ30gcmlnaHRFbGVtZW50PXs8VGFnPnt0aGlzLnByb3BzLnVuaXR9PC9UYWc+fVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50OiBGb3JtRXZlbnQ8SFRNTEVsZW1lbnQ+KSA9PiB0aGlzLnByb3BzLmNoYW5nZV9mdW5jdGlvbih0aGlzLnByb3BzLmluZGV4LCBldmVudCl9XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXt0aGlzLnByb3BzLnBsYWNlaG9sZGVyfSB2YWx1ZT17dGhpcy5wcm9wcy52YWx1ZX0vPlxuICAgICAgICAgICAgPC9Db250cm9sR3JvdXA+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19
