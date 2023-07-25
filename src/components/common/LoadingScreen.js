import React from 'react';
import { Spinner } from 'react-bootstrap';
import './LoadingScreen.css';
import { useSelector } from 'react-redux';

const LoadingScreen = () => {
  const isLoading = useSelector(state => state.global.isLoading);
  if (!isLoading) {
    return null; 
  }
  return (
    <div className="loading-screen">
      <div className="loading-overlay"></div>
      <Spinner animation="border" role="status" variant="primary" className="loading-spinner" />
    </div>
  );
};

export default LoadingScreen;
