import React from 'react';
import { expect } from 'chai';
import SkinDeep from 'skin-deep';
import sinon from 'sinon';
import { mount } from 'enzyme';

import TextWidget from '../../../src/js/widgets/TextWidget';

describe('Schemaform <TextWidget>', () => {
  it('should render', () => {
    const onChange = sinon.spy();
    const tree = SkinDeep.shallowRender(
      <TextWidget
        id="1"
        value="testing"
        schema={{ type: 'string' }}
        required
        disabled={false}
        onChange={onChange}
        options={{}}
      />,
    );
    expect(tree.subTree('input').props.value).to.equal('testing');
    expect(tree.subTree('input').props.type).to.equal('text');
  });
  it('should render autocomplete attribute', () => {
    const onChange = sinon.spy();
    const tree = mount(
      <TextWidget
        id="1"
        value="testing"
        schema={{ type: 'string' }}
        required
        disabled={false}
        onChange={onChange}
        options={{
          autocomplete: 'date',
        }}
      />,
    );
    expect(
      tree
        .find('input')
        .getDOMNode()
        .getAttribute('autocomplete'),
    ).to.equal('date');
    tree.unmount();
  });
  it('should render ariaDescribedby attribute', () => {
    const onChange = sinon.spy();
    const tree = mount(
      <TextWidget
        id="1"
        value="testing"
        schema={{ type: 'string' }}
        required
        disabled={false}
        onChange={onChange}
        options={{
          ariaDescribedby: 'test-id',
        }}
      />,
    );
    expect(
      tree
        .find('input')
        .getDOMNode()
        .getAttribute('aria-describedby'),
    ).to.equal('test-id');
    tree.unmount();
  });
  it('should render ariaDescribedby attribute with pagePerItemIndex', () => {
    const onChange = sinon.spy();
    const tree = mount(
      <TextWidget
        id="1"
        value="testing"
        schema={{ type: 'string' }}
        required
        disabled={false}
        onChange={onChange}
        formContext={{ pagePerItemIndex: 2 }}
        options={{
          ariaDescribedby: 'test_id',
        }}
      />,
    );
    expect(
      tree
        .find('input')
        .getDOMNode()
        .getAttribute('aria-describedby'),
    ).to.equal('test_id_2');
    tree.unmount();
  });
  it('should render empty string when undefined', () => {
    const onChange = sinon.spy();
    const tree = SkinDeep.shallowRender(
      <TextWidget
        id="1"
        schema={{ type: 'string' }}
        required
        disabled={false}
        onChange={onChange}
        options={{}}
      />,
    );
    expect(tree.subTree('input').props.value).to.equal('');
  });
  it('should render number', () => {
    const onChange = sinon.spy();
    const tree = SkinDeep.shallowRender(
      <TextWidget
        id="1"
        value="1"
        schema={{ type: 'number' }}
        required
        disabled={false}
        onChange={onChange}
        options={{}}
      />,
    );
    expect(tree.subTree('input').props.type).to.equal('number');
  });
  it('should handle change', () => {
    const onChange = sinon.spy();
    const tree = SkinDeep.shallowRender(
      <TextWidget
        id="1"
        value="testing"
        schema={{ type: 'string' }}
        required
        disabled={false}
        onChange={onChange}
        options={{}}
      />,
    );
    tree.subTree('input').props.onChange({
      target: {
        value: 'nextvalue',
      },
    });
    expect(onChange.calledWith('nextvalue')).to.be.true;
  });
  it('should handle blur', () => {
    const onChange = sinon.spy();
    const onBlur = sinon.spy();
    const tree = SkinDeep.shallowRender(
      <TextWidget
        id="1"
        value="testing"
        schema={{ type: 'string' }}
        required
        disabled={false}
        onChange={onChange}
        onBlur={onBlur}
        options={{}}
      />,
    );
    tree.subTree('input').props.onBlur();
    expect(onBlur.calledWith('1')).to.be.true;
  });
  it('should pass min max props', () => {
    const tree = SkinDeep.shallowRender(
      <TextWidget
        id="1"
        value={0}
        schema={{ type: 'number', minValue: '0', maxValue: '10' }}
        required
        disabled={false}
        onChange={() => null}
        onBlur={() => null}
        options={{}}
      />,
    );

    expect(tree.subTree('input').props.min).to.equal('0');
    expect(tree.subTree('input').props.max).to.equal('10');
    expect(tree.subTree('input').props.id).to.equal('1');
    expect(tree.subTree('input').props.value).to.equal(0);
  });
  it('should not pass undefined if minLength and maxLength are undefined', () => {
    const tree = SkinDeep.shallowRender(
      <TextWidget
        id="1"
        value={0}
        schema={{ type: 'number' }}
        required
        disabled={false}
        onChange={() => null}
        onBlur={() => null}
        options={{}}
      />,
    );

    expect(tree.subTree('input').props.min).to.not.exist;
    expect(tree.subTree('input').props.max).to.not.exist;
  });
});
