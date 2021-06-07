import features from './mocks/enabled.json';

describe('Check In Experience -- ', () => {
  beforeEach(() => {
    cy.intercept('GET', '/v0/feature_toggles*', features);
  });
  it.skip('Does the button check us in', () => {
    cy.visit('/check-in/some-token/details');
    cy.get('h1').contains('Appointment details');
    cy.get('.usa-button').click();
    cy.get('h1').contains("You're now checked in");
  });
});