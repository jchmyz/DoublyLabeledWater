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
                            result_calcuation_strings.push(name_1 + ": " + value);
                        }
                        for (_b = 0, result_entries_err_flags_1 = result_entries_err_flags; _b < result_entries_err_flags_1.length; _b++) {
                            _c = result_entries_err_flags_1[_b], name_2 = _c[0], value = _c[1];
                            result_err_flags_strings.push(name_2 + ": " + value);
                        }
                        for (_d = 0, result_entries_rco2_ee_1 = result_entries_rco2_ee; _d < result_entries_rco2_ee_1.length; _d++) {
                            _e = result_entries_rco2_ee_1[_d], name_3 = _e[0], value = _e[1];
                            result_rco2_ee_strings.push(name_3 + ": " + value);
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
                results_calculations.push(React.createElement("p", null, result));
            }
            for (var _b = 0, _c = this.state.results.rco2_ee; _b < _c.length; _b++) {
                var result = _c[_b];
                results_rco2_ee.push(React.createElement("p", null, result));
            }
            for (var _d = 0, _e = this.state.results.error_flags; _d < _e.length; _d++) {
                var result = _e[_d];
                results_error_flags.push(React.createElement("p", null, result));
            }
            results_display = (React.createElement("div", { className: 'results-display' },
                React.createElement(cjs_1.Card, { className: 'results-card' },
                    React.createElement("div", { className: 'result-sections' },
                        React.createElement("div", null,
                            React.createElement("h5", null, "Calculations"),
                            results_calculations),
                        React.createElement("div", null,
                            React.createElement("h5", null, "rCO2 and EE, intercept method"),
                            results_rco2_ee),
                        React.createElement("div", null,
                            React.createElement("h5", null, "Error Flags"),
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRMV0FwcC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2QkFBK0I7QUFDL0IsMENBUzJCO0FBQzNCLCtDQUFpRDtBQUVqRCx1Q0FBaUQ7QUFFakQsaURBQXdHO0FBRXhHLElBQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQztBQUM5QixJQUFNLE1BQU0sR0FBRyxXQUFXLENBQUM7QUFDM0IsSUFBTSxRQUFRLEdBQUcsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFFckMsSUFBTSxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7QUFDM0IsSUFBTSxhQUFhLEdBQUcsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUE4QmpFO0lBQTRCLDBCQUE4QjtJQUN0RCxnQkFBWSxLQUFVO1FBQXRCLFlBQ0ksa0JBQU0sS0FBSyxDQUFDLFNBcUJmO1FBb0pELG1CQUFhLEdBQUc7Ozs7O3dCQUNSLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFhOzRCQUNuRCxPQUFPLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3QkFDM0IsQ0FBQyxDQUFDLENBQUM7d0JBQ1cscUJBQU0sZ0NBQXFCLENBQ3JDO2dDQUNJLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQjtnQ0FDckMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYTtnQ0FDbEMsU0FBUyxFQUFFLFNBQVM7Z0NBQ3BCLFlBQVksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVk7Z0NBQ3JDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCO2dDQUM3QyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO2dDQUNqQyxlQUFlLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlO2dDQUMzQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFROzZCQUNoQyxDQUNKLEVBQUE7O3dCQVhHLE9BQU8sR0FBRyxTQVdiO3dCQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO3dCQUNoQyx5QkFBeUIsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO3dCQUNqRCxzQkFBc0IsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDO3dCQUM3QyxvQkFBb0IsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO3dCQUV2QywyQkFBMkIsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7d0JBQ3hFLHdCQUF3QixHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQzt3QkFDbEUsc0JBQXNCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO3dCQUU5RCx5QkFBeUIsR0FBRyxFQUFFLENBQUM7d0JBQy9CLHdCQUF3QixHQUFHLEVBQUUsQ0FBQzt3QkFDOUIsc0JBQXNCLEdBQUcsRUFBRSxDQUFDO3dCQUVoQyxXQUFxRCxFQUEzQiwyREFBMkIsRUFBM0IseUNBQTJCLEVBQTNCLElBQTJCLEVBQUU7NEJBQTlDLHNDQUFhLEVBQVosY0FBSSxFQUFFLEtBQUssUUFBQTs0QkFDakIseUJBQXlCLENBQUMsSUFBSSxDQUFDLE1BQUksR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUM7eUJBQ3ZEO3dCQUNELFdBQWtELEVBQXhCLHFEQUF3QixFQUF4QixzQ0FBd0IsRUFBeEIsSUFBd0IsRUFBRTs0QkFBM0MsbUNBQWEsRUFBWixjQUFJLEVBQUUsS0FBSyxRQUFBOzRCQUNqQix3QkFBd0IsQ0FBQyxJQUFJLENBQUMsTUFBSSxHQUFHLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQzt5QkFDdEQ7d0JBQ0QsV0FBZ0QsRUFBdEIsaURBQXNCLEVBQXRCLG9DQUFzQixFQUF0QixJQUFzQixFQUFFOzRCQUF6QyxpQ0FBYSxFQUFaLGNBQUksRUFBRSxLQUFLLFFBQUE7NEJBQ2pCLHNCQUFzQixDQUFDLElBQUksQ0FBQyxNQUFJLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDO3lCQUNwRDt3QkFFRCxJQUFJLENBQUMsUUFBUSxDQUFDOzRCQUNJLE9BQU8sRUFBRTtnQ0FDTCxZQUFZLEVBQUUseUJBQXlCO2dDQUN2QyxPQUFPLEVBQUUsc0JBQXNCO2dDQUMvQixXQUFXLEVBQUUsd0JBQXdCOzZCQUN4Qzt5QkFDSixDQUFDLENBQUM7Ozs7YUFDcEIsQ0FBQztRQUVGLDRCQUFzQixHQUFHLFVBQUMsVUFBK0I7WUFDckQsS0FBa0IsVUFBVSxFQUFWLHlCQUFVLEVBQVYsd0JBQVUsRUFBVixJQUFVLEVBQUU7Z0JBQXpCLElBQUksS0FBSyxtQkFBQTtnQkFDVixJQUFJLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFLEVBQUU7b0JBQy9CLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjthQUNKO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFDO1FBRUYsbUNBQTZCLEdBQUcsVUFBQyxLQUFhLEVBQUUsS0FBNkI7WUFDekUsSUFBSSxLQUFLLEdBQUksS0FBSyxDQUFDLE1BQTJCLENBQUMsS0FBSyxDQUFDO1lBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDaEIsSUFBSSxVQUFVLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDN0MsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNuQyxLQUFJLENBQUMsUUFBUSxDQUFDO29CQUNJLGdCQUFnQixFQUFFLFVBQVU7b0JBQzVCLDBCQUEwQixFQUFFLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUM7aUJBQ3RFLENBQUMsQ0FBQzthQUNwQjtRQUNMLENBQUMsQ0FBQztRQUVGLGdDQUEwQixHQUFHLFVBQUMsS0FBYSxFQUFFLEtBQTZCO1lBQ3RFLElBQUksS0FBSyxHQUFJLEtBQUssQ0FBQyxNQUEyQixDQUFDLEtBQUssQ0FBQztZQUNyRCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2hCLElBQUksVUFBVSxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDO2dCQUMxQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ25DLEtBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ0ksYUFBYSxFQUFFLFVBQVU7b0JBQ3pCLHVCQUF1QixFQUFFLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUM7aUJBQ25FLENBQUMsQ0FBQzthQUNwQjtRQUNMLENBQUMsQ0FBQztRQUVGLHdCQUFrQixHQUFHLFVBQUMsQ0FBUyxFQUFFLEtBQXNCO1lBQ25ELElBQUksT0FBTyxLQUFLLElBQUksUUFBUSxFQUFFO2dCQUMxQixJQUFJLGNBQWMsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztnQkFDMUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQztnQkFDNUIsS0FBaUIsVUFBYyxFQUFkLGlDQUFjLEVBQWQsNEJBQWMsRUFBZCxJQUFjLEVBQUU7b0JBQTVCLElBQUksSUFBSSx1QkFBQTtvQkFDVCxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTt3QkFDMUIsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO3dCQUN6QixNQUFNO3FCQUNUO2lCQUNKO2dCQUNELEtBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxTQUFTLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixFQUFFLGdCQUFnQixFQUFDLENBQUMsQ0FBQTthQUNwRjtRQUNMLENBQUMsQ0FBQztRQUVGLCtCQUF5QixHQUFHLFVBQUMsS0FBYSxFQUFFLEtBQTZCO1lBQ3JFLElBQUksS0FBSyxHQUFJLEtBQUssQ0FBQyxNQUEyQixDQUFDLEtBQUssQ0FBQztZQUNyRCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2hCLElBQUksZ0JBQWdCLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7Z0JBQy9DLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN6QyxLQUFJLENBQUMsUUFBUSxDQUFDO29CQUNJLFlBQVksRUFBRSxnQkFBZ0I7b0JBQzlCLHNCQUFzQixFQUFFLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQztpQkFDeEUsQ0FBQyxDQUFDO2FBQ3BCO1FBQ0wsQ0FBQyxDQUFDO1FBRUYsNEJBQXNCLEdBQUcsVUFBQyxLQUFhLEVBQUUsS0FBNkI7WUFDbEUsSUFBSSxLQUFLLEdBQUksS0FBSyxDQUFDLE1BQTJCLENBQUMsS0FBSyxDQUFDO1lBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDaEIsSUFBSSxjQUFjLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7Z0JBQzNDLGNBQWMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDdkMsS0FBSSxDQUFDLFFBQVEsQ0FBQztvQkFDSSxVQUFVLEVBQUUsY0FBYztvQkFDMUIsb0JBQW9CLEVBQUUsS0FBSSxDQUFDLHNCQUFzQixDQUFDLGNBQWMsQ0FBQztpQkFDcEUsQ0FBQyxDQUFDO2FBQ3BCO1FBQ0wsQ0FBQyxDQUFDO1FBRUYsbUNBQTZCLEdBQUcsVUFBQyxLQUFhLEVBQUUsS0FBNkI7WUFDekUsSUFBSSxLQUFLLEdBQUksS0FBSyxDQUFDLE1BQTJCLENBQUMsS0FBSyxDQUFDO1lBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDaEIsSUFBSSxlQUFlLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDbEQsZUFBZSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN4QyxLQUFJLENBQUMsUUFBUSxDQUFDO29CQUNJLGdCQUFnQixFQUFFLGVBQWU7b0JBQ2pDLDBCQUEwQixFQUFFLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxlQUFlLENBQUM7aUJBQzNFLENBQUMsQ0FBQzthQUNwQjtRQUNMLENBQUMsQ0FBQztRQUVGLGtDQUE0QixHQUFHLFVBQUMsS0FBYSxFQUFFLEtBQTZCO1lBQ3hFLElBQUksS0FBSyxHQUFJLEtBQUssQ0FBQyxNQUEyQixDQUFDLEtBQUssQ0FBQztZQUNyRCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2hCLElBQUksV0FBVyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDO2dCQUM3QyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3BDLEtBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ0ksZUFBZSxFQUFFLFdBQVc7b0JBQzVCLHlCQUF5QixFQUFFLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLENBQUM7aUJBQ3RFLENBQUMsQ0FBQzthQUNwQjtRQUNMLENBQUMsQ0FBQztRQXRURSxLQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1QsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQ3RDLGFBQWEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDbkMsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztZQUMvQixZQUFZLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQ3RCLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDcEIsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQzFCLGVBQWUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFFekIsMEJBQTBCLEVBQUUsS0FBSztZQUNqQyx1QkFBdUIsRUFBRSxLQUFLO1lBQzlCLG1CQUFtQixFQUFFLEtBQUs7WUFDMUIsc0JBQXNCLEVBQUUsS0FBSztZQUM3QixvQkFBb0IsRUFBRSxLQUFLO1lBQzNCLDBCQUEwQixFQUFFLEtBQUs7WUFDakMseUJBQXlCLEVBQUUsS0FBSztZQUVoQyxPQUFPLEVBQUUsRUFBQyxZQUFZLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBQztZQUN6RCxRQUFRLEVBQUUsRUFBRTtTQUNmLENBQUM7O0lBQ04sQ0FBQztJQUVELHVCQUFNLEdBQU47UUFBQSxpQkFnSkM7UUEvSUcsSUFBSSxvQkFBb0IsR0FDcEIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLDBCQUEwQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsdUJBQXVCO2VBQ3JFLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBc0I7ZUFDbkUsSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLDBCQUEwQjtlQUN4RSxJQUFJLENBQUMsS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFFakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWxGLElBQUksc0JBQXNCLEdBQWtCLEVBQUUsQ0FBQztRQUMvQyxJQUFJLG1CQUFtQixHQUFrQixFQUFFLENBQUM7UUFDNUMsSUFBSSxzQkFBc0IsR0FBa0IsRUFBRSxDQUFDO2dDQUN0QyxDQUFDO1lBQ04sc0JBQXNCLENBQUMsSUFBSSxDQUN2QixvQkFBQyxXQUFXLElBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxrQkFBa0IsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQ3BFLGVBQWUsRUFBRSxPQUFLLDZCQUE2QixFQUFFLElBQUksRUFBRSxRQUFRLEVBQ25FLEtBQUssRUFBRSxPQUFLLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0QsbUJBQW1CLENBQUMsSUFBSSxDQUNwQixvQkFBQyxXQUFXLElBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxrQkFBa0IsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFDcEYsZUFBZSxFQUFFLE9BQUssMEJBQTBCLEVBQUUsS0FBSyxFQUFFLE9BQUssS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUcsc0JBQXNCLENBQUMsSUFBSSxDQUN2QixvQkFBQyxjQUFjLElBQUMsUUFBUSxFQUFFLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBakMsQ0FBaUMsRUFDdEQsVUFBVSxFQUFFO29CQUNSLFNBQVMsRUFBRSwyQkFBMkI7b0JBQ3RDLFdBQVcsRUFBRSxHQUFHLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLHVCQUF1QjtpQkFDaEUsRUFDRCxHQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFLLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsT0FBTyxHQUFFLENBQ3ZHLENBQUM7UUFDTixDQUFDOztRQWhCRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFO29CQUFoQyxDQUFDO1NBZ0JUO1FBRUQsSUFBSSxrQkFBa0IsR0FBa0IsRUFBRSxDQUFDO1FBQzNDLElBQUksZUFBZSxHQUFrQixFQUFFLENBQUM7UUFDeEMsSUFBSSxzQkFBc0IsR0FBa0IsRUFBRSxDQUFDO1FBQy9DLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3RDLGtCQUFrQixDQUFDLElBQUksQ0FDbkIsb0JBQUMsV0FBVyxJQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsa0JBQWtCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQzFFLGVBQWUsRUFBRSxJQUFJLENBQUMseUJBQXlCLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN4RyxlQUFlLENBQUMsSUFBSSxDQUNoQixvQkFBQyxXQUFXLElBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyx5QkFBeUIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFDckYsZUFBZSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25HLHNCQUFzQixDQUFDLElBQUksQ0FDdkIsb0JBQUMsV0FBVyxJQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsd0JBQXdCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUNyRSxlQUFlLEVBQUUsSUFBSSxDQUFDLDZCQUE2QixFQUNuRCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQztTQUMzRTtRQUVELElBQUksZUFBZSxHQUFnQixnQ0FBTSxDQUFDO1FBQzFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDNUMsSUFBSSxvQkFBb0IsR0FBa0IsRUFBRSxDQUFDO1lBQzdDLElBQUksZUFBZSxHQUFrQixFQUFFLENBQUM7WUFDeEMsSUFBSSxtQkFBbUIsR0FBa0IsRUFBRSxDQUFDO1lBQzVDLEtBQW1CLFVBQStCLEVBQS9CLEtBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUEvQixjQUErQixFQUEvQixJQUErQixFQUFFO2dCQUEvQyxJQUFJLE1BQU0sU0FBQTtnQkFDWCxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsK0JBQUksTUFBTSxDQUFLLENBQUMsQ0FBQzthQUM5QztZQUNELEtBQW1CLFVBQTBCLEVBQTFCLEtBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUExQixjQUEwQixFQUExQixJQUEwQixFQUFFO2dCQUExQyxJQUFJLE1BQU0sU0FBQTtnQkFDWCxlQUFlLENBQUMsSUFBSSxDQUFDLCtCQUFJLE1BQU0sQ0FBSyxDQUFDLENBQUM7YUFDekM7WUFDRCxLQUFtQixVQUE4QixFQUE5QixLQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBOUIsY0FBOEIsRUFBOUIsSUFBOEIsRUFBRTtnQkFBOUMsSUFBSSxNQUFNLFNBQUE7Z0JBQ1gsbUJBQW1CLENBQUMsSUFBSSxDQUFDLCtCQUFJLE1BQU0sQ0FBSyxDQUFDLENBQUM7YUFDN0M7WUFDRCxlQUFlLEdBQUcsQ0FDZCw2QkFBSyxTQUFTLEVBQUMsaUJBQWlCO2dCQUM1QixvQkFBQyxVQUFJLElBQUMsU0FBUyxFQUFDLGNBQWM7b0JBQzFCLDZCQUFLLFNBQVMsRUFBQyxpQkFBaUI7d0JBQzVCOzRCQUNJLCtDQUFxQjs0QkFDcEIsb0JBQW9CLENBQ25CO3dCQUNOOzRCQUNJLGdFQUFzQzs0QkFDckMsZUFBZSxDQUNkO3dCQUNOOzRCQUNJLDhDQUFvQjs0QkFDbkIsbUJBQW1CLENBQ2xCLENBQ0osQ0FDSCxDQUNMLENBQ1QsQ0FBQTtTQUNKO1FBRUQsT0FBTyxDQUNILG9CQUFDLFlBQU0sSUFBQyxTQUFTLEVBQUMsU0FBUztZQUN2QixvQkFBQyxpQkFBVyxJQUFDLEtBQUssRUFBRSxnQkFBUyxDQUFDLElBQUk7Z0JBQzlCLG9CQUFDLFlBQU0sQ0FBQyxPQUFPLElBQUMsU0FBUyxFQUFDLFdBQVcsMkJBQXNDLENBQ2pFO1lBQ2Qsb0JBQUMsaUJBQVcsSUFBQyxLQUFLLEVBQUUsZ0JBQVMsQ0FBQyxLQUFLO2dCQUMvQixvQkFBQyxtQkFBYSxJQUFDLFNBQVMsRUFBQyxTQUFTLDhFQUNOO2dCQUM1QixvQkFBQyxtQkFBYSxPQUFFO2dCQUNoQiwyQkFBRyxJQUFJLEVBQUMsOENBQThDLEVBQUMsTUFBTSxFQUFDLFFBQVEsbUNBQ3hELENBQ0o7WUFDZCxvQkFBQyxnQkFBUyxJQUFDLFNBQVMsRUFBQyxTQUFTO2dCQUMxQiw2QkFBSyxTQUFTLEVBQUMsU0FBUztvQkFDcEIsNkJBQUssU0FBUyxFQUFDLGFBQWE7d0JBQ3hCLDZEQUFtQzt3QkFDbEMsc0JBQXNCLENBQ3JCO29CQUNOLDZCQUFLLFNBQVMsRUFBQyxjQUFjO3dCQUN6Qix5REFBK0I7d0JBQzlCLHNCQUFzQixDQUNyQjtvQkFDTiw2QkFBSyxTQUFTLEVBQUMsY0FBYzt3QkFDekIseURBQStCO3dCQUM5QixtQkFBbUIsQ0FDbEIsQ0FDSjtnQkFDTiw2QkFBSyxTQUFTLEVBQUMscUJBQXFCO29CQUNoQyw2QkFBSyxTQUFTLEVBQUMsbUJBQW1CO3dCQUM5QiwrQ0FBcUI7d0JBQ3BCLGtCQUFrQixDQUNqQjtvQkFDTiw2QkFBSyxTQUFTLEVBQUMsbUJBQW1CO3dCQUM5QixtREFBeUI7d0JBQ3hCLHNCQUFzQixDQUNyQjtvQkFDTiw2QkFBSyxTQUFTLEVBQUMsbUJBQW1CO3dCQUM5QixpREFBdUI7d0JBQ3RCLGVBQWUsQ0FDZCxDQUNKO2dCQUNOLDZCQUFLLFNBQVMsRUFBQyxxQkFBcUI7b0JBQ2hDLDZCQUFLLFNBQVMsRUFBQyxtQkFBbUI7d0JBQzlCLGlEQUF1Qjt3QkFDdkIsb0JBQUMsV0FBVyxJQUFDLFdBQVcsRUFBRSw2QkFBNkIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUNwRCxlQUFlLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLElBQUksRUFBRSxJQUFJLEVBQzlELEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FBRzt3QkFDcEQsb0JBQUMsV0FBVyxJQUFDLFdBQVcsRUFBRSwyQkFBMkIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUNsRCxlQUFlLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLElBQUksRUFBRSxJQUFJLEVBQzlELEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUNsRCxDQUNKO2dCQUNOLDZCQUFLLFNBQVMsRUFBQyxjQUFjO29CQUN6QixvQkFBQyxpQkFBVSxJQUFDLFdBQVcsRUFBQyxpQ0FBaUMsRUFBQyxTQUFTLEVBQUMsZ0JBQWdCLEVBQ3hFLFFBQVEsRUFBRSxVQUFDLEtBQTZCOzRCQUNwQyxPQUFBLEtBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxRQUFRLEVBQUcsS0FBSyxDQUFDLE1BQTJCLENBQUMsS0FBSyxFQUFDLENBQUM7d0JBQW5FLENBQW1FLEdBQUc7b0JBQ3RGLG9CQUFDLGFBQU0sSUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxvQkFBb0IsYUFBaUIsQ0FDbkY7Z0JBQ0wsZUFBZSxDQUNSLENBQ1AsQ0FDWixDQUFDO0lBQ04sQ0FBQztJQWtKTCxhQUFDO0FBQUQsQ0EzVEEsQUEyVEMsQ0EzVDJCLEtBQUssQ0FBQyxTQUFTLEdBMlQxQztBQTNUWSx3QkFBTTtBQXFVbkI7SUFBaUMsK0JBQWlDO0lBQWxFOztJQXFCQSxDQUFDO0lBbkJHLDRCQUFNLEdBQU47UUFBQSxpQkFrQkM7UUFqQkcsSUFBSSxJQUFJLEdBQWEsb0JBQW9CLENBQUM7UUFDMUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxFQUFFLEVBQUU7WUFDekIsSUFBSSxHQUFHLG9CQUFvQixDQUFDO1NBQy9CO2FBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbEMsSUFBSSxHQUFHLE1BQU0sQ0FBQztTQUNqQjthQUFNO1lBQ0gsSUFBSSxHQUFHLFlBQVksQ0FBQztTQUN2QjtRQUVELE9BQU8sQ0FDSCxvQkFBQyxtQkFBWSxJQUFDLElBQUksRUFBRSxJQUFJO1lBQ3BCLG9CQUFDLGlCQUFVLElBQ1AsUUFBUSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxvQkFBQyxVQUFHLFFBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQU8sRUFDbEYsUUFBUSxFQUFFLFVBQUMsS0FBNkIsSUFBSyxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFuRCxDQUFtRCxFQUNoRyxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQ3hELENBQ2xCLENBQUM7SUFDTixDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQXJCQSxBQXFCQyxDQXJCZ0MsS0FBSyxDQUFDLFNBQVMsR0FxQi9DO0FBckJZLGtDQUFXIiwiZmlsZSI6IkRMV0FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtcbiAgICBCdXR0b25Hcm91cCxcbiAgICBGb3JtR3JvdXAsXG4gICAgTnVtZXJpY0lucHV0LFxuICAgIEJ1dHRvbixcbiAgICBJbnRlbnQsXG4gICAgSWNvbk5hbWUsXG4gICAgQ29udHJvbEdyb3VwLFxuICAgIElucHV0R3JvdXAsIEFsaWdubWVudCwgVGFnXG59IGZyb20gXCJAYmx1ZXByaW50anMvY29yZVwiO1xuaW1wb3J0ICogYXMgRGF0ZVRpbWVQaWNrZXIgZnJvbSAncmVhY3QtZGF0ZXRpbWUnO1xuaW1wb3J0IHtNb21lbnR9IGZyb20gXCJtb21lbnRcIjtcbmltcG9ydCB7Y2FsY3VsYXRlX2Zyb21faW5wdXRzfSBmcm9tIFwiLi9SZXF1ZXN0c1wiO1xuaW1wb3J0IHtGb3JtRXZlbnR9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtDYXJkLCBJY29uLCBOYXZiYXIsIE5hdmJhckRpdmlkZXIsIE5hdmJhckdyb3VwLCBOYXZiYXJIZWFkaW5nfSBmcm9tIFwiQGJsdWVwcmludGpzL2NvcmUvbGliL2Nqc1wiO1xuXG5jb25zdCBERVVURVJJVU0gPSBcIkRldXRlcml1bVwiO1xuY29uc3QgT1hZR0VOID0gXCJPeHlnZW4gMThcIjtcbmNvbnN0IEVMRU1FTlRTID0gW0RFVVRFUklVTSwgT1hZR0VOXTtcblxuY29uc3QgTlVNX1NBTVBMRV9USU1FUyA9IDU7XG5jb25zdCBTQU1QTEVfTEFCRUxTID0gWydCYWNrZ3JvdW5kJywgJ1BENCcsICdQRDUnLCAnRUQ0JywgJ0VENSddO1xuXG5pbnRlcmZhY2UgUmVzdWx0VHlwZXMge1xuICAgIGNhbGN1bGF0aW9uczogc3RyaW5nW10sXG4gICAgcmNvMl9lZTogc3RyaW5nW10sXG4gICAgZXJyb3JfZmxhZ3M6IHN0cmluZ1tdXG59XG5cblxuaW50ZXJmYWNlIERMV1N0YXRlIHtcbiAgICBkZXV0ZXJpdW1fZGVsdGFzOiBzdHJpbmdbXSxcbiAgICBveHlnZW5fZGVsdGFzOiBzdHJpbmdbXSxcbiAgICBkYXRldGltZXM6IChzdHJpbmcgfCBNb21lbnQpW10sXG4gICAgZG9zZV93ZWlnaHRzOiBzdHJpbmdbXSxcbiAgICBtb2xfbWFzc2VzOiBzdHJpbmdbXSxcbiAgICBkb3NlX2VucmljaG1lbnRzOiBzdHJpbmdbXSxcbiAgICBzdWJqZWN0X3dlaWdodHM6IHN0cmluZ1tdLFxuXG4gICAgZGV1dGVyaXVtX2RlbHRhc192YWxpZGF0ZWQ6IGJvb2xlYW4sXG4gICAgb3h5Z2VuX2RlbHRhc192YWxpZGF0ZWQ6IGJvb2xlYW4sXG4gICAgZGF0ZXRpbWVzX3ZhbGlkYXRlZDogYm9vbGVhbixcbiAgICBkb3NlX3dlaWdodHNfdmFsaWRhdGVkOiBib29sZWFuLFxuICAgIG1vbF9tYXNzZXNfdmFsaWRhdGVkOiBib29sZWFuLFxuICAgIGRvc2VfZW5yaWNobWVudHNfdmFsaWRhdGVkOiBib29sZWFuLFxuICAgIHN1YmplY3Rfd2VpZ2h0c192YWxpZGF0ZWQ6IGJvb2xlYW4sXG5cbiAgICByZXN1bHRzOiBSZXN1bHRUeXBlc1xuICAgIGNzdl9uYW1lOiBzdHJpbmcsXG59XG5cbmV4cG9ydCBjbGFzcyBETFdBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8YW55LCBETFdTdGF0ZT4ge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBhbnkpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgZGV1dGVyaXVtX2RlbHRhczogW1wiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCJdLFxuICAgICAgICAgICAgb3h5Z2VuX2RlbHRhczogW1wiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCJdLFxuICAgICAgICAgICAgZGF0ZXRpbWVzOiBbXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIl0sXG4gICAgICAgICAgICBkb3NlX3dlaWdodHM6IFtcIlwiLCBcIlwiXSxcbiAgICAgICAgICAgIG1vbF9tYXNzZXM6IFtcIlwiLCBcIlwiXSxcbiAgICAgICAgICAgIGRvc2VfZW5yaWNobWVudHM6IFtcIlwiLCBcIlwiXSxcbiAgICAgICAgICAgIHN1YmplY3Rfd2VpZ2h0czogW1wiXCIsIFwiXCJdLFxuXG4gICAgICAgICAgICBkZXV0ZXJpdW1fZGVsdGFzX3ZhbGlkYXRlZDogZmFsc2UsXG4gICAgICAgICAgICBveHlnZW5fZGVsdGFzX3ZhbGlkYXRlZDogZmFsc2UsXG4gICAgICAgICAgICBkYXRldGltZXNfdmFsaWRhdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGRvc2Vfd2VpZ2h0c192YWxpZGF0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgbW9sX21hc3Nlc192YWxpZGF0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgZG9zZV9lbnJpY2htZW50c192YWxpZGF0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgc3ViamVjdF93ZWlnaHRzX3ZhbGlkYXRlZDogZmFsc2UsXG5cbiAgICAgICAgICAgIHJlc3VsdHM6IHtjYWxjdWxhdGlvbnM6IFtdLCByY28yX2VlOiBbXSwgZXJyb3JfZmxhZ3M6IFtdfSxcbiAgICAgICAgICAgIGNzdl9uYW1lOiBcIlwiLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IGFsbF9pbnB1dHNfdmFsaWRhdGVkID1cbiAgICAgICAgICAgICh0aGlzLnN0YXRlLmRldXRlcml1bV9kZWx0YXNfdmFsaWRhdGVkICYmIHRoaXMuc3RhdGUub3h5Z2VuX2RlbHRhc192YWxpZGF0ZWRcbiAgICAgICAgICAgICAgICAmJiB0aGlzLnN0YXRlLmRhdGV0aW1lc192YWxpZGF0ZWQgJiYgdGhpcy5zdGF0ZS5kb3NlX3dlaWdodHNfdmFsaWRhdGVkXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5zdGF0ZS5tb2xfbWFzc2VzX3ZhbGlkYXRlZCAmJiB0aGlzLnN0YXRlLmRvc2VfZW5yaWNobWVudHNfdmFsaWRhdGVkXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5zdGF0ZS5zdWJqZWN0X3dlaWdodHNfdmFsaWRhdGVkKTtcblxuICAgICAgICBjb25zb2xlLmxvZygnYWxsIGlucHV0cyB2YWxpZGF0ZWQ/JywgYWxsX2lucHV0c192YWxpZGF0ZWQsICcgc3RhdGUgJywgdGhpcy5zdGF0ZSk7XG5cbiAgICAgICAgbGV0IGRldXRlcml1bV9kZWx0YV9pbnB1dHM6IEpTWC5FbGVtZW50W10gPSBbXTtcbiAgICAgICAgbGV0IG94eWdlbl9kZWx0YV9pbnB1dHM6IEpTWC5FbGVtZW50W10gPSBbXTtcbiAgICAgICAgbGV0IGNvbGxlY3Rpb25fdGltZV9pbnB1dHM6IEpTWC5FbGVtZW50W10gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOVU1fU0FNUExFX1RJTUVTOyBpKyspIHtcbiAgICAgICAgICAgIGRldXRlcml1bV9kZWx0YV9pbnB1dHMucHVzaChcbiAgICAgICAgICAgICAgICA8TnVtYmVySW5wdXQgcGxhY2Vob2xkZXI9e1NBTVBMRV9MQUJFTFNbaV0gKyBcIiBEZXV0ZXJpdW0gZGVsdGFcIn0gaW5kZXg9e2l9IGtleT17aX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlX2Z1bmN0aW9uPXt0aGlzLmhhbmRsZV9kZXV0ZXJpdW1fZGVsdGFfY2hhbmdlfSB1bml0PXtcInBlcm1pbFwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5kZXV0ZXJpdW1fZGVsdGFzW2ldfS8+KTtcbiAgICAgICAgICAgIG94eWdlbl9kZWx0YV9pbnB1dHMucHVzaChcbiAgICAgICAgICAgICAgICA8TnVtYmVySW5wdXQgcGxhY2Vob2xkZXI9e1NBTVBMRV9MQUJFTFNbaV0gKyAnIE94eWdlbiAxOCBkZWx0YSd9IGluZGV4PXtpfSBrZXk9e2l9IHVuaXQ9e1wicGVybWlsXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZV9mdW5jdGlvbj17dGhpcy5oYW5kbGVfb3h5Z2VuX2RlbHRhX2NoYW5nZX0gdmFsdWU9e3RoaXMuc3RhdGUub3h5Z2VuX2RlbHRhc1tpXX0vPik7XG4gICAgICAgICAgICBjb2xsZWN0aW9uX3RpbWVfaW5wdXRzLnB1c2goXG4gICAgICAgICAgICAgICAgPERhdGVUaW1lUGlja2VyIG9uQ2hhbmdlPXsodmFsdWUpID0+IHRoaXMuaGFuZGxlX2RhdGVfY2hhbmdlKGksIHZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnZGF0ZS1pbnB1dC1ib3ggLmJwMy1pbnB1dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJyAnICsgU0FNUExFX0xBQkVMU1tpXSArICcgc2FtcGxlIGRhdGUgYW5kIHRpbWUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aX0gdmFsdWU9e3RoaXMuc3RhdGUuZGF0ZXRpbWVzW2ldfSBkYXRlRm9ybWF0PVwiWVlZWS1NTS1ERFwiIHRpbWVGb3JtYXQ9XCJISDptbVwiLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZG9zZV93ZWlnaHRfaW5wdXRzOiBKU1guRWxlbWVudFtdID0gW107XG4gICAgICAgIGxldCBtb2xfbWFzc19pbnB1dHM6IEpTWC5FbGVtZW50W10gPSBbXTtcbiAgICAgICAgbGV0IGRvc2VfZW5yaWNobWVudF9pbnB1dHM6IEpTWC5FbGVtZW50W10gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBFTEVNRU5UUy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZG9zZV93ZWlnaHRfaW5wdXRzLnB1c2goXG4gICAgICAgICAgICAgICAgPE51bWJlcklucHV0IHBsYWNlaG9sZGVyPXtFTEVNRU5UU1tpXSArICcgZG9zZSB3ZWlnaHQgKGcpJ30gaW5kZXg9e2l9IGtleT17aX0gdW5pdD17XCJnXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZV9mdW5jdGlvbj17dGhpcy5oYW5kbGVfZG9zZV93ZWlnaHRfY2hhbmdlfSB2YWx1ZT17dGhpcy5zdGF0ZS5kb3NlX3dlaWdodHNbaV19Lz4pO1xuICAgICAgICAgICAgbW9sX21hc3NfaW5wdXRzLnB1c2goXG4gICAgICAgICAgICAgICAgPE51bWJlcklucHV0IHBsYWNlaG9sZGVyPXtFTEVNRU5UU1tpXSArICcgbW9sZWN1bGFyIG1hc3MgKGcvbW9sKSd9IGluZGV4PXtpfSBrZXk9e2l9IHVuaXQ9e1wiZy9tb2xcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlX2Z1bmN0aW9uPXt0aGlzLmhhbmRsZV9tb2xfbWFzc19jaGFuZ2V9IHZhbHVlPXt0aGlzLnN0YXRlLm1vbF9tYXNzZXNbaV19Lz4pO1xuICAgICAgICAgICAgZG9zZV9lbnJpY2htZW50X2lucHV0cy5wdXNoKFxuICAgICAgICAgICAgICAgIDxOdW1iZXJJbnB1dCBwbGFjZWhvbGRlcj17RUxFTUVOVFNbaV0gKyAnIGRvc2UgZW5yaWNobWVudCAocHBtKSd9IGluZGV4PXtpfSBrZXk9e2l9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZV9mdW5jdGlvbj17dGhpcy5oYW5kbGVfZG9zZV9lbnJpY2htZW50X2NoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuZG9zZV9lbnJpY2htZW50c1tpXX0gdW5pdD17XCJwcG1cIn0vPik7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVzdWx0c19kaXNwbGF5OiBKU1guRWxlbWVudCA9IDxkaXYvPjtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucmVzdWx0cy5jYWxjdWxhdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IHJlc3VsdHNfY2FsY3VsYXRpb25zOiBKU1guRWxlbWVudFtdID0gW107XG4gICAgICAgICAgICBsZXQgcmVzdWx0c19yY28yX2VlOiBKU1guRWxlbWVudFtdID0gW107XG4gICAgICAgICAgICBsZXQgcmVzdWx0c19lcnJvcl9mbGFnczogSlNYLkVsZW1lbnRbXSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgcmVzdWx0IG9mIHRoaXMuc3RhdGUucmVzdWx0cy5jYWxjdWxhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzX2NhbGN1bGF0aW9ucy5wdXNoKDxwPntyZXN1bHR9PC9wPik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCByZXN1bHQgb2YgdGhpcy5zdGF0ZS5yZXN1bHRzLnJjbzJfZWUpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzX3JjbzJfZWUucHVzaCg8cD57cmVzdWx0fTwvcD4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgcmVzdWx0IG9mIHRoaXMuc3RhdGUucmVzdWx0cy5lcnJvcl9mbGFncykge1xuICAgICAgICAgICAgICAgIHJlc3VsdHNfZXJyb3JfZmxhZ3MucHVzaCg8cD57cmVzdWx0fTwvcD4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0c19kaXNwbGF5ID0gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyZXN1bHRzLWRpc3BsYXknPlxuICAgICAgICAgICAgICAgICAgICA8Q2FyZCBjbGFzc05hbWU9J3Jlc3VsdHMtY2FyZCc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncmVzdWx0LXNlY3Rpb25zJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDU+Q2FsY3VsYXRpb25zPC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Jlc3VsdHNfY2FsY3VsYXRpb25zfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNT5yQ08yIGFuZCBFRSwgaW50ZXJjZXB0IG1ldGhvZDwvaDU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyZXN1bHRzX3JjbzJfZWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1PkVycm9yIEZsYWdzPC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Jlc3VsdHNfZXJyb3JfZmxhZ3N9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9DYXJkPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxOYXZiYXIgY2xhc3NOYW1lPSdkbHctbmF2Jz5cbiAgICAgICAgICAgICAgICA8TmF2YmFyR3JvdXAgYWxpZ249e0FsaWdubWVudC5MRUZUfT5cbiAgICAgICAgICAgICAgICAgICAgPE5hdmJhci5IZWFkaW5nIGNsYXNzTmFtZT0nZGx3LXRpdGxlJz5Eb3VibHkgTGFiZWxlZCBXYXRlcjwvTmF2YmFyLkhlYWRpbmc+XG4gICAgICAgICAgICAgICAgPC9OYXZiYXJHcm91cD5cbiAgICAgICAgICAgICAgICA8TmF2YmFyR3JvdXAgYWxpZ249e0FsaWdubWVudC5SSUdIVH0+XG4gICAgICAgICAgICAgICAgICAgIDxOYXZiYXJIZWFkaW5nIGNsYXNzTmFtZT0ndGFnbGluZSc+YW4gb3BlbiBzb3VyY2UgcHJvamVjdCBieSB0aGUgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBTY2hvb2wgb2ZcbiAgICAgICAgICAgICAgICAgICAgICAgIE1lZGljaW5lPC9OYXZiYXJIZWFkaW5nPlxuICAgICAgICAgICAgICAgICAgICA8TmF2YmFyRGl2aWRlci8+XG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vamNobXl6L0RvdWJseUxhYmVsZWRXYXRlclwiIHRhcmdldD1cIl9ibGFua1wiPkRvdWJseUxhYmVsZWRXYXRlciBvblxuICAgICAgICAgICAgICAgICAgICAgICAgR2l0SHViPC9hPlxuICAgICAgICAgICAgICAgIDwvTmF2YmFyR3JvdXA+XG4gICAgICAgICAgICAgICAgPEZvcm1Hcm91cCBjbGFzc05hbWU9J2Rsdy1hcHAnPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc2FtcGxlcyc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZGF0ZS1pbnB1dHMnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNT5Db2xsZWN0aW9uIERhdGVzIGFuZCBUaW1lczwvaDU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2NvbGxlY3Rpb25fdGltZV9pbnB1dHN9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdkZWx0YS1pbnB1dHMnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNT5EZXV0ZXJpdW0gRGVsdGEgVmFsdWVzPC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZGV1dGVyaXVtX2RlbHRhX2lucHV0c31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2RlbHRhLWlucHV0cyc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1Pk94eWdlbiAxOCBEZWx0YSBWYWx1ZXM8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtveHlnZW5fZGVsdGFfaW5wdXRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZWxlbWVudC13aXNlLWlucHV0cyc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXRzLWJ5LWVsZW1lbnQnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNT5Eb3NlIFdlaWdodHM8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkb3NlX3dlaWdodF9pbnB1dHN9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dHMtYnktZWxlbWVudCc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1PkRvc2UgRW5yaWNobWVudHM8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkb3NlX2VucmljaG1lbnRfaW5wdXRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXRzLWJ5LWVsZW1lbnQnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNT5Nb2xlY3VsYXIgTWFzczwvaDU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge21vbF9tYXNzX2lucHV0c31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2VsZW1lbnQtd2lzZS1pbnB1dHMnPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0cy1ieS1lbGVtZW50Jz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDU+U3ViamVjdCBXZWlnaHQ8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxOdW1iZXJJbnB1dCBwbGFjZWhvbGRlcj17XCJJbml0aWFsIHN1YmplY3Qgd2VpZ2h0IChrZylcIn0gaW5kZXg9ezB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZV9mdW5jdGlvbj17dGhpcy5oYW5kbGVfc3ViamVjdF93ZWlnaHRfY2hhbmdlfSB1bml0PXsna2cnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5zdWJqZWN0X3dlaWdodHNbMF19Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TnVtYmVySW5wdXQgcGxhY2Vob2xkZXI9e1wiRmluYWwgc3ViamVjdCB3ZWlnaHQgKGtnKVwifSBpbmRleD17MX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlX2Z1bmN0aW9uPXt0aGlzLmhhbmRsZV9zdWJqZWN0X3dlaWdodF9jaGFuZ2V9IHVuaXQ9eydrZyd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnN1YmplY3Rfd2VpZ2h0c1sxXX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc3VibWl0LWdyb3VwJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dEdyb3VwIHBsYWNlaG9sZGVyPSdSZXN1bHRzIENTViBmaWxlbmFtZSAob3B0aW9uYWwpJyBjbGFzc05hbWU9J2Nzdi1uYW1lLWlucHV0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudDogRm9ybUV2ZW50PEhUTUxFbGVtZW50PikgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtjc3ZfbmFtZTogKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZX0pfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMuc3VibWl0X2lucHV0c30gZGlzYWJsZWQ9eyFhbGxfaW5wdXRzX3ZhbGlkYXRlZH0+U1VCTUlUPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7cmVzdWx0c19kaXNwbGF5fVxuICAgICAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICAgICAgPC9OYXZiYXI+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgc3VibWl0X2lucHV0cyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgbGV0IGRhdGV0aW1lcyA9IHRoaXMuc3RhdGUuZGF0ZXRpbWVzLm1hcCgodmFsdWU6IE1vbWVudCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvQXJyYXkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCByZXN1bHRzID0gYXdhaXQgY2FsY3VsYXRlX2Zyb21faW5wdXRzKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRfZGVsdGFzOiB0aGlzLnN0YXRlLmRldXRlcml1bV9kZWx0YXMsXG4gICAgICAgICAgICAgICAgb19kZWx0YXM6IHRoaXMuc3RhdGUub3h5Z2VuX2RlbHRhcyxcbiAgICAgICAgICAgICAgICBkYXRldGltZXM6IGRhdGV0aW1lcyxcbiAgICAgICAgICAgICAgICBkb3NlX3dlaWdodHM6IHRoaXMuc3RhdGUuZG9zZV93ZWlnaHRzLFxuICAgICAgICAgICAgICAgIGRvc2VfZW5yaWNobWVudHM6IHRoaXMuc3RhdGUuZG9zZV9lbnJpY2htZW50cyxcbiAgICAgICAgICAgICAgICBtb2xfbWFzc2VzOiB0aGlzLnN0YXRlLm1vbF9tYXNzZXMsXG4gICAgICAgICAgICAgICAgc3ViamVjdF93ZWlnaHRzOiB0aGlzLnN0YXRlLnN1YmplY3Rfd2VpZ2h0cyxcbiAgICAgICAgICAgICAgICBjc3ZfbmFtZTogdGhpcy5zdGF0ZS5jc3ZfbmFtZVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICBjb25zb2xlLmxvZygnZ290IHJlc3VsdHMnLCByZXN1bHRzKTtcbiAgICAgICAgbGV0IHJlc3VsdF9jYWxjdWxhdGlvbnNfYXJyYXkgPSByZXN1bHRzLmNhbGN1bGF0aW9ucztcbiAgICAgICAgbGV0IHJlc3VsdF9lcnJfZmxhZ3NfYXJyYXkgPSByZXN1bHRzLmVycm9yX2ZsYWdzO1xuICAgICAgICBsZXQgcmVzdWx0X3JjbzJfZWVfYXJyYXkgPSByZXN1bHRzLnJjbzJfZWU7XG5cbiAgICAgICAgbGV0IHJlc3VsdF9lbnRyaWVzX2NhbGN1bGF0aW9ucyA9IE9iamVjdC5lbnRyaWVzKHJlc3VsdF9jYWxjdWxhdGlvbnNfYXJyYXkpO1xuICAgICAgICBsZXQgcmVzdWx0X2VudHJpZXNfZXJyX2ZsYWdzID0gT2JqZWN0LmVudHJpZXMocmVzdWx0X2Vycl9mbGFnc19hcnJheSk7XG4gICAgICAgIGxldCByZXN1bHRfZW50cmllc19yY28yX2VlID0gT2JqZWN0LmVudHJpZXMocmVzdWx0X3JjbzJfZWVfYXJyYXkpO1xuXG4gICAgICAgIGxldCByZXN1bHRfY2FsY3VhdGlvbl9zdHJpbmdzID0gW107XG4gICAgICAgIGxldCByZXN1bHRfZXJyX2ZsYWdzX3N0cmluZ3MgPSBbXTtcbiAgICAgICAgbGV0IHJlc3VsdF9yY28yX2VlX3N0cmluZ3MgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBbbmFtZSwgdmFsdWVdIG9mIHJlc3VsdF9lbnRyaWVzX2NhbGN1bGF0aW9ucykge1xuICAgICAgICAgICAgcmVzdWx0X2NhbGN1YXRpb25fc3RyaW5ncy5wdXNoKG5hbWUgKyBcIjogXCIgKyB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgW25hbWUsIHZhbHVlXSBvZiByZXN1bHRfZW50cmllc19lcnJfZmxhZ3MpIHtcbiAgICAgICAgICAgIHJlc3VsdF9lcnJfZmxhZ3Nfc3RyaW5ncy5wdXNoKG5hbWUgKyBcIjogXCIgKyB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgW25hbWUsIHZhbHVlXSBvZiByZXN1bHRfZW50cmllc19yY28yX2VlKSB7XG4gICAgICAgICAgICByZXN1bHRfcmNvMl9lZV9zdHJpbmdzLnB1c2gobmFtZSArIFwiOiBcIiArIHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGlvbnM6IHJlc3VsdF9jYWxjdWF0aW9uX3N0cmluZ3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByY28yX2VlOiByZXN1bHRfcmNvMl9lZV9zdHJpbmdzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JfZmxhZ3M6IHJlc3VsdF9lcnJfZmxhZ3Nfc3RyaW5nc1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNoZWNrX251bWVyaWNhbF9pbnB1dHMgPSAoaW5wdXRfYXJheTogKHN0cmluZyB8IG51bWJlcilbXSkgPT4ge1xuICAgICAgICBmb3IgKGxldCB2YWx1ZSBvZiBpbnB1dF9hcmF5KSB7XG4gICAgICAgICAgICBpZiAoaXNOYU4oK3ZhbHVlKSB8fCB2YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgaGFuZGxlX2RldXRlcml1bV9kZWx0YV9jaGFuZ2UgPSAoaW5kZXg6IG51bWJlciwgZXZlbnQ6IEZvcm1FdmVudDxIVE1MRWxlbWVudD4pID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICAgICAgaWYgKCFpc05hTigrdmFsdWUpKSB7XG4gICAgICAgICAgICBsZXQgbmV3X2RlbHRhcyA9IHRoaXMuc3RhdGUuZGV1dGVyaXVtX2RlbHRhcztcbiAgICAgICAgICAgIG5ld19kZWx0YXMuc3BsaWNlKGluZGV4LCAxLCB2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldXRlcml1bV9kZWx0YXM6IG5ld19kZWx0YXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXV0ZXJpdW1fZGVsdGFzX3ZhbGlkYXRlZDogdGhpcy5jaGVja19udW1lcmljYWxfaW5wdXRzKG5ld19kZWx0YXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGhhbmRsZV9veHlnZW5fZGVsdGFfY2hhbmdlID0gKGluZGV4OiBudW1iZXIsIGV2ZW50OiBGb3JtRXZlbnQ8SFRNTEVsZW1lbnQ+KSA9PiB7XG4gICAgICAgIGxldCB2YWx1ZSA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgICAgIGlmICghaXNOYU4oK3ZhbHVlKSkge1xuICAgICAgICAgICAgbGV0IG5ld19kZWx0YXMgPSB0aGlzLnN0YXRlLm94eWdlbl9kZWx0YXM7XG4gICAgICAgICAgICBuZXdfZGVsdGFzLnNwbGljZShpbmRleCwgMSwgdmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBveHlnZW5fZGVsdGFzOiBuZXdfZGVsdGFzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3h5Z2VuX2RlbHRhc192YWxpZGF0ZWQ6IHRoaXMuY2hlY2tfbnVtZXJpY2FsX2lucHV0cyhuZXdfZGVsdGFzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBoYW5kbGVfZGF0ZV9jaGFuZ2UgPSAoaTogbnVtYmVyLCB2YWx1ZTogc3RyaW5nIHwgTW9tZW50KSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgbGV0IG5ld19kYXRlX2FycmF5ID0gdGhpcy5zdGF0ZS5kYXRldGltZXM7XG4gICAgICAgICAgICBuZXdfZGF0ZV9hcnJheS5zcGxpY2UoaSwgMSwgdmFsdWUpO1xuICAgICAgICAgICAgbGV0IGFsbF9kYXRlc19maWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgZm9yIChsZXQgZGF0ZSBvZiBuZXdfZGF0ZV9hcnJheSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICBhbGxfZGF0ZXNfZmlsbGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2RhdGV0aW1lczogbmV3X2RhdGVfYXJyYXksIGRhdGV0aW1lc192YWxpZGF0ZWQ6IGFsbF9kYXRlc19maWxsZWR9KVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGhhbmRsZV9kb3NlX3dlaWdodF9jaGFuZ2UgPSAoaW5kZXg6IG51bWJlciwgZXZlbnQ6IEZvcm1FdmVudDxIVE1MRWxlbWVudD4pID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICAgICAgaWYgKCFpc05hTigrdmFsdWUpKSB7XG4gICAgICAgICAgICBsZXQgbmV3X2Rvc2Vfd2VpZ2h0cyA9IHRoaXMuc3RhdGUuZG9zZV93ZWlnaHRzO1xuICAgICAgICAgICAgbmV3X2Rvc2Vfd2VpZ2h0cy5zcGxpY2UoaW5kZXgsIDEsIHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9zZV93ZWlnaHRzOiBuZXdfZG9zZV93ZWlnaHRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9zZV93ZWlnaHRzX3ZhbGlkYXRlZDogdGhpcy5jaGVja19udW1lcmljYWxfaW5wdXRzKG5ld19kb3NlX3dlaWdodHMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGhhbmRsZV9tb2xfbWFzc19jaGFuZ2UgPSAoaW5kZXg6IG51bWJlciwgZXZlbnQ6IEZvcm1FdmVudDxIVE1MRWxlbWVudD4pID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICAgICAgaWYgKCFpc05hTigrdmFsdWUpKSB7XG4gICAgICAgICAgICBsZXQgbmV3X21vbF9tYXNzZXMgPSB0aGlzLnN0YXRlLm1vbF9tYXNzZXM7XG4gICAgICAgICAgICBuZXdfbW9sX21hc3Nlcy5zcGxpY2UoaW5kZXgsIDEsIHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9sX21hc3NlczogbmV3X21vbF9tYXNzZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2xfbWFzc2VzX3ZhbGlkYXRlZDogdGhpcy5jaGVja19udW1lcmljYWxfaW5wdXRzKG5ld19tb2xfbWFzc2VzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBoYW5kbGVfZG9zZV9lbnJpY2htZW50X2NoYW5nZSA9IChpbmRleDogbnVtYmVyLCBldmVudDogRm9ybUV2ZW50PEhUTUxFbGVtZW50PikgPT4ge1xuICAgICAgICBsZXQgdmFsdWUgPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuICAgICAgICBpZiAoIWlzTmFOKCt2YWx1ZSkpIHtcbiAgICAgICAgICAgIGxldCBuZXdfZW5yaWNobWVudHMgPSB0aGlzLnN0YXRlLmRvc2VfZW5yaWNobWVudHM7XG4gICAgICAgICAgICBuZXdfZW5yaWNobWVudHMuc3BsaWNlKGluZGV4LCAxLCB2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvc2VfZW5yaWNobWVudHM6IG5ld19lbnJpY2htZW50cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvc2VfZW5yaWNobWVudHNfdmFsaWRhdGVkOiB0aGlzLmNoZWNrX251bWVyaWNhbF9pbnB1dHMobmV3X2VucmljaG1lbnRzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBoYW5kbGVfc3ViamVjdF93ZWlnaHRfY2hhbmdlID0gKGluZGV4OiBudW1iZXIsIGV2ZW50OiBGb3JtRXZlbnQ8SFRNTEVsZW1lbnQ+KSA9PiB7XG4gICAgICAgIGxldCB2YWx1ZSA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgICAgIGlmICghaXNOYU4oK3ZhbHVlKSkge1xuICAgICAgICAgICAgbGV0IG5ld193ZWlnaHRzID0gdGhpcy5zdGF0ZS5zdWJqZWN0X3dlaWdodHM7XG4gICAgICAgICAgICBuZXdfd2VpZ2h0cy5zcGxpY2UoaW5kZXgsIDEsIHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdF93ZWlnaHRzOiBuZXdfd2VpZ2h0cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3Rfd2VpZ2h0c192YWxpZGF0ZWQ6IHRoaXMuY2hlY2tfbnVtZXJpY2FsX2lucHV0cyhuZXdfd2VpZ2h0cylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG59XG5cbmludGVyZmFjZSBOdW1iZXJJbnB1dFByb3BzIHtcbiAgICBwbGFjZWhvbGRlcjogc3RyaW5nLFxuICAgIGluZGV4OiBudW1iZXIsXG4gICAgY2hhbmdlX2Z1bmN0aW9uOiAoaW5kZXg6IG51bWJlciwgZXZlbnQ6IEZvcm1FdmVudDxIVE1MRWxlbWVudD4pID0+IHZvaWRcbiAgICB2YWx1ZTogc3RyaW5nLFxuICAgIHVuaXQ6IHN0cmluZ1xufVxuXG5leHBvcnQgY2xhc3MgTnVtYmVySW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8TnVtYmVySW5wdXRQcm9wcz4ge1xuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgaWNvbjogSWNvbk5hbWUgPSBcImNpcmNsZS1hcnJvdy1yaWdodFwiO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy52YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgaWNvbiA9IFwiY2lyY2xlLWFycm93LXJpZ2h0XCI7XG4gICAgICAgIH0gZWxzZSBpZiAoIWlzTmFOKCt0aGlzLnByb3BzLnZhbHVlKSkge1xuICAgICAgICAgICAgaWNvbiA9IFwidGlja1wiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWNvbiA9IFwiYmFuLWNpcmNsZVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxDb250cm9sR3JvdXAgZmlsbD17dHJ1ZX0+XG4gICAgICAgICAgICAgICAgPElucHV0R3JvdXBcbiAgICAgICAgICAgICAgICAgICAgbGVmdEljb249e2ljb259IGNsYXNzTmFtZT17Jy5icDMtZmlsbCd9IHJpZ2h0RWxlbWVudD17PFRhZz57dGhpcy5wcm9wcy51bml0fTwvVGFnPn1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudDogRm9ybUV2ZW50PEhUTUxFbGVtZW50PikgPT4gdGhpcy5wcm9wcy5jaGFuZ2VfZnVuY3Rpb24odGhpcy5wcm9wcy5pbmRleCwgZXZlbnQpfVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17dGhpcy5wcm9wcy5wbGFjZWhvbGRlcn0gdmFsdWU9e3RoaXMucHJvcHMudmFsdWV9Lz5cbiAgICAgICAgICAgIDwvQ29udHJvbEdyb3VwPlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==
