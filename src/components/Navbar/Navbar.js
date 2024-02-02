import  './Navbar.css'
import {  NavLink } from 'react-router-dom';
import { CiLogin } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { Link } from 'react-router-dom';



const Navbar = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);


  const handleLogout = () => {
    dispatch(logoutUser());
  };



  return (
    <div className="navbar">
      <h2 className="logo">LARBUS</h2>

      <button id="toggle-btn" className="toggler" onClick={toggleSidebar}>
        &#9776;
      </button>

      <div className="links">
        <ul>
          <li>
            <NavLink exact to="/home" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/users" activeClassName="active">
              Users
            </NavLink>
          </li>
         
          <li className="logout">

          {isAuthenticated ? (
              <span onClick={handleLogout}>
                <NavLink exact to="/" activeClassName="active" className="log-icon">
                  Logout
                </NavLink>
              </span>
            ) : (
              <NavLink exact to="/" activeClassName="active" className="log-icon">
                Login
              </NavLink>
            )}
              <CiLogin className='log-icon' />
                </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar


