import React from 'react';
import get from '../../../../utilities/data/get';

import {
  getUiOptions,
  getWidget,
  optionsList,
} from '@department-of-veterans-affairs/react-jsonschema-form/lib/utils';

/*
 * This is a minimal string field implementation for the
 * review page, so we can pass custom review widgets
 * in the config
 */
export default function StringField(props) {
  const { registry, schema, uiSchema, formData } = props;
  const uiOptions = getUiOptions(uiSchema);
  const labels = uiOptions.labels || {};
  const enumOptions = Array.isArray(schema.enum) && optionsList(schema);

  let Widget = get('ui:reviewWidget', uiSchema);
  if (!Widget) {
    const defaultWidget = schema.format || (enumOptions ? 'select' : 'text');
    Widget = getWidget(
      schema,
      uiOptions.widget || defaultWidget,
      registry.widgets,
    );
  }

  return (
    <Widget
      options={{ ...uiOptions, enumOptions, labels }}
      value={formData}
      {...props}
    />
  );
}
