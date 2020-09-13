import React from 'react';
import { shallow } from 'enzyme';
import Items from './Items';

describe('Items', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Items />);
    expect(wrapper).toMatchSnapshot();
  });
});
