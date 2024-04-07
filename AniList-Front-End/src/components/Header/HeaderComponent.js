import React, { useEffect, useState } from 'react';
import '../Header/styles/header.css';
import { SearchBar } from '../barraBusqueda/SearchBar';
import { SearchResults } from '../barraBusqueda/SearchResults';
import { useNavigate } from 'react-router-dom';
import backendUrl from '../../ApiConfig';

export const HeaderComponent = ({ userId ,idName,idImage}) => {


  const navigate = useNavigate();
  
  const [results, setResults] = useState([]);
  const [clearSearch, setClearSearch] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  if(idImage === "null"){
    console.log("null");  
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrolledDown = currentScrollPos > prevScrollPos;
  
      setIsHeaderVisible(!isScrolledDown);
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);




  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userImage');
    localStorage.removeItem('token');
    localStorage.removeItem('userBanner');
    navigate('/');
    window.location.reload();
  };
  const toogleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const isUserProfileComponent = (window.location.pathname.startsWith('/user/') || window.location.pathname.startsWith('/anime/'));
  return (
    <div className={`encabezado  ${!isHeaderVisible ? '' : 'transition'} ${isUserProfileComponent ? 'transparent':''}` } style={{transition:'background 0.8s ease 0s, top 0.5s ease 0s'}}>
      <div className='wrap'>

        <a className='logo' href='/'>
          <img src={require('../images/emotico.png')} alt="Portada del anime" />
        </a>
        <h1 className="nav__title">A/F</h1>
        
        <input type='checkbox' id='check' />
        <label htmlFor='check' className='cheackBoton'>
        <ion-icon name="menu-outline" id='icon_menu'></ion-icon>
        </label>
        <div className='wrap_container' id='wrap_id'>

        <div className='links'>
          <a href='/' className='link'>Home</a>
          <a href='/' className='link'>Anime List</a>
          <a href='/Threads' className='link'>Forum</a>
        </div>
        <div className='search-bar-container'>
          <SearchBar setResults={setResults} clearSearch={setClearSearch} />
          <SearchResults results={results} clearSearch={clearSearch} />
        </div>
        
        </div>
        {(userId && idName)? (
          <div className='profile'>
            <img src={(idImage !== null && idImage !== "null") ? `${backendUrl}/usuarios/`+userId+'/profile_picture' : require('../images/profile/profile.png')} 
            alt="profile" onClick={toogleMenu} />
            <div className={`sub_menu_wrap ${isMenuOpen ? 'active' : ''}`} id='subMenu'>
                <div className='sub_menu'>
                  <div className='user_info'>
                    <h2>{idName}</h2>
                  </div>
                  <hr/>
                  <a href={"/user/"+ idName} className='sub_menu_link'>
                    <ion-icon name="person-circle-outline"></ion-icon>
                    <p>Profile</p>
                    <span> > </span>
                  </a>
                  <a href="/settings" className='sub_menu_link'>
                    <ion-icon name="settings-outline"></ion-icon>
                    <p>Settings & Privacy</p>
                    <span> > </span>
                  </a>
                  <div className='sub_menu_link' onClick={handleLogout}>
                    <ion-icon name="log-in-outline"></ion-icon>
                    <p>Logout</p>
                    <span> > </span>
                  </div>
                </div>
              </div>
          </div>
        ) : (
          <div className='profile'>
            <img src={require('../images/profile/profile.png')} alt="profile" onClick={toogleMenu} />
            <div className={`sub_menu_wrap ${isMenuOpen ? 'active' : ''}`} id='subMenu'>
                <div className='sub_menu'>
                  <a href="/Login" className='sub_menu_link'>
                  <ion-icon name="person-outline"></ion-icon>    
                    <p>Login</p>
                    <span> > </span>
                  </a>
                  <a href="/Register" className='sub_menu_link'>
                  <ion-icon name="person-add-outline"></ion-icon>     
                    <p>Register</p>
                    <span> > </span>
                  </a>
                </div>
              </div>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default HeaderComponent;
