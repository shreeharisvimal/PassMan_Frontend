import React, { useState } from 'react';
import {AuthAxios} from '../../Api/Axios'
import './passwordCreate.css';

function PasswordCreate({password, setPassword}) {
  const [content, setContent] = useState('');
  const [length, setLength] = useState('');
  const [specialChars, setSpecialChars] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = {
      'content' : content,
      'length' : parseInt(length),
      'specialChars' : specialChars
    }
    try{
      const response = await AuthAxios.post('password/create_new_password/', formData)
      if(response.status === 201){
        console.log(response)
        setPassword(response.data.password)
      }
    }catch(error){
      console.log(error)
    }
    

  };

  return (
    <div className="password-create-container">
      <h2>Create a Password</h2>
      <form onSubmit={handleSubmit} className="password-create-form">
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <input
            type="text"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter content"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="length">Password Length:</label>
          <input
            type="number"
            id="length"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            placeholder="Enter length"
            min="1"
            max={20}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="specialChars">
            <input
              type="checkbox"
              id="specialChars"
              checked={specialChars}
              onChange={() => setSpecialChars(!specialChars)}
            />
            Include Special Characters
          </label>
        </div>
        <button type="submit" className="submit-btn">Generate Password</button>
      </form>
    </div>
  );
}

export default PasswordCreate;
