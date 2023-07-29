import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-20 flex justify-between items-center text-gray-300 bg-blue-gray-900 font-semibold text-[17px] px-6 cursor-pointer z-10'>
        <div className='text-[22px]'>
            <Link to='/'>
            <h1 >Tutor App</h1>
            </Link>
        </div>
        {/* menu */}
        <div className=''>
            <ul className='flex'>
                <Link to='/'>
                    <li className='px-4'>Home</li>
                </Link>
                <Link to='/students'>
                    <li className='px-4'>Students</li>
                </Link>
                <Link to='/billing'>
                    <li className='px-4'>Billing</li>
                </Link>
            </ul>
        </div>

        {/* Hamburger menu */}

    </div>
  )
}

export default Navbar