// import React, { useState } from 'react'
// import{useNavigate} from 'react-router-dom'
// import { useAuth } from '../../store/auth'
// const Login = () => {
//   const [user, setUser] = useState({
//     email: '',
//     password: ''
//   })



//   const navigate = useNavigate()

//   const {storeTokenInLS} = useAuth()

//   const onChangeHandeler = (e) => {
//     const {name, value} = e.target;
//     setUser((prev) => ({
//       ...prev,
//       [name]: value
//     }))
//   }

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`http://localhost:5000/api/auth/login`,
//       {method: 'POST',
//       headers: {
//         "Content-type": 'application/json'
//       },
//     body: JSON.stringify(user)}
//       )
//       console.log(response)
//       if(response.ok) {
//         alert("Login succesful")
//         const res_data = await response.json();
//       console.log('res from server', res_data);
//       storeTokenInLS(res_data.token)
//         navigate('/')
//       }else {
//         alert('login failed')
//       }
//     } catch (error) {
//       console.log('register',error)
//     }
//     console.log('login Data submitted', user)
//     setUser({
//       email:'',
//       password:''
//     })
//   }

//   return (
//     <div>
//       <section>
//         <div>
//           <img src="https://th.bing.com/th/id/R.87e87fa8cb1c4d332a64470d5c3acd89?rik=vuWahGaWKYN5CQ&riu=http%3a%2f%2fdli-eduventure.um.ac.id%2fassets%2fimg%2flogin.png&ehk=hPJNQY6rdxBzsCPJa9ahwTJgf6KEPNQdNr1lfqo1NTk%3d&risl=&pid=ImgRaw&r=0" width='500' height='500' alt="" />
//         </div>
//         <div>
//           <form onSubmit={handleSubmit}>
//             <div>
//             <label htmlFor="email">email</label>
//             <input
//             type="email"
//             name='email'
//             placeholder='email'
//             value={user.email}
//             onChange={onChangeHandeler} />
//             </div>
//             <div>
//             <label htmlFor="password">password</label>
//             <input
//             type="password"
//             name='password'
//             placeholder='password'
//             autoComplete='off'
//             value={user.password}
//             onChange={onChangeHandeler} />
//             </div>
//             <button type='submit'>login</button>
//           </form>
//         </div>
//       </section>
//     </div>
//   )
// }

// export default Login

import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useAuth } from '../../store/auth';

const Login = () => { 
  const navigate = useNavigate();
  const {storeTokenInLS , API} = useAuth()
  console.log(API,'login page')
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        alert('Invalid email or password');
        throw new Error('Invalid email or password');
      }
      const result = await response.json();
      storeTokenInLS(result.token);
      navigate('/');
      alert('Login successful');
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <main>
        <div>
          <form onSubmit={handleSubmit} autoComplete='off'>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                value={user.password}
                autoComplete='off'
                onChange={handleInputChange}
              />
            </div>
            <div>
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
