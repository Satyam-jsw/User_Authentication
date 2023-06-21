import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';

const ForgetPassword = () => {

  const { id, token } = useParams();

  const [password, setPassword] = useState('');
  const [message, setMessage] = useState();
  const navigate = useNavigate();
  const userValid = async () => {
    const res = await fetch(`/forgotpassword/${id}/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Accept':"application/json"
      }
    });
   
   console.log(res);
    const data = await res.json();
    console.log('hello12');
     console.log(data);
    if (res.status === 200) {
      // console.log("user valid");
      setPassword('');
      setMessage(true);
    } else {
      window.alert("token expired, Try again !!! ")

    }
  }
  useEffect(() => {
    userValid();
  }, []);


  const setval = (e) => {
    setPassword(e.target.value);
  }

  const sendPassword = async (e) => {
    e.preventDefault();
    console.log(password);
    const res = await fetch(`/changepassword/${id}/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept":"application/json"
      },
      body: JSON.stringify({ password:password })
    });

    const data = await res.json();
    // console.log(res);
    if (res.status === 201) {
      window.alert("pasword changed");
    } else {
      navigate('/')
    }

  }
 

  return (
    <>
      <div className='rst-psw'>
        <p>hellofo</p>
        {message ? <p style={{ color: 'red', fontWeight: 'bold' }}>"Password  successfully update "</p> : ""}

        <form>
          <input
            type="password"
            placeholder="Enter new password"
            id='password'
            value={password}
            onChange={setval}
          />
          <button type='submit' onClick={sendPassword}>Send</button>
        </form>
      </div>
    </>
  )
};

export default ForgetPassword;
