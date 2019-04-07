/*
 * Copyright 2018 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as tslib_1 from "tslib";
import { Button } from "@blueprintjs/core";
import * as React from "react";
import classNames from "classnames";
import * as Classes from "./common/classes";
import { areSameMonth } from "./common/dateUtils";
var DatePickerNavbar = /** @class */ (function (_super) {
    tslib_1.__extends(DatePickerNavbar, _super);
    function DatePickerNavbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleNextClick = function () { return _this.props.onNextClick(); };
        _this.handlePreviousClick = function () { return _this.props.onPreviousClick(); };
        return _this;
    }
    DatePickerNavbar.prototype.render = function () {
        var _a = this.props, classes = _a.classNames, month = _a.month, maxDate = _a.maxDate, minDate = _a.minDate;
        return (React.createElement("div", { className: classNames(Classes.DATEPICKER_NAVBAR, classes.navBar) },
            this.props.hideLeftNavButton || (React.createElement(Button, { className: classes.navButtonPrev, disabled: areSameMonth(month, minDate), icon: "chevron-left", minimal: true, onClick: this.handlePreviousClick })),
            this.props.hideRightNavButton || (React.createElement(Button, { className: classes.navButtonNext, disabled: areSameMonth(month, maxDate), icon: "chevron-right", minimal: true, onClick: this.handleNextClick }))));
    };
    return DatePickerNavbar;
}(React.PureComponent));
export { DatePickerNavbar };
//# sourceMappingURL=datePickerNavbar.js.map