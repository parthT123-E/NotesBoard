import React from 'react'
import {Routes, Route, useNavigate, Navigate} from "react-router";
import CreatePage from "./pages/CreatePage"
import HomePage from "./pages/HomePage"
import NoteDetailPage from "./pages/NoteDetailPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from './pages/RegisterPage';
import { AuthProvider, useAuth } from "./context/AuthContext";
import NoLoginPage from './pages/NoLoginPage';

const App = () => {

  function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  console.log("PrivateRoute render, user =", user);
  if (loading) return <p>Loading...</p>;
  return user ? children : <Navigate to="/login" replace />;
}


  return (

   
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      
      <Routes>

      <Route path="/" element={<PrivateRoute> <HomePage></HomePage> </PrivateRoute>} />
      <Route path="create" element={<PrivateRoute> <CreatePage></CreatePage> </PrivateRoute>} />
      <Route  path="/notes/:id" element={<PrivateRoute> <NoteDetailPage></NoteDetailPage> </PrivateRoute>}/>
      <Route path="/login" element={<LoginPage></LoginPage>} />
      <Route path="/register" element={<RegisterPage />} />



      </Routes>



    </div>
    
  )
}

export default App
