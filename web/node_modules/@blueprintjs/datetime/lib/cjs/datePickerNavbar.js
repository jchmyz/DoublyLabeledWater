"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@blueprintjs/core");
var React = tslib_1.__importStar(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var Classes = tslib_1.__importStar(require("./common/classes"));
var dateUtils_1 = require("./common/dateUtils");
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
        return (React.createElement("div", { className: classnames_1.default(Classes.DATEPICKER_NAVBAR, classes.navBar) },
            this.props.hideLeftNavButton || (React.createElement(core_1.Button, { className: classes.navButtonPrev, disabled: dateUtils_1.areSameMonth(month, minDate), icon: "chevron-left", minimal: true, onClick: this.handlePreviousClick })),
            this.props.hideRightNavButton || (React.createElement(core_1.Button, { className: classes.navButtonNext, disabled: dateUtils_1.areSameMonth(month, maxDate), icon: "chevron-right", minimal: true, onClick: this.handleNextClick }))));
    };
    return DatePickerNavbar;
}(React.PureComponent));
exports.DatePickerNavbar = DatePickerNavbar;
//# sourceMappingURL=datePickerNavbar.js.map