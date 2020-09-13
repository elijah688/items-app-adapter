import React from 'react';
import { shallow } from 'enzyme';
import Toast from './Toast';

describe('Toast', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Toast />);
    expect(wrapper).toMatchSnapshot();
  });
});
