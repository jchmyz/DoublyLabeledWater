"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var DLWApp_1 = require("./DLWApp");
var _main = function () {
    var mount_point = document.getElementById("main");
    try {
        ReactDOM.render(React.createElement(DLWApp_1.DLWApp, null), mount_point);
    }
    catch (e) {
        var error_elements = (React.createElement("div", { className: "startup-error" },
            React.createElement("p", null, "Error rendering application"),
            React.createElement("pre", null, e.toString()),
            React.createElement("p", null, "See error console for stack trace.")));
        console.error("Error with startup", e);
        ReactDOM.render(error_elements, mount_point);
    }
};
exports.main = _main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQStCO0FBQy9CLG9DQUFzQztBQUN0QyxtQ0FBZ0M7QUFFaEMsSUFBSSxLQUFLLEdBQWU7SUFDcEIsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsRCxJQUFJO1FBQ0EsUUFBUSxDQUFDLE1BQU0sQ0FBQyxvQkFBQyxlQUFNLE9BQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztLQUMzQztJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1IsSUFBSSxjQUFjLEdBQUcsQ0FDakIsNkJBQUssU0FBUyxFQUFFLGVBQWU7WUFDM0IsNkRBQWtDO1lBQ2xDLGlDQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBTztZQUN6QixvRUFBeUMsQ0FDdkMsQ0FDVCxDQUFDO1FBQ0YsT0FBTyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxRQUFRLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxXQUFXLENBQUMsQ0FBQztLQUNoRDtBQUNMLENBQUMsQ0FBQztBQUVXLFFBQUEsSUFBSSxHQUFHLEtBQUssQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgKiBhcyBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQge0RMV0FwcH0gZnJvbSBcIi4vRExXQXBwXCI7XG5cbmxldCBfbWFpbjogKCkgPT4gdm9pZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgbW91bnRfcG9pbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW5cIik7XG4gICAgdHJ5IHtcbiAgICAgICAgUmVhY3RET00ucmVuZGVyKDxETFdBcHAvPiwgbW91bnRfcG9pbnQpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgbGV0IGVycm9yX2VsZW1lbnRzID0gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wic3RhcnR1cC1lcnJvclwifT5cbiAgICAgICAgICAgICAgICA8cD5FcnJvciByZW5kZXJpbmcgYXBwbGljYXRpb248L3A+XG4gICAgICAgICAgICAgICAgPHByZT57ZS50b1N0cmluZygpfTwvcHJlPlxuICAgICAgICAgICAgICAgIDxwPlNlZSBlcnJvciBjb25zb2xlIGZvciBzdGFjayB0cmFjZS48L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHdpdGggc3RhcnR1cFwiLCBlKTtcbiAgICAgICAgUmVhY3RET00ucmVuZGVyKGVycm9yX2VsZW1lbnRzLCBtb3VudF9wb2ludCk7XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IG1haW4gPSBfbWFpbjtcbiJdfQ==
