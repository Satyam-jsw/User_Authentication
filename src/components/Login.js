import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState();

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    const res = await fetch('/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })

    });
    const data = await res.json();

    // console.log(data);
    // console.log(data.email);

    if (!data || res.status === 422) {
      window.alert("Invalid credentials");
      console.log("Invalid credentials");
    } else {
      window.alert("Login Successfully");
      console.log("Successfully login");
      navigate('/');
    }
  };

  return (
    <>
      <div className='container_page'>
        <div className='bada_page'>
          <h1 className='kll'> Login Here </h1>
          <hr />
          <div className='login-form'>
            <form method="POST" className='login_page'>
              <div className="container1">
                <label><b>Email : </b></label>
                <input type="email" id='email' placeholder="Enter Email" name="email" required=""
                  value={user.email} onChange={e => setUser({ ...user, email: e.target.value })}
                />
                <label><b>Password :</b> </label>
                <input type="password" placeholder="Enter Password" name="password" id='password' required=""
                  value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} />
                <button type="submit" className='login_btn' name='login' onClick={loginUser}>Login </button>
                {/* <NavLink to="/forgetPassword"> forget Password </NavLink> */}
                <NavLink to="/resetPassword"> Reset Password </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login