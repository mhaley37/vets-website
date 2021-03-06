import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import Appointments from '~/applications/personalization/dashboard/components/health-care/Appointments';

import {
  upcomingVAAppointment,
  upcomingCCAppointment,
  upcomingVideoAppointment,
} from '~/applications/personalization/dashboard/utils/appointments';

describe('Appointments', () => {
  describe('when we have an upcoming VA appointment', () => {
    const props = {
      authenticatedWithSSOe: true,
      appointments: upcomingVAAppointment,
    };
    const wrapper = mount(<Appointments {...props} />);

    it('should render all necessary elements', () => {
      expect(wrapper.text()).to.contain('Cheyenne VA Medical Center');
      expect(wrapper.text()).to.contain(
        'Schedule and manage your appointments',
      );
      wrapper.unmount();
    });
  });

  describe('when we have an upcoming CC appointment', () => {
    const props = {
      authenticatedWithSSOe: true,
      appointments: upcomingCCAppointment,
    };

    const wrapper = mount(<Appointments {...props} />);

    it('should render all necessary elements', () => {
      expect(wrapper.text()).to.contain('Jeckle and Hyde');
      expect(wrapper.text()).to.contain(
        'Schedule and manage your appointments',
      );
      wrapper.unmount();
    });
  });

  describe('when we have an upcoming video appointment', () => {
    const props = {
      authenticatedWithSSOe: true,
      appointments: upcomingVideoAppointment,
    };
    const wrapper = mount(<Appointments {...props} />);

    it('should render all necessary elements', () => {
      expect(wrapper.text()).to.contain('VA Video Connect at home');
      expect(wrapper.text()).to.contain(
        'Schedule and manage your appointments',
      );
      wrapper.unmount();
    });
  });
});
