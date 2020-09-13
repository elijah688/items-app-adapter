import React, { createContext } from 'react';
import propTypes from 'prop-types';

export const ItemsContext = createContext({
  loadItems: () => null,
  loading: false,
  editing: false,
  setEditing: () => null,
});

const ItemsProvider = ({ children, loadItems, loading }) => (
  <ItemsContext.Provider value={{ loadItems, loading }}>{children}</ItemsContext.Provider>
);

ItemsProvider.propTypes = {
  children: propTypes.array,
  loading: propTypes.bool,
  loadItems: propTypes.func,
};

ItemsProvider.defaultProps = {
  children: null,
  loadItems: () => null,
  loading: false,
};

export default ItemsProvider;
