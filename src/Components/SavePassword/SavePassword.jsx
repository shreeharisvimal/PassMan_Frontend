import React, { useState } from 'react';
import { AuthAxios } from '../../Api/Axios';
import './save.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SavePassword({ password, setPassword }) {
  const [appName, setAppName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!password) {
      toast.error('Password cannot be empty.');
      return;
    }
    if (!appName.trim()) {
      toast.error('App name cannot be empty.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await AuthAxios.post('password/new_password/', {
        password:password,
        app_name: appName
      });
      console.log(response)
      if (response.status === 201) {
        toast.success('Password saved successfully.');
        setPassword(null);
        setAppName(null);
      }
    } catch (error) {
      toast.error('Failed to save password. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="save-password-container">
      <ToastContainer />
      <div className="password-box">
        <h2 className="password-display">{password}</h2>
      </div>
      <div className="input-container">
        <input
          type="text"
          className="input-password-name"
          value={appName}
          onChange={(e) => setAppName(e.target.value)}
          placeholder="Enter password name"
          required
        />
        <button
          className="save-button"
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
}

export default SavePassword;
