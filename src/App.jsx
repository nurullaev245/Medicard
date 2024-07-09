
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Employees from './pages/Employees';
import Products from './pages/Products';
import UserList from './pages/UserList';
import UserProfile from './pages/UserProfile';

  
export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}

function App() {
  return (
    
      <Navbar />,
      <Home />,
      <Products />,
      <UserList />,
      <Employees />,
      <UserProfile />
  );
}

export default App;
