const login = async (username, password) => {

  const url = new URL('http://127.0.0.1:8000/login');
  url.search = new URLSearchParams({ username, password }).toString();

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error('Credenciales incorrectas');
    }

    const data = await response.json(); 
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user)); 

    return data;



  } catch (error) {
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user'); 
};

const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const getToken = () => {
  return localStorage.getItem('token');
};

export { login, logout, getUser, getToken };

