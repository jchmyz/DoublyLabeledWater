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
Object.defineProperty(exports, "__esModule", { value: true });
var recharts_1 = require("recharts");
var React = require("react");
var DLWApp_1 = require("./DLWApp");
var CustomizedAxisTick = /** @class */ (function (_super) {
    __extends(CustomizedAxisTick, _super);
    function CustomizedAxisTick() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomizedAxisTick.prototype.render = function () {
        return (React.createElement("g", { transform: "translate(" + this.props.x + "," + this.props.y + ")" },
            React.createElement("text", { x: 0, y: 0, dy: 16, textAnchor: "end", fill: "#666", transform: "rotate(-35)" }, DLWApp_1.SAMPLE_LABELS[this.props.payload.value])));
    };
    return CustomizedAxisTick;
}(React.PureComponent));
var DeltaScatterChart = /** @class */ (function (_super) {
    __extends(DeltaScatterChart, _super);
    function DeltaScatterChart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeltaScatterChart.prototype.render = function () {
        return (React.createElement(recharts_1.ScatterChart, { height: 400, width: 500, margin: { top: 20, right: 5, bottom: 20, left: 20 } },
            React.createElement(recharts_1.CartesianGrid, { strokeDasharray: "3 3" }),
            React.createElement(recharts_1.XAxis, { type: "number", dataKey: "x", name: "Time of Collection", domain: [-0.5, 4.5], tick: React.createElement(CustomizedAxisTick, null), height: 50, ticks: [0, 1, 2, 3, 4], interval: 0 }),
            React.createElement(recharts_1.YAxis, { yAxisId: "2H", type: "number", dataKey: "y", name: "Measured 2H", domain: [-200, 1000], unit: ' ' + this.props.delta_units, ticks: [0, 200, 400, 600, 800] }),
            React.createElement(recharts_1.YAxis, { yAxisId: "O18", type: "number", dataKey: "y", name: "Measured O18", domain: [-200, 1000], hide: true, unit: ' ' + this.props.delta_units }),
            React.createElement(recharts_1.Tooltip, { formatter: function (value) {
                    return typeof value === "number" ? DLWApp_1.SAMPLE_LABELS[value] : value;
                } }),
            React.createElement(recharts_1.Scatter, { yAxisId: "2H", name: "Measured 2H", data: this.props.chart_data_d_meas, fill: "#ff9900" }),
            React.createElement(recharts_1.Scatter, { yAxisId: "O18", name: "Measured O18", data: this.props.chart_data_o18_meas, fill: "#0000ff" }),
            React.createElement(recharts_1.Legend, { verticalAlign: "top", align: "right", height: 30 })));
    };
    return DeltaScatterChart;
}(React.Component));
exports.DeltaScatterChart = DeltaScatterChart;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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LEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUMsU0FBUyxHQUFFO1lBQzdGLG9CQUFDLGtCQUFPLElBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsY0FBYyxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixFQUFFLElBQUksRUFBQyxTQUFTLEdBQUU7WUFDakcsb0JBQUMsaUJBQU0sSUFBQyxhQUFhLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFFLEVBQUUsR0FBRyxDQUM1QyxDQUNsQixDQUFDO0lBQ04sQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0F0QkEsQUFzQkMsQ0F0QnNDLEtBQUssQ0FBQyxTQUFTLEdBc0JyRDtBQXRCWSw4Q0FBaUIiLCJmaWxlIjoiRGVsdGFTY2F0dGVyQ2hhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NhcnRlc2lhbkdyaWQsIExlZ2VuZCwgU2NhdHRlciwgU2NhdHRlckNoYXJ0LCBUb29sdGlwLCBYQXhpcywgWUF4aXN9IGZyb20gXCJyZWNoYXJ0c1wiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge1NBTVBMRV9MQUJFTFN9IGZyb20gXCIuL0RMV0FwcFwiO1xuXG5cbmNsYXNzIEN1c3RvbWl6ZWRBeGlzVGljayBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQ8YW55PiB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGcgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7dGhpcy5wcm9wcy54fSwke3RoaXMucHJvcHMueX0pYH0+XG4gICAgICAgICAgICAgICAgPHRleHQgeD17MH0geT17MH0gZHk9ezE2fSB0ZXh0QW5jaG9yPVwiZW5kXCIgZmlsbD1cIiM2NjZcIiB0cmFuc2Zvcm09XCJyb3RhdGUoLTM1KVwiPntTQU1QTEVfTEFCRUxTW3RoaXMucHJvcHMucGF5bG9hZC52YWx1ZV19PC90ZXh0PlxuICAgICAgICAgICAgPC9nPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuaW50ZXJmYWNlIERlbHRhU2NhdHRlckNoYXJ0UHJvcHMge1xuICAgIGRlbHRhX3VuaXRzOiBzdHJpbmdcbiAgICBjaGFydF9kYXRhX2RfbWVhczogb2JqZWN0W11cbiAgICBjaGFydF9kYXRhX28xOF9tZWFzOiBvYmplY3RbXVxufVxuXG5leHBvcnQgY2xhc3MgRGVsdGFTY2F0dGVyQ2hhcnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8RGVsdGFTY2F0dGVyQ2hhcnRQcm9wcz4ge1xuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFNjYXR0ZXJDaGFydCBoZWlnaHQ9ezQwMH0gd2lkdGg9ezUwMH0gbWFyZ2luPXt7dG9wOiAyMCwgcmlnaHQ6IDUsIGJvdHRvbTogMjAsIGxlZnQ6IDIwfX0+XG4gICAgICAgICAgICAgICAgPENhcnRlc2lhbkdyaWQgc3Ryb2tlRGFzaGFycmF5PVwiMyAzXCIvPlxuICAgICAgICAgICAgICAgIDxYQXhpcyB0eXBlPVwibnVtYmVyXCIgZGF0YUtleT1cInhcIiBuYW1lPVwiVGltZSBvZiBDb2xsZWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgZG9tYWluPXtbLTAuNSwgNC41XX0gdGljaz17PEN1c3RvbWl6ZWRBeGlzVGljay8+fSBoZWlnaHQ9ezUwfVxuICAgICAgICAgICAgICAgICAgICAgICB0aWNrcz17WzAsIDEsIDIsIDMsIDRdfSBpbnRlcnZhbD17MH0vPlxuICAgICAgICAgICAgICAgIDxZQXhpcyB5QXhpc0lkPVwiMkhcIiB0eXBlPVwibnVtYmVyXCIgZGF0YUtleT1cInlcIiBuYW1lPVwiTWVhc3VyZWQgMkhcIiBkb21haW49e1stMjAwLCAxMDAwXX1cbiAgICAgICAgICAgICAgICAgICAgICAgdW5pdD17JyAnICsgdGhpcy5wcm9wcy5kZWx0YV91bml0c30gdGlja3M9e1swLCAyMDAsIDQwMCwgNjAwLCA4MDBdfS8+XG4gICAgICAgICAgICAgICAgPFlBeGlzIHlBeGlzSWQ9XCJPMThcIiB0eXBlPVwibnVtYmVyXCIgZGF0YUtleT1cInlcIiBuYW1lPVwiTWVhc3VyZWQgTzE4XCIgZG9tYWluPXtbLTIwMCwgMTAwMF19IGhpZGU9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgIHVuaXQ9eycgJyArIHRoaXMucHJvcHMuZGVsdGFfdW5pdHN9Lz5cbiAgICAgICAgICAgICAgICA8VG9vbHRpcCBmb3JtYXR0ZXI9eyh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiID8gU0FNUExFX0xBQkVMU1t2YWx1ZV0gOiB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9fS8+XG4gICAgICAgICAgICAgICAgPFNjYXR0ZXIgeUF4aXNJZD1cIjJIXCIgbmFtZT1cIk1lYXN1cmVkIDJIXCIgZGF0YT17dGhpcy5wcm9wcy5jaGFydF9kYXRhX2RfbWVhc30gZmlsbD1cIiNmZjk5MDBcIi8+XG4gICAgICAgICAgICAgICAgPFNjYXR0ZXIgeUF4aXNJZD1cIk8xOFwiIG5hbWU9XCJNZWFzdXJlZCBPMThcIiBkYXRhPXt0aGlzLnByb3BzLmNoYXJ0X2RhdGFfbzE4X21lYXN9IGZpbGw9XCIjMDAwMGZmXCIvPlxuICAgICAgICAgICAgICAgIDxMZWdlbmQgdmVydGljYWxBbGlnbj1cInRvcFwiIGFsaWduPVwicmlnaHRcIiBoZWlnaHQ9ezMwfS8+XG4gICAgICAgICAgICA8L1NjYXR0ZXJDaGFydD5cbiAgICAgICAgKTtcbiAgICB9XG59Il19
