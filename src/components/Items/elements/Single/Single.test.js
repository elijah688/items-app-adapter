import React from 'react';
import { shallow } from 'enzyme';
import Single from './Single';

describe('Single', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Single />);
    expect(wrapper).toMatchSnapshot();
  });
});
