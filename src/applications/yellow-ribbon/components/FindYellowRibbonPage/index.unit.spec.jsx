// Dependencies.
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
// Relative imports.
import { FindYellowRibbonPage } from '.';

describe('Find Yellow Ribbon Page <FindYellowRibbonPage>', () => {
  it('renders what we expect', () => {
    const tree = shallow(<FindYellowRibbonPage />);
    const text = tree.text();

    // Expect there to be:
    expect(text).to.include('Find a Yellow Ribbon school');
    expect(text).to.include(
      'Find out if your school participates in the Yellow Ribbon Program.',
    );
    expect(text).to.include(
      'You may search for schools participating in the current academic year',
    );

    tree.unmount();
  });
});
