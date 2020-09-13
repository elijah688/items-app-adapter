const tokenOptions = {
  ACCESS_TOKEN: 'access_token',
};

export const storeToken = (token) => localStorage.setItem(tokenOptions.ACCESS_TOKEN, token);

export const getToken = () => localStorage.getItem(tokenOptions.ACCESS_TOKEN);

export const removeToken = () => localStorage.removeItem(tokenOptions.ACCESS_TOKEN);
