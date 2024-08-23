import React from 'react';
import './sidebar.css';

function SideBar({activeOption,setActiveOption }) {

  const handleOptionClick = (option) => {
    setActiveOption(option); 
  };

  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <h2 className="settings-heading">Options</h2>
        <div 
          className={`sidebar-option ${activeOption === 'generate' ? 'active' : ''}`} 
          onClick={() => handleOptionClick('generate')}
        >
          Generate Password
        </div>
        <div 
          className={`sidebar-option ${activeOption === 'myPasswords' ? 'active' : ''}`} 
          onClick={() => handleOptionClick('myPasswords')}
        >
          My Passwords
        </div>
      </div>
      <hr className="sidebar-divider" />
      <div className="sidebar-settings">
        <h2 className="settings-heading">Settings</h2>
        <div 
          className={`sidebar-option ${activeOption === 'logout' ? 'active' : ''}`} 
          onClick={() => handleOptionClick('logout')}
        >
          Logout
        </div>
      </div>
    </div>
  );
}

export default SideBar;
