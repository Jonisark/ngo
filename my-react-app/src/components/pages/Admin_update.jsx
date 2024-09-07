import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../store/auth'

const Admin_update = () => {
  const [user,setUser] = useState({
    username:'',
    email:'',
    phone:''
  })

  const params = useParams()
  const {authorization, API} = useAuth();

  const getSingleUserData = async(id) => {
    try {
        const response = await fetch(`${API}/api/admin/users/${params.id}`, {
            method: 'GET',
            headers: {
                Authorization: authorization,
            }
        });
       const data = await response.json();
       setUser(data)
     
    } catch (error) {
        console.error(error)
    }
} 

useEffect(() => {
  getSingleUserData(params.id);
}, [params.id]);



const handleInputChange = (e) => {
  const { name, value } = e.target;
  setUser(prevState => ({
    ...prevState,
    [name]: value
  }));
};

const handleSubmit = async(e) => {
  e.preventDefault();
  try {
    const response = await fetch(`${API}/api/admin/users/update/${params.id}`,{
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
          Authorization: authorization,
      },
      body:JSON.stringify(user)
  })
  if(response.ok) {
    alert('updated succesfuly')
  }
  } catch (error) {
    console.log(error)
  }
}

  return (
    <div>
      <section>
        <form onSubmit={handleSubmit}>
          <div>
        <h1>update user data</h1>
        <div>
          <label htmlFor="name">name</label>
          <input 
          type="text"
          name='username'
          placeholder='name'
          required
          value={user.username}
          onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input 
          type="email"
          name='email'
          placeholder='email'
          required
          value={user.email}
          onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="phone">phone</label>
          <input 
          type="tel"
          name='phone'
          placeholder='phone'
          required
          value={user.phone}
          onChange={handleInputChange} />
        </div>
        <div>
          <button type='submit'>update</button>
        </div>
        </div>
        </form>
        
      </section>
    </div>
  )
};

export default Admin_update
