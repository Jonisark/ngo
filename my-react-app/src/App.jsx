import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Login from './components/pages/Login';
import Service from './components/pages/Service';
import Sighnup from './components/pages/Sighnup';
import Navber from './components/Navber';
import Logout from './components/pages/Logout';
import AdminLayout from './components/layouts/Admin-layout';
import AdminUsers from './components/pages/AdminUsers';
import Admin_contact from './components/pages/Admin_contact';
import Admin_update from './components/pages/Admin_update';





const App = () => {
  return (
    <BrowserRouter>
    <Navber />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/service' element={<Service />} />
        <Route path='/sighnup' element={<Sighnup />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/admin' element={<AdminLayout/>}>
          <Route path='users' element={<AdminUsers />} />
          <Route path='contacts' element={<Admin_contact />} />
          <Route path='users/:id/edit' element={<Admin_update />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

