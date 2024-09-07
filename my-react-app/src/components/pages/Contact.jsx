import React, { useEffect, useState } from 'react'
import { useAuth } from '../../store/auth'


const Contact = () => {
  const [user, setUser] = useState({
    username:'',
    email:'',
    message: ''
  });
  const [data, setData] = useState(true);

  const {userdata,API} = useAuth();

  useEffect(() => {
    if(userdata && data) {
      setUser({
        username: userdata.username,
        email: userdata.email,
        message: ''
      });
      setData(false);
    }
  },[userdata, data])


  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setUser((prev) =>({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/api/auth/contact`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      });
      if(response.ok) {
        setUser(prev => ({
          ...prev,
          message: ''
        }))
        const data = await response.json();
        console.log(data);
        alert('message send succsfully')
        console.log('form submitted',user)
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
        <div>
          <img src="https://th.bing.com/th/id/R.aa687107de7ff1e807062752b846f036?rik=VgVYRrGe0pIDIA&riu=http%3a%2f%2ftalktotrevor.co.za%2fwp-content%2fuploads%2f2015%2f11%2fContact-Us-PNG.png&ehk=19d8BZyg13oJSF7Pgx2ynIQ4Hvy96JQvm3LXoOAQc%2bE%3d&risl=&pid=ImgRaw&r=0" width='500' alt="" />
        </div>
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
          <label htmlFor="message">message</label>
          <textarea 
          name="message"
          required
          value={user.message}
          onChange={handleInputChange} />
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
        </div>
        </form>
        
      </section>
    </div>
  )
}

export default Contact
