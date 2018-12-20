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
            var datetimes, results, result_entries, results_array, _i, result_entries_1, _a, name_1, value;
            return __generator(this, function (_b) {
                switch (_b.label) {
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
                        results = _b.sent();
                        console.log('got results', results);
                        result_entries = Object.entries(results);
                        results_array = [];
                        for (_i = 0, result_entries_1 = result_entries; _i < result_entries_1.length; _i++) {
                            _a = result_entries_1[_i], name_1 = _a[0], value = _a[1];
                            results_array.push(name_1 + ": " + value);
                        }
                        this.setState({ results: results_array });
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
            results: [],
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
        if (this.state.results.length > 0) {
            var results_p = [];
            for (var _i = 0, _a = this.state.results; _i < _a.length; _i++) {
                var result = _a[_i];
                results_p.push(React.createElement("p", null, result));
            }
            results_display = (React.createElement("div", { className: 'results-display' },
                React.createElement(cjs_1.Card, { className: 'results-card' },
                    React.createElement("div", null,
                        React.createElement("h4", null, "Calculations"),
                        results_p))));
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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Q1AsUUFBUSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxvQkFBQyxVQUFHLFFBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQU8sRUFDbEYsUUFBUSxFQUFFLFVBQUMsS0FBNkIsSUFBSyxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFuRCxDQUFtRCxFQUNoRyxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQ3hELENBQ2xCLENBQUM7SUFDTixDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQXJCQSxBQXFCQyxDQXJCZ0MsS0FBSyxDQUFDLFNBQVMsR0FxQi9DO0FBckJZLGtDQUFXIiwiZmlsZSI6IkRMV0FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtcbiAgICBCdXR0b25Hcm91cCxcbiAgICBGb3JtR3JvdXAsXG4gICAgTnVtZXJpY0lucHV0LFxuICAgIEJ1dHRvbixcbiAgICBJbnRlbnQsXG4gICAgSWNvbk5hbWUsXG4gICAgQ29udHJvbEdyb3VwLFxuICAgIElucHV0R3JvdXAsIEFsaWdubWVudCwgVGFnXG59IGZyb20gXCJAYmx1ZXByaW50anMvY29yZVwiO1xuaW1wb3J0ICogYXMgRGF0ZVRpbWVQaWNrZXIgZnJvbSAncmVhY3QtZGF0ZXRpbWUnO1xuaW1wb3J0IHtNb21lbnR9IGZyb20gXCJtb21lbnRcIjtcbmltcG9ydCB7Y2FsY3VsYXRlX2Zyb21faW5wdXRzfSBmcm9tIFwiLi9SZXF1ZXN0c1wiO1xuaW1wb3J0IHtGb3JtRXZlbnR9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtDYXJkLCBJY29uLCBOYXZiYXIsIE5hdmJhckRpdmlkZXIsIE5hdmJhckdyb3VwLCBOYXZiYXJIZWFkaW5nfSBmcm9tIFwiQGJsdWVwcmludGpzL2NvcmUvbGliL2Nqc1wiO1xuXG5jb25zdCBERVVURVJJVU0gPSBcIkRldXRlcml1bVwiO1xuY29uc3QgT1hZR0VOID0gXCJPeHlnZW4gMThcIjtcbmNvbnN0IEVMRU1FTlRTID0gW0RFVVRFUklVTSwgT1hZR0VOXTtcblxuY29uc3QgTlVNX1NBTVBMRV9USU1FUyA9IDU7XG5jb25zdCBTQU1QTEVfTEFCRUxTID0gWydCYWNrZ3JvdW5kJywgJ1BENCcsICdQRDUnLCAnRUQ0JywgJ0VENSddO1xuXG5cbmludGVyZmFjZSBETFdTdGF0ZSB7XG4gICAgZGV1dGVyaXVtX2RlbHRhczogc3RyaW5nW10sXG4gICAgb3h5Z2VuX2RlbHRhczogc3RyaW5nW10sXG4gICAgZGF0ZXRpbWVzOiAoc3RyaW5nIHwgTW9tZW50KVtdLFxuICAgIGRvc2Vfd2VpZ2h0czogc3RyaW5nW10sXG4gICAgbW9sX21hc3Nlczogc3RyaW5nW10sXG4gICAgZG9zZV9lbnJpY2htZW50czogc3RyaW5nW10sXG4gICAgc3ViamVjdF93ZWlnaHRzOiBzdHJpbmdbXSxcblxuICAgIGRldXRlcml1bV9kZWx0YXNfdmFsaWRhdGVkOiBib29sZWFuLFxuICAgIG94eWdlbl9kZWx0YXNfdmFsaWRhdGVkOiBib29sZWFuLFxuICAgIGRhdGV0aW1lc192YWxpZGF0ZWQ6IGJvb2xlYW4sXG4gICAgZG9zZV93ZWlnaHRzX3ZhbGlkYXRlZDogYm9vbGVhbixcbiAgICBtb2xfbWFzc2VzX3ZhbGlkYXRlZDogYm9vbGVhbixcbiAgICBkb3NlX2VucmljaG1lbnRzX3ZhbGlkYXRlZDogYm9vbGVhbixcbiAgICBzdWJqZWN0X3dlaWdodHNfdmFsaWRhdGVkOiBib29sZWFuLFxuXG4gICAgcmVzdWx0czogc3RyaW5nW10sXG4gICAgY3N2X25hbWU6IHN0cmluZyxcbn1cblxuZXhwb3J0IGNsYXNzIERMV0FwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxhbnksIERMV1N0YXRlPiB7XG4gICAgY29uc3RydWN0b3IocHJvcHM6IGFueSkge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBkZXV0ZXJpdW1fZGVsdGFzOiBbXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIl0sXG4gICAgICAgICAgICBveHlnZW5fZGVsdGFzOiBbXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIl0sXG4gICAgICAgICAgICBkYXRldGltZXM6IFtcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiXSxcbiAgICAgICAgICAgIGRvc2Vfd2VpZ2h0czogW1wiXCIsIFwiXCJdLFxuICAgICAgICAgICAgbW9sX21hc3NlczogW1wiXCIsIFwiXCJdLFxuICAgICAgICAgICAgZG9zZV9lbnJpY2htZW50czogW1wiXCIsIFwiXCJdLFxuICAgICAgICAgICAgc3ViamVjdF93ZWlnaHRzOiBbXCJcIiwgXCJcIl0sXG5cbiAgICAgICAgICAgIGRldXRlcml1bV9kZWx0YXNfdmFsaWRhdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIG94eWdlbl9kZWx0YXNfdmFsaWRhdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGRhdGV0aW1lc192YWxpZGF0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgZG9zZV93ZWlnaHRzX3ZhbGlkYXRlZDogZmFsc2UsXG4gICAgICAgICAgICBtb2xfbWFzc2VzX3ZhbGlkYXRlZDogZmFsc2UsXG4gICAgICAgICAgICBkb3NlX2VucmljaG1lbnRzX3ZhbGlkYXRlZDogZmFsc2UsXG4gICAgICAgICAgICBzdWJqZWN0X3dlaWdodHNfdmFsaWRhdGVkOiBmYWxzZSxcblxuICAgICAgICAgICAgcmVzdWx0czogW10sXG4gICAgICAgICAgICBjc3ZfbmFtZTogXCJcIixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBhbGxfaW5wdXRzX3ZhbGlkYXRlZCA9XG4gICAgICAgICAgICAodGhpcy5zdGF0ZS5kZXV0ZXJpdW1fZGVsdGFzX3ZhbGlkYXRlZCAmJiB0aGlzLnN0YXRlLm94eWdlbl9kZWx0YXNfdmFsaWRhdGVkXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5zdGF0ZS5kYXRldGltZXNfdmFsaWRhdGVkICYmIHRoaXMuc3RhdGUuZG9zZV93ZWlnaHRzX3ZhbGlkYXRlZFxuICAgICAgICAgICAgICAgICYmIHRoaXMuc3RhdGUubW9sX21hc3Nlc192YWxpZGF0ZWQgJiYgdGhpcy5zdGF0ZS5kb3NlX2VucmljaG1lbnRzX3ZhbGlkYXRlZFxuICAgICAgICAgICAgICAgICYmIHRoaXMuc3RhdGUuc3ViamVjdF93ZWlnaHRzX3ZhbGlkYXRlZCk7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ2FsbCBpbnB1dHMgdmFsaWRhdGVkPycsIGFsbF9pbnB1dHNfdmFsaWRhdGVkLCAnIHN0YXRlICcsIHRoaXMuc3RhdGUpO1xuXG4gICAgICAgIGxldCBkZXV0ZXJpdW1fZGVsdGFfaW5wdXRzOiBKU1guRWxlbWVudFtdID0gW107XG4gICAgICAgIGxldCBveHlnZW5fZGVsdGFfaW5wdXRzOiBKU1guRWxlbWVudFtdID0gW107XG4gICAgICAgIGxldCBjb2xsZWN0aW9uX3RpbWVfaW5wdXRzOiBKU1guRWxlbWVudFtdID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTlVNX1NBTVBMRV9USU1FUzsgaSsrKSB7XG4gICAgICAgICAgICBkZXV0ZXJpdW1fZGVsdGFfaW5wdXRzLnB1c2goXG4gICAgICAgICAgICAgICAgPE51bWJlcklucHV0IHBsYWNlaG9sZGVyPXtTQU1QTEVfTEFCRUxTW2ldICsgXCIgRGV1dGVyaXVtIGRlbHRhXCJ9IGluZGV4PXtpfSBrZXk9e2l9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZV9mdW5jdGlvbj17dGhpcy5oYW5kbGVfZGV1dGVyaXVtX2RlbHRhX2NoYW5nZX0gdW5pdD17XCJwZXJtaWxcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuZGV1dGVyaXVtX2RlbHRhc1tpXX0vPik7XG4gICAgICAgICAgICBveHlnZW5fZGVsdGFfaW5wdXRzLnB1c2goXG4gICAgICAgICAgICAgICAgPE51bWJlcklucHV0IHBsYWNlaG9sZGVyPXtTQU1QTEVfTEFCRUxTW2ldICsgJyBPeHlnZW4gMTggZGVsdGEnfSBpbmRleD17aX0ga2V5PXtpfSB1bml0PXtcInBlcm1pbFwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VfZnVuY3Rpb249e3RoaXMuaGFuZGxlX294eWdlbl9kZWx0YV9jaGFuZ2V9IHZhbHVlPXt0aGlzLnN0YXRlLm94eWdlbl9kZWx0YXNbaV19Lz4pO1xuICAgICAgICAgICAgY29sbGVjdGlvbl90aW1lX2lucHV0cy5wdXNoKFxuICAgICAgICAgICAgICAgIDxEYXRlVGltZVBpY2tlciBvbkNoYW5nZT17KHZhbHVlKSA9PiB0aGlzLmhhbmRsZV9kYXRlX2NoYW5nZShpLCB2YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2RhdGUtaW5wdXQtYm94IC5icDMtaW5wdXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICcgJyArIFNBTVBMRV9MQUJFTFNbaV0gKyAnIHNhbXBsZSBkYXRlIGFuZCB0aW1lJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2l9IHZhbHVlPXt0aGlzLnN0YXRlLmRhdGV0aW1lc1tpXX0gZGF0ZUZvcm1hdD1cIllZWVktTU0tRERcIiB0aW1lRm9ybWF0PVwiSEg6bW1cIi8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRvc2Vfd2VpZ2h0X2lucHV0czogSlNYLkVsZW1lbnRbXSA9IFtdO1xuICAgICAgICBsZXQgbW9sX21hc3NfaW5wdXRzOiBKU1guRWxlbWVudFtdID0gW107XG4gICAgICAgIGxldCBkb3NlX2VucmljaG1lbnRfaW5wdXRzOiBKU1guRWxlbWVudFtdID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgRUxFTUVOVFMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGRvc2Vfd2VpZ2h0X2lucHV0cy5wdXNoKFxuICAgICAgICAgICAgICAgIDxOdW1iZXJJbnB1dCBwbGFjZWhvbGRlcj17RUxFTUVOVFNbaV0gKyAnIGRvc2Ugd2VpZ2h0IChnKSd9IGluZGV4PXtpfSBrZXk9e2l9IHVuaXQ9e1wiZ1wifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VfZnVuY3Rpb249e3RoaXMuaGFuZGxlX2Rvc2Vfd2VpZ2h0X2NoYW5nZX0gdmFsdWU9e3RoaXMuc3RhdGUuZG9zZV93ZWlnaHRzW2ldfS8+KTtcbiAgICAgICAgICAgIG1vbF9tYXNzX2lucHV0cy5wdXNoKFxuICAgICAgICAgICAgICAgIDxOdW1iZXJJbnB1dCBwbGFjZWhvbGRlcj17RUxFTUVOVFNbaV0gKyAnIG1vbGVjdWxhciBtYXNzIChnL21vbCknfSBpbmRleD17aX0ga2V5PXtpfSB1bml0PXtcImcvbW9sXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZV9mdW5jdGlvbj17dGhpcy5oYW5kbGVfbW9sX21hc3NfY2hhbmdlfSB2YWx1ZT17dGhpcy5zdGF0ZS5tb2xfbWFzc2VzW2ldfS8+KTtcbiAgICAgICAgICAgIGRvc2VfZW5yaWNobWVudF9pbnB1dHMucHVzaChcbiAgICAgICAgICAgICAgICA8TnVtYmVySW5wdXQgcGxhY2Vob2xkZXI9e0VMRU1FTlRTW2ldICsgJyBkb3NlIGVucmljaG1lbnQgKHBwbSknfSBpbmRleD17aX0ga2V5PXtpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VfZnVuY3Rpb249e3RoaXMuaGFuZGxlX2Rvc2VfZW5yaWNobWVudF9jaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmRvc2VfZW5yaWNobWVudHNbaV19IHVuaXQ9e1wicHBtXCJ9Lz4pO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlc3VsdHNfZGlzcGxheTogSlNYLkVsZW1lbnQgPSA8ZGl2Lz47XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnJlc3VsdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IHJlc3VsdHNfcDogSlNYLkVsZW1lbnRbXSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgcmVzdWx0IG9mIHRoaXMuc3RhdGUucmVzdWx0cykge1xuICAgICAgICAgICAgICAgIHJlc3VsdHNfcC5wdXNoKDxwPntyZXN1bHR9PC9wPik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc3VsdHNfZGlzcGxheSA9IChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncmVzdWx0cy1kaXNwbGF5Jz5cbiAgICAgICAgICAgICAgICAgICAgPENhcmQgY2xhc3NOYW1lPSdyZXN1bHRzLWNhcmQnPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQ+Q2FsY3VsYXRpb25zPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cmVzdWx0c19wfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvQ2FyZD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8TmF2YmFyIGNsYXNzTmFtZT0nZGx3LW5hdic+XG4gICAgICAgICAgICAgICAgPE5hdmJhckdyb3VwIGFsaWduPXtBbGlnbm1lbnQuTEVGVH0+XG4gICAgICAgICAgICAgICAgICAgIDxOYXZiYXIuSGVhZGluZyBjbGFzc05hbWU9J2Rsdy10aXRsZSc+RG91Ymx5IExhYmVsZWQgV2F0ZXI8L05hdmJhci5IZWFkaW5nPlxuICAgICAgICAgICAgICAgIDwvTmF2YmFyR3JvdXA+XG4gICAgICAgICAgICAgICAgPE5hdmJhckdyb3VwIGFsaWduPXtBbGlnbm1lbnQuUklHSFR9PlxuICAgICAgICAgICAgICAgICAgICA8TmF2YmFySGVhZGluZyBjbGFzc05hbWU9J3RhZ2xpbmUnPmFuIG9wZW4gc291cmNlIHByb2plY3QgYnkgdGhlIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gU2Nob29sIG9mXG4gICAgICAgICAgICAgICAgICAgICAgICBNZWRpY2luZTwvTmF2YmFySGVhZGluZz5cbiAgICAgICAgICAgICAgICAgICAgPE5hdmJhckRpdmlkZXIvPlxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2pjaG15ei9Eb3VibHlMYWJlbGVkV2F0ZXJcIiB0YXJnZXQ9XCJfYmxhbmtcIj5Eb3VibHlMYWJlbGVkV2F0ZXIgb25cbiAgICAgICAgICAgICAgICAgICAgICAgIEdpdEh1YjwvYT5cbiAgICAgICAgICAgICAgICA8L05hdmJhckdyb3VwPlxuICAgICAgICAgICAgICAgIDxGb3JtR3JvdXAgY2xhc3NOYW1lPSdkbHctYXBwJz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3NhbXBsZXMnPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2RhdGUtaW5wdXRzJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDU+Q29sbGVjdGlvbiBEYXRlcyBhbmQgVGltZXM8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjb2xsZWN0aW9uX3RpbWVfaW5wdXRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZGVsdGEtaW5wdXRzJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDU+RGV1dGVyaXVtIERlbHRhIFZhbHVlczwvaDU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2RldXRlcml1bV9kZWx0YV9pbnB1dHN9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdkZWx0YS1pbnB1dHMnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNT5PeHlnZW4gMTggRGVsdGEgVmFsdWVzPC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7b3h5Z2VuX2RlbHRhX2lucHV0c31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2VsZW1lbnQtd2lzZS1pbnB1dHMnPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0cy1ieS1lbGVtZW50Jz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDU+RG9zZSBXZWlnaHRzPC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZG9zZV93ZWlnaHRfaW5wdXRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXRzLWJ5LWVsZW1lbnQnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNT5Eb3NlIEVucmljaG1lbnRzPC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZG9zZV9lbnJpY2htZW50X2lucHV0c31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0cy1ieS1lbGVtZW50Jz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDU+TW9sZWN1bGFyIE1hc3M8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHttb2xfbWFzc19pbnB1dHN9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdlbGVtZW50LXdpc2UtaW5wdXRzJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dHMtYnktZWxlbWVudCc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1PlN1YmplY3QgV2VpZ2h0PC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TnVtYmVySW5wdXQgcGxhY2Vob2xkZXI9e1wiSW5pdGlhbCBzdWJqZWN0IHdlaWdodCAoa2cpXCJ9IGluZGV4PXswfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VfZnVuY3Rpb249e3RoaXMuaGFuZGxlX3N1YmplY3Rfd2VpZ2h0X2NoYW5nZX0gdW5pdD17J2tnJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuc3ViamVjdF93ZWlnaHRzWzBdfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE51bWJlcklucHV0IHBsYWNlaG9sZGVyPXtcIkZpbmFsIHN1YmplY3Qgd2VpZ2h0IChrZylcIn0gaW5kZXg9ezF9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZV9mdW5jdGlvbj17dGhpcy5oYW5kbGVfc3ViamVjdF93ZWlnaHRfY2hhbmdlfSB1bml0PXsna2cnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5zdWJqZWN0X3dlaWdodHNbMV19Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3N1Ym1pdC1ncm91cCc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRHcm91cCBwbGFjZWhvbGRlcj0nUmVzdWx0cyBDU1YgZmlsZW5hbWUgKG9wdGlvbmFsKScgY2xhc3NOYW1lPSdjc3YtbmFtZS1pbnB1dCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQ6IEZvcm1FdmVudDxIVE1MRWxlbWVudD4pID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y3N2X25hbWU6IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWV9KX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLnN1Ym1pdF9pbnB1dHN9IGRpc2FibGVkPXshYWxsX2lucHV0c192YWxpZGF0ZWR9PlNVQk1JVDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAge3Jlc3VsdHNfZGlzcGxheX1cbiAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgICAgIDwvTmF2YmFyPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHN1Ym1pdF9pbnB1dHMgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGxldCBkYXRldGltZXMgPSB0aGlzLnN0YXRlLmRhdGV0aW1lcy5tYXAoKHZhbHVlOiBNb21lbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS50b0FycmF5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgcmVzdWx0cyA9IGF3YWl0IGNhbGN1bGF0ZV9mcm9tX2lucHV0cyhcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkX2RlbHRhczogdGhpcy5zdGF0ZS5kZXV0ZXJpdW1fZGVsdGFzLFxuICAgICAgICAgICAgICAgIG9fZGVsdGFzOiB0aGlzLnN0YXRlLm94eWdlbl9kZWx0YXMsXG4gICAgICAgICAgICAgICAgZGF0ZXRpbWVzOiBkYXRldGltZXMsXG4gICAgICAgICAgICAgICAgZG9zZV93ZWlnaHRzOiB0aGlzLnN0YXRlLmRvc2Vfd2VpZ2h0cyxcbiAgICAgICAgICAgICAgICBkb3NlX2VucmljaG1lbnRzOiB0aGlzLnN0YXRlLmRvc2VfZW5yaWNobWVudHMsXG4gICAgICAgICAgICAgICAgbW9sX21hc3NlczogdGhpcy5zdGF0ZS5tb2xfbWFzc2VzLFxuICAgICAgICAgICAgICAgIHN1YmplY3Rfd2VpZ2h0czogdGhpcy5zdGF0ZS5zdWJqZWN0X3dlaWdodHMsXG4gICAgICAgICAgICAgICAgY3N2X25hbWU6IHRoaXMuc3RhdGUuY3N2X25hbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2dvdCByZXN1bHRzJywgcmVzdWx0cyk7XG4gICAgICAgIGxldCByZXN1bHRfZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKHJlc3VsdHMpO1xuICAgICAgICBsZXQgcmVzdWx0c19hcnJheSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBbbmFtZSwgdmFsdWVdIG9mIHJlc3VsdF9lbnRyaWVzKSB7XG4gICAgICAgICAgICByZXN1bHRzX2FycmF5LnB1c2gobmFtZSArIFwiOiBcIiArIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtyZXN1bHRzOiByZXN1bHRzX2FycmF5fSk7XG4gICAgfTtcblxuICAgIGNoZWNrX251bWVyaWNhbF9pbnB1dHMgPSAoaW5wdXRfYXJheTogKHN0cmluZyB8IG51bWJlcilbXSkgPT4ge1xuICAgICAgICBmb3IgKGxldCB2YWx1ZSBvZiBpbnB1dF9hcmF5KSB7XG4gICAgICAgICAgICBpZiAoaXNOYU4oK3ZhbHVlKSB8fCB2YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgaGFuZGxlX2RldXRlcml1bV9kZWx0YV9jaGFuZ2UgPSAoaW5kZXg6IG51bWJlciwgZXZlbnQ6IEZvcm1FdmVudDxIVE1MRWxlbWVudD4pID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICAgICAgaWYgKCFpc05hTigrdmFsdWUpKSB7XG4gICAgICAgICAgICBsZXQgbmV3X2RlbHRhcyA9IHRoaXMuc3RhdGUuZGV1dGVyaXVtX2RlbHRhcztcbiAgICAgICAgICAgIG5ld19kZWx0YXMuc3BsaWNlKGluZGV4LCAxLCB2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldXRlcml1bV9kZWx0YXM6IG5ld19kZWx0YXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXV0ZXJpdW1fZGVsdGFzX3ZhbGlkYXRlZDogdGhpcy5jaGVja19udW1lcmljYWxfaW5wdXRzKG5ld19kZWx0YXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGhhbmRsZV9veHlnZW5fZGVsdGFfY2hhbmdlID0gKGluZGV4OiBudW1iZXIsIGV2ZW50OiBGb3JtRXZlbnQ8SFRNTEVsZW1lbnQ+KSA9PiB7XG4gICAgICAgIGxldCB2YWx1ZSA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgICAgIGlmICghaXNOYU4oK3ZhbHVlKSkge1xuICAgICAgICAgICAgbGV0IG5ld19kZWx0YXMgPSB0aGlzLnN0YXRlLm94eWdlbl9kZWx0YXM7XG4gICAgICAgICAgICBuZXdfZGVsdGFzLnNwbGljZShpbmRleCwgMSwgdmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBveHlnZW5fZGVsdGFzOiBuZXdfZGVsdGFzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3h5Z2VuX2RlbHRhc192YWxpZGF0ZWQ6IHRoaXMuY2hlY2tfbnVtZXJpY2FsX2lucHV0cyhuZXdfZGVsdGFzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBoYW5kbGVfZGF0ZV9jaGFuZ2UgPSAoaTogbnVtYmVyLCB2YWx1ZTogc3RyaW5nIHwgTW9tZW50KSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgbGV0IG5ld19kYXRlX2FycmF5ID0gdGhpcy5zdGF0ZS5kYXRldGltZXM7XG4gICAgICAgICAgICBuZXdfZGF0ZV9hcnJheS5zcGxpY2UoaSwgMSwgdmFsdWUpO1xuICAgICAgICAgICAgbGV0IGFsbF9kYXRlc19maWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgZm9yIChsZXQgZGF0ZSBvZiBuZXdfZGF0ZV9hcnJheSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICBhbGxfZGF0ZXNfZmlsbGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2RhdGV0aW1lczogbmV3X2RhdGVfYXJyYXksIGRhdGV0aW1lc192YWxpZGF0ZWQ6IGFsbF9kYXRlc19maWxsZWR9KVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGhhbmRsZV9kb3NlX3dlaWdodF9jaGFuZ2UgPSAoaW5kZXg6IG51bWJlciwgZXZlbnQ6IEZvcm1FdmVudDxIVE1MRWxlbWVudD4pID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICAgICAgaWYgKCFpc05hTigrdmFsdWUpKSB7XG4gICAgICAgICAgICBsZXQgbmV3X2Rvc2Vfd2VpZ2h0cyA9IHRoaXMuc3RhdGUuZG9zZV93ZWlnaHRzO1xuICAgICAgICAgICAgbmV3X2Rvc2Vfd2VpZ2h0cy5zcGxpY2UoaW5kZXgsIDEsIHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9zZV93ZWlnaHRzOiBuZXdfZG9zZV93ZWlnaHRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9zZV93ZWlnaHRzX3ZhbGlkYXRlZDogdGhpcy5jaGVja19udW1lcmljYWxfaW5wdXRzKG5ld19kb3NlX3dlaWdodHMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGhhbmRsZV9tb2xfbWFzc19jaGFuZ2UgPSAoaW5kZXg6IG51bWJlciwgZXZlbnQ6IEZvcm1FdmVudDxIVE1MRWxlbWVudD4pID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICAgICAgaWYgKCFpc05hTigrdmFsdWUpKSB7XG4gICAgICAgICAgICBsZXQgbmV3X21vbF9tYXNzZXMgPSB0aGlzLnN0YXRlLm1vbF9tYXNzZXM7XG4gICAgICAgICAgICBuZXdfbW9sX21hc3Nlcy5zcGxpY2UoaW5kZXgsIDEsIHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9sX21hc3NlczogbmV3X21vbF9tYXNzZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2xfbWFzc2VzX3ZhbGlkYXRlZDogdGhpcy5jaGVja19udW1lcmljYWxfaW5wdXRzKG5ld19tb2xfbWFzc2VzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBoYW5kbGVfZG9zZV9lbnJpY2htZW50X2NoYW5nZSA9IChpbmRleDogbnVtYmVyLCBldmVudDogRm9ybUV2ZW50PEhUTUxFbGVtZW50PikgPT4ge1xuICAgICAgICBsZXQgdmFsdWUgPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuICAgICAgICBpZiAoIWlzTmFOKCt2YWx1ZSkpIHtcbiAgICAgICAgICAgIGxldCBuZXdfZW5yaWNobWVudHMgPSB0aGlzLnN0YXRlLmRvc2VfZW5yaWNobWVudHM7XG4gICAgICAgICAgICBuZXdfZW5yaWNobWVudHMuc3BsaWNlKGluZGV4LCAxLCB2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvc2VfZW5yaWNobWVudHM6IG5ld19lbnJpY2htZW50cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvc2VfZW5yaWNobWVudHNfdmFsaWRhdGVkOiB0aGlzLmNoZWNrX251bWVyaWNhbF9pbnB1dHMobmV3X2VucmljaG1lbnRzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBoYW5kbGVfc3ViamVjdF93ZWlnaHRfY2hhbmdlID0gKGluZGV4OiBudW1iZXIsIGV2ZW50OiBGb3JtRXZlbnQ8SFRNTEVsZW1lbnQ+KSA9PiB7XG4gICAgICAgIGxldCB2YWx1ZSA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgICAgIGlmICghaXNOYU4oK3ZhbHVlKSkge1xuICAgICAgICAgICAgbGV0IG5ld193ZWlnaHRzID0gdGhpcy5zdGF0ZS5zdWJqZWN0X3dlaWdodHM7XG4gICAgICAgICAgICBuZXdfd2VpZ2h0cy5zcGxpY2UoaW5kZXgsIDEsIHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdF93ZWlnaHRzOiBuZXdfd2VpZ2h0cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3Rfd2VpZ2h0c192YWxpZGF0ZWQ6IHRoaXMuY2hlY2tfbnVtZXJpY2FsX2lucHV0cyhuZXdfd2VpZ2h0cylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG59XG5cbmludGVyZmFjZSBOdW1iZXJJbnB1dFByb3BzIHtcbiAgICBwbGFjZWhvbGRlcjogc3RyaW5nLFxuICAgIGluZGV4OiBudW1iZXIsXG4gICAgY2hhbmdlX2Z1bmN0aW9uOiAoaW5kZXg6IG51bWJlciwgZXZlbnQ6IEZvcm1FdmVudDxIVE1MRWxlbWVudD4pID0+IHZvaWRcbiAgICB2YWx1ZTogc3RyaW5nLFxuICAgIHVuaXQ6IHN0cmluZ1xufVxuXG5leHBvcnQgY2xhc3MgTnVtYmVySW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8TnVtYmVySW5wdXRQcm9wcz4ge1xuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgaWNvbjogSWNvbk5hbWUgPSBcImNpcmNsZS1hcnJvdy1yaWdodFwiO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy52YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgaWNvbiA9IFwiY2lyY2xlLWFycm93LXJpZ2h0XCI7XG4gICAgICAgIH0gZWxzZSBpZiAoIWlzTmFOKCt0aGlzLnByb3BzLnZhbHVlKSkge1xuICAgICAgICAgICAgaWNvbiA9IFwidGlja1wiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWNvbiA9IFwiYmFuLWNpcmNsZVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxDb250cm9sR3JvdXAgZmlsbD17dHJ1ZX0+XG4gICAgICAgICAgICAgICAgPElucHV0R3JvdXBcbiAgICAgICAgICAgICAgICAgICAgbGVmdEljb249e2ljb259IGNsYXNzTmFtZT17Jy5icDMtZmlsbCd9IHJpZ2h0RWxlbWVudD17PFRhZz57dGhpcy5wcm9wcy51bml0fTwvVGFnPn1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudDogRm9ybUV2ZW50PEhUTUxFbGVtZW50PikgPT4gdGhpcy5wcm9wcy5jaGFuZ2VfZnVuY3Rpb24odGhpcy5wcm9wcy5pbmRleCwgZXZlbnQpfVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17dGhpcy5wcm9wcy5wbGFjZWhvbGRlcn0gdmFsdWU9e3RoaXMucHJvcHMudmFsdWV9Lz5cbiAgICAgICAgICAgIDwvQ29udHJvbEdyb3VwPlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==
