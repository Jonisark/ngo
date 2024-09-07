import React, { useState, } from 'react'
import { useAuth } from '../../store/auth';
import { useNavigate } from 'react-router-dom';

const Sighnup = () => {
  const {storeTokenInLS, API} = useAuth() 
  const [user, setUser] = useState({
    username:'',
    email:'',
    phone:'',
    password:''
  });

  const navigate = useNavigate()
  // const {register} = useContext(AuthContext)

  const handleInputChange = (e) => {
    const {value,name} = e.target;
    setUser((prev) => ({
      ...prev,
      [name]:value,
    }))
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/api/auth/registration`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if(!response.ok) {
        const errorDetails = await response.json();
        console.log('server error',errorDetails)
        throw Error('Network response was not ok')
      };
      const result = await response.json();
      // register(result.token);
      console.log(result)
      setUser({
        username:'',
        email:'',
        phone:'',
        password:''
      });
      alert('Registration successful')
      await storeTokenInLS(result.token)
      navigate('/')
    } catch (error) {
      console.log('Error fetching data',error)
    }
    console.log(user)
  }

  return (
    <div>
      <main>
          <div>
            <div className='container grid grid-two-cols'>
             <div className='registration-image'>
               <img src="\src\components\Images\register-icon-free-16.jpg" alt="image"
               width='500'
               height='500' />
             </div>
             <form onSubmit={handleSubmit} autoComplete='off'>
                <div>
                <label htmlFor="username">User name</label>
              <input 
              type="text"
              placeholder='enter your name'
              name='username'
              value={user.username}
              onChange={handleInputChange} />
                </div>
                <div>
                <label htmlFor="email">email</label>
              <input 
              type="email"
              placeholder='enter your email'
              name='email'
              value={user.email}
              onChange={handleInputChange} />
                </div>
                <div>
                <label htmlFor="phone">phone</label>
              <input 
              type="number"
              placeholder='enter your number'
              name='phone'
              value={user.phone}
              onChange={handleInputChange} />
                </div>
                <div>
                <label htmlFor="password">password</label>
              <input 
              type="password"
              placeholder='enter your password'
              name='password'
              value={user.password}
              autoComplete='off'
              onChange={handleInputChange} />
                </div>
                <div>
                  <button type='submit'>submit</button>
                </div>
             </form>
          </div>
          </div>
      </main>
    </div>
  )
}

export default Sighnup






