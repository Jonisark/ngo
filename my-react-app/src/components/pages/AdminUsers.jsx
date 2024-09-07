import React, { useEffect, useState } from 'react'
import { useAuth } from '../../store/auth'
import { Link } from 'react-router-dom';

const AdminUsers = () => {
    const [users, setUsers] = useState([])
    const {authorization,API} = useAuth()
    const getAllUsersData = async(req, res) => {
        try {
            const response = await fetch(`${API}/api/admin/users`, {
                method: 'GET',
                headers: {
                    Authorization: authorization,
                }
            })
            const data = await response.json();
            console.log(data)
            setUsers(data)
        } catch (error) {
            console.error(error)
        }
    };
    useEffect(() => {
        getAllUsersData()
    },[authorization])

    const deleteUser = async(id) => {
        try {
            const response = await fetch(`${API}/api/admin/users/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: authorization,
                }
            })
           const data = await response.json();
           console.log(`users after delete: ${data}`)
           if(response.ok) {
            getAllUsersData()
           }
        } catch (error) {
            console.error(error)
        }
    } 

  return (
    <>
     <section>
        <div>
            <h1>Admin Users Data</h1>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((curUsrs, index) => {
                return <tr key={index}>
                    <td>{curUsrs.username}</td>
                    <td>{curUsrs.email}</td>
                    <td>{curUsrs.phone}</td>
                    <td><Link to={`/admin/users/${curUsrs._id}/edit`}>Edit</Link></td>
                    <td><button onClick={() => deleteUser(curUsrs._id)}>Delete</button></td>
                </tr>
                })}
                </tbody>
            </table>
      
    </div>
     </section>
    </>
  )
}

export default AdminUsers
