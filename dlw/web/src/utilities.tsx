import * as moment from 'moment';

const convert_string_to_moment = (input: string): moment.Moment | boolean => {
    let new_moment = moment.parseZone(new Date(input));
    return (new_moment.isValid() ? new_moment : false);
};

export default convert_string_to_moment;