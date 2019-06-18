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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var core_1 = require("@blueprintjs/core");
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
            React.createElement(core_1.InputGroup, __assign({ leftIcon: icon, className: '.bp3-fill', rightElement: React.createElement(core_1.Tag, null, this.props.unit), onChange: function (event) { return _this.props.change_function(_this.props.index, event); }, placeholder: this.props.placeholder, value: this.props.value }, this.props))));
    };
    return NumberInput;
}(React.Component));
exports.NumberInput = NumberInput;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk51bWJlcklucHV0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDZCQUErQjtBQUMvQiwwQ0FBNEY7QUFVNUY7SUFBaUMsK0JBQWlDO0lBQWxFOztJQXFCQSxDQUFDO0lBbkJHLDRCQUFNLEdBQU47UUFBQSxpQkFrQkM7UUFqQkcsSUFBSSxJQUFJLEdBQWEsb0JBQW9CLENBQUM7UUFDMUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxFQUFFLEVBQUU7WUFDekIsSUFBSSxHQUFHLG9CQUFvQixDQUFDO1NBQy9CO2FBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbEMsSUFBSSxHQUFHLE1BQU0sQ0FBQztTQUNqQjthQUFNO1lBQ0gsSUFBSSxHQUFHLFlBQVksQ0FBQztTQUN2QjtRQUVELE9BQU8sQ0FDSCxvQkFBQyxtQkFBWSxJQUFDLElBQUksRUFBRSxJQUFJO1lBQ3BCLG9CQUFDLGlCQUFVLGFBQ1AsUUFBUSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxvQkFBQyxVQUFHLFFBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQU8sRUFDbEYsUUFBUSxFQUFFLFVBQUMsS0FBNkIsSUFBSyxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFuRCxDQUFtRCxFQUNoRyxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFNLElBQUksQ0FBQyxLQUFLLEVBQUcsQ0FDeEUsQ0FDbEIsQ0FBQztJQUNOLENBQUM7SUFDTCxrQkFBQztBQUFELENBckJBLEFBcUJDLENBckJnQyxLQUFLLENBQUMsU0FBUyxHQXFCL0M7QUFyQlksa0NBQVciLCJmaWxlIjoiTnVtYmVySW5wdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Zvcm1FdmVudH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7Q29udHJvbEdyb3VwLCBJbnB1dEdyb3VwLCBUYWcsIEljb25OYW1lLCBJSW5wdXRHcm91cFByb3BzfSBmcm9tIFwiQGJsdWVwcmludGpzL2NvcmVcIjtcblxuZXhwb3J0IGludGVyZmFjZSBOdW1iZXJJbnB1dFByb3BzIGV4dGVuZHMgSUlucHV0R3JvdXBQcm9wcyB7XG4gICAgcGxhY2Vob2xkZXI6IHN0cmluZyxcbiAgICBpbmRleDogbnVtYmVyLFxuICAgIGNoYW5nZV9mdW5jdGlvbjogKGluZGV4OiBudW1iZXIsIGV2ZW50OiBGb3JtRXZlbnQ8SFRNTEVsZW1lbnQ+KSA9PiB2b2lkXG4gICAgdmFsdWU6IHN0cmluZyxcbiAgICB1bml0OiBzdHJpbmdcbn1cblxuZXhwb3J0IGNsYXNzIE51bWJlcklucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PE51bWJlcklucHV0UHJvcHM+IHtcblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IGljb246IEljb25OYW1lID0gXCJjaXJjbGUtYXJyb3ctcmlnaHRcIjtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIGljb24gPSBcImNpcmNsZS1hcnJvdy1yaWdodFwiO1xuICAgICAgICB9IGVsc2UgaWYgKCFpc05hTigrdGhpcy5wcm9wcy52YWx1ZSkpIHtcbiAgICAgICAgICAgIGljb24gPSBcInRpY2tcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGljb24gPSBcImJhbi1jaXJjbGVcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q29udHJvbEdyb3VwIGZpbGw9e3RydWV9PlxuICAgICAgICAgICAgICAgIDxJbnB1dEdyb3VwXG4gICAgICAgICAgICAgICAgICAgIGxlZnRJY29uPXtpY29ufSBjbGFzc05hbWU9eycuYnAzLWZpbGwnfSByaWdodEVsZW1lbnQ9ezxUYWc+e3RoaXMucHJvcHMudW5pdH08L1RhZz59XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQ6IEZvcm1FdmVudDxIVE1MRWxlbWVudD4pID0+IHRoaXMucHJvcHMuY2hhbmdlX2Z1bmN0aW9uKHRoaXMucHJvcHMuaW5kZXgsIGV2ZW50KX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3RoaXMucHJvcHMucGxhY2Vob2xkZXJ9IHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfSB7Li4udGhpcy5wcm9wc30vPlxuICAgICAgICAgICAgPC9Db250cm9sR3JvdXA+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19
