/**
 * This application creates a widget for notifying users of new features on VA.gov
 *
 * @module platform/site-wide/announcement
 */

import './sass/style.scss';

import React from 'react';
import { Provider } from 'react-redux';

import localStorage from 'platform/utilities/storage/localStorage';

import startReactApp from '../../startup/react';

import { ANNOUNCEMENTS_LOCAL_STORAGE } from './actions';

/**
 * Sets up the Announcement widget with the given store at announcement-root
 *
 * @param {Redux.Store} store The common store used on the site
 */
export default async function startAnnouncement(store) {
  const annoucementRoot = document.getElementById('announcement-root');

  const isDisabled = localStorage.getItem(ANNOUNCEMENTS_LOCAL_STORAGE) === '*';
  if (isDisabled) return;

  const {
    default: Announcement,
  } = await import(/* webpackChunkName: "announcements-widget" */ './containers/Announcement');
  startReactApp(
    <Provider store={store}>
      <Announcement />
    </Provider>,
    annoucementRoot,
  );
}
