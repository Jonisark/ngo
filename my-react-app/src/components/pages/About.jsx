import React from 'react'
import { useAuth } from '../../store/auth'

const About = () => {
  const {userdata} = useAuth()
  return (
    <div>
      <p>hi {userdata?.username}</p>
    </div>
  )
}

export default About
