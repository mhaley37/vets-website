import React from 'react';
import { expect } from 'chai';
import moment from 'moment';
import { getCCAppointmentMock, getVAAppointmentMock } from '../../mocks/v0';
import { mockAppointmentInfo } from '../../mocks/helpers';
import { renderWithStoreAndRouter } from '../../mocks/setup';
import { mockFetch } from 'platform/testing/unit/helpers';

import AppointmentsPage from '../../../appointment-list/components/AppointmentsPage';
import { getICSTokens } from '../../../utils/calendar';

const initialState = {
  featureToggles: {
    vaOnlineSchedulingCancel: true,
  },
};

describe('VAOS integration: upcoming CC appointments', () => {
  beforeEach(() => {
    mockFetch();
  });
  it('should show information', async () => {
    const appointmentTime = moment().add(1, 'days');
    const appointment = getCCAppointmentMock();
    appointment.attributes = {
      ...appointment.attributes,
      appointmentTime: appointmentTime
        .clone()
        .add(5, 'hours')
        .format('MM/DD/YYYY HH:mm:ss'),
      timeZone: '-05:00 EST',
      instructionsToVeteran: 'Bring your glasses',
      address: {
        street: '123 Big Sky st',
        city: 'Bozeman',
        state: 'MT',
        zipCode: '59715',
      },
      name: { firstName: 'Jane', lastName: 'Doctor' },
      providerPractice: 'Big sky medical',
      providerPhone: '4065555555',
    };

    mockAppointmentInfo({ cc: [appointment] });
    const {
      findByText,
      baseElement,
      getByText,
      queryByText,
    } = renderWithStoreAndRouter(<AppointmentsPage />, {
      initialState,
    });

    const dateHeader = await findByText(
      new RegExp(appointmentTime.format('dddd, MMMM D, YYYY [at] h:mm a'), 'i'),
    );

    expect(queryByText(/You don’t have any appointments/i)).not.to.exist;
    expect(baseElement).to.contain.text('Community Care');
    expect(baseElement).to.contain.text('Confirmed');
    expect(baseElement).to.contain('.fa-check-circle');

    expect(dateHeader).to.have.tagName('h3');
    expect(getByText(/directions/i)).to.have.attribute(
      'href',
      'https://maps.google.com?saddr=Current+Location&daddr=123 Big Sky st, Bozeman, MT 59715',
    );
    expect(baseElement).to.contain.text('Big sky medical');
    expect(baseElement).to.contain.text('123 Big Sky st');
    expect(baseElement).to.contain.text('Bozeman, MT 59715');
    expect(baseElement).to.contain.text('406-555-5555');
    expect(baseElement).to.contain.text('Special instructions');
    expect(baseElement).to.contain.text('Bring your glasses');
    expect(getByText(/add to calendar/i)).to.have.tagName('a');
    expect(getByText(/cancel appointment/i)).to.have.tagName('button');
    expect(await findByText('Big sky medical')).to.have.tagName('h4');
    expect(await findByText('Special instructions')).to.have.tagName('h4');
  });

  it('should display Community Care header for Vista CC appts', async () => {
    const appointmentTime = moment().add(1, 'days');
    const appointment = getVAAppointmentMock();
    appointment.attributes = {
      ...appointment.attributes,
      startDate: appointmentTime.format(),
      communityCare: true,
      vdsAppointments: { bookingNote: 'scheduler note' },
    };

    mockAppointmentInfo({ cc: [appointment] });
    const {
      findByText,
      baseElement,
      getByText,
      queryByText,
    } = renderWithStoreAndRouter(<AppointmentsPage />, {
      initialState,
    });

    const dateHeader = await findByText(
      new RegExp(appointmentTime.format('dddd, MMMM D, YYYY [at] h:mm a'), 'i'),
    );

    expect(queryByText(/You don’t have any appointments/i)).not.to.exist;
    expect(baseElement).to.contain.text('Community Care');
    expect(baseElement).to.contain.text('Confirmed');
    expect(baseElement).to.contain('.fa-check-circle');

    expect(dateHeader).to.have.tagName('h3');
    expect(queryByText(/directions/i)).not.to.exist;
    expect(baseElement).not.to.contain.text('Special instructions');
    expect(getByText(/add to calendar/i)).to.have.tagName('a');
    expect(getByText(/cancel appointment/i)).to.have.tagName('button');
  });

  it('should not display when over 13 months away', async () => {
    const appointment = getCCAppointmentMock();
    appointment.attributes = {
      ...appointment.attributes,
      appointmentTime: moment()
        .add(14, 'months')
        .format('MM/DD/YYYY HH:mm:ss'),
      timeZone: '+05:00 EST',
    };

    mockAppointmentInfo({ va: [appointment] });
    const { findByText } = renderWithStoreAndRouter(<AppointmentsPage />, {
      initialState,
    });

    expect(await findByText(/You don’t have any appointments/i)).to.exist;
  });

  it('should handle UTC zone', async () => {
    const appointmentTime = moment().add(1, 'days');
    const appointment = getCCAppointmentMock();
    appointment.attributes = {
      ...appointment.attributes,
      appointmentTime: appointmentTime.format('MM/DD/YYYY HH:mm:ss'),
      timeZone: 'UTC',
    };

    mockAppointmentInfo({ cc: [appointment] });
    const { findByText } = renderWithStoreAndRouter(<AppointmentsPage />, {
      initialState,
    });

    const dateHeader = await findByText(
      new RegExp(appointmentTime.format('dddd, MMMM D, YYYY [at] h:mm a'), 'i'),
    );
    expect(dateHeader).to.contain.text('UTC');
  });

  it('should verify community care calendar ics file format', async () => {
    const appointmentTime = moment().add(1, 'days');
    const appointment = getCCAppointmentMock();

    appointment.attributes = {
      ...appointment.attributes,
      appointmentTime: appointmentTime
        .clone()
        .add(5, 'hours')
        .format('MM/DD/YYYY HH:mm:ss'),
      timeZone: '-05:00 EST',
      instructionsToVeteran: 'Bring your glasses',
      address: {
        street: '123 Big Sky st',
        city: 'Bozeman',
        state: 'MT',
        zipCode: '59715',
      },
      name: { firstName: 'Jane', lastName: 'Doctor' },
      providerPractice: 'Big sky medical',
      providerPhone: '4065555555',
    };

    mockAppointmentInfo({ cc: [appointment] });
    const { findByText, getByRole } = renderWithStoreAndRouter(
      <AppointmentsPage />,
      {
        initialState,
      },
    );

    await findByText(
      new RegExp(appointmentTime.format('dddd, MMMM D, YYYY [at] h:mm a'), 'i'),
    );

    const ics = decodeURIComponent(
      getByRole('link', {
        name: `Add ${moment(appointmentTime).format(
          'MMMM D, YYYY',
        )} appointment to your calendar`,
      })
        .getAttribute('href')
        .replace('data:text/calendar;charset=utf-8,', ''),
    );
    const tokens = getICSTokens(ics);

    expect(tokens.get('BEGIN')).includes('VCALENDAR');
    expect(tokens.get('VERSION')).to.equal('2.0');
    expect(tokens.get('PRODID')).to.equal('VA');
    expect(tokens.get('BEGIN')).includes('VEVENT');
    expect(tokens.has('UID')).to.be.true;

    // TODO: Should this be provider practice instead of name???
    expect(tokens.get('SUMMARY')).to.equal('Appointment at Jane Doctor');

    // The description text longer than 74 characters should start newlines with a tab character
    let description = tokens.get('DESCRIPTION');
    description = description.split(/(?=\t)/g); // look ahead include the split character in the results

    expect(description[0]).to.equal(
      'You have a health care appointment with a community care provi',
    );
    expect(description[1]).to.equal(
      '\tder. Please don’t go to your local VA health facility.',
    );
    expect(description[2]).to.equal('\t\\n\\nJane Doctor');
    expect(description[3]).to.equal('\t\\n123 Big Sky st\\n');
    expect(description[4]).to.equal('\tBozeman\\, MT 59715\\n');
    expect(description[5]).to.equal('\t4065555555\\n');
    expect(description[6]).to.equal(
      '\t\\nSign in to https://va.gov/health-care/schedule-view-va-appointments/appo',
    );
    expect(description[7]).to.equal(
      '\tintments to get details about this appointment\\n',
    );
    expect(tokens.get('LOCATION')).to.equal(
      '123 Big Sky st\\, Bozeman\\, MT 59715',
    );
    expect(tokens.get('DTSTAMP')).to.equal(
      `${moment(appointment.attributes.appointmentTime)
        // .utc()
        .format('YYYYMMDDTHHmmss[Z]')}`,
    );
    expect(tokens.get('DTSTART')).to.equal(
      `${moment(appointment.attributes.appointmentTime)
        // .utc()
        .format('YYYYMMDDTHHmmss[Z]')}`,
    );
    expect(tokens.get('DTEND')).to.equal(
      `${moment(appointment.attributes.appointmentTime)
        .add(60, 'minutes')
        // .utc()
        .format('YYYYMMDDTHHmmss[Z]')}`,
    );
    expect(tokens.get('END')).includes('VEVENT');
    expect(tokens.get('END')).includes('VCALENDAR');
  });
});
