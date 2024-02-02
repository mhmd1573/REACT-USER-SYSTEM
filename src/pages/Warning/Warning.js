import React from 'react'
import './Warning.css'
import { Navbar,Sidebar } from '../../components/index'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const Warning = () => {

    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible((prevVisible) => !prevVisible);
     };
     



  return (

    <>
   {/*  Navbar Section Starts Here ! */}
<Navbar sidebarVisible={sidebarVisible} toggleSidebar={toggleSidebar} />
{/*  Navbar Section Ends Here ! */}



{/*  SideBar Section Starts Here !  */}
<Sidebar toggleSidebar={toggleSidebar}  sidebarVisible={sidebarVisible}/>
{/*  SideBar Section Ends Here !  */}
  

    <div className='LoginFirstForm'>
        <h1 className='LoginFirstFormTitle'>Login First</h1>
        <p className='LoginFirstFormText'>You need to login first to access this page</p>
        <div className='btn-center'>
        <button className='LoginFirstFormBtn' >
                 <Link to="/">
            Login
            </Link>
            </button>
        </div>
    </div>



    </>
  )
}

export default Warning