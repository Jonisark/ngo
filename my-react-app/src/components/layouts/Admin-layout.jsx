import React from 'react'
import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../store/auth'

const AdminLayout = () => {
  const {userdata,isLoading} = useAuth()
  // console.log('admin layout ',userdata)
  if(isLoading) {
    return <h1>Loading...</h1>
  }
  if(!userdata.isAdmin) {
    return <Navigate to='/' />
  }

  return (
    <header>
        <div className="container">
            <nav>
                <ul>
                    <li><NavLink to='/admin/users'>users</NavLink></li>
                    <li><NavLink to='/admin/contacts'>contacts</NavLink></li>
                    <li><NavLink to='/service'>services</NavLink></li>
                    <li><NavLink to='/'>home</NavLink></li>
                </ul>
            </nav>
        </div>
        <Outlet />
    </header>
  )
}

export default AdminLayout;
