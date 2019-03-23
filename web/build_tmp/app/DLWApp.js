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
                var all_dates_filled = true;
                var new_date_array = _this.state.datetimes;
                var dates_chronological = _this.state.dates_chronological;
                dates_chronological.splice(i, 1, true);
                for (var j = 0; j < i; j++) {
                    if (typeof (new_date_array[j]) != "string") {
                        if (value.isBefore(new_date_array[j])) {
                            dates_chronological.splice(i, 1, false);
                            all_dates_filled = false;
                            break;
                        }
                    }
                }
                new_date_array.splice(i, 1, value);
                for (var _i = 0, new_date_array_1 = new_date_array; _i < new_date_array_1.length; _i++) {
                    var date = new_date_array_1[_i];
                    if (typeof date === "string") {
                        all_dates_filled = false;
                        break;
                    }
                }
                _this.setState({
                    datetimes: new_date_array,
                    datetimes_validated: all_dates_filled,
                    dates_chronological: dates_chronological
                });
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
            dates_chronological: [true, true, true, true, true],
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
            collection_time_inputs.push(React.createElement(core_1.Popover, { content: React.createElement("p", null, "Collection time inputs must be in chronological order."), className: 'date-warning-popover', isOpen: !this_1.state.dates_chronological[i] },
                React.createElement(DateTimePicker, { onChange: function (value) { return _this.handle_date_change(i, value); }, inputProps: {
                        className: 'date-input-box .bp3-input',
                        placeholder: ' ' + SAMPLE_LABELS[i] + ' sample date and time'
                    }, key: i, value: this_1.state.datetimes[i], dateFormat: "YYYY-MM-DD", timeFormat: "HH:mm" })));
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
                React.createElement(cjs_1.NavbarHeading, { className: 'tagline' }, "an open source project"),
                React.createElement("img", { src: "assets/logo_cuhs.png", alt: "University of Colorado Anschutz Medical Campus logo", style: { 'height': 30 } }),
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRMV0FwcC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2QkFBK0I7QUFDL0IsMENBUzJCO0FBQzNCLCtDQUFpRDtBQUVqRCx1Q0FBaUQ7QUFFakQsaURBQXdHO0FBRXhHLElBQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQztBQUM5QixJQUFNLE1BQU0sR0FBRyxXQUFXLENBQUM7QUFDM0IsSUFBTSxRQUFRLEdBQUcsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFFckMsSUFBTSxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7QUFDM0IsSUFBTSxhQUFhLEdBQUcsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFvQ2pFO0lBQTRCLDBCQUE4QjtJQUN0RCxnQkFBWSxLQUFVO1FBQXRCLFlBQ0ksa0JBQU0sS0FBSyxDQUFDLFNBc0JmO1FBb0tELG1CQUFhLEdBQUc7Ozs7O3dCQUNSLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFhOzRCQUNuRCxPQUFPLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3QkFDM0IsQ0FBQyxDQUFDLENBQUM7d0JBQ1cscUJBQU0sZ0NBQXFCLENBQ3JDO2dDQUNJLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQjtnQ0FDckMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYTtnQ0FDbEMsU0FBUyxFQUFFLFNBQVM7Z0NBQ3BCLFlBQVksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVk7Z0NBQ3JDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCO2dDQUM3QyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO2dDQUNqQyxlQUFlLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlO2dDQUMzQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFROzZCQUNoQyxDQUNKLEVBQUE7O3dCQVhHLE9BQU8sR0FBRyxTQVdiO3dCQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO3dCQUNoQyx5QkFBeUIsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO3dCQUNqRCxzQkFBc0IsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDO3dCQUM3QyxvQkFBb0IsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO3dCQUV2QywyQkFBMkIsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7d0JBQ3hFLHdCQUF3QixHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQzt3QkFDbEUsc0JBQXNCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO3dCQUU5RCx5QkFBeUIsR0FBRyxFQUFFLENBQUM7d0JBQy9CLHdCQUF3QixHQUFHLEVBQUUsQ0FBQzt3QkFDOUIsc0JBQXNCLEdBQUcsRUFBRSxDQUFDO3dCQUVoQyxXQUFxRCxFQUEzQiwyREFBMkIsRUFBM0IseUNBQTJCLEVBQTNCLElBQTJCLEVBQUU7NEJBQTlDLHNDQUFhLEVBQVosY0FBSSxFQUFFLEtBQUssUUFBQTs0QkFDakIseUJBQXlCLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLE1BQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQzt5QkFDL0Q7d0JBQ0QsV0FBa0QsRUFBeEIscURBQXdCLEVBQXhCLHNDQUF3QixFQUF4QixJQUF3QixFQUFFOzRCQUEzQyxtQ0FBYSxFQUFaLGNBQUksRUFBRSxLQUFLLFFBQUE7NEJBQ2pCLHdCQUF3QixDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxNQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7eUJBQzlEO3dCQUNELFdBQWdELEVBQXRCLGlEQUFzQixFQUF0QixvQ0FBc0IsRUFBdEIsSUFBc0IsRUFBRTs0QkFBekMsaUNBQWEsRUFBWixjQUFJLEVBQUUsS0FBSyxRQUFBOzRCQUNqQixzQkFBc0IsQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsTUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO3lCQUM1RDt3QkFFRCxJQUFJLENBQUMsUUFBUSxDQUFDOzRCQUNJLE9BQU8sRUFBRTtnQ0FDTCxZQUFZLEVBQUUseUJBQXlCO2dDQUN2QyxPQUFPLEVBQUUsc0JBQXNCO2dDQUMvQixXQUFXLEVBQUUsd0JBQXdCOzZCQUN4Qzt5QkFDSixDQUFDLENBQUM7Ozs7YUFDcEIsQ0FBQztRQUVGLDRCQUFzQixHQUFHLFVBQUMsVUFBK0I7WUFDckQsS0FBa0IsVUFBVSxFQUFWLHlCQUFVLEVBQVYsd0JBQVUsRUFBVixJQUFVLEVBQUU7Z0JBQXpCLElBQUksS0FBSyxtQkFBQTtnQkFDVixJQUFJLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFLEVBQUU7b0JBQy9CLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjthQUNKO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFDO1FBRUYsbUNBQTZCLEdBQUcsVUFBQyxLQUFhLEVBQUUsS0FBNkI7WUFDekUsSUFBSSxLQUFLLEdBQUksS0FBSyxDQUFDLE1BQTJCLENBQUMsS0FBSyxDQUFDO1lBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDaEIsSUFBSSxVQUFVLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDN0MsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNuQyxLQUFJLENBQUMsUUFBUSxDQUFDO29CQUNJLGdCQUFnQixFQUFFLFVBQVU7b0JBQzVCLDBCQUEwQixFQUFFLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUM7aUJBQ3RFLENBQUMsQ0FBQzthQUNwQjtRQUNMLENBQUMsQ0FBQztRQUVGLGdDQUEwQixHQUFHLFVBQUMsS0FBYSxFQUFFLEtBQTZCO1lBQ3RFLElBQUksS0FBSyxHQUFJLEtBQUssQ0FBQyxNQUEyQixDQUFDLEtBQUssQ0FBQztZQUNyRCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2hCLElBQUksVUFBVSxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDO2dCQUMxQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ25DLEtBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ0ksYUFBYSxFQUFFLFVBQVU7b0JBQ3pCLHVCQUF1QixFQUFFLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUM7aUJBQ25FLENBQUMsQ0FBQzthQUNwQjtRQUNMLENBQUMsQ0FBQztRQUVGLHdCQUFrQixHQUFHLFVBQUMsQ0FBUyxFQUFFLEtBQXNCO1lBQ25ELElBQUksT0FBTyxLQUFLLElBQUksUUFBUSxFQUFFO2dCQUMxQixJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQztnQkFDNUIsSUFBSSxjQUFjLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7Z0JBQzFDLElBQUksbUJBQW1CLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQztnQkFDekQsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ3hCLElBQUksT0FBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsRUFBRTt3QkFDdkMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFOzRCQUNuQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQzs0QkFDeEMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDOzRCQUN6QixNQUFNO3lCQUNUO3FCQUNKO2lCQUNKO2dCQUNELGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDbkMsS0FBaUIsVUFBYyxFQUFkLGlDQUFjLEVBQWQsNEJBQWMsRUFBZCxJQUFjLEVBQUU7b0JBQTVCLElBQUksSUFBSSx1QkFBQTtvQkFDVCxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTt3QkFDMUIsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO3dCQUN6QixNQUFNO3FCQUNUO2lCQUNKO2dCQUNELEtBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ0ksU0FBUyxFQUFFLGNBQWM7b0JBQ3pCLG1CQUFtQixFQUFFLGdCQUFnQjtvQkFDckMsbUJBQW1CLEVBQUUsbUJBQW1CO2lCQUMzQyxDQUFDLENBQUE7YUFDbkI7UUFDTCxDQUFDLENBQUM7UUFFRiwrQkFBeUIsR0FBRyxVQUFDLEtBQWEsRUFBRSxLQUE2QjtZQUNyRSxJQUFJLEtBQUssR0FBSSxLQUFLLENBQUMsTUFBMkIsQ0FBQyxLQUFLLENBQUM7WUFDckQsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNoQixJQUFJLGdCQUFnQixHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO2dCQUMvQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDekMsS0FBSSxDQUFDLFFBQVEsQ0FBQztvQkFDSSxZQUFZLEVBQUUsZ0JBQWdCO29CQUM5QixzQkFBc0IsRUFBRSxLQUFJLENBQUMsc0JBQXNCLENBQUMsZ0JBQWdCLENBQUM7aUJBQ3hFLENBQUMsQ0FBQzthQUNwQjtRQUNMLENBQUMsQ0FBQztRQUVGLDRCQUFzQixHQUFHLFVBQUMsS0FBYSxFQUFFLEtBQTZCO1lBQ2xFLElBQUksS0FBSyxHQUFJLEtBQUssQ0FBQyxNQUEyQixDQUFDLEtBQUssQ0FBQztZQUNyRCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2hCLElBQUksY0FBYyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO2dCQUMzQyxjQUFjLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZDLEtBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ0ksVUFBVSxFQUFFLGNBQWM7b0JBQzFCLG9CQUFvQixFQUFFLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxjQUFjLENBQUM7aUJBQ3BFLENBQUMsQ0FBQzthQUNwQjtRQUNMLENBQUMsQ0FBQztRQUVGLG1DQUE2QixHQUFHLFVBQUMsS0FBYSxFQUFFLEtBQTZCO1lBQ3pFLElBQUksS0FBSyxHQUFJLEtBQUssQ0FBQyxNQUEyQixDQUFDLEtBQUssQ0FBQztZQUNyRCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2hCLElBQUksZUFBZSxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7Z0JBQ2xELGVBQWUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDeEMsS0FBSSxDQUFDLFFBQVEsQ0FBQztvQkFDSSxnQkFBZ0IsRUFBRSxlQUFlO29CQUNqQywwQkFBMEIsRUFBRSxLQUFJLENBQUMsc0JBQXNCLENBQUMsZUFBZSxDQUFDO2lCQUMzRSxDQUFDLENBQUM7YUFDcEI7UUFDTCxDQUFDLENBQUM7UUFFRixrQ0FBNEIsR0FBRyxVQUFDLEtBQWEsRUFBRSxLQUE2QjtZQUN4RSxJQUFJLEtBQUssR0FBSSxLQUFLLENBQUMsTUFBMkIsQ0FBQyxLQUFLLENBQUM7WUFDckQsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNoQixJQUFJLFdBQVcsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQztnQkFDN0MsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNwQyxLQUFJLENBQUMsUUFBUSxDQUFDO29CQUNJLGVBQWUsRUFBRSxXQUFXO29CQUM1Qix5QkFBeUIsRUFBRSxLQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxDQUFDO2lCQUN0RSxDQUFDLENBQUM7YUFDcEI7UUFDTCxDQUFDLENBQUM7UUF0VkUsS0FBSSxDQUFDLEtBQUssR0FBRztZQUNULGdCQUFnQixFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztZQUN0QyxhQUFhLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQ25DLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDL0IsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztZQUN0QixVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQ3BCLGdCQUFnQixFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztZQUMxQixlQUFlLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBRXpCLDBCQUEwQixFQUFFLEtBQUs7WUFDakMsdUJBQXVCLEVBQUUsS0FBSztZQUM5QixtQkFBbUIsRUFBRSxLQUFLO1lBQzFCLHNCQUFzQixFQUFFLEtBQUs7WUFDN0Isb0JBQW9CLEVBQUUsS0FBSztZQUMzQiwwQkFBMEIsRUFBRSxLQUFLO1lBQ2pDLHlCQUF5QixFQUFFLEtBQUs7WUFDaEMsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO1lBRW5ELE9BQU8sRUFBRSxFQUFDLFlBQVksRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFDO1lBQ3pELFFBQVEsRUFBRSxFQUFFO1NBQ2YsQ0FBQzs7SUFDTixDQUFDO0lBRUQsdUJBQU0sR0FBTjtRQUFBLGlCQWdLQztRQS9KRyxJQUFJLG9CQUFvQixHQUNwQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsMEJBQTBCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyx1QkFBdUI7ZUFDckUsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLHNCQUFzQjtlQUNuRSxJQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsMEJBQTBCO2VBQ3hFLElBQUksQ0FBQyxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUVqRCxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFbEYsSUFBSSxzQkFBc0IsR0FBa0IsRUFBRSxDQUFDO1FBQy9DLElBQUksbUJBQW1CLEdBQWtCLEVBQUUsQ0FBQztRQUM1QyxJQUFJLHNCQUFzQixHQUFrQixFQUFFLENBQUM7Z0NBQ3RDLENBQUM7WUFDTixzQkFBc0IsQ0FBQyxJQUFJLENBQ3ZCLG9CQUFDLFdBQVcsSUFBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLGtCQUFrQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFDcEUsZUFBZSxFQUFFLE9BQUssNkJBQTZCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFDbkUsS0FBSyxFQUFFLE9BQUssS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzRCxtQkFBbUIsQ0FBQyxJQUFJLENBQ3BCLG9CQUFDLFdBQVcsSUFBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLGtCQUFrQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUNwRixlQUFlLEVBQUUsT0FBSywwQkFBMEIsRUFBRSxLQUFLLEVBQUUsT0FBSyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxRyxzQkFBc0IsQ0FBQyxJQUFJLENBQ3ZCLG9CQUFDLGNBQU8sSUFBQyxPQUFPLEVBQUUsd0ZBQTZELEVBQ3RFLFNBQVMsRUFBQyxzQkFBc0IsRUFBQyxNQUFNLEVBQUUsQ0FBQyxPQUFLLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hGLG9CQUFDLGNBQWMsSUFBQyxRQUFRLEVBQUUsVUFBQyxLQUFLLElBQUssT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFqQyxDQUFpQyxFQUN0RCxVQUFVLEVBQUU7d0JBQ1IsU0FBUyxFQUFFLDJCQUEyQjt3QkFDdEMsV0FBVyxFQUFFLEdBQUcsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsdUJBQXVCO3FCQUNoRSxFQUNELEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE9BQUssS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUMsWUFBWSxFQUFDLFVBQVUsRUFBQyxPQUFPLEdBQUUsQ0FDOUYsQ0FDYixDQUFDO1FBQ04sQ0FBQzs7UUFuQkQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGdCQUFnQixFQUFFLENBQUMsRUFBRTtvQkFBaEMsQ0FBQztTQW1CVDtRQUVELElBQUksa0JBQWtCLEdBQWtCLEVBQUUsQ0FBQztRQUMzQyxJQUFJLGVBQWUsR0FBa0IsRUFBRSxDQUFDO1FBQ3hDLElBQUksc0JBQXNCLEdBQWtCLEVBQUUsQ0FBQztRQUMvQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN0QyxrQkFBa0IsQ0FBQyxJQUFJLENBQ25CLG9CQUFDLFdBQVcsSUFBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLGtCQUFrQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUMxRSxlQUFlLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEcsZUFBZSxDQUFDLElBQUksQ0FDaEIsb0JBQUMsV0FBVyxJQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcseUJBQXlCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQ3JGLGVBQWUsRUFBRSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuRyxzQkFBc0IsQ0FBQyxJQUFJLENBQ3ZCLG9CQUFDLFdBQVcsSUFBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLHdCQUF3QixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFDckUsZUFBZSxFQUFFLElBQUksQ0FBQyw2QkFBNkIsRUFDbkQsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDM0U7UUFFRCxJQUFJLGVBQWUsR0FBZ0IsZ0NBQU0sQ0FBQztRQUMxQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzVDLElBQUksb0JBQW9CLEdBQWtCLEVBQUUsQ0FBQztZQUM3QyxJQUFJLGVBQWUsR0FBa0IsRUFBRSxDQUFDO1lBQ3hDLElBQUksbUJBQW1CLEdBQWtCLEVBQUUsQ0FBQztZQUM1QyxLQUFtQixVQUErQixFQUEvQixLQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBL0IsY0FBK0IsRUFBL0IsSUFBK0IsRUFBRTtnQkFBL0MsSUFBSSxNQUFNLFNBQUE7Z0JBQ1gsb0JBQW9CLENBQUMsSUFBSSxDQUNyQiw2QkFBSyxTQUFTLEVBQUMsYUFBYTtvQkFDeEIsMkJBQUcsU0FBUyxFQUFDLGNBQWMsSUFBRSxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBSztvQkFDcEQsMkJBQUcsU0FBUyxFQUFDLGNBQWMsSUFBRSxNQUFNLENBQUMsS0FBSyxDQUFLLENBQzVDLENBQUMsQ0FBQzthQUNmO1lBQ0QsS0FBbUIsVUFBMEIsRUFBMUIsS0FBQSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQTFCLGNBQTBCLEVBQTFCLElBQTBCLEVBQUU7Z0JBQTFDLElBQUksTUFBTSxTQUFBO2dCQUNYLGVBQWUsQ0FBQyxJQUFJLENBQ2hCLDZCQUFLLFNBQVMsRUFBQyxhQUFhO29CQUN4QiwyQkFBRyxTQUFTLEVBQUMsY0FBYyxJQUFFLE1BQU0sQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFLO29CQUNwRCwyQkFBRyxTQUFTLEVBQUMsY0FBYyxJQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUssQ0FDNUMsQ0FBQyxDQUFDO2FBQ2Y7WUFDRCxLQUFtQixVQUE4QixFQUE5QixLQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBOUIsY0FBOEIsRUFBOUIsSUFBOEIsRUFBRTtnQkFBOUMsSUFBSSxNQUFNLFNBQUE7Z0JBQ1gsbUJBQW1CLENBQUMsSUFBSSxDQUNwQiw2QkFBSyxTQUFTLEVBQUMsYUFBYTtvQkFDeEIsMkJBQUcsU0FBUyxFQUFDLGNBQWMsSUFBRSxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBSztvQkFDcEQsMkJBQUcsU0FBUyxFQUFDLGNBQWMsSUFBRSxNQUFNLENBQUMsS0FBSyxDQUFLLENBQzVDLENBQUMsQ0FBQzthQUNmO1lBQ0QsZUFBZSxHQUFHLENBQ2QsNkJBQUssU0FBUyxFQUFDLGlCQUFpQjtnQkFDNUIsb0JBQUMsVUFBSSxJQUFDLFNBQVMsRUFBQyxjQUFjO29CQUMxQiw2QkFBSyxTQUFTLEVBQUMsaUJBQWlCO3dCQUM1Qiw2QkFBSyxTQUFTLEVBQUMsZ0JBQWdCOzRCQUMzQiw0QkFBSSxTQUFTLEVBQUMsb0JBQW9CLG1CQUFrQjs0QkFDbkQsb0JBQW9CLENBQ25CO3dCQUNOLDZCQUFLLFNBQVMsRUFBQyxnQkFBZ0I7NEJBQzNCLDRCQUFJLFNBQVMsRUFBQyxvQkFBb0Isb0NBQW1DOzRCQUNwRSxlQUFlLENBQ2Q7d0JBQ04sNkJBQUssU0FBUyxFQUFDLGdCQUFnQjs0QkFDM0IsNEJBQUksU0FBUyxFQUFDLHFCQUFxQixrQkFBaUI7NEJBQ25ELG1CQUFtQixDQUNsQixDQUNKLENBQ0gsQ0FDTCxDQUNULENBQUE7U0FDSjtRQUVELE9BQU8sQ0FDSCxvQkFBQyxZQUFNLElBQUMsU0FBUyxFQUFDLFNBQVM7WUFDdkIsb0JBQUMsaUJBQVcsSUFBQyxLQUFLLEVBQUUsZ0JBQVMsQ0FBQyxJQUFJO2dCQUM5QixvQkFBQyxZQUFNLENBQUMsT0FBTyxJQUFDLFNBQVMsRUFBQyxXQUFXLDJCQUFzQyxDQUNqRTtZQUNkLG9CQUFDLGlCQUFXLElBQUMsS0FBSyxFQUFFLGdCQUFTLENBQUMsS0FBSztnQkFDL0Isb0JBQUMsbUJBQWEsSUFBQyxTQUFTLEVBQUMsU0FBUyw2QkFBdUM7Z0JBQ3pFLDZCQUFLLEdBQUcsRUFBQyxzQkFBc0IsRUFBQyxHQUFHLEVBQUMscURBQXFELEVBQ3BGLEtBQUssRUFBRSxFQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUMsR0FBRztnQkFDN0Isb0JBQUMsbUJBQWEsT0FBRTtnQkFDaEIsMkJBQUcsSUFBSSxFQUFDLDhDQUE4QyxFQUFDLE1BQU0sRUFBQyxRQUFRLG1DQUN4RCxDQUNKO1lBQ2Qsb0JBQUMsZ0JBQVMsSUFBQyxTQUFTLEVBQUMsU0FBUztnQkFDMUIsNkJBQUssU0FBUyxFQUFDLFNBQVM7b0JBQ3BCLDZCQUFLLFNBQVMsRUFBQyxhQUFhO3dCQUN4Qiw2REFBbUM7d0JBQ2xDLHNCQUFzQixDQUNyQjtvQkFDTiw2QkFBSyxTQUFTLEVBQUMsY0FBYzt3QkFDekIseURBQStCO3dCQUM5QixzQkFBc0IsQ0FDckI7b0JBQ04sNkJBQUssU0FBUyxFQUFDLGNBQWM7d0JBQ3pCLHlEQUErQjt3QkFDOUIsbUJBQW1CLENBQ2xCLENBQ0o7Z0JBQ04sNkJBQUssU0FBUyxFQUFDLHFCQUFxQjtvQkFDaEMsNkJBQUssU0FBUyxFQUFDLG1CQUFtQjt3QkFDOUIsK0NBQXFCO3dCQUNwQixrQkFBa0IsQ0FDakI7b0JBQ04sNkJBQUssU0FBUyxFQUFDLG1CQUFtQjt3QkFDOUIsbURBQXlCO3dCQUN4QixzQkFBc0IsQ0FDckI7b0JBQ04sNkJBQUssU0FBUyxFQUFDLG1CQUFtQjt3QkFDOUIsaURBQXVCO3dCQUN0QixlQUFlLENBQ2QsQ0FDSjtnQkFDTiw2QkFBSyxTQUFTLEVBQUMscUJBQXFCO29CQUNoQyw2QkFBSyxTQUFTLEVBQUMsbUJBQW1CO3dCQUM5QixpREFBdUI7d0JBQ3ZCLG9CQUFDLFdBQVcsSUFBQyxXQUFXLEVBQUUsNkJBQTZCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFDcEQsZUFBZSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUM5RCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEdBQUc7d0JBQ3BELG9CQUFDLFdBQVcsSUFBQyxXQUFXLEVBQUUsMkJBQTJCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFDbEQsZUFBZSxFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUM5RCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FDbEQsQ0FDSjtnQkFDTiw2QkFBSyxTQUFTLEVBQUMsY0FBYztvQkFDekIsb0JBQUMsaUJBQVUsSUFBQyxXQUFXLEVBQUMsaUNBQWlDLEVBQUMsU0FBUyxFQUFDLGdCQUFnQixFQUN4RSxRQUFRLEVBQUUsVUFBQyxLQUE2Qjs0QkFDcEMsT0FBQSxLQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsUUFBUSxFQUFHLEtBQUssQ0FBQyxNQUEyQixDQUFDLEtBQUssRUFBQyxDQUFDO3dCQUFuRSxDQUFtRSxHQUFHO29CQUN0RixvQkFBQyxhQUFNLElBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLENBQUMsb0JBQW9CLGFBQWlCLENBQ25GO2dCQUNMLGVBQWUsQ0FDUixDQUNQLENBQ1osQ0FBQztJQUNOLENBQUM7SUFpS0wsYUFBQztBQUFELENBM1ZBLEFBMlZDLENBM1YyQixLQUFLLENBQUMsU0FBUyxHQTJWMUM7QUEzVlksd0JBQU07QUFxV25CO0lBQWlDLCtCQUFpQztJQUFsRTs7SUFxQkEsQ0FBQztJQW5CRyw0QkFBTSxHQUFOO1FBQUEsaUJBa0JDO1FBakJHLElBQUksSUFBSSxHQUFhLG9CQUFvQixDQUFDO1FBQzFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssRUFBRSxFQUFFO1lBQ3pCLElBQUksR0FBRyxvQkFBb0IsQ0FBQztTQUMvQjthQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2xDLElBQUksR0FBRyxNQUFNLENBQUM7U0FDakI7YUFBTTtZQUNILElBQUksR0FBRyxZQUFZLENBQUM7U0FDdkI7UUFFRCxPQUFPLENBQ0gsb0JBQUMsbUJBQVksSUFBQyxJQUFJLEVBQUUsSUFBSTtZQUNwQixvQkFBQyxpQkFBVSxJQUNQLFFBQVEsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsb0JBQUMsVUFBRyxRQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFPLEVBQ2xGLFFBQVEsRUFBRSxVQUFDLEtBQTZCLElBQUssT0FBQSxLQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBbkQsQ0FBbUQsRUFDaEcsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUN4RCxDQUNsQixDQUFDO0lBQ04sQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FyQkEsQUFxQkMsQ0FyQmdDLEtBQUssQ0FBQyxTQUFTLEdBcUIvQztBQXJCWSxrQ0FBVyIsImZpbGUiOiJETFdBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7XG4gICAgQnV0dG9uR3JvdXAsIFBvcG92ZXIsXG4gICAgRm9ybUdyb3VwLFxuICAgIE51bWVyaWNJbnB1dCxcbiAgICBCdXR0b24sXG4gICAgSW50ZW50LFxuICAgIEljb25OYW1lLFxuICAgIENvbnRyb2xHcm91cCxcbiAgICBJbnB1dEdyb3VwLCBBbGlnbm1lbnQsIFRhZ1xufSBmcm9tIFwiQGJsdWVwcmludGpzL2NvcmVcIjtcbmltcG9ydCAqIGFzIERhdGVUaW1lUGlja2VyIGZyb20gJ3JlYWN0LWRhdGV0aW1lJztcbmltcG9ydCB7TW9tZW50fSBmcm9tIFwibW9tZW50XCI7XG5pbXBvcnQge2NhbGN1bGF0ZV9mcm9tX2lucHV0c30gZnJvbSBcIi4vUmVxdWVzdHNcIjtcbmltcG9ydCB7Rm9ybUV2ZW50fSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7Q2FyZCwgSWNvbiwgTmF2YmFyLCBOYXZiYXJEaXZpZGVyLCBOYXZiYXJHcm91cCwgTmF2YmFySGVhZGluZ30gZnJvbSBcIkBibHVlcHJpbnRqcy9jb3JlL2xpYi9janNcIjtcblxuY29uc3QgREVVVEVSSVVNID0gXCJEZXV0ZXJpdW1cIjtcbmNvbnN0IE9YWUdFTiA9IFwiT3h5Z2VuIDE4XCI7XG5jb25zdCBFTEVNRU5UUyA9IFtERVVURVJJVU0sIE9YWUdFTl07XG5cbmNvbnN0IE5VTV9TQU1QTEVfVElNRVMgPSA1O1xuY29uc3QgU0FNUExFX0xBQkVMUyA9IFsnQmFja2dyb3VuZCcsICdQRDQnLCAnUEQ1JywgJ0VENCcsICdFRDUnXTtcblxuaW50ZXJmYWNlIFJlc3VsdFBhaXIge1xuICAgIGxhYmVsOiBzdHJpbmcsXG4gICAgdmFsdWU6IHN0cmluZyB8IHt9XG59XG5cbmludGVyZmFjZSBSZXN1bHRUeXBlcyB7XG4gICAgY2FsY3VsYXRpb25zOiBSZXN1bHRQYWlyW10sXG4gICAgcmNvMl9lZTogUmVzdWx0UGFpcltdLFxuICAgIGVycm9yX2ZsYWdzOiBSZXN1bHRQYWlyW11cbn1cblxuXG5pbnRlcmZhY2UgRExXU3RhdGUge1xuICAgIGRldXRlcml1bV9kZWx0YXM6IHN0cmluZ1tdLFxuICAgIG94eWdlbl9kZWx0YXM6IHN0cmluZ1tdLFxuICAgIGRhdGV0aW1lczogKHN0cmluZyB8IE1vbWVudClbXSxcbiAgICBkb3NlX3dlaWdodHM6IHN0cmluZ1tdLFxuICAgIG1vbF9tYXNzZXM6IHN0cmluZ1tdLFxuICAgIGRvc2VfZW5yaWNobWVudHM6IHN0cmluZ1tdLFxuICAgIHN1YmplY3Rfd2VpZ2h0czogc3RyaW5nW10sXG5cbiAgICBkZXV0ZXJpdW1fZGVsdGFzX3ZhbGlkYXRlZDogYm9vbGVhbixcbiAgICBveHlnZW5fZGVsdGFzX3ZhbGlkYXRlZDogYm9vbGVhbixcbiAgICBkYXRldGltZXNfdmFsaWRhdGVkOiBib29sZWFuLFxuICAgIGRvc2Vfd2VpZ2h0c192YWxpZGF0ZWQ6IGJvb2xlYW4sXG4gICAgbW9sX21hc3Nlc192YWxpZGF0ZWQ6IGJvb2xlYW4sXG4gICAgZG9zZV9lbnJpY2htZW50c192YWxpZGF0ZWQ6IGJvb2xlYW4sXG4gICAgc3ViamVjdF93ZWlnaHRzX3ZhbGlkYXRlZDogYm9vbGVhbixcbiAgICBkYXRlc19jaHJvbm9sb2dpY2FsOiBib29sZWFuW11cblxuICAgIHJlc3VsdHM6IFJlc3VsdFR5cGVzXG4gICAgY3N2X25hbWU6IHN0cmluZyxcbn1cblxuZXhwb3J0IGNsYXNzIERMV0FwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxhbnksIERMV1N0YXRlPiB7XG4gICAgY29uc3RydWN0b3IocHJvcHM6IGFueSkge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBkZXV0ZXJpdW1fZGVsdGFzOiBbXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIl0sXG4gICAgICAgICAgICBveHlnZW5fZGVsdGFzOiBbXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIl0sXG4gICAgICAgICAgICBkYXRldGltZXM6IFtcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiXSxcbiAgICAgICAgICAgIGRvc2Vfd2VpZ2h0czogW1wiXCIsIFwiXCJdLFxuICAgICAgICAgICAgbW9sX21hc3NlczogW1wiXCIsIFwiXCJdLFxuICAgICAgICAgICAgZG9zZV9lbnJpY2htZW50czogW1wiXCIsIFwiXCJdLFxuICAgICAgICAgICAgc3ViamVjdF93ZWlnaHRzOiBbXCJcIiwgXCJcIl0sXG5cbiAgICAgICAgICAgIGRldXRlcml1bV9kZWx0YXNfdmFsaWRhdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIG94eWdlbl9kZWx0YXNfdmFsaWRhdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGRhdGV0aW1lc192YWxpZGF0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgZG9zZV93ZWlnaHRzX3ZhbGlkYXRlZDogZmFsc2UsXG4gICAgICAgICAgICBtb2xfbWFzc2VzX3ZhbGlkYXRlZDogZmFsc2UsXG4gICAgICAgICAgICBkb3NlX2VucmljaG1lbnRzX3ZhbGlkYXRlZDogZmFsc2UsXG4gICAgICAgICAgICBzdWJqZWN0X3dlaWdodHNfdmFsaWRhdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGRhdGVzX2Nocm9ub2xvZ2ljYWw6IFt0cnVlLCB0cnVlLCB0cnVlLCB0cnVlLCB0cnVlXSxcblxuICAgICAgICAgICAgcmVzdWx0czoge2NhbGN1bGF0aW9uczogW10sIHJjbzJfZWU6IFtdLCBlcnJvcl9mbGFnczogW119LFxuICAgICAgICAgICAgY3N2X25hbWU6IFwiXCIsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgYWxsX2lucHV0c192YWxpZGF0ZWQgPVxuICAgICAgICAgICAgKHRoaXMuc3RhdGUuZGV1dGVyaXVtX2RlbHRhc192YWxpZGF0ZWQgJiYgdGhpcy5zdGF0ZS5veHlnZW5fZGVsdGFzX3ZhbGlkYXRlZFxuICAgICAgICAgICAgICAgICYmIHRoaXMuc3RhdGUuZGF0ZXRpbWVzX3ZhbGlkYXRlZCAmJiB0aGlzLnN0YXRlLmRvc2Vfd2VpZ2h0c192YWxpZGF0ZWRcbiAgICAgICAgICAgICAgICAmJiB0aGlzLnN0YXRlLm1vbF9tYXNzZXNfdmFsaWRhdGVkICYmIHRoaXMuc3RhdGUuZG9zZV9lbnJpY2htZW50c192YWxpZGF0ZWRcbiAgICAgICAgICAgICAgICAmJiB0aGlzLnN0YXRlLnN1YmplY3Rfd2VpZ2h0c192YWxpZGF0ZWQpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdhbGwgaW5wdXRzIHZhbGlkYXRlZD8nLCBhbGxfaW5wdXRzX3ZhbGlkYXRlZCwgJyBzdGF0ZSAnLCB0aGlzLnN0YXRlKTtcblxuICAgICAgICBsZXQgZGV1dGVyaXVtX2RlbHRhX2lucHV0czogSlNYLkVsZW1lbnRbXSA9IFtdO1xuICAgICAgICBsZXQgb3h5Z2VuX2RlbHRhX2lucHV0czogSlNYLkVsZW1lbnRbXSA9IFtdO1xuICAgICAgICBsZXQgY29sbGVjdGlvbl90aW1lX2lucHV0czogSlNYLkVsZW1lbnRbXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE5VTV9TQU1QTEVfVElNRVM7IGkrKykge1xuICAgICAgICAgICAgZGV1dGVyaXVtX2RlbHRhX2lucHV0cy5wdXNoKFxuICAgICAgICAgICAgICAgIDxOdW1iZXJJbnB1dCBwbGFjZWhvbGRlcj17U0FNUExFX0xBQkVMU1tpXSArIFwiIERldXRlcml1bSBkZWx0YVwifSBpbmRleD17aX0ga2V5PXtpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VfZnVuY3Rpb249e3RoaXMuaGFuZGxlX2RldXRlcml1bV9kZWx0YV9jaGFuZ2V9IHVuaXQ9e1wicGVybWlsXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmRldXRlcml1bV9kZWx0YXNbaV19Lz4pO1xuICAgICAgICAgICAgb3h5Z2VuX2RlbHRhX2lucHV0cy5wdXNoKFxuICAgICAgICAgICAgICAgIDxOdW1iZXJJbnB1dCBwbGFjZWhvbGRlcj17U0FNUExFX0xBQkVMU1tpXSArICcgT3h5Z2VuIDE4IGRlbHRhJ30gaW5kZXg9e2l9IGtleT17aX0gdW5pdD17XCJwZXJtaWxcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlX2Z1bmN0aW9uPXt0aGlzLmhhbmRsZV9veHlnZW5fZGVsdGFfY2hhbmdlfSB2YWx1ZT17dGhpcy5zdGF0ZS5veHlnZW5fZGVsdGFzW2ldfS8+KTtcbiAgICAgICAgICAgIGNvbGxlY3Rpb25fdGltZV9pbnB1dHMucHVzaChcbiAgICAgICAgICAgICAgICA8UG9wb3ZlciBjb250ZW50PXs8cD5Db2xsZWN0aW9uIHRpbWUgaW5wdXRzIG11c3QgYmUgaW4gY2hyb25vbG9naWNhbCBvcmRlci48L3A+fVxuICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nZGF0ZS13YXJuaW5nLXBvcG92ZXInIGlzT3Blbj17IXRoaXMuc3RhdGUuZGF0ZXNfY2hyb25vbG9naWNhbFtpXX0+XG4gICAgICAgICAgICAgICAgICAgIDxEYXRlVGltZVBpY2tlciBvbkNoYW5nZT17KHZhbHVlKSA9PiB0aGlzLmhhbmRsZV9kYXRlX2NoYW5nZShpLCB2YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnZGF0ZS1pbnB1dC1ib3ggLmJwMy1pbnB1dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICcgJyArIFNBTVBMRV9MQUJFTFNbaV0gKyAnIHNhbXBsZSBkYXRlIGFuZCB0aW1lJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aX0gdmFsdWU9e3RoaXMuc3RhdGUuZGF0ZXRpbWVzW2ldfSBkYXRlRm9ybWF0PVwiWVlZWS1NTS1ERFwiIHRpbWVGb3JtYXQ9XCJISDptbVwiLz5cbiAgICAgICAgICAgICAgICA8L1BvcG92ZXI+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRvc2Vfd2VpZ2h0X2lucHV0czogSlNYLkVsZW1lbnRbXSA9IFtdO1xuICAgICAgICBsZXQgbW9sX21hc3NfaW5wdXRzOiBKU1guRWxlbWVudFtdID0gW107XG4gICAgICAgIGxldCBkb3NlX2VucmljaG1lbnRfaW5wdXRzOiBKU1guRWxlbWVudFtdID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgRUxFTUVOVFMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGRvc2Vfd2VpZ2h0X2lucHV0cy5wdXNoKFxuICAgICAgICAgICAgICAgIDxOdW1iZXJJbnB1dCBwbGFjZWhvbGRlcj17RUxFTUVOVFNbaV0gKyAnIGRvc2Ugd2VpZ2h0IChnKSd9IGluZGV4PXtpfSBrZXk9e2l9IHVuaXQ9e1wiZ1wifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VfZnVuY3Rpb249e3RoaXMuaGFuZGxlX2Rvc2Vfd2VpZ2h0X2NoYW5nZX0gdmFsdWU9e3RoaXMuc3RhdGUuZG9zZV93ZWlnaHRzW2ldfS8+KTtcbiAgICAgICAgICAgIG1vbF9tYXNzX2lucHV0cy5wdXNoKFxuICAgICAgICAgICAgICAgIDxOdW1iZXJJbnB1dCBwbGFjZWhvbGRlcj17RUxFTUVOVFNbaV0gKyAnIG1vbGVjdWxhciBtYXNzIChnL21vbCknfSBpbmRleD17aX0ga2V5PXtpfSB1bml0PXtcImcvbW9sXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZV9mdW5jdGlvbj17dGhpcy5oYW5kbGVfbW9sX21hc3NfY2hhbmdlfSB2YWx1ZT17dGhpcy5zdGF0ZS5tb2xfbWFzc2VzW2ldfS8+KTtcbiAgICAgICAgICAgIGRvc2VfZW5yaWNobWVudF9pbnB1dHMucHVzaChcbiAgICAgICAgICAgICAgICA8TnVtYmVySW5wdXQgcGxhY2Vob2xkZXI9e0VMRU1FTlRTW2ldICsgJyBkb3NlIGVucmljaG1lbnQgKHBwbSknfSBpbmRleD17aX0ga2V5PXtpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VfZnVuY3Rpb249e3RoaXMuaGFuZGxlX2Rvc2VfZW5yaWNobWVudF9jaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmRvc2VfZW5yaWNobWVudHNbaV19IHVuaXQ9e1wicHBtXCJ9Lz4pO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlc3VsdHNfZGlzcGxheTogSlNYLkVsZW1lbnQgPSA8ZGl2Lz47XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnJlc3VsdHMuY2FsY3VsYXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCByZXN1bHRzX2NhbGN1bGF0aW9uczogSlNYLkVsZW1lbnRbXSA9IFtdO1xuICAgICAgICAgICAgbGV0IHJlc3VsdHNfcmNvMl9lZTogSlNYLkVsZW1lbnRbXSA9IFtdO1xuICAgICAgICAgICAgbGV0IHJlc3VsdHNfZXJyb3JfZmxhZ3M6IEpTWC5FbGVtZW50W10gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IHJlc3VsdCBvZiB0aGlzLnN0YXRlLnJlc3VsdHMuY2FsY3VsYXRpb25zKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0c19jYWxjdWxhdGlvbnMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jlc3VsdC1wYWlyJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJlc3VsdC1sYWJlbFwiPntyZXN1bHQubGFiZWwgKyBcIjpcIn08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJyZXN1bHQtdmFsdWVcIj57cmVzdWx0LnZhbHVlfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IHJlc3VsdCBvZiB0aGlzLnN0YXRlLnJlc3VsdHMucmNvMl9lZSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHNfcmNvMl9lZS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncmVzdWx0LXBhaXInPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicmVzdWx0LWxhYmVsXCI+e3Jlc3VsdC5sYWJlbCArIFwiOlwifTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJlc3VsdC12YWx1ZVwiPntyZXN1bHQudmFsdWV9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgcmVzdWx0IG9mIHRoaXMuc3RhdGUucmVzdWx0cy5lcnJvcl9mbGFncykge1xuICAgICAgICAgICAgICAgIHJlc3VsdHNfZXJyb3JfZmxhZ3MucHVzaChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jlc3VsdC1wYWlyJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJlc3VsdC1sYWJlbFwiPntyZXN1bHQubGFiZWwgKyBcIjpcIn08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJyZXN1bHQtdmFsdWVcIj57cmVzdWx0LnZhbHVlfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdHNfZGlzcGxheSA9IChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncmVzdWx0cy1kaXNwbGF5Jz5cbiAgICAgICAgICAgICAgICAgICAgPENhcmQgY2xhc3NOYW1lPSdyZXN1bHRzLWNhcmQnPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jlc3VsdC1zZWN0aW9ucyc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jlc3VsdC1zZWN0aW9uJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1IGNsYXNzTmFtZT0ncmVzdWx0LWhlYWRlci1jYWxjJz5DYWxjdWxhdGlvbnM8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cmVzdWx0c19jYWxjdWxhdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jlc3VsdC1zZWN0aW9uJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1IGNsYXNzTmFtZT0ncmVzdWx0LWhlYWRlci1jYWxjJz5yQ08yIGFuZCBFRSwgaW50ZXJjZXB0IG1ldGhvZDwvaDU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyZXN1bHRzX3JjbzJfZWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jlc3VsdC1zZWN0aW9uJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1IGNsYXNzTmFtZT0ncmVzdWx0LWhlYWRlci1lcnJvcic+RXJyb3IgRmxhZ3M8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cmVzdWx0c19lcnJvcl9mbGFnc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L0NhcmQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPE5hdmJhciBjbGFzc05hbWU9J2Rsdy1uYXYnPlxuICAgICAgICAgICAgICAgIDxOYXZiYXJHcm91cCBhbGlnbj17QWxpZ25tZW50LkxFRlR9PlxuICAgICAgICAgICAgICAgICAgICA8TmF2YmFyLkhlYWRpbmcgY2xhc3NOYW1lPSdkbHctdGl0bGUnPkRvdWJseSBMYWJlbGVkIFdhdGVyPC9OYXZiYXIuSGVhZGluZz5cbiAgICAgICAgICAgICAgICA8L05hdmJhckdyb3VwPlxuICAgICAgICAgICAgICAgIDxOYXZiYXJHcm91cCBhbGlnbj17QWxpZ25tZW50LlJJR0hUfT5cbiAgICAgICAgICAgICAgICAgICAgPE5hdmJhckhlYWRpbmcgY2xhc3NOYW1lPSd0YWdsaW5lJz5hbiBvcGVuIHNvdXJjZSBwcm9qZWN0PC9OYXZiYXJIZWFkaW5nPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cImFzc2V0cy9sb2dvX2N1aHMucG5nXCIgYWx0PVwiVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBBbnNjaHV0eiBNZWRpY2FsIENhbXB1cyBsb2dvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eydoZWlnaHQnOiAzMH19Lz5cbiAgICAgICAgICAgICAgICAgICAgPE5hdmJhckRpdmlkZXIvPlxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2pjaG15ei9Eb3VibHlMYWJlbGVkV2F0ZXJcIiB0YXJnZXQ9XCJfYmxhbmtcIj5Eb3VibHlMYWJlbGVkV2F0ZXIgb25cbiAgICAgICAgICAgICAgICAgICAgICAgIEdpdEh1YjwvYT5cbiAgICAgICAgICAgICAgICA8L05hdmJhckdyb3VwPlxuICAgICAgICAgICAgICAgIDxGb3JtR3JvdXAgY2xhc3NOYW1lPSdkbHctYXBwJz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3NhbXBsZXMnPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2RhdGUtaW5wdXRzJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDU+Q29sbGVjdGlvbiBEYXRlcyBhbmQgVGltZXM8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjb2xsZWN0aW9uX3RpbWVfaW5wdXRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZGVsdGEtaW5wdXRzJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDU+RGV1dGVyaXVtIERlbHRhIFZhbHVlczwvaDU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2RldXRlcml1bV9kZWx0YV9pbnB1dHN9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdkZWx0YS1pbnB1dHMnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNT5PeHlnZW4gMTggRGVsdGEgVmFsdWVzPC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7b3h5Z2VuX2RlbHRhX2lucHV0c31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2VsZW1lbnQtd2lzZS1pbnB1dHMnPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0cy1ieS1lbGVtZW50Jz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDU+RG9zZSBXZWlnaHRzPC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZG9zZV93ZWlnaHRfaW5wdXRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXRzLWJ5LWVsZW1lbnQnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNT5Eb3NlIEVucmljaG1lbnRzPC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZG9zZV9lbnJpY2htZW50X2lucHV0c31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0cy1ieS1lbGVtZW50Jz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDU+TW9sZWN1bGFyIE1hc3M8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHttb2xfbWFzc19pbnB1dHN9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdlbGVtZW50LXdpc2UtaW5wdXRzJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dHMtYnktZWxlbWVudCc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1PlN1YmplY3QgV2VpZ2h0PC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TnVtYmVySW5wdXQgcGxhY2Vob2xkZXI9e1wiSW5pdGlhbCBzdWJqZWN0IHdlaWdodCAoa2cpXCJ9IGluZGV4PXswfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VfZnVuY3Rpb249e3RoaXMuaGFuZGxlX3N1YmplY3Rfd2VpZ2h0X2NoYW5nZX0gdW5pdD17J2tnJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuc3ViamVjdF93ZWlnaHRzWzBdfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE51bWJlcklucHV0IHBsYWNlaG9sZGVyPXtcIkZpbmFsIHN1YmplY3Qgd2VpZ2h0IChrZylcIn0gaW5kZXg9ezF9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZV9mdW5jdGlvbj17dGhpcy5oYW5kbGVfc3ViamVjdF93ZWlnaHRfY2hhbmdlfSB1bml0PXsna2cnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5zdWJqZWN0X3dlaWdodHNbMV19Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3N1Ym1pdC1ncm91cCc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRHcm91cCBwbGFjZWhvbGRlcj0nUmVzdWx0cyBDU1YgZmlsZW5hbWUgKG9wdGlvbmFsKScgY2xhc3NOYW1lPSdjc3YtbmFtZS1pbnB1dCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQ6IEZvcm1FdmVudDxIVE1MRWxlbWVudD4pID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y3N2X25hbWU6IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWV9KX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLnN1Ym1pdF9pbnB1dHN9IGRpc2FibGVkPXshYWxsX2lucHV0c192YWxpZGF0ZWR9PlNVQk1JVDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAge3Jlc3VsdHNfZGlzcGxheX1cbiAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgICAgIDwvTmF2YmFyPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHN1Ym1pdF9pbnB1dHMgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGxldCBkYXRldGltZXMgPSB0aGlzLnN0YXRlLmRhdGV0aW1lcy5tYXAoKHZhbHVlOiBNb21lbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS50b0FycmF5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgcmVzdWx0cyA9IGF3YWl0IGNhbGN1bGF0ZV9mcm9tX2lucHV0cyhcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkX2RlbHRhczogdGhpcy5zdGF0ZS5kZXV0ZXJpdW1fZGVsdGFzLFxuICAgICAgICAgICAgICAgIG9fZGVsdGFzOiB0aGlzLnN0YXRlLm94eWdlbl9kZWx0YXMsXG4gICAgICAgICAgICAgICAgZGF0ZXRpbWVzOiBkYXRldGltZXMsXG4gICAgICAgICAgICAgICAgZG9zZV93ZWlnaHRzOiB0aGlzLnN0YXRlLmRvc2Vfd2VpZ2h0cyxcbiAgICAgICAgICAgICAgICBkb3NlX2VucmljaG1lbnRzOiB0aGlzLnN0YXRlLmRvc2VfZW5yaWNobWVudHMsXG4gICAgICAgICAgICAgICAgbW9sX21hc3NlczogdGhpcy5zdGF0ZS5tb2xfbWFzc2VzLFxuICAgICAgICAgICAgICAgIHN1YmplY3Rfd2VpZ2h0czogdGhpcy5zdGF0ZS5zdWJqZWN0X3dlaWdodHMsXG4gICAgICAgICAgICAgICAgY3N2X25hbWU6IHRoaXMuc3RhdGUuY3N2X25hbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2dvdCByZXN1bHRzJywgcmVzdWx0cyk7XG4gICAgICAgIGxldCByZXN1bHRfY2FsY3VsYXRpb25zX2FycmF5ID0gcmVzdWx0cy5jYWxjdWxhdGlvbnM7XG4gICAgICAgIGxldCByZXN1bHRfZXJyX2ZsYWdzX2FycmF5ID0gcmVzdWx0cy5lcnJvcl9mbGFncztcbiAgICAgICAgbGV0IHJlc3VsdF9yY28yX2VlX2FycmF5ID0gcmVzdWx0cy5yY28yX2VlO1xuXG4gICAgICAgIGxldCByZXN1bHRfZW50cmllc19jYWxjdWxhdGlvbnMgPSBPYmplY3QuZW50cmllcyhyZXN1bHRfY2FsY3VsYXRpb25zX2FycmF5KTtcbiAgICAgICAgbGV0IHJlc3VsdF9lbnRyaWVzX2Vycl9mbGFncyA9IE9iamVjdC5lbnRyaWVzKHJlc3VsdF9lcnJfZmxhZ3NfYXJyYXkpO1xuICAgICAgICBsZXQgcmVzdWx0X2VudHJpZXNfcmNvMl9lZSA9IE9iamVjdC5lbnRyaWVzKHJlc3VsdF9yY28yX2VlX2FycmF5KTtcblxuICAgICAgICBsZXQgcmVzdWx0X2NhbGN1YXRpb25fc3RyaW5ncyA9IFtdO1xuICAgICAgICBsZXQgcmVzdWx0X2Vycl9mbGFnc19zdHJpbmdzID0gW107XG4gICAgICAgIGxldCByZXN1bHRfcmNvMl9lZV9zdHJpbmdzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgW25hbWUsIHZhbHVlXSBvZiByZXN1bHRfZW50cmllc19jYWxjdWxhdGlvbnMpIHtcbiAgICAgICAgICAgIHJlc3VsdF9jYWxjdWF0aW9uX3N0cmluZ3MucHVzaCh7bGFiZWw6IG5hbWUsIHZhbHVlOiB2YWx1ZX0pO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IFtuYW1lLCB2YWx1ZV0gb2YgcmVzdWx0X2VudHJpZXNfZXJyX2ZsYWdzKSB7XG4gICAgICAgICAgICByZXN1bHRfZXJyX2ZsYWdzX3N0cmluZ3MucHVzaCh7bGFiZWw6IG5hbWUsIHZhbHVlOiB2YWx1ZX0pO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IFtuYW1lLCB2YWx1ZV0gb2YgcmVzdWx0X2VudHJpZXNfcmNvMl9lZSkge1xuICAgICAgICAgICAgcmVzdWx0X3JjbzJfZWVfc3RyaW5ncy5wdXNoKHtsYWJlbDogbmFtZSwgdmFsdWU6IHZhbHVlfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRpb25zOiByZXN1bHRfY2FsY3VhdGlvbl9zdHJpbmdzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmNvMl9lZTogcmVzdWx0X3JjbzJfZWVfc3RyaW5ncyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yX2ZsYWdzOiByZXN1bHRfZXJyX2ZsYWdzX3N0cmluZ3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjaGVja19udW1lcmljYWxfaW5wdXRzID0gKGlucHV0X2FyYXk6IChzdHJpbmcgfCBudW1iZXIpW10pID0+IHtcbiAgICAgICAgZm9yIChsZXQgdmFsdWUgb2YgaW5wdXRfYXJheSkge1xuICAgICAgICAgICAgaWYgKGlzTmFOKCt2YWx1ZSkgfHwgdmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIGhhbmRsZV9kZXV0ZXJpdW1fZGVsdGFfY2hhbmdlID0gKGluZGV4OiBudW1iZXIsIGV2ZW50OiBGb3JtRXZlbnQ8SFRNTEVsZW1lbnQ+KSA9PiB7XG4gICAgICAgIGxldCB2YWx1ZSA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgICAgIGlmICghaXNOYU4oK3ZhbHVlKSkge1xuICAgICAgICAgICAgbGV0IG5ld19kZWx0YXMgPSB0aGlzLnN0YXRlLmRldXRlcml1bV9kZWx0YXM7XG4gICAgICAgICAgICBuZXdfZGVsdGFzLnNwbGljZShpbmRleCwgMSwgdmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXV0ZXJpdW1fZGVsdGFzOiBuZXdfZGVsdGFzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV1dGVyaXVtX2RlbHRhc192YWxpZGF0ZWQ6IHRoaXMuY2hlY2tfbnVtZXJpY2FsX2lucHV0cyhuZXdfZGVsdGFzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBoYW5kbGVfb3h5Z2VuX2RlbHRhX2NoYW5nZSA9IChpbmRleDogbnVtYmVyLCBldmVudDogRm9ybUV2ZW50PEhUTUxFbGVtZW50PikgPT4ge1xuICAgICAgICBsZXQgdmFsdWUgPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuICAgICAgICBpZiAoIWlzTmFOKCt2YWx1ZSkpIHtcbiAgICAgICAgICAgIGxldCBuZXdfZGVsdGFzID0gdGhpcy5zdGF0ZS5veHlnZW5fZGVsdGFzO1xuICAgICAgICAgICAgbmV3X2RlbHRhcy5zcGxpY2UoaW5kZXgsIDEsIHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3h5Z2VuX2RlbHRhczogbmV3X2RlbHRhcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG94eWdlbl9kZWx0YXNfdmFsaWRhdGVkOiB0aGlzLmNoZWNrX251bWVyaWNhbF9pbnB1dHMobmV3X2RlbHRhcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgaGFuZGxlX2RhdGVfY2hhbmdlID0gKGk6IG51bWJlciwgdmFsdWU6IHN0cmluZyB8IE1vbWVudCkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGxldCBhbGxfZGF0ZXNfZmlsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBuZXdfZGF0ZV9hcnJheSA9IHRoaXMuc3RhdGUuZGF0ZXRpbWVzO1xuICAgICAgICAgICAgbGV0IGRhdGVzX2Nocm9ub2xvZ2ljYWwgPSB0aGlzLnN0YXRlLmRhdGVzX2Nocm9ub2xvZ2ljYWw7XG4gICAgICAgICAgICBkYXRlc19jaHJvbm9sb2dpY2FsLnNwbGljZShpLCAxLCB0cnVlKTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgaTsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihuZXdfZGF0ZV9hcnJheVtqXSkgIT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUuaXNCZWZvcmUobmV3X2RhdGVfYXJyYXlbal0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRlc19jaHJvbm9sb2dpY2FsLnNwbGljZShpLCAxLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGxfZGF0ZXNfZmlsbGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld19kYXRlX2FycmF5LnNwbGljZShpLCAxLCB2YWx1ZSk7XG4gICAgICAgICAgICBmb3IgKGxldCBkYXRlIG9mIG5ld19kYXRlX2FycmF5KSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsbF9kYXRlc19maWxsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRldGltZXM6IG5ld19kYXRlX2FycmF5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZXRpbWVzX3ZhbGlkYXRlZDogYWxsX2RhdGVzX2ZpbGxlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVzX2Nocm9ub2xvZ2ljYWw6IGRhdGVzX2Nocm9ub2xvZ2ljYWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBoYW5kbGVfZG9zZV93ZWlnaHRfY2hhbmdlID0gKGluZGV4OiBudW1iZXIsIGV2ZW50OiBGb3JtRXZlbnQ8SFRNTEVsZW1lbnQ+KSA9PiB7XG4gICAgICAgIGxldCB2YWx1ZSA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgICAgIGlmICghaXNOYU4oK3ZhbHVlKSkge1xuICAgICAgICAgICAgbGV0IG5ld19kb3NlX3dlaWdodHMgPSB0aGlzLnN0YXRlLmRvc2Vfd2VpZ2h0cztcbiAgICAgICAgICAgIG5ld19kb3NlX3dlaWdodHMuc3BsaWNlKGluZGV4LCAxLCB2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvc2Vfd2VpZ2h0czogbmV3X2Rvc2Vfd2VpZ2h0cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvc2Vfd2VpZ2h0c192YWxpZGF0ZWQ6IHRoaXMuY2hlY2tfbnVtZXJpY2FsX2lucHV0cyhuZXdfZG9zZV93ZWlnaHRzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBoYW5kbGVfbW9sX21hc3NfY2hhbmdlID0gKGluZGV4OiBudW1iZXIsIGV2ZW50OiBGb3JtRXZlbnQ8SFRNTEVsZW1lbnQ+KSA9PiB7XG4gICAgICAgIGxldCB2YWx1ZSA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgICAgIGlmICghaXNOYU4oK3ZhbHVlKSkge1xuICAgICAgICAgICAgbGV0IG5ld19tb2xfbWFzc2VzID0gdGhpcy5zdGF0ZS5tb2xfbWFzc2VzO1xuICAgICAgICAgICAgbmV3X21vbF9tYXNzZXMuc3BsaWNlKGluZGV4LCAxLCB2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbF9tYXNzZXM6IG5ld19tb2xfbWFzc2VzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9sX21hc3Nlc192YWxpZGF0ZWQ6IHRoaXMuY2hlY2tfbnVtZXJpY2FsX2lucHV0cyhuZXdfbW9sX21hc3NlcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgaGFuZGxlX2Rvc2VfZW5yaWNobWVudF9jaGFuZ2UgPSAoaW5kZXg6IG51bWJlciwgZXZlbnQ6IEZvcm1FdmVudDxIVE1MRWxlbWVudD4pID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICAgICAgaWYgKCFpc05hTigrdmFsdWUpKSB7XG4gICAgICAgICAgICBsZXQgbmV3X2VucmljaG1lbnRzID0gdGhpcy5zdGF0ZS5kb3NlX2VucmljaG1lbnRzO1xuICAgICAgICAgICAgbmV3X2VucmljaG1lbnRzLnNwbGljZShpbmRleCwgMSwgdmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3NlX2VucmljaG1lbnRzOiBuZXdfZW5yaWNobWVudHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3NlX2VucmljaG1lbnRzX3ZhbGlkYXRlZDogdGhpcy5jaGVja19udW1lcmljYWxfaW5wdXRzKG5ld19lbnJpY2htZW50cylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgaGFuZGxlX3N1YmplY3Rfd2VpZ2h0X2NoYW5nZSA9IChpbmRleDogbnVtYmVyLCBldmVudDogRm9ybUV2ZW50PEhUTUxFbGVtZW50PikgPT4ge1xuICAgICAgICBsZXQgdmFsdWUgPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuICAgICAgICBpZiAoIWlzTmFOKCt2YWx1ZSkpIHtcbiAgICAgICAgICAgIGxldCBuZXdfd2VpZ2h0cyA9IHRoaXMuc3RhdGUuc3ViamVjdF93ZWlnaHRzO1xuICAgICAgICAgICAgbmV3X3dlaWdodHMuc3BsaWNlKGluZGV4LCAxLCB2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3Rfd2VpZ2h0czogbmV3X3dlaWdodHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJqZWN0X3dlaWdodHNfdmFsaWRhdGVkOiB0aGlzLmNoZWNrX251bWVyaWNhbF9pbnB1dHMobmV3X3dlaWdodHMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxufVxuXG5pbnRlcmZhY2UgTnVtYmVySW5wdXRQcm9wcyB7XG4gICAgcGxhY2Vob2xkZXI6IHN0cmluZyxcbiAgICBpbmRleDogbnVtYmVyLFxuICAgIGNoYW5nZV9mdW5jdGlvbjogKGluZGV4OiBudW1iZXIsIGV2ZW50OiBGb3JtRXZlbnQ8SFRNTEVsZW1lbnQ+KSA9PiB2b2lkXG4gICAgdmFsdWU6IHN0cmluZyxcbiAgICB1bml0OiBzdHJpbmdcbn1cblxuZXhwb3J0IGNsYXNzIE51bWJlcklucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PE51bWJlcklucHV0UHJvcHM+IHtcblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IGljb246IEljb25OYW1lID0gXCJjaXJjbGUtYXJyb3ctcmlnaHRcIjtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIGljb24gPSBcImNpcmNsZS1hcnJvdy1yaWdodFwiO1xuICAgICAgICB9IGVsc2UgaWYgKCFpc05hTigrdGhpcy5wcm9wcy52YWx1ZSkpIHtcbiAgICAgICAgICAgIGljb24gPSBcInRpY2tcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGljb24gPSBcImJhbi1jaXJjbGVcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q29udHJvbEdyb3VwIGZpbGw9e3RydWV9PlxuICAgICAgICAgICAgICAgIDxJbnB1dEdyb3VwXG4gICAgICAgICAgICAgICAgICAgIGxlZnRJY29uPXtpY29ufSBjbGFzc05hbWU9eycuYnAzLWZpbGwnfSByaWdodEVsZW1lbnQ9ezxUYWc+e3RoaXMucHJvcHMudW5pdH08L1RhZz59XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQ6IEZvcm1FdmVudDxIVE1MRWxlbWVudD4pID0+IHRoaXMucHJvcHMuY2hhbmdlX2Z1bmN0aW9uKHRoaXMucHJvcHMuaW5kZXgsIGV2ZW50KX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3RoaXMucHJvcHMucGxhY2Vob2xkZXJ9IHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfS8+XG4gICAgICAgICAgICA8L0NvbnRyb2xHcm91cD5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=
