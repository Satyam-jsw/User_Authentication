import React, { useState } from 'react'
import { NavLink,Link , useNavigate } from 'react-router-dom'
import signimg from '../images/signup.jpeg'


const Register = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", phone: "", work: "", password: "", cpassword: "" });
  const PostData = async (e) => {
    e.preventDefault();
    // console.log("here");
    const { name, email, phone, work, password, cpassword } = user;

    // console.log(user);

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        name, email, phone, work, password, cpassword
      })
    });

    const data  = await res.json();
   
    if (res.status === 422 || !data) {
      window.alert('Invalid Registration');
      console.log("Invalid Registration");
    } else {
        window.alert("Registration Successfully ");
        console.log("Resgistration Successfully");
      navigate("/");
    }
  };
  return (
    <>
      <div className='row-sp'>
        <div className='reg'>
          <form method="POST" className=''>
            <div className='container-reg'>
              <h1 className='kl'>Register</h1>
              <p className='kl'>Please Fill the form to Create Account</p>
              <hr />
              <div className='form-text'>
                <input type='string' id='name' name='name' required
                  value={user.name}
                  onChange={e => setUser({ ...user, name: e.target.value })} placeholder='Enter Name' />
                <input type='text' placeholder='Enter Email' id='email' name='email' required
                  value={user.email}
                  onChange={e => setUser({ ...user, email: e.target.value })} />
                <input type='tel' placeholder='Enter Phone Number' id='phone' name='phone' required
                  value={user.phone}
                  onChange={e => setUser({ ...user, phone: e.target.value })} />
                <input type='text' placeholder='Enter Profession' id='work' name='work' required
                  value={user.work}
                  onChange={e => setUser({ ...user, work: e.target.value })} />
                <input type='password' placeholder='Enter Password' id='psw' name='password' required
                  value={user.password}
                  onChange={e => setUser({ ...user, password: e.target.value })} />
                <input type='password' placeholder='Re-Enter  Password' id='cpsw' name='cpassword' required
                  value={user.cpassword}
                  onChange={e => setUser({ ...user, cpassword: e.target.value })} />
              </div>
              <div className='klb'>
                <button type='submit' className='btn btn-primary' name="register" onClick={PostData}>Register</button>
                {/* <input type='submit' name='register' id='signup' className='form-submit' value='register' onClick={PostData} /> */}
              </div>
            </div>
            <div className='kl2'>
              <div > Already Have an Account? <Link to="/login"> Login</Link></div>
            </div>
            <hr />
            <div className='kl2'>By creating an account you agree our <Link to="*"> Terms & Policy</Link></div>
          </form>
        </div>
        <div className='signup-img'>
          <img className='img_of_signup' src={signimg} alt='random-img' />
          {/* <NavLink to="/login" className="sigup-img-link">raju come from signup page from bottomF</NavLink> */}
        </div>
      </div>
    </>

  )
}

export default Register