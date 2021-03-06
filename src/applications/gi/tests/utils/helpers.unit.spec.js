import { expect } from 'chai';

import {
  addAllOption,
  convertRatingToStars,
  formatCurrency,
  formatDollarAmount,
  formatNumber,
  handleScrollOnInputFocus,
  isCountryInternational,
  isCountryUSA,
  rubyifyKeys,
  sortOptionsByStateName,
} from '../../utils/helpers';

describe('GIBCT helpers:', () => {
  describe('formatNumber', () => {
    it('should format numbers', () => {
      expect(formatNumber(1000)).to.equal('1,000');
    });
  });

  describe('formatCurrency', () => {
    it('should format currency', () => {
      expect(formatCurrency(1000)).to.equal('$1,000');
    });
    it('should round currency', () => {
      expect(formatCurrency(1000.5)).to.equal('$1,001');
    });
  });

  describe('addAllOption', () => {
    it('should add ALL option', () => {
      const options = [{ label: 'TEST', value: 'TEST' }];
      expect(addAllOption(options).length).to.equal(2);
      expect(addAllOption(options)[0].optionLabel).to.equal('All');
    });
  });

  describe('isCountryInternational', () => {
    it('should recognize USA', () => {
      expect(isCountryInternational('USA')).to.be.false;
    });
    it('should recognize non-USA', () => {
      expect(isCountryInternational('CAN')).to.be.true;
    });
    it('should handle lowercase country names', () => {
      expect(isCountryInternational('usa')).to.be.false;
    });
  });

  describe('isCountryUSA', () => {
    it('should recognize USA', () => {
      expect(isCountryUSA('USA')).to.be.true;
    });
    it('should recognize non-USA', () => {
      expect(isCountryUSA('CAN')).to.be.false;
    });
    it('should handle lowercase country names', () => {
      expect(isCountryUSA('usa')).to.be.true;
    });
  });

  describe('rubyifyKeys', () => {
    it('should properly snake-case keys', () => {
      const data = {
        testKey: '',
      };
      expect(rubyifyKeys(data)).to.have.key('test_key');
    });
  });

  describe('sortOptionsByStateName', () => {
    it('should sort an array of objects by label', () => {
      const data = [
        { value: 'AK', label: 'Alaska' },
        { value: 'AL', label: 'Alabama' },
        { value: 'AR', label: 'Arkansas' },
        { value: 'AZ', label: 'Arizona' },
        { value: 'CA', label: 'California' },
      ];
      const sortedData = [
        { value: 'AL', label: 'Alabama' },
        { value: 'AK', label: 'Alaska' },
        { value: 'AZ', label: 'Arizona' },
        { value: 'AR', label: 'Arkansas' },
        { value: 'CA', label: 'California' },
      ];
      expect(data.sort(sortOptionsByStateName)).to.deep.equal(sortedData);
    });
  });

  describe('formatDollarAmount', () => {
    const data = 100.5;
    expect(formatDollarAmount(data)).to.equal('$101');
  });

  describe('handleScrollOnInputFocus', () => {
    const mainDiv = document.createElement('div');
    let scrolledIntoViewIsCalled = false;
    mainDiv.id = 'test';
    mainDiv.scrollIntoView = () => {
      scrolledIntoViewIsCalled = true;
    };

    it('should scrollIntoView', () => {
      window.innerWidth = 480;
      document.body.appendChild(mainDiv);
      handleScrollOnInputFocus('test');
      expect(scrolledIntoViewIsCalled).to.be.true;
    });
  });

  describe('convertRatingToStars', () => {
    it('returns null for invalid ratings', () => {
      expect(convertRatingToStars('dogs')).to.eq(null);
    });

    it('converts string to number', () => {
      const { full, half, display } = convertRatingToStars('2.24');
      expect(full).to.eq(2);
      expect(half).to.eq(false);
      expect(display).to.eq('2.2');
    });

    it('converts < .3 as a whole number of stars', () => {
      const { full, half, display } = convertRatingToStars(2.24);
      expect(full).to.eq(2);
      expect(half).to.eq(false);
      expect(display).to.eq('2.2');
    });

    it('converts .3 as a half star', () => {
      const { full, half, display } = convertRatingToStars(4.29);
      expect(full).to.eq(4);
      expect(half).to.eq(true);
      expect(display).to.eq('4.3');
    });

    it('converts .7 as a half star', () => {
      const { full, half, display } = convertRatingToStars(4.7);
      expect(full).to.eq(4);
      expect(half).to.eq(true);
      expect(display).to.eq('4.7');
    });

    it('converts more than .7 as a full star', () => {
      const { full, half, display } = convertRatingToStars(3.75);
      expect(full).to.eq(4);
      expect(half).to.eq(false);
      expect(display).to.eq('3.8');
    });
  });
});
