import moment from 'moment';

import { parseISODate } from 'platform/forms-system/src/js/helpers';
import { isValidYear } from 'platform/forms-system/src/js/utilities/validations';

import { FORMAT_YMD } from '../constants';

import { issueErrorMessages } from '../content/addIssue';

const minDate = moment()
  .subtract(1, 'year')
  .startOf('day');

const maxDate = moment().startOf('day');

export const validateDate = (errors, dateString) => {
  const { day, month, year } = parseISODate(dateString);
  const date = moment(dateString, FORMAT_YMD);
  if (dateString === 'XXXX-XX-XX' || dateString === '') {
    errors.addError(issueErrorMessages.missingDecisionDate);
  } else if (!day || !month) {
    errors.addError(issueErrorMessages.invalidDate);
  } else if (year?.length >= 4 && !isValidYear(year)) {
    errors.addError(
      issueErrorMessages.invalidDateRange(minDate.year(), maxDate.year()),
    );
  } else if (date.isSameOrAfter(maxDate)) {
    // Lighthouse won't accept same day (as submission) decision date
    errors.addError(issueErrorMessages.pastDate);
  } else if (date.isBefore(minDate)) {
    errors.addError(issueErrorMessages.newerDate);
  }
};

/**
 * Use above validation to set initial edit state
 */
export const isValidDate = dateString => {
  let isValid = true;
  const errors = {
    addError: () => {
      isValid = false;
    },
  };
  validateDate(errors, dateString);
  return isValid;
};
