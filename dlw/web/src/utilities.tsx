import * as moment from 'moment';

export const convert_string_to_moment = (input: string): moment.Moment | boolean => {
    let new_moment = moment.parseZone(new Date(input));
    return (new_moment.isValid() ? new_moment : false);
};

export const check_array_for_missing_values = (arr: any[], null_val: any) => {
    return !((arr[0] == null_val) ||
        ((arr[1] == null_val) && (arr[2] == null_val)) ||
        ((arr[3] == null_val) && (arr[4] == null_val)));
};

export const pad = (n: number) => {
    return n < 10 ? '0' + n : n
};
