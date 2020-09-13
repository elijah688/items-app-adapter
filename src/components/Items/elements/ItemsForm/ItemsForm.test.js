import React from 'react';
import { shallow } from 'enzyme';
import ItemsForm from './ItemsForm';

describe('ItemsForm', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<ItemsForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
