import React from 'react';
import Authentication from './Authentication';

describe('Authentication', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Authentication />);
    expect(wrapper).toMatchSnapshot();
  });
});
