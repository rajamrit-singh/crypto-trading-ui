import React from 'react';
import { Spinner } from 'react-bootstrap';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-overlay"></div>
      <Spinner animation="border" role="status" variant="primary" className="loading-spinner" />
    </div>
  );
};

export default LoadingScreen;
