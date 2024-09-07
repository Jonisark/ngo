import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components';
import { useAuth } from '../store/auth';


const Navber = () => {
  const { isLoggedIn } = useAuth();

  return (
    <header>
      <Container>
        <div className="logo-brand">
          <a href="/">Joni Technical</a>
        </div>
        <nav>
          <Ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/service">Service</NavLink></li>
            {isLoggedIn ? (
              <li><NavLink to="/logout">Log out</NavLink></li>
            ) : (
              <>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/sighnup">Sign up</NavLink></li>
              </>
            )}
          </Ul>
        </nav>
      </Container>
    </header>
  );
}

export default Navber

const Container = styled.div`
    max-width: 140rem;
    padding: 4.3rem 2.4rem;
    display: flex;
    justify-content: space-between;
`

const Ul = styled.ul`
    display: flex;
    gap: 3.2rem;
`
                        

                        
                        
                        
                        
                        
                    
