const login = async (username, password) => {

  const url = new URL('http://127.0.0.1:8000/login');
  url.search = new URLSearchParams({ username, password }).toString();

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error('Credenciales incorrectas');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data.token;

  } catch (error) {
    throw error;
  }
};



const logout = () => {
  localStorage.removeItem('token');
};

export { login, logout };
