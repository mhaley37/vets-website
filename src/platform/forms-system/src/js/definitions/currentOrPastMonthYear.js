import { validateCurrentOrPastMonthYear } from '../validation';
import monthYearUI from './monthYear';

export default function uiSchema(title = 'Date') {
  return {
    ...monthYearUI(title),
    'ui:validations': [validateCurrentOrPastMonthYear],
    'ui:errorMessages': {
      pattern: 'Please enter a valid current or past date',
      required: 'Please enter a date',
    },
  };
}
