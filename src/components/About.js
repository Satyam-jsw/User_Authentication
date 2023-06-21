import React, { useEffect } from 'react'
// import aboutimg1 from '../images/about_liyono.jpg'
import aboutimg2 from '../images/about_kallu.jpg'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
// import aboutimg3 from '../images/about_piyo.jpg'
// import aboutimg4 from '../images/about_ritu.jpg'

const About = () => {


  const navigate = useNavigate();

  const [userData, setUserData] = useState('');

  const CallAboutPage = async () => {
    try {
      const res = await fetch('/about', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content_Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      // console.log(data);

      setUserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      navigate('/login');
    };
  }
  useEffect(() => {
    CallAboutPage();
  }, []);
  
  return (
    <>
      <div className='about-big-div'>
        <div className='about_heading'>
          <h1 id='AH'>Abouts Us</h1>
          <hr/>
          <p id='about-para'>
            Our company is number one branding in favour of technology and development areas field.
            The Best faculty available for delivery content and the already working in various large tech companies.
            In my company all developer are highly skills to guide all those student who secure dream in this domain.
          </p>
          <hr />
          <form method='GET'>
            <div>
              <h3>Name:- {userData.name}</h3>
              <h3>Work:-{userData.work}</h3>
              <h3>Email:-{userData.email}</h3>
            </div>
          </form>
          </div>
          <div className='about_img'>
          <img src={aboutimg2} alt='random.img' />
          </div>


        
  </div>




    </> 
  )
}

export default About;