import React from 'react';
import LoginGovSVG from 'platform/user/authentication/components/LoginGovSVG';
import IDMeSVG from 'platform/user/authentication/components/IDMeSVG';
import environment from '../../utilities/environment';
import { eauthEnvironmentPrefixes } from '../../utilities/sso/constants';

export const API_VERSION = 'v1';

export const API_SESSION_URL = ({ version = API_VERSION, type = null }) =>
  `${environment.API_URL}/${version}/sessions/${type}/new`;

export const API_SIGN_IN_SERVICE_URL = ({ type = null }) =>
  `${environment.API_URL}/sign_in/${type}/authorize`;

export const AUTH_EVENTS = {
  MODAL_LOGIN: 'login-link-clicked-modal',
  LOGIN: 'login-link-clicked',
  SSO_LOGIN: 'sso-automatic-login',
  SSO_LOGOUT: 'sso-automatic-logout',
  MFA: 'multifactor-link-clicked',
  VERIFY: 'verify-link-clicked',
  LOGOUT: 'logout-link-clicked',
  REGISTER: 'register-link-clicked',
  ERROR_USER_FETCH: 'login-error-user-fetch',
  ERROR_FORCE_NEEDED: 'login-failed-force-needed',
};

export const SERVICE_PROVIDERS = {
  logingov: { label: 'Login.gov', link: 'https://secure.login.gov/account' },
  idme: { label: 'ID.me', link: 'https://wallet.id.me/settings' },
  dslogon: {
    label: 'DS Logon',
    link: 'https://myaccess.dmdc.osd.mil/identitymanagement',
  },
  mhv: { label: 'My HealtheVet', link: 'https://www.myhealth.va.gov' },
  myhealthevet: { label: 'My HealtheVet', link: 'https://www.myhealth.va.gov' },
};

export const CSP_IDS = {
  MHV: 'mhv',
  MHV_VERBOSE: 'myhealthevet',
  ID_ME: 'idme',
  DS_LOGON: 'dslogon',
  LOGIN_GOV: 'logingov',
};

export const AUTHN_SETTINGS = {
  RETURN_URL: 'authReturnUrl',
  REDIRECT_EVENT: 'login-auth-redirect',
};

export const EXTERNAL_APPS = {
  MHV: CSP_IDS.MHV,
  MY_VA_HEALTH: 'myvahealth',
  EBENEFITS: 'ebenefits',
  VA_FLAGSHIP_MOBILE: 'vamobile',
  VA_OCC_MOBILE: 'vaoccmobile',
};

export const MOBILE_APPS = [
  EXTERNAL_APPS.VA_OCC_MOBILE,
  EXTERNAL_APPS.VA_FLAGSHIP_MOBILE,
];

export const OAUTH_ENABLED_APPS = [
  EXTERNAL_APPS.VA_OCC_MOBILE,
  EXTERNAL_APPS.VA_FLAGSHIP_MOBILE,
];

export const OAUTH_ENABLED_POLICIES = [
  CSP_IDS.MHV,
  CSP_IDS.DS_LOGON,
  CSP_IDS.LOGIN_GOV,
  CSP_IDS.ID_ME,
];

export const EBenefitsDefaultPath = '/profilepostauth';

export const eAuthURL = `https://${
  eauthEnvironmentPrefixes[environment.BUILDTYPE]
}eauth.va.gov`;

export const EXTERNAL_LINKS = {
  MY_VA_HEALTH: {
    STAGING: 'https://staging-patientportal.myhealth.va.gov',
    PRODUCTION: 'https://patientportal.myhealth.va.gov',
  },
  MHV: `${eAuthURL}/mhv-portal-web/eauth`,
  EBENEFITS: `${eAuthURL}/ebenefits`,
  VA_FLAGSHIP_MOBILE: `https://${
    eauthEnvironmentPrefixes[environment.BUILDTYPE]
  }fed.eauth.va.gov/oauthe/sps/oauth/oauth20/authorize`,
  VA_OCC_MOBILE: `${eAuthURL}/MAP/users/v2/landing`,
};

export const EXTERNAL_REDIRECTS = {
  [EXTERNAL_APPS.MY_VA_HEALTH]: environment.isProduction()
    ? EXTERNAL_LINKS.MY_VA_HEALTH.PRODUCTION
    : EXTERNAL_LINKS.MY_VA_HEALTH.STAGING,
  [EXTERNAL_APPS.MHV]: EXTERNAL_LINKS.MHV,
  [EXTERNAL_APPS.EBENEFITS]: EXTERNAL_LINKS.EBENEFITS,
  [EXTERNAL_APPS.VA_FLAGSHIP_MOBILE]: EXTERNAL_LINKS.VA_FLAGSHIP_MOBILE,
  [EXTERNAL_APPS.VA_OCC_MOBILE]: EXTERNAL_LINKS.VA_OCC_MOBILE,
};

export const GA_TRACKING_ID_KEY = 'trackingId';
export const GA_CLIENT_ID_KEY = 'clientId';
export const VAGOV_TRACKING_IDS = ['UA-50123418-16', 'UA-50123418-17'];

export const POLICY_TYPES = {
  VERIFY: 'verify',
  MFA: 'mfa',
  SLO: 'slo',
  CUSTOM: 'custom',
  SIGNUP: 'signup',
};

export const SIGNUP_TYPES = {
  [CSP_IDS.ID_ME]: 'idme_signup',
  [CSP_IDS.LOGIN_GOV]: 'logingov_signup',
};

export const CSP_CONTENT = {
  [CSP_IDS.LOGIN_GOV]: { LOGO: <LoginGovSVG />, COPY: 'Login.gov' },
  [CSP_IDS.ID_ME]: { LOGO: <IDMeSVG />, COPY: 'ID.me' },
  [CSP_IDS.DS_LOGON]: { LOGO: <>DS Logon</>, COPY: 'DS Logon' },
  [CSP_IDS.MHV]: { LOGO: <>My HealtheVet</>, COPY: 'My HealtheVet' },
};

export const AUTH_LEVEL = { FAIL: 'fail', SUCCESS: 'success' };
export const AUTH_ERROR = {
  USER_DENIED: '001', // User clicked 'Deny' in Authorization
  USER_CLOCK_MISMATCH: '002', // User clock is incorrect
  SERVER_CLOCK_MISMATCH: '003', // Server timing error
  MVI_MISMATCH: '004', // MVI Mismatch
  SESSION_EXPIRED: '005', // Session Expiration
  DEFAULT: '007', // Catch all (generic/unknown error)
  LOGINGOV_PROOFING_FAIL: '009', // Login.gov Failure to Proof

  MULTIPLE_MHVIDS: '101', // Multiple MHV IDs/IENs
  MULTIPLE_EDIPIS: '102', // Multiple EDIPIS
  ICN_MISMATCH: '103', // ICN Mismatch
  UUID_MISSING: '104', // UUID Missing (Login.gov or ID.me)
  MULTIPLE_CORPIDS: '106', // Multiple Corp IDs
};

export const MHV_TRANSITION_DATE = 'MONTH XX, 20XX';
export const MHV_TRANSITION_TIME = '[x]';
export const ACCOUNT_TRANSITION_DISMISSED = 'accountTransitionDismissed';

export const LINK_TYPES = {
  CREATE: 'create',
  SIGNIN: 'signin',
};

// Keep these KEYS camel case for ease of destructuring
export const AUTH_PARAMS = {
  application: 'application',
  OAuth: 'oauth',
  codeChallenge: 'code_challenge',
  codeChallengeMethod: 'code_challenge_method',
  to: 'to',
};
