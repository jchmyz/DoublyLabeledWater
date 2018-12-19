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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var core_1 = require("@blueprintjs/core");
var DateTimePicker = require("react-datetime");
var DEUTERIUM = "Deuterium";
var OXYGEN = "Oxygen 18";
var NUM_SAMPLE_TIMES = 5;
var ELEMENTS = [DEUTERIUM, OXYGEN];
var BLANK_DATE = new Date();
var DLWApp = /** @class */ (function (_super) {
    __extends(DLWApp, _super);
    function DLWApp(props) {
        var _this = _super.call(this, props) || this;
        _this.handle_deuterium_delta_change = function (i, valueAsNumber) {
            var new_deltas = _this.state.deuterium_deltas;
            new_deltas.splice(i, 1, valueAsNumber);
            _this.setState({ deuterium_deltas: new_deltas });
            console.log('deuterium deltas are now', _this.state.deuterium_deltas);
        };
        _this.handle_oxygen_delta_change = function (i, valueAsNumber) {
            var new_deltas = _this.state.oxygen_deltas;
            new_deltas.splice(i, 1, valueAsNumber);
            _this.setState({ oxygen_deltas: new_deltas });
            console.log('oxygen deltas are now', _this.state.oxygen_deltas);
        };
        _this.handle_date_change = function (value) {
            // convert to my datetime format
            console.log('got new date', value);
        };
        _this.handle_dose_weight_change = function (i, valueAsNumber) {
            var new_dose_weights = _this.state.dose_weights;
            new_dose_weights.splice(i, 1, valueAsNumber);
            _this.setState({ dose_weights: new_dose_weights });
            console.log('got value dose weight', _this.state.dose_weights);
        };
        _this.handle_mol_mass_change = function (i, valueAsNumber) {
            var mol_mass_copy = _this.state.mol_masses;
            mol_mass_copy.splice(i, 1, valueAsNumber);
            _this.setState({ mol_masses: mol_mass_copy });
            console.log('mm are now', _this.state.mol_masses);
        };
        _this.handle_dose_enrichment_change = function (i, valueAsNumber) {
            var new_enrichments = _this.state.dose_enrichments;
            new_enrichments.splice(i, 1, valueAsNumber);
            _this.setState({ dose_enrichments: new_enrichments });
            console.log('enrichments are now', _this.state.dose_enrichments);
        };
        _this.handle_subject_weight_change = function (i, valueAsNumber) {
            var new_weights = _this.state.subject_weights;
            new_weights.splice(i, 1, valueAsNumber);
            _this.setState({ subject_weights: new_weights });
            console.log('subject weights are now', _this.state.subject_weights);
        };
        _this.state = {
            deuterium_deltas: ["", "", "", "", ""],
            oxygen_deltas: ["", "", "", "", ""],
            datetimes: ["", "", "", "", ""],
            dose_weights: ["", ""],
            mol_masses: ["", ""],
            dose_enrichments: ["", ""],
            subject_weights: ["", ""]
        };
        return _this;
    }
    DLWApp.prototype.render = function () {
        var _this = this;
        var deuterium_delta_inputs = [];
        var oxygen_delta_inputs = [];
        var collection_time_inputs = [];
        var _loop_1 = function (i) {
            deuterium_delta_inputs.push(React.createElement(core_1.NumericInput, { onValueChange: function (valueAsNumber) { return _this.handle_deuterium_delta_change(i, valueAsNumber); }, buttonPosition: "none", leftIcon: "delta", large: true, key: i, value: this_1.state.deuterium_deltas[i] }));
            oxygen_delta_inputs.push(React.createElement(core_1.NumericInput, { onValueChange: function (valueAsNumber) { return _this.handle_oxygen_delta_change(i, valueAsNumber); }, buttonPosition: "none", leftIcon: "delta", large: true, key: i, value: this_1.state.oxygen_deltas[i] }));
            collection_time_inputs.push(React.createElement(DateTimePicker, { onChange: this_1.handle_date_change, key: i, value: this_1.state.datetimes[i] }));
        };
        var this_1 = this;
        for (var i = 0; i < NUM_SAMPLE_TIMES; i++) {
            _loop_1(i);
        }
        var dose_weight_inputs = [];
        var mol_mass_inputs = [];
        var dose_enrichment_inputs = [];
        var _loop_2 = function (i) {
            dose_weight_inputs.push(React.createElement(core_1.NumericInput, { onValueChange: function (valueAsNumber) { return _this.handle_dose_weight_change(i, valueAsNumber); }, buttonPosition: "none", large: true, key: i, value: this_2.state.dose_weights[i], placeholder: ELEMENTS[i] + ' dose weight (g)' }));
            mol_mass_inputs.push(React.createElement(core_1.NumericInput, { onValueChange: function (valueAsNumber) { return _this.handle_mol_mass_change(i, valueAsNumber); }, buttonPosition: "none", large: true, key: i, value: this_2.state.mol_masses[i], placeholder: ELEMENTS[i] + ' molecular mass (g/mol)' }));
            dose_enrichment_inputs.push(React.createElement(core_1.NumericInput, { onValueChange: function (valueAsNumber) { return _this.handle_dose_enrichment_change(i, valueAsNumber); }, buttonPosition: "none", large: true, key: i, value: this_2.state.dose_enrichments[i], placeholder: ELEMENTS[i] + ' dose enrichment (ppm)' }));
        };
        var this_2 = this;
        for (var i = 0; i < ELEMENTS.length; i++) {
            _loop_2(i);
        }
        return (React.createElement(core_1.FormGroup, { className: 'dlw-app', label: "Doubly Labeled Water Inputs" },
            React.createElement("div", null,
                React.createElement("div", null,
                    React.createElement("h5", null, "Deuterium Delta Values"),
                    deuterium_delta_inputs),
                React.createElement("div", null,
                    React.createElement("h5", null, "Oxygen 18 Delta Values"),
                    oxygen_delta_inputs)),
            React.createElement("div", null,
                React.createElement("h5", null, "Collection Dates and Times"),
                collection_time_inputs),
            React.createElement("div", null,
                React.createElement("h5", null, "Dose Weights"),
                dose_weight_inputs,
                React.createElement("h5", null, "Dose Enrichments"),
                dose_enrichment_inputs,
                React.createElement("h5", null, "Molecular Masses"),
                mol_mass_inputs),
            React.createElement("div", null,
                React.createElement("h5", null, "Subject Weights"),
                React.createElement(core_1.NumericInput, { onValueChange: function (valueAsNumber) { return _this.handle_subject_weight_change(0, valueAsNumber); }, buttonPosition: "none", large: true, key: 'initial', value: this.state.subject_weights[0], placeholder: "Initial subject weight (kg)" }),
                React.createElement(core_1.NumericInput, { onValueChange: function (valueAsNumber) { return _this.handle_subject_weight_change(1, valueAsNumber); }, buttonPosition: "none", large: true, key: 'final', placeholder: "Final subject weight (kg)", value: this.state.subject_weights[1] }))));
    };
    return DLWApp;
}(React.Component));
exports.DLWApp = DLWApp;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFBLEtBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLEVBQW5ELENBQW1ELEVBQ3JGLGNBQWMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSwyQkFBMkIsRUFDM0YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQ3pDLENBQ0UsQ0FDZixDQUFDO0lBQ04sQ0FBQztJQWlETCxhQUFDO0FBQUQsQ0F6SUEsQUF5SUMsQ0F6STJCLEtBQUssQ0FBQyxTQUFTLEdBeUkxQztBQXpJWSx3QkFBTSIsImZpbGUiOiJETFdBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7Rm9ybUdyb3VwLCBOdW1lcmljSW5wdXR9IGZyb20gXCJAYmx1ZXByaW50anMvY29yZVwiO1xuaW1wb3J0ICogYXMgRGF0ZVRpbWVQaWNrZXIgZnJvbSAncmVhY3QtZGF0ZXRpbWUnO1xuaW1wb3J0IHtNb21lbnR9IGZyb20gXCJtb21lbnRcIjtcbmltcG9ydCB7VGltaW5nfSBmcm9tIFwiLi90eXBlcy9DYWxjdWxhdGlvbklucHV0c1wiO1xuXG5jb25zdCBERVVURVJJVU0gPSBcIkRldXRlcml1bVwiO1xuY29uc3QgT1hZR0VOID0gXCJPeHlnZW4gMThcIjtcblxuY29uc3QgTlVNX1NBTVBMRV9USU1FUyA9IDU7XG5cbmNvbnN0IEVMRU1FTlRTID0gW0RFVVRFUklVTSwgT1hZR0VOXTtcbmNvbnN0IEJMQU5LX0RBVEUgPSBuZXcgRGF0ZSgpO1xuXG5pbnRlcmZhY2UgRExXU3RhdGUge1xuICAgIGRldXRlcml1bV9kZWx0YXM6IChzdHJpbmcgfCBudW1iZXIpW10sXG4gICAgb3h5Z2VuX2RlbHRhczogKHN0cmluZyB8IG51bWJlcilbXSxcbiAgICBkYXRldGltZXM6IChzdHJpbmcgfCBEYXRlKVtdLFxuICAgIGRvc2Vfd2VpZ2h0czogKHN0cmluZyB8IG51bWJlcilbXSxcbiAgICBtb2xfbWFzc2VzOiAoc3RyaW5nIHwgbnVtYmVyKVtdLFxuICAgIGRvc2VfZW5yaWNobWVudHM6IChzdHJpbmcgfCBudW1iZXIpW10sXG4gICAgc3ViamVjdF93ZWlnaHRzOiAoc3RyaW5nIHwgbnVtYmVyKVtdXG59XG5cbmV4cG9ydCBjbGFzcyBETFdBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8YW55LCBETFdTdGF0ZT4ge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBhbnkpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgZGV1dGVyaXVtX2RlbHRhczogW1wiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCJdLFxuICAgICAgICAgICAgb3h5Z2VuX2RlbHRhczogW1wiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCJdLFxuICAgICAgICAgICAgZGF0ZXRpbWVzOiBbXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIl0sXG4gICAgICAgICAgICBkb3NlX3dlaWdodHM6IFtcIlwiLCBcIlwiXSxcbiAgICAgICAgICAgIG1vbF9tYXNzZXM6IFtcIlwiLCBcIlwiXSxcbiAgICAgICAgICAgIGRvc2VfZW5yaWNobWVudHM6IFtcIlwiLCBcIlwiXSxcbiAgICAgICAgICAgIHN1YmplY3Rfd2VpZ2h0czogW1wiXCIsIFwiXCJdXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgZGV1dGVyaXVtX2RlbHRhX2lucHV0czogSlNYLkVsZW1lbnRbXSA9IFtdO1xuICAgICAgICBsZXQgb3h5Z2VuX2RlbHRhX2lucHV0czogSlNYLkVsZW1lbnRbXSA9IFtdO1xuICAgICAgICBsZXQgY29sbGVjdGlvbl90aW1lX2lucHV0czogSlNYLkVsZW1lbnRbXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE5VTV9TQU1QTEVfVElNRVM7IGkrKykge1xuICAgICAgICAgICAgZGV1dGVyaXVtX2RlbHRhX2lucHV0cy5wdXNoKFxuICAgICAgICAgICAgICAgIDxOdW1lcmljSW5wdXQgb25WYWx1ZUNoYW5nZT17KHZhbHVlQXNOdW1iZXIpID0+IHRoaXMuaGFuZGxlX2RldXRlcml1bV9kZWx0YV9jaGFuZ2UoaSwgdmFsdWVBc051bWJlcil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXR0b25Qb3NpdGlvbj17XCJub25lXCJ9IGxlZnRJY29uPVwiZGVsdGFcIiBsYXJnZT17dHJ1ZX0ga2V5PXtpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuZGV1dGVyaXVtX2RlbHRhc1tpXX0vPik7XG4gICAgICAgICAgICBveHlnZW5fZGVsdGFfaW5wdXRzLnB1c2goXG4gICAgICAgICAgICAgICAgPE51bWVyaWNJbnB1dCBvblZhbHVlQ2hhbmdlPXsodmFsdWVBc051bWJlcikgPT4gdGhpcy5oYW5kbGVfb3h5Z2VuX2RlbHRhX2NoYW5nZShpLCB2YWx1ZUFzTnVtYmVyKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvblBvc2l0aW9uPXtcIm5vbmVcIn0gbGVmdEljb249XCJkZWx0YVwiIGxhcmdlPXt0cnVlfSBrZXk9e2l9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5veHlnZW5fZGVsdGFzW2ldfS8+KTtcbiAgICAgICAgICAgIGNvbGxlY3Rpb25fdGltZV9pbnB1dHMucHVzaChcbiAgICAgICAgICAgICAgICA8RGF0ZVRpbWVQaWNrZXIgb25DaGFuZ2U9e3RoaXMuaGFuZGxlX2RhdGVfY2hhbmdlfSBrZXk9e2l9IHZhbHVlPXt0aGlzLnN0YXRlLmRhdGV0aW1lc1tpXX0vPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkb3NlX3dlaWdodF9pbnB1dHM6IEpTWC5FbGVtZW50W10gPSBbXTtcbiAgICAgICAgbGV0IG1vbF9tYXNzX2lucHV0czogSlNYLkVsZW1lbnRbXSA9IFtdO1xuICAgICAgICBsZXQgZG9zZV9lbnJpY2htZW50X2lucHV0czogSlNYLkVsZW1lbnRbXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEVMRU1FTlRTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBkb3NlX3dlaWdodF9pbnB1dHMucHVzaChcbiAgICAgICAgICAgICAgICA8TnVtZXJpY0lucHV0IG9uVmFsdWVDaGFuZ2U9eyh2YWx1ZUFzTnVtYmVyKSA9PiB0aGlzLmhhbmRsZV9kb3NlX3dlaWdodF9jaGFuZ2UoaSwgdmFsdWVBc051bWJlcil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXR0b25Qb3NpdGlvbj17XCJub25lXCJ9IGxhcmdlPXt0cnVlfSBrZXk9e2l9IHZhbHVlPXt0aGlzLnN0YXRlLmRvc2Vfd2VpZ2h0c1tpXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtFTEVNRU5UU1tpXSArICcgZG9zZSB3ZWlnaHQgKGcpJ30vPik7XG4gICAgICAgICAgICBtb2xfbWFzc19pbnB1dHMucHVzaChcbiAgICAgICAgICAgICAgICA8TnVtZXJpY0lucHV0IG9uVmFsdWVDaGFuZ2U9eyh2YWx1ZUFzTnVtYmVyKSA9PiB0aGlzLmhhbmRsZV9tb2xfbWFzc19jaGFuZ2UoaSwgdmFsdWVBc051bWJlcil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXR0b25Qb3NpdGlvbj17XCJub25lXCJ9IGxhcmdlPXt0cnVlfSBrZXk9e2l9IHZhbHVlPXt0aGlzLnN0YXRlLm1vbF9tYXNzZXNbaV19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17RUxFTUVOVFNbaV0gKyAnIG1vbGVjdWxhciBtYXNzIChnL21vbCknfS8+KTtcbiAgICAgICAgICAgIGRvc2VfZW5yaWNobWVudF9pbnB1dHMucHVzaChcbiAgICAgICAgICAgICAgICA8TnVtZXJpY0lucHV0IG9uVmFsdWVDaGFuZ2U9eyh2YWx1ZUFzTnVtYmVyKSA9PiB0aGlzLmhhbmRsZV9kb3NlX2VucmljaG1lbnRfY2hhbmdlKGksIHZhbHVlQXNOdW1iZXIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uUG9zaXRpb249e1wibm9uZVwifSBsYXJnZT17dHJ1ZX0ga2V5PXtpfSB2YWx1ZT17dGhpcy5zdGF0ZS5kb3NlX2VucmljaG1lbnRzW2ldfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e0VMRU1FTlRTW2ldICsgJyBkb3NlIGVucmljaG1lbnQgKHBwbSknfS8+KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Rm9ybUdyb3VwIGNsYXNzTmFtZT0nZGx3LWFwcCcgbGFiZWw9XCJEb3VibHkgTGFiZWxlZCBXYXRlciBJbnB1dHNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGg1PkRldXRlcml1bSBEZWx0YSBWYWx1ZXM8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAge2RldXRlcml1bV9kZWx0YV9pbnB1dHN9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGg1Pk94eWdlbiAxOCBEZWx0YSBWYWx1ZXM8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAge294eWdlbl9kZWx0YV9pbnB1dHN9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxoNT5Db2xsZWN0aW9uIERhdGVzIGFuZCBUaW1lczwvaDU+XG4gICAgICAgICAgICAgICAgICAgIHtjb2xsZWN0aW9uX3RpbWVfaW5wdXRzfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxoNT5Eb3NlIFdlaWdodHM8L2g1PlxuICAgICAgICAgICAgICAgICAgICB7ZG9zZV93ZWlnaHRfaW5wdXRzfVxuICAgICAgICAgICAgICAgICAgICA8aDU+RG9zZSBFbnJpY2htZW50czwvaDU+XG4gICAgICAgICAgICAgICAgICAgIHtkb3NlX2VucmljaG1lbnRfaW5wdXRzfVxuICAgICAgICAgICAgICAgICAgICA8aDU+TW9sZWN1bGFyIE1hc3NlczwvaDU+XG4gICAgICAgICAgICAgICAgICAgIHttb2xfbWFzc19pbnB1dHN9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGg1PlN1YmplY3QgV2VpZ2h0czwvaDU+XG4gICAgICAgICAgICAgICAgICAgIDxOdW1lcmljSW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uVmFsdWVDaGFuZ2U9eyh2YWx1ZUFzTnVtYmVyKSA9PiB0aGlzLmhhbmRsZV9zdWJqZWN0X3dlaWdodF9jaGFuZ2UoMCwgdmFsdWVBc051bWJlcil9XG4gICAgICAgICAgICAgICAgICAgICAgICBidXR0b25Qb3NpdGlvbj17XCJub25lXCJ9IGxhcmdlPXt0cnVlfSBrZXk9eydpbml0aWFsJ30gdmFsdWU9e3RoaXMuc3RhdGUuc3ViamVjdF93ZWlnaHRzWzBdfVxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e1wiSW5pdGlhbCBzdWJqZWN0IHdlaWdodCAoa2cpXCJ9Lz5cblxuICAgICAgICAgICAgICAgICAgICA8TnVtZXJpY0lucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICBvblZhbHVlQ2hhbmdlPXsodmFsdWVBc051bWJlcikgPT4gdGhpcy5oYW5kbGVfc3ViamVjdF93ZWlnaHRfY2hhbmdlKDEsIHZhbHVlQXNOdW1iZXIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uUG9zaXRpb249e1wibm9uZVwifSBsYXJnZT17dHJ1ZX0ga2V5PXsnZmluYWwnfSBwbGFjZWhvbGRlcj17XCJGaW5hbCBzdWJqZWN0IHdlaWdodCAoa2cpXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5zdWJqZWN0X3dlaWdodHNbMV19Lz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIGhhbmRsZV9kZXV0ZXJpdW1fZGVsdGFfY2hhbmdlID0gKGk6IG51bWJlciwgdmFsdWVBc051bWJlcjogbnVtYmVyKSA9PiB7XG4gICAgICAgIGxldCBuZXdfZGVsdGFzID0gdGhpcy5zdGF0ZS5kZXV0ZXJpdW1fZGVsdGFzO1xuICAgICAgICBuZXdfZGVsdGFzLnNwbGljZShpLCAxLCB2YWx1ZUFzTnVtYmVyKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZGV1dGVyaXVtX2RlbHRhczogbmV3X2RlbHRhc30pO1xuICAgICAgICBjb25zb2xlLmxvZygnZGV1dGVyaXVtIGRlbHRhcyBhcmUgbm93JywgdGhpcy5zdGF0ZS5kZXV0ZXJpdW1fZGVsdGFzKTtcbiAgICB9O1xuXG4gICAgaGFuZGxlX294eWdlbl9kZWx0YV9jaGFuZ2UgPSAoaTogbnVtYmVyLCB2YWx1ZUFzTnVtYmVyOiBudW1iZXIpID0+IHtcbiAgICAgICAgbGV0IG5ld19kZWx0YXMgPSB0aGlzLnN0YXRlLm94eWdlbl9kZWx0YXM7XG4gICAgICAgIG5ld19kZWx0YXMuc3BsaWNlKGksIDEsIHZhbHVlQXNOdW1iZXIpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtveHlnZW5fZGVsdGFzOiBuZXdfZGVsdGFzfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdveHlnZW4gZGVsdGFzIGFyZSBub3cnLCB0aGlzLnN0YXRlLm94eWdlbl9kZWx0YXMpO1xuICAgIH07XG5cbiAgICBoYW5kbGVfZGF0ZV9jaGFuZ2UgPSAodmFsdWU6IHN0cmluZyB8IE1vbWVudCkgPT4ge1xuICAgICAgICAvLyBjb252ZXJ0IHRvIG15IGRhdGV0aW1lIGZvcm1hdFxuICAgICAgICBjb25zb2xlLmxvZygnZ290IG5ldyBkYXRlJywgdmFsdWUpO1xuICAgIH07XG5cbiAgICBoYW5kbGVfZG9zZV93ZWlnaHRfY2hhbmdlID0gKGk6IG51bWJlciwgdmFsdWVBc051bWJlcjogbnVtYmVyKSA9PiB7XG4gICAgICAgIGxldCBuZXdfZG9zZV93ZWlnaHRzID0gdGhpcy5zdGF0ZS5kb3NlX3dlaWdodHM7XG4gICAgICAgIG5ld19kb3NlX3dlaWdodHMuc3BsaWNlKGksIDEsIHZhbHVlQXNOdW1iZXIpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtkb3NlX3dlaWdodHM6IG5ld19kb3NlX3dlaWdodHN9KTtcbiAgICAgICAgY29uc29sZS5sb2coJ2dvdCB2YWx1ZSBkb3NlIHdlaWdodCcsIHRoaXMuc3RhdGUuZG9zZV93ZWlnaHRzKTtcbiAgICB9O1xuXG4gICAgaGFuZGxlX21vbF9tYXNzX2NoYW5nZSA9IChpOiBudW1iZXIsIHZhbHVlQXNOdW1iZXI6IG51bWJlcikgPT4ge1xuICAgICAgICBsZXQgbW9sX21hc3NfY29weSA9IHRoaXMuc3RhdGUubW9sX21hc3NlcztcbiAgICAgICAgbW9sX21hc3NfY29weS5zcGxpY2UoaSwgMSwgdmFsdWVBc051bWJlcik7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe21vbF9tYXNzZXM6IG1vbF9tYXNzX2NvcHl9KTtcbiAgICAgICAgY29uc29sZS5sb2coJ21tIGFyZSBub3cnLCB0aGlzLnN0YXRlLm1vbF9tYXNzZXMpO1xuICAgIH07XG5cbiAgICBoYW5kbGVfZG9zZV9lbnJpY2htZW50X2NoYW5nZSA9IChpOiBudW1iZXIsIHZhbHVlQXNOdW1iZXI6IG51bWJlcikgPT4ge1xuICAgICAgICBsZXQgbmV3X2VucmljaG1lbnRzID0gdGhpcy5zdGF0ZS5kb3NlX2VucmljaG1lbnRzO1xuICAgICAgICBuZXdfZW5yaWNobWVudHMuc3BsaWNlKGksIDEsIHZhbHVlQXNOdW1iZXIpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtkb3NlX2VucmljaG1lbnRzOiBuZXdfZW5yaWNobWVudHN9KTtcbiAgICAgICAgY29uc29sZS5sb2coJ2VucmljaG1lbnRzIGFyZSBub3cnLCB0aGlzLnN0YXRlLmRvc2VfZW5yaWNobWVudHMpO1xuICAgIH07XG5cbiAgICBoYW5kbGVfc3ViamVjdF93ZWlnaHRfY2hhbmdlID0gKGk6IG51bWJlciwgdmFsdWVBc051bWJlcjogbnVtYmVyKSA9PiB7XG4gICAgICAgIGxldCBuZXdfd2VpZ2h0cyA9IHRoaXMuc3RhdGUuc3ViamVjdF93ZWlnaHRzO1xuICAgICAgICBuZXdfd2VpZ2h0cy5zcGxpY2UoaSwgMSwgdmFsdWVBc051bWJlcik7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3N1YmplY3Rfd2VpZ2h0czogbmV3X3dlaWdodHN9KTtcbiAgICAgICAgY29uc29sZS5sb2coJ3N1YmplY3Qgd2VpZ2h0cyBhcmUgbm93JywgdGhpcy5zdGF0ZS5zdWJqZWN0X3dlaWdodHMpO1xuICAgIH07XG5cbn0iXX0=
