import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import { FcBusinessman } from "react-icons/fc"
import contactimg1 from '../images/ContactGirls.jpeg'


const Contact = () => {

  const [userData, setUserData] = useState({ name: "", email: "", phone: "", message: "" });
  const navigate = useNavigate();


  const userContact = async () => {
    try {
      const res = await fetch('/getdata', {
        method: "GET",
        headers: {
          "Content_Type": "application/json"
        }
      });
      const data = await res.json();
      // console.log(data);

      setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });

      // console.log(data);


      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;

      }
    } catch (err) {
      console.log(err);
      navigate('/login');
    }
  }

  useEffect(() => {
    userContact();
  }, []);

  //we are storing data in database by using on change and dynamic location of javascript

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });
  }

  // console.log(userData);

  //set data in database using mongodb

  const sendmessage = async (e) => {

    e.preventDefault();
    const { name, email, message, phone } = userData;
    // console.log(userData);



    const res = await fetch('/contact', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        name, email, message, phone
      })
    });

    const data = await res.json();

    console.log(data);

    if (res.status === 422 || !data) {
      console.log('Message does not send try again...');
      alert("please enter a message");
    }
    else {
      alert('Message Send Successfully');
      setUserData({ ...userData, message: "" });
    }

  }
  return (
    <>


      {/* <div className='contact-big-div'>
        <div className='contact_heading'>
          <h1> Contact Us</h1>
        </div>

        <div className='row_ME_inbox'>
          <form method='POST'>
            <input type='email' name='email' id='email' placeholder='Enter mail'
              value={userData.email}
              onChange={handleInput}
            />
            <input type='number' name='phone' id='number' placeholder='Enter Phone Number'
              value={userData.phone}
              onChange={handleInput}
            />
            <input type='name' name='name' id='name' placeholder='name'
              value={userData.name}
              onChange={handleInput}
            />
            <h2>Write your comment:</h2>
            <textarea name="message" placeholder='Enter your Comment' rows={10} cols={60}
              value={userData.message}
              onChange={handleInput} />
            <button type='submit' onClick={sendmessage}> Send message</button>
          </form>
        </div>
      </div> */}

      <div className="contactus ">
        <div className="col-md-5 ">
          <img src={contactimg1} alt={''} style={{ width: "100%",height:"350px" }} />
        </div>

        <div className="col-md-3 ms-2 " >
          <h1 className="bg-dark text-white text-center mt-3">Contact Us</h1>

          <form method='POST'>

            <p id='kio'>
              <FcBusinessman />

              <input type='name' name='name' id='name' placeholder='name'
                value={userData.name}
                onChange={handleInput}
              />

            </p>
            <p id='kio'>
              <BiMailSend />
              <input type='email' name='email' id='email' placeholder='Enter mail'
                value={userData.email}
                onChange={handleInput}
              />
            </p>
            <p id='kio'>
              <BiPhoneCall />
              <input type='number' name='phone' id='number' placeholder='Enter Phone Number'
                value={userData.phone}
                onChange={handleInput}
              />
            </p>
            <textarea name="message" placeholder='Enter your query' rows={4} cols={30} className='txtarea'
              value={userData.message}
              onChange={handleInput} />
            <button type='submit' className='btn btn-primary' onClick={sendmessage}> Send message</button>

          </form>

        </div>
      </div>

    </>
  )
}

export default Contact;