import set from 'platform/utilities/data/set';

import * as address from 'platform/forms/definitions/address';
import dateUI from 'platform/forms-system/src/js/definitions/date';

export default function createOldSchoolPage(schema) {
  const { trainingEndDate, reasonForChange } = schema.properties;
  const { school, date } = schema.definitions;
  return {
    path: 'school-selection/old-school',
    title:
      'School, university, program, or training facility you last attended',
    initialData: {
      oldSchool: {
        address: {},
      },
    },
    uiSchema: {
      'ui:title':
        'School, university, program, or training facility you last attended',
      oldSchool: {
        name: {
          'ui:title':
            'Name of school, university, program, or training facility',
        },
        address: address.uiSchema(),
      },
      trainingEndDate: dateUI(
        'When did you stop taking classes or participating in the training program? (Future dates are ok.)',
      ),
      reasonForChange: {
        'ui:title':
          'Why did you stop taking classes or participating in the training program? (for example, “I graduated” or “I moved” or “The program wasn’t right for me.”)',
      },
    },
    schema: {
      type: 'object',
      definitions: {
        date,
      },
      properties: {
        oldSchool: set('properties.address', address.schema(schema), school),
        trainingEndDate,
        reasonForChange,
      },
    },
  };
}
