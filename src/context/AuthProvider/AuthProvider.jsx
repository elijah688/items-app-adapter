import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { storeToken } from '../../utils/tokenManager';
import { signUp as signUpUser, logIn as logUserIn } from '../../api';
import Toast from '../../components/Toast/Toast';

export const AuthContext = createContext({
  logIn: () => null,
  signUp: () => null,
  error: null,
  setError: null,
});
export default ({ children }) => {
  const [err, setError] = useState(null);
  const history = useHistory();
  const signUp = async (body) => {
    try {
      const { error } = await signUpUser(body);
      if (error) throw error;
    } catch (e) {
      setError(e);
    }
  };

  const logIn = async (body) => {
    try {
      // eslint-disable-next-line camelcase
      const { access_token, error } = await logUserIn(body);
      // eslint-disable-next-line camelcase
      if (access_token) {
        history.push('/items');
        storeToken(access_token);
      }
      throw error || new Error('An error occured');
    } catch (e) {
      setError(e);
    }
  };

  return (
    <AuthContext.Provider value={{ signUp, logIn, error: err, setError }}>
      {children}
    </AuthContext.Provider>
  );
};
