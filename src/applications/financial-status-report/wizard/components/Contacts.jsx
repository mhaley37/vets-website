import React from 'react';
import Telephone, {
  CONTACTS,
  PATTERNS,
} from '@department-of-veterans-affairs/component-library/Telephone';

const ContactDMC = () => (
  <>
    Call us at
    <Telephone
      contact={CONTACTS.DMC || '800-827-0648'}
      className="vads-u-margin-x--0p5"
    />
    (or
    <Telephone
      contact={CONTACTS.DMC_OVERSEAS || '1-612-713-6415'}
      pattern={PATTERNS.OUTSIDE_US}
      className="vads-u-margin-x--0p5"
    />
    from overseas). We’re here Monday through Friday, 7:30 a.m. to 7:00 p.m. ET.
    If you have hearing loss, call TTY:
    <Telephone
      contact={CONTACTS[711]}
      pattern={PATTERNS['3_DIGIT']}
      className="vads-u-margin-left--0p5"
    />
    .
  </>
);

export default ContactDMC;
