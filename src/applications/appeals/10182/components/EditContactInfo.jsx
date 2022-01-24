import React from 'react';

import InitializeVAPServiceID from '@@vap-svc/containers/InitializeVAPServiceID';
import ProfileInformationFieldController from '@@vap-svc/components/ProfileInformationFieldController';
import { FIELD_NAMES } from '@@vap-svc/constants';

const buildPage = ({ title, field, goToPath }) => (
  <div
    className="va-profile-wrapper"
    onSubmit={event => {
      // This prevents this nested form submit event from passing to the
      // outer form and causing a page advance
      event.stopPropagation();
    }}
  >
    <InitializeVAPServiceID>
      <h3>{title}</h3>
      <ProfileInformationFieldController
        forceEditView
        fieldName={FIELD_NAMES[field]}
        isDeleteDisabled
        cancelCallback={() => {
          goToPath('/contact-information');
        }}
        successCallback={() => {
          goToPath('/contact-information');
        }}
      />
    </InitializeVAPServiceID>
  </div>
);

export const EditPhone = ({ title, goToPath }) =>
  buildPage({ title, goToPath, field: 'MOBILE_PHONE' });

export const EditEmail = ({ title, goToPath }) =>
  buildPage({ title, goToPath, field: 'EMAIL' });

export const EditAddress = ({ title, goToPath }) =>
  buildPage({ title, goToPath, field: 'MAILING_ADDRESS' });
