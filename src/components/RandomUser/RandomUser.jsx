import React, { useEffect, useState } from 'react';

// Función de debounce
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const RandomUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = () => {
    setLoading(true);
    fetch('https://api.randomuser.me/')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const userData = {
          name: data.results[0].name.first,
          email: data.results[0].email,
          picture: data.results[0].picture.thumbnail,
        };
        setUser(userData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
        setLoading(false); // Asegúrate de detener la carga en caso de error
      });
  };

   // Crear una versión debounced de fetchUser
  const debouncedFetchUser = debounce(fetchUser, 2000);

  return (
    <div>
      
      {user ? (
        <div>
          <h1>User Info</h1>
          <img src={user.picture} alt="User" />
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) :  <p> loading...</p>}
      <button onClick={debouncedFetchUser}>Obtener nuevo usuario</button>
    </div>
  );
};

export default RandomUser;