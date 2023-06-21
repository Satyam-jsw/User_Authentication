import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <>
            <div className='parent'>
                <div className="Footer">
                    <h1 className='footerStyle'>
                        All Right Reserved &copy; Services   </h1>
                    <div className='text-center mb-3'>
                        <Link to="/About">About  </Link>
                        <Link to="/Contact"> Contact </Link>
                        <Link to="/Policy">Policy </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer