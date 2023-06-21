import React, { useState } from 'react'
import { useEffect } from 'react';
import homeimg from '../images/services.png'
const Home = () => {

  const [userName, setUserName] = useState('');
  const [Flag, setFlag] = useState(false);

  const userHomepage = async () => {
    try {
      const res = await fetch('/getdata', {
        method: "GET",
        headers: {
          "Content_Type": "application/json"
        }
      });
      const data = await res.json();

      setUserName(data.name);
      setFlag(true);

    }
    catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    userHomepage();
  }, []);


  return (

    <>
      <div className='home-page'>
        <div className='home-page-small'>
          <p id='home-top'> WELCOME
            <h1>{userName}</h1>
            <h2>{Flag ? "Hello,to see you back " : "Hi, You are the Mern Developer!!"}</h2>
          </p>
            
         
        </div>
        <div className='home-img'>
              <img src={homeimg} alt='randompickup' className='home12' />
            </div>

      </div>
    </>
  )
}

export default Home