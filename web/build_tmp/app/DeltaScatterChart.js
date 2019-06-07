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
            React.createElement(recharts_1.YAxis, { yAxisId: "O18", type: "number", dataKey: "y", name: "Measured O18", domain: [-25, 125], ticks: [0, 25, 50, 75, 100], unit: ' ' + this.props.delta_units, orientation: "right" }),
            React.createElement(recharts_1.Tooltip, { formatter: function (value) {
                    return typeof value === "number" ? DLWApp_1.SAMPLE_LABELS[value] : value;
                } }),
            React.createElement(recharts_1.Scatter, { yAxisId: "2H", name: "Measured 2H", data: this.props.chart_data_d_meas, fill: "#ff9900" }),
            React.createElement(recharts_1.Scatter, { yAxisId: "O18", name: "Measured 18O", data: this.props.chart_data_o18_meas, fill: "#0000ff" }),
            React.createElement(recharts_1.Legend, { verticalAlign: "top", align: "right", height: 30 })));
    };
    return DeltaScatterChart;
}(React.Component));
exports.DeltaScatterChart = DeltaScatterChart;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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a0JBQU8sSUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxhQUFhLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFDLFNBQVMsR0FBRTtZQUM3RixvQkFBQyxrQkFBTyxJQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLGNBQWMsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLEVBQUMsU0FBUyxHQUFFO1lBQ2pHLG9CQUFDLGlCQUFNLElBQUMsYUFBYSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBRSxFQUFFLEdBQUcsQ0FDNUMsQ0FDbEIsQ0FBQztJQUNOLENBQUM7SUFDTCx3QkFBQztBQUFELENBdEJBLEFBc0JDLENBdEJzQyxLQUFLLENBQUMsU0FBUyxHQXNCckQ7QUF0QlksOENBQWlCIiwiZmlsZSI6IkRlbHRhU2NhdHRlckNoYXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDYXJ0ZXNpYW5HcmlkLCBMZWdlbmQsIFNjYXR0ZXIsIFNjYXR0ZXJDaGFydCwgVG9vbHRpcCwgWEF4aXMsIFlBeGlzfSBmcm9tIFwicmVjaGFydHNcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtTQU1QTEVfTEFCRUxTfSBmcm9tIFwiLi9ETFdBcHBcIjtcblxuXG5jbGFzcyBDdXN0b21pemVkQXhpc1RpY2sgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50PGFueT4ge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxnIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke3RoaXMucHJvcHMueH0sJHt0aGlzLnByb3BzLnl9KWB9PlxuICAgICAgICAgICAgICAgIDx0ZXh0IHg9ezB9IHk9ezB9IGR5PXsxNn0gdGV4dEFuY2hvcj1cImVuZFwiIGZpbGw9XCIjNjY2XCIgdHJhbnNmb3JtPVwicm90YXRlKC0zNSlcIj57U0FNUExFX0xBQkVMU1t0aGlzLnByb3BzLnBheWxvYWQudmFsdWVdfTwvdGV4dD5cbiAgICAgICAgICAgIDwvZz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmludGVyZmFjZSBEZWx0YVNjYXR0ZXJDaGFydFByb3BzIHtcbiAgICBkZWx0YV91bml0czogc3RyaW5nXG4gICAgY2hhcnRfZGF0YV9kX21lYXM6IG9iamVjdFtdXG4gICAgY2hhcnRfZGF0YV9vMThfbWVhczogb2JqZWN0W11cbn1cblxuZXhwb3J0IGNsYXNzIERlbHRhU2NhdHRlckNoYXJ0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PERlbHRhU2NhdHRlckNoYXJ0UHJvcHM+IHtcblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxTY2F0dGVyQ2hhcnQgaGVpZ2h0PXs0MDB9IHdpZHRoPXs1MDB9IG1hcmdpbj17e3RvcDogMjAsIHJpZ2h0OiA1LCBib3R0b206IDIwLCBsZWZ0OiAyMH19PlxuICAgICAgICAgICAgICAgIDxDYXJ0ZXNpYW5HcmlkIHN0cm9rZURhc2hhcnJheT1cIjMgM1wiLz5cbiAgICAgICAgICAgICAgICA8WEF4aXMgdHlwZT1cIm51bWJlclwiIGRhdGFLZXk9XCJ4XCIgbmFtZT1cIlRpbWUgb2YgQ29sbGVjdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgIGRvbWFpbj17Wy0wLjUsIDQuNV19IHRpY2s9ezxDdXN0b21pemVkQXhpc1RpY2svPn0gaGVpZ2h0PXs1MH1cbiAgICAgICAgICAgICAgICAgICAgICAgdGlja3M9e1swLCAxLCAyLCAzLCA0XX0gaW50ZXJ2YWw9ezB9Lz5cbiAgICAgICAgICAgICAgICA8WUF4aXMgeUF4aXNJZD1cIjJIXCIgdHlwZT1cIm51bWJlclwiIGRhdGFLZXk9XCJ5XCIgbmFtZT1cIk1lYXN1cmVkIDJIXCIgZG9tYWluPXtbLTIwMCwgMTAwMF19XG4gICAgICAgICAgICAgICAgICAgICAgIHVuaXQ9eycgJyArIHRoaXMucHJvcHMuZGVsdGFfdW5pdHN9IHRpY2tzPXtbMCwgMjAwLCA0MDAsIDYwMCwgODAwXX0vPlxuICAgICAgICAgICAgICAgIDxZQXhpcyB5QXhpc0lkPVwiTzE4XCIgdHlwZT1cIm51bWJlclwiIGRhdGFLZXk9XCJ5XCIgbmFtZT1cIk1lYXN1cmVkIE8xOFwiIGRvbWFpbj17Wy0yNSwgMTI1XX1cbiAgICAgICAgICAgICAgICAgICAgICAgdGlja3M9e1swLCAyNSwgNTAsIDc1LCAxMDBdfSB1bml0PXsnICcgKyB0aGlzLnByb3BzLmRlbHRhX3VuaXRzfSBvcmllbnRhdGlvbj1cInJpZ2h0XCIvPlxuICAgICAgICAgICAgICAgIDxUb29sdGlwIGZvcm1hdHRlcj17KHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIgPyBTQU1QTEVfTEFCRUxTW3ZhbHVlXSA6IHZhbHVlO1xuICAgICAgICAgICAgICAgIH19Lz5cbiAgICAgICAgICAgICAgICA8U2NhdHRlciB5QXhpc0lkPVwiMkhcIiBuYW1lPVwiTWVhc3VyZWQgMkhcIiBkYXRhPXt0aGlzLnByb3BzLmNoYXJ0X2RhdGFfZF9tZWFzfSBmaWxsPVwiI2ZmOTkwMFwiLz5cbiAgICAgICAgICAgICAgICA8U2NhdHRlciB5QXhpc0lkPVwiTzE4XCIgbmFtZT1cIk1lYXN1cmVkIDE4T1wiIGRhdGE9e3RoaXMucHJvcHMuY2hhcnRfZGF0YV9vMThfbWVhc30gZmlsbD1cIiMwMDAwZmZcIi8+XG4gICAgICAgICAgICAgICAgPExlZ2VuZCB2ZXJ0aWNhbEFsaWduPVwidG9wXCIgYWxpZ249XCJyaWdodFwiIGhlaWdodD17MzB9Lz5cbiAgICAgICAgICAgIDwvU2NhdHRlckNoYXJ0PlxuICAgICAgICApO1xuICAgIH1cbn0iXX0=
