import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { axeCheck } from 'platform/forms-system/test/config/helpers';
import NextOfKin from '../NextOfKin';

describe('pre-check-in', () => {
  describe('Next of kin page', () => {
    let store;
    beforeEach(() => {
      const middleware = [];
      const mockStore = configureStore(middleware);
      const initState = {
        preCheckInData: {
          form: {
            pages: ['first-page', 'second-page', 'third-page', 'fourth-page'],
            currentPage: 'third-page',
          },
        },
      };
      store = mockStore(initState);
    });
    it('page passes axeCheck', () => {
      axeCheck(
        <Provider store={store}>
          <NextOfKin router={{ push: () => {} }} />
        </Provider>,
      );
    });
  });
});
