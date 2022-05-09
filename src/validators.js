import { extend } from 'vee-validate';
import { required, email, confirmed, min, max } from 'vee-validate/dist/rules';

extend('email', {
    ...email,
    message: '{_field_} must be a valid email'
});

extend('required', {
    ...required,
    message: '{_field_} is required'
});

extend('confirmed', {
    ...confirmed,
    message: '{_field_} confirmation does not match'
});

extend('min', {
    ...min,
    message: '{_field_} must be at least {length} characters',
});

extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters'
});

extend('selectNoDup', {
    message: '{_field_} duplicate',
    params: ['inputIdx', 'inputArr', 'key'],
    validate: (value, { inputIdx, inputArr, key }) => {
        return inputArr.every((item, index) => {
            return !((item[key] != null) && ((index != inputIdx) && (value.toLowerCase() === item[key].toLowerCase())));
        });
    }
});

extend('noDupNames', {
    message: '{_field_} duplicate',
    params: ['inputArr', 'unedited'],
    validate: (value, { inputArr, unedited }) => {
        unedited = unedited ? unedited.toLowerCase() : null;
        value = value ? value.toLowerCase() : null;
        return (value === unedited) ? true : inputArr.every((item) => {
            return !((value === item.toLowerCase()));
        });
    }
});

