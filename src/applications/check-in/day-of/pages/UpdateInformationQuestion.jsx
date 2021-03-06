import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import recordEvent from 'platform/monitoring/record-event';
import { focusElement } from 'platform/utilities/ui';

import { useFormRouting } from '../../hooks/useFormRouting';
import BackToHome from '../../components/BackToHome';
import Footer from '../../components/Footer';
import { URLS } from '../../utils/navigation';

const UpdateInformationQuestion = props => {
  useEffect(() => {
    focusElement('h1');
  }, []);
  const { router } = props;
  const { jumpToPage, goToNextPage } = useFormRouting(router);

  const noButtonClicked = useCallback(
    () => {
      recordEvent({
        event: 'cta-button-click',
        'button-click-label': 'no-to-update-information',
      });
      goToNextPage();
    },
    [goToNextPage],
  );

  const yesButtonClicked = useCallback(
    () => {
      recordEvent({
        event: 'cta-button-click',
        'button-click-label': 'yes-to-update-information',
      });
      jumpToPage(URLS.SEE_STAFF);
    },
    [jumpToPage],
  );

  return (
    <div className="vads-l-grid-container vads-u-padding-y--5 update-information">
      <fieldset>
        <legend>
          <h1>Do you need to update any information?</h1>
          <p>
            This includes information like your phone number, address, insurance
            plan, or next-of-kin.
          </p>
        </legend>
        <button
          data-testid="yes-button"
          className="usa-button-secondary usa-button-big"
          onClick={yesButtonClicked}
          type="button"
        >
          Yes
        </button>
        <button
          data-testid="no-button"
          className="usa-button-secondary usa-button-big"
          onClick={noButtonClicked}
          type="button"
        >
          No
        </button>
      </fieldset>

      <Footer />
      <BackToHome />
    </div>
  );
};

UpdateInformationQuestion.propTypes = {
  router: PropTypes.object,
};

export default UpdateInformationQuestion;
