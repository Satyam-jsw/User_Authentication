import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    const navigate = useNavigate();
    
    useEffect(() => {
       fetch('/logout',{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        credentials:"include"
       }).then((res)=>{
            if(res.status===200)
            navigate('/login');
       })
    });

    return (
        <>
            <div>
                <h1>Logout Page </h1>
            </div>
        </>
    )
}

export default Logout