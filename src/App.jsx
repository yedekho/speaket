import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ChatBox from './components/ChatBox';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route 
            path="/login" 
            element={user ? <Navigate to="/chat" /> : <Login />} 
          />
          <Route 
            path="/register" 
            element={user ? <Navigate to="/chat" /> : <Register />} 
          />
          <Route 
            path="/chat" 
            element={
              user ? (
                <div className="max-w-4xl mx-auto p-4 h-screen">
                  <ChatBox chatId="global" currentUserId={user.uid} />
                </div>
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/" 
            element={<Navigate to={user ? "/chat" : "/login"} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;