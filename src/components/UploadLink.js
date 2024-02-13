import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ClipLoader } from 'react-spinners'; // Example using react-spinners



function UploadLink() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    try {
      await axios.post('http://localhost:8001/update-link', { url });
      alert('Link updated successfully');
      navigate('/chatbot');
    } catch (error) {
      alert('Failed to update link');
    } finally {
      setIsLoading(false); // Stop loading regardless of outcome
    }
  };


  const containerStyle = {
    display: 'flex',
    flexDirection: 'column', // Ensure children (form and header) are stacked vertically
    justifyContent: 'center', // Center children vertically in the container
    alignItems: 'center', // Center children horizontally in the container
    height: '100vh', // Full viewport height
    backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-network-connection-background_23-2148871843.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column', // Stack form elements vertically
    alignItems: 'center', // Center form elements horizontally
    width: '100%',
    maxWidth: '500px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    marginBottom: '20px',
  };

  const inputStyle = {
    width: '100%',
    marginBottom: '10px',
    padding: '10px',
    fontSize: '16px',
  };

  const buttonStyle = {
    width: 'auto',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    background: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>
        Input your tech doc to receive assistance
      </h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle} disabled={isLoading}>
          {isLoading ? (
            <>
              <ClipLoader size={20} color={"#fff"} /> Loading...
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
}

export default UploadLink;
