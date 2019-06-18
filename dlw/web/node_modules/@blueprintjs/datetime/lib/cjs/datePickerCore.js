"use strict";
/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
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
var months_1 = require("./common/months");
exports.DISABLED_MODIFIER = "disabled";
exports.HOVERED_RANGE_MODIFIER = "hovered-range";
exports.OUTSIDE_MODIFIER = "outside";
exports.SELECTED_MODIFIER = "selected";
exports.SELECTED_RANGE_MODIFIER = "selected-range";
// modifiers the user can't set because they are used by Blueprint or react-day-picker
exports.DISALLOWED_MODIFIERS = [
    exports.DISABLED_MODIFIER,
    exports.HOVERED_RANGE_MODIFIER,
    exports.OUTSIDE_MODIFIER,
    exports.SELECTED_MODIFIER,
    exports.SELECTED_RANGE_MODIFIER,
];
function getDefaultMaxDate() {
    var date = new Date();
    date.setFullYear(date.getFullYear());
    date.setMonth(months_1.Months.DECEMBER, 31);
    return date;
}
exports.getDefaultMaxDate = getDefaultMaxDate;
function getDefaultMinDate() {
    var date = new Date();
    date.setFullYear(date.getFullYear() - 20);
    date.setMonth(months_1.Months.JANUARY, 1);
    return date;
}
exports.getDefaultMinDate = getDefaultMinDate;
function combineModifiers(baseModifiers, userModifiers) {
    var modifiers = baseModifiers;
    if (userModifiers != null) {
        modifiers = {};
        for (var _i = 0, _a = Object.keys(userModifiers); _i < _a.length; _i++) {
            var key = _a[_i];
            if (exports.DISALLOWED_MODIFIERS.indexOf(key) === -1) {
                modifiers[key] = userModifiers[key];
            }
        }
        for (var _b = 0, _c = Object.keys(baseModifiers); _b < _c.length; _b++) {
            var key = _c[_b];
            modifiers[key] = baseModifiers[key];
        }
    }
    return modifiers;
}
exports.combineModifiers = combineModifiers;
//# sourceMappingURL=datePickerCore.js.map