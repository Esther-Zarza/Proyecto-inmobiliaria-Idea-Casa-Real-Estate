import { useState, useEffect, createContext } from 'react';
import { fetchData } from '../helpers/axiosHelper';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);
  const [token, setToken] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [loginIn, setLoginIn] = useState(false);

  const [loadingUser, setLoadingUser] = useState(false);

  const logOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const handleFavourite = (id) => {
    let updateFavs;
    if (favourites.includes(id)) {
      updateFavs = favourites.filter((fav) => fav !== id);
    } else {
      updateFavs = [...favourites, id];
    }
    setFavourites(updateFavs);
    localStorage.setItem('favoritos', JSON.stringify(updateFavs));
  };

  useEffect(() => {
    const storedFavourites = localStorage.getItem('favoritos');
    if (storedFavourites) {
      setFavourites(JSON.parse(storedFavourites));
    }
  }, []);


  useEffect(() => {
    let tokenLS = localStorage.getItem("token");

    if(tokenLS){
      const fetchUser = async()=>{
        try {
          const res = await fetchData('/getUserByToken','GET', null, tokenLS)
          setUser(res.data.user);
          setToken(tokenLS);
          setLoadingUser(true);
          
        } catch (error) {
          console.log(error);
        }
      }
      fetchUser();
    }

  }, []);

  // propiedades para páginas públicas
  useEffect(() => {
    const fetchProperties = async() => {
      const res = await fetchData('/getProperties', 'GET');

      if(res.data.properties) {
        setProperties(res.data.properties);
      }
    }
    fetchProperties();
  }, []);
  

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        properties,
        setProperties,
        token,
        setToken,
        logOut,
        handleFavourite,
        favourites,
        loginIn, 
        setLoginIn,
        loadingUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
