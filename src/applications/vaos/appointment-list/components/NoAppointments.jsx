import React from 'react';
import { Link } from 'react-router-dom';
import NewTabAnchor from '../../components/NewTabAnchor';

export default function NoAppointments({
  showScheduleButton,
  startNewAppointmentFlow,
  description = 'appointments',
}) {
  return (
    <>
      <h3 className="vads-u-margin--0 vads-u-margin-bottom--2p5 vads-u-font-size--md">
        You don’t have any {description}
      </h3>
      {showScheduleButton && (
        <>
          <p>
            You can schedule an appointment online now, or call your{' '}
            <NewTabAnchor href="/find-locations">
              VA medical center
            </NewTabAnchor>{' '}
            to schedule an appointment.
          </p>
          <Link
            className="va-button-link vads-u-font-weight--bold vads-u-font-size--md"
            to="/new-appointment"
            onClick={startNewAppointmentFlow}
          >
            Schedule an appointment
          </Link>
        </>
      )}
      {!showScheduleButton && (
        <>
          <p>
            To schedule an appointment, call your{' '}
            <NewTabAnchor href="/find-locations">
              VA Medical center
            </NewTabAnchor>
            .
          </p>
        </>
      )}
    </>
  );
}
