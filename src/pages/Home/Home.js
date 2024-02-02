import axios from 'axios';  
import './Home.css'
import { Navbar , Sidebar, Card } from '../../components/index';
import { useState, useEffect } from 'react';
import {toggleCardForm} from '../validationUtil';
import { IoClose } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Home = () => {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const numberOfCardsToShow = 3; // Adjust this number based on your preference

   console.log('inside home page') 
  console.log('IsAuthenticated:', isAuthenticated);


  // useEffect(() => {
    
  //   if (!isAuthenticated) {
  //     console.log('User is not authenticated.');
  //     navigate('/warning'); 
  //   }
  // }, [isAuthenticated, navigate]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [isAuthenticated]);

  console.log('inside home page')

  console.log('IsAuthenticated:', isAuthenticated);

  // Slice the array to limit the number of cards to show
  const visibleCategories = categories.slice(0, numberOfCardsToShow);

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


{/*  Content Section Starts Here !  */}
<div className='content'>
{/* <div className="home"><h1>Home</h1></div> */}
  
   
 <div className="card-container">
 {visibleCategories.map(category => (
          <Card
            key={category.idCategory}
            title={category.strCategory}
            description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium labore architecto deleniti magni recusandae autem distinctio quaerat eveniet consequuntur? Ex?
            "
            imageUrl={category.strCategoryThumb}
          />
        ))}
      </div>  


          {/* Added to Cart Form Starts Here */}
          <div className="added-to-cart-form" id='userFormCart'>

              <div className='cardCloser'>
              <IoClose className='close-btn' onClick={toggleCardForm}/>
          
                </div> 
          
            <p> Added to Cart</p>
            
            <button className="added-to-cart-btn" onClick={toggleCardForm}>Confirm</button>
            </div>
          {/* Added to Cart Form Ends Here*/}
          </div>

               


 <div class="overlay" id="overlay" onClick={toggleCardForm}></div>
 
{/*  Content Section Ends Here !  */}
</>
  )
}

export default Home