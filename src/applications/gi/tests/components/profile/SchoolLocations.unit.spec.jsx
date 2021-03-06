import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import SchoolLocations from '../../../components/profile/SchoolLocations';
import { getDefaultState } from '../../helpers';
import ResponsiveTable from '../../../components/ResponsiveTable';

const defaultState = getDefaultState();

describe('<SchoolLocations>', () => {
  it('should have columns and tableClassName', () => {
    const testState = {
      ...defaultState,
      profile: {
        ...defaultState.profile,
        attributes: {
          facilityMap: {
            main: {
              institution: {
                type: 'FOR PROFIT',
                facilityCode: '100',
                institution: 'MAIN FACILITY',
                physicalCity: 'Test',
                physicalState: 'TN',
                physicalCountry: 'USA',
                physicalZip: '12345',
                country: 'USA',
                dodBah: '100',
              },
              extensions: [],
              branches: [],
            },
          },
        },
      },
    };

    const wrapper = shallow(
      <SchoolLocations
        institution={testState.profile.attributes}
        facilityMap={testState.profile.attributes.facilityMap}
        calculator={testState.calculator}
        eligibility={testState.eligibility}
        constants={testState.constants}
      />,
    );

    const facilityTable = wrapper.find(ResponsiveTable);
    expect(facilityTable).to.have.lengthOf(1);
    ['School name', 'Location', 'Estimated housing'].forEach(column => {
      expect(facilityTable.props().columns).include(column);
    });
    expect(facilityTable.props().tableClass).to.eq('school-locations');
    expect(facilityTable.props().data).to.have.length(1);

    wrapper.unmount();
  });

  it('should render main row', () => {
    const testState = {
      ...defaultState,
      profile: {
        ...defaultState.profile,
        attributes: {
          facilityMap: {
            main: {
              institution: {
                type: 'FOR PROFIT',
                facilityCode: '100',
                institution: 'MAIN FACILITY',
                physicalCity: 'Test',
                physicalState: 'TN',
                physicalCountry: 'USA',
                physicalZip: '12345',
                country: 'USA',
                dodBah: '100',
              },
              extensions: [],
              branches: [],
            },
          },
        },
      },
    };
    const facilityMap = testState.profile.attributes.facilityMap;
    const wrapper = shallow(
      <SchoolLocations
        institution={testState.profile.attributes}
        facilityMap={facilityMap}
        calculator={testState.calculator}
        eligibility={testState.eligibility}
        constants={testState.constants}
      />,
    );

    const facilityTable = wrapper.find(ResponsiveTable);
    expect(facilityTable).to.have.lengthOf(1);
    expect(facilityTable.props().data).to.have.length(1);
    expect(facilityTable.props().data[0].key).to.eq(
      `${facilityMap.main.institution.facilityCode}-main`,
    );
    expect(facilityTable.props().data[0].rowClassName).to.eq('main-row');
    wrapper.unmount();
  });

  it('should render main branch with extensions', () => {
    const testState = {
      ...defaultState,
      profile: {
        ...defaultState.profile,
        attributes: {
          facilityMap: {
            main: {
              institution: {
                type: 'FOR PROFIT',
                facilityCode: '100',
                institution: 'MAIN FACILITY',
                physicalCity: 'Test',
                physicalState: 'TN',
                physicalCountry: 'USA',
                physicalZip: '12345',
                country: 'USA',
                dodBah: '100',
              },
              extensions: [],
              branches: [
                {
                  institution: {
                    type: 'FOR PROFIT',
                    facilityCode: '101',
                    institution: 'MAIN BRANCH FACILITY',
                    physicalCity: 'Test',
                    physicalState: 'TN',
                    physicalCountry: 'USA',
                    physicalZip: '12345',
                    country: 'USA',
                    dodBah: '100',
                  },
                  extensions: [
                    {
                      type: 'FOR PROFIT',
                      facilityCode: '102',
                      institution: 'BRANCH EXTENSION FACILITY',
                      physicalCity: 'Test',
                      physicalState: 'TN',
                      physicalCountry: 'USA',
                      physicalZip: '12345',
                      country: 'USA',
                      dodBah: '100',
                    },
                  ],
                },
              ],
            },
          },
        },
      },
    };

    const wrapper = shallow(
      <SchoolLocations
        institution={testState.profile.attributes}
        facilityMap={testState.profile.attributes.facilityMap}
        calculator={testState.calculator}
        eligibility={testState.eligibility}
        constants={testState.constants}
      />,
    );

    const facilityTable = wrapper.find(ResponsiveTable);
    expect(facilityTable.props().data).to.have.length(3);
    wrapper.unmount();
  });

  it('should render extension', () => {
    const testState = {
      ...defaultState,
      profile: {
        ...defaultState.profile,
        attributes: {
          facilityMap: {
            main: {
              institution: {
                institution: 'MAIN FACILITY',
                type: 'FOR PROFIT',
                facilityCode: '100',
                physicalCity: 'Test',
                physicalState: 'TN',
                physicalCountry: 'USA',
                physicalZip: '12345',
                country: 'USA',
                dodBah: '100',
              },
              extensions: [
                {
                  type: 'FOR PROFIT',
                  facilityCode: '100',
                  institution: 'MAIN EXTENSION FACILITY',
                  physicalCity: 'Test',
                  physicalState: 'TN',
                  physicalCountry: 'USA',
                  physicalZip: '12345',
                  country: 'USA',
                  dodBah: '100',
                },
              ],
              branches: [],
            },
          },
        },
      },
    };

    const wrapper = shallow(
      <SchoolLocations
        institution={testState.profile.attributes}
        facilityMap={testState.profile.attributes.facilityMap}
        calculator={testState.calculator}
        eligibility={testState.eligibility}
        constants={testState.constants}
      />,
    );
    const facilityTable = wrapper.find(ResponsiveTable);
    expect(facilityTable.props().data).to.have.length(2);
    wrapper.unmount();
  });
});
