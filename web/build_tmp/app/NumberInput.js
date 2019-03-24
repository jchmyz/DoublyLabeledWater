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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk51bWJlcklucHV0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSw2QkFBK0I7QUFDL0IsMENBQTBFO0FBVTFFO0lBQWlDLCtCQUFpQztJQUFsRTs7SUFxQkEsQ0FBQztJQW5CRyw0QkFBTSxHQUFOO1FBQUEsaUJBa0JDO1FBakJHLElBQUksSUFBSSxHQUFhLG9CQUFvQixDQUFDO1FBQzFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssRUFBRSxFQUFFO1lBQ3pCLElBQUksR0FBRyxvQkFBb0IsQ0FBQztTQUMvQjthQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2xDLElBQUksR0FBRyxNQUFNLENBQUM7U0FDakI7YUFBTTtZQUNILElBQUksR0FBRyxZQUFZLENBQUM7U0FDdkI7UUFFRCxPQUFPLENBQ0gsb0JBQUMsbUJBQVksSUFBQyxJQUFJLEVBQUUsSUFBSTtZQUNwQixvQkFBQyxpQkFBVSxJQUNQLFFBQVEsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsb0JBQUMsVUFBRyxRQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFPLEVBQ2xGLFFBQVEsRUFBRSxVQUFDLEtBQTZCLElBQUssT0FBQSxLQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBbkQsQ0FBbUQsRUFDaEcsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUN4RCxDQUNsQixDQUFDO0lBQ04sQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FyQkEsQUFxQkMsQ0FyQmdDLEtBQUssQ0FBQyxTQUFTLEdBcUIvQztBQXJCWSxrQ0FBVyIsImZpbGUiOiJOdW1iZXJJbnB1dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Rm9ybUV2ZW50fSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtDb250cm9sR3JvdXAsIElucHV0R3JvdXAsIFRhZywgSWNvbk5hbWV9IGZyb20gXCJAYmx1ZXByaW50anMvY29yZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIE51bWJlcklucHV0UHJvcHMge1xuICAgIHBsYWNlaG9sZGVyOiBzdHJpbmcsXG4gICAgaW5kZXg6IG51bWJlcixcbiAgICBjaGFuZ2VfZnVuY3Rpb246IChpbmRleDogbnVtYmVyLCBldmVudDogRm9ybUV2ZW50PEhUTUxFbGVtZW50PikgPT4gdm9pZFxuICAgIHZhbHVlOiBzdHJpbmcsXG4gICAgdW5pdDogc3RyaW5nXG59XG5cbmV4cG9ydCBjbGFzcyBOdW1iZXJJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxOdW1iZXJJbnB1dFByb3BzPiB7XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBpY29uOiBJY29uTmFtZSA9IFwiY2lyY2xlLWFycm93LXJpZ2h0XCI7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgICAgICBpY29uID0gXCJjaXJjbGUtYXJyb3ctcmlnaHRcIjtcbiAgICAgICAgfSBlbHNlIGlmICghaXNOYU4oK3RoaXMucHJvcHMudmFsdWUpKSB7XG4gICAgICAgICAgICBpY29uID0gXCJ0aWNrXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpY29uID0gXCJiYW4tY2lyY2xlXCI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPENvbnRyb2xHcm91cCBmaWxsPXt0cnVlfT5cbiAgICAgICAgICAgICAgICA8SW5wdXRHcm91cFxuICAgICAgICAgICAgICAgICAgICBsZWZ0SWNvbj17aWNvbn0gY2xhc3NOYW1lPXsnLmJwMy1maWxsJ30gcmlnaHRFbGVtZW50PXs8VGFnPnt0aGlzLnByb3BzLnVuaXR9PC9UYWc+fVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50OiBGb3JtRXZlbnQ8SFRNTEVsZW1lbnQ+KSA9PiB0aGlzLnByb3BzLmNoYW5nZV9mdW5jdGlvbih0aGlzLnByb3BzLmluZGV4LCBldmVudCl9XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXt0aGlzLnByb3BzLnBsYWNlaG9sZGVyfSB2YWx1ZT17dGhpcy5wcm9wcy52YWx1ZX0vPlxuICAgICAgICAgICAgPC9Db250cm9sR3JvdXA+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19
