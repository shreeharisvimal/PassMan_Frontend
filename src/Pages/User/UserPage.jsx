import React, { useState, lazy, Suspense, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { AuthAxios } from '../../Api/Axios';
import './UserPage.css';

const Navbar = lazy(() => import('../../Components/NavBar/Navbar'));
const Sidebar = lazy(() => import('../../Components/SideBar/SideBar'));
const CreatePass = lazy(() => import('../../Components/passwordCreate/PasswordCreate'));
const MyPass = lazy(() => import('../../Components/MyPassword/MyPass'));
const SavePass = lazy(() => import('../../Components/SavePassword/SavePassword'));

export default function LandingPage() {
  const [activeOption, setActiveOption] = useState('generate');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const LogoutFunc = useCallback(async () => {
    const refresh_token = localStorage.getItem('RefreshToken');
    const token = localStorage.getItem('AccessToken');
    try {
      const res = await AuthAxios.post(
        'user_authentication/logout/',
        { refresh_token: refresh_token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 205) {
        localStorage.removeItem('AccessToken');
        localStorage.removeItem('RefreshToken');
        AuthAxios.defaults.headers.common['Authorization'] = null;
        navigate('/'); 
      }
    } catch (error) {
      console.error('Logout failed:', error);

    }
  }, [navigate]);

  useEffect(() => {
    if (activeOption === 'logout') {
      LogoutFunc();
    }
  }, [activeOption, LogoutFunc]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Navbar />
      <Sidebar activeOption={activeOption} setActiveOption={setActiveOption} />
      {activeOption === 'generate' ? (
        <CreatePass password={password} setPassword={setPassword} />
      ) : (
        <MyPass />
      )}
      {password && <SavePass password={password} setPassword={setPassword} />}
    </Suspense>
  );
}
