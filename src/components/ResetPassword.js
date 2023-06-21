import React, { useState } from 'react';

const ResetPassword = () => {

    const [email, setEmail] = useState('');
    const [message, setmessage] = useState('');

    const setVal = async (e) => {
        setEmail(e.target.value);
    }
    const sendLink = async (e) => {
        e.preventDefault();
        const res = await fetch('/setpasswordlink', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });
        const data = res.json();
        console.log(data.body);

        if (res.status === 422 || !data) {
            window.alert("Invalid Credentials");
        } else {
            setEmail('');
            setmessage(true);
        }
    }


    return (
        <div className='rst-psw'>
            <h2> Reset Password </h2>
            <form method='POST'>
                <input
                    type="email"
                    placeholder="Enter Email"
                    id='email'
                    value={email}
                    onChange={setVal}
                />
                {message ? <p style={{ color: 'red', fontWeight: 'bold' }}>"Message Send to your Given Email, Please Check Email"</p> : ""}
                <br />
                <button type='submit' onClick={sendLink}>Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
