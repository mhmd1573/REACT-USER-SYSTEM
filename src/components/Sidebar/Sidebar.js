import  './Sidebar.css'
import { Link } from 'react-router-dom';
const Sidebar = ({sidebarVisible}) => {



  return (
    <div className={`sidebar ${sidebarVisible ? 'active' : ''}`} id="sidebar">
  {/*  sidebar content  */}
  <Link to="/home">Home</Link>
  <Link to="/users">Users</Link>
  <Link to="/">Logout</Link>
</div>
  )
}

export default Sidebar