import React from 'react'
import Pageimg from '../images/pagenotfound.png'
import { useNavigate } from 'react-router-dom'

const Pagenotfound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container22">
        <div className='CONT'>
          <img className='Paeimg' src={Pageimg} alt='randompage' />
          <div className="cont">
            <h2>Error 404</h2>
            <h4>Page Not Found</h4>
            <p>
              The page you were looking for does not exist. You may have mistyped the
              URL or the page may have moved.
            </p>
            <button className='a' onClick={() => navigate('/')}>Return Home </button>
          </div>
        </div>
      </div>
    </>

  )
}

export default Pagenotfound;