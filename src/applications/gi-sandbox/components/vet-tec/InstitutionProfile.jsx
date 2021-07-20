import React from 'react';
import _ from 'lodash';

import VetTecApprovedProgramsList from './VetTecApprovedProgramsList';
import ContactInformation from '../profile/ContactInformation';

import VetTecVeteranPrograms from './VetTecVeteranPrograms';
import VetTecEstimateYourBenefits from '../../containers/VetTecEstimateYourBenefits';
import ProfilePageHeader from '../../containers/ProfilePageHeader';
import JumpLink from '../profile/JumpLink';
import ProfileSection from '../profile/ProfileSection';
import CautionaryInformation from '../profile/CautionaryInformation';

export default function InstitutionProfile({
  institution,
  showModal,
  preSelectedProgram,
  selectedProgram,
}) {
  const program =
    selectedProgram ||
    preSelectedProgram ||
    _.get(institution, 'programs[0].description', '');

  const hasPrograms = institution.programs.length > 0;

  return (
    <div>
      <div className="usa-grid vads-u-padding--0 vads-u-margin-bottom--4">
        <div className="usa-width-three-fourths">
          <ProfilePageHeader institution={institution} />
        </div>

        <div className="usa-width-one-fourth">
          <h2 className="vads-u-padding-top--2">On this page</h2>
          {hasPrograms && (
            <JumpLink
              label="Calculate your benefits"
              jumpToId="calculate-your-benefits"
            />
          )}
          <JumpLink label="Approved programs" jumpToId="approved-programs" />
          <JumpLink
            label="Getting started with VET TEC"
            jumpToId="getting-started-with-benefits"
          />
          <JumpLink
            label="Cautionary information"
            jumpToId="cautionary-information"
          />
          <JumpLink label="Veteran programs" jumpToId="veteran-programs" />
          <JumpLink
            label="Get started with CareerScope"
            jumpToId="get-started-with-career-scope"
          />
          <JumpLink
            label="Contact Information"
            jumpToId="contact-information"
          />
        </div>
      </div>
      {hasPrograms && (
        <ProfileSection
          label="Calculate your benefits"
          id="calculate-your-benefits"
        >
          <VetTecEstimateYourBenefits
            institution={institution}
            showModal={showModal}
            selectedProgram={program}
            preSelectedProgram={preSelectedProgram}
          />
        </ProfileSection>
      )}
      <ProfileSection label="Approved programs" id="approved-programs">
        <VetTecApprovedProgramsList
          programs={institution.programs}
          selectedProgram={program}
        />
      </ProfileSection>
      <ProfileSection
        label="Getting started with VET TEC"
        id="getting-started-with-benefits"
      />
      <ProfileSection
        label="Cautionary information"
        id="cautionary-information"
      >
        <CautionaryInformation
          institution={institution}
          onShowModal={showModal}
        />
      </ProfileSection>
      <ProfileSection label="Veteran programs" id="veteran-programs">
        <VetTecVeteranPrograms
          institution={institution}
          onShowModal={showModal}
        />
      </ProfileSection>
      <ProfileSection
        label="Get started with CareerScope"
        id="get-started-with-career-scope"
      >
        CareerScope&#174; take career and educational planning to a new level.
        The proven career assessment and reporting system from the Vocational
        Research Insitute is a powerful, yet easy-to-use program. <br />
        <a
          href="https://va.careerscope.net/gibill"
          rel="noopener noreferrer"
          className="vads-c-action-link--blue"
        >
          Get started with CareerScope
        </a>
      </ProfileSection>{' '}
      <ProfileSection label="Contact Information" id="contact-information">
        <ContactInformation institution={institution} showModal={showModal} />
      </ProfileSection>
    </div>
  );
}
