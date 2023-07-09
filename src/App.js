import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/signup" element={<SignUpPage />}/>
    </Routes>
  );
}

export default App;
