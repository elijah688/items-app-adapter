import React from 'react';
import { shallow } from 'enzyme';
import ItemsPage from './ItemsPage';

describe('ItemsPage', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<ItemsPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
