import basicUser from './fixtures/users/user-basic.json';
import features from '../../../questionnaire/tests/e2e/fixtures/mocks/feature-toggles.enabled.json';

// Skipped due to build differences in different CI servers
it.skip('health care questionnaire list -- loads manager page -- bread crumbs exists', () => {
  cy.intercept('GET', '/v0/feature_toggles*', features);
  cy.login(basicUser);
  const featureUrl = '/health-care/health-questionnaires/questionnaires/';
  cy.visit(featureUrl);
  cy.get('#va-breadcrumbs-list')
    .children()
    .should('have.length', 3);
});
