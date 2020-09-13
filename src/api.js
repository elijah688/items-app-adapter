const ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const api = async (path, method, body, auth) => {
  const options = {
    method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth}`,
    },
    body: (body && JSON.stringify(body)) || undefined,
  };

  const response = await fetch(`${ENDPOINT}/${path}`, options);
  return response.json();
};

export const postItem = (body, auth) => api('items', 'POST', body, auth);

export const putItem = (body, id, auth) => api(`items/${id}`, 'PUT', body, auth);

export const deleteItem = (id, auth) => api(`items/${id}`, 'DELETE', null, auth);

export const getItems = (auth) => api('items', 'GET', null, auth);

export const signUp = (body) => api('signup', 'POST', body, null);

export const logIn = (body) => api('login', 'POST', body, null);
