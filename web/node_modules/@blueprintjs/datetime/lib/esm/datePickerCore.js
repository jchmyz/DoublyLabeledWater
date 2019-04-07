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
import { Months } from "./common/months";
export var DISABLED_MODIFIER = "disabled";
export var HOVERED_RANGE_MODIFIER = "hovered-range";
export var OUTSIDE_MODIFIER = "outside";
export var SELECTED_MODIFIER = "selected";
export var SELECTED_RANGE_MODIFIER = "selected-range";
// modifiers the user can't set because they are used by Blueprint or react-day-picker
export var DISALLOWED_MODIFIERS = [
    DISABLED_MODIFIER,
    HOVERED_RANGE_MODIFIER,
    OUTSIDE_MODIFIER,
    SELECTED_MODIFIER,
    SELECTED_RANGE_MODIFIER,
];
export function getDefaultMaxDate() {
    var date = new Date();
    date.setFullYear(date.getFullYear());
    date.setMonth(Months.DECEMBER, 31);
    return date;
}
export function getDefaultMinDate() {
    var date = new Date();
    date.setFullYear(date.getFullYear() - 20);
    date.setMonth(Months.JANUARY, 1);
    return date;
}
export function combineModifiers(baseModifiers, userModifiers) {
    var modifiers = baseModifiers;
    if (userModifiers != null) {
        modifiers = {};
        for (var _i = 0, _a = Object.keys(userModifiers); _i < _a.length; _i++) {
            var key = _a[_i];
            if (DISALLOWED_MODIFIERS.indexOf(key) === -1) {
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
//# sourceMappingURL=datePickerCore.js.map