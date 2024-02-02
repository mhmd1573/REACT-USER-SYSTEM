import './Register.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isValidEmail, emailExists, getUsersFromLocalStorage, saveUsersToLocalStorage } from '../../pages/validationUtil';
import { LeftChild , Icons , FormBtn } from '../../components/index';
import { Link } from 'react-router-dom';


    const Register = () => {
      
      const [formData, setFormData] = useState({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        });

        const [inputErrors, setInputErrors] = useState({
          firstName: false,
          lastName: false,
          email: false,
          password: false,
        });

        const { firstName, lastName, email, password } = formData;
        const [users, setUsers] = useState([]);
        const navigate = useNavigate();
     
//getting users from local storage 
  useEffect(() => {
    // Update users state when local storage changes
    setUsers(getUsersFromLocalStorage());
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

 
        
const [errorMessages, setErrorMessages] = useState({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
}); 

const clearErrorMessage = (fieldId) => {
  setErrorMessages((prevErrors) => ({
    ...prevErrors,
    [fieldId]: '',
  }));

  setInputErrors((prevInputErrors) => ({
    ...prevInputErrors,
    [fieldId]: false,
  }));

};


const displayErrorMessage = (fieldId, message) => {
  setErrorMessages((prevErrors) => {
      return {
          ...prevErrors,
          [fieldId]: Array.isArray(message) ? message.join(' ') : message,
      };
  });

  setInputErrors((prevInputErrors) => ({
    ...prevInputErrors,
    [fieldId]: true,
  }));
  
};
      
        const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
      
          // Reset the error message when the user types
          clearErrorMessage(name);
        };
      
        const handleSubmit = (e) => {
          e.preventDefault();
      
          // Basic validation
         
          var errors = [];

          if (!firstName) {
              errors.push("First name is required.");
              displayErrorMessage("firstName", "First name is required.");
          }
      
          if (!lastName) {
              errors.push("Last name is required.");
              displayErrorMessage("lastName", "Last name is required.");
          }
      
          if (!email) {
              errors.push("Email is required.");
              displayErrorMessage("email", "Email is required.");
          } else if (!isValidEmail(email)) {
              errors.push("Enter a valid email address.");
              displayErrorMessage("email", "Enter a valid email address.");
          } else if (emailExists(email, null, users)) {
              errors.push("Email already exists. Please use a different email.");
              displayErrorMessage("email", "Email already exists. Please use a different email.");
          }
      
          if (!password) {
              errors.push("Password is required.");
              displayErrorMessage("password", "Password is required.");
          } else if (password.length < 6) {
              errors.push("Password must be at least 6 characters long.");
              displayErrorMessage("password", "Password must be at least 6 characters long.");
          }
          // Display errors, if any
          if (errors.length > 0) {
              return displayErrorMessage(errors);
          }

          const newUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
          };
        
          const updatedUsers = [...users, newUser];
          setUsers(updatedUsers);
          saveUsersToLocalStorage(updatedUsers);

    
          navigate('/');
        
        
        };



  return (
<div className="reg-container">

    {/*  child1 section starts here  */}
    <LeftChild className="reg-child1" />
    {/*  child1 section ends here  */}

    

    {/*  child2 section starts here */}
    <div className="child2 reg-child">
            <h1>Register</h1>
            <div className="container2">


<form onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First name"
              className={inputErrors.firstName ? 'error-input' : ''}
            />
               {errorMessages.firstName && <span className="error-message">{errorMessages.firstName}</span>}
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last name"
              className={inputErrors.lastName ? 'error-input' : ''}
            />
          {errorMessages.lastName && <p className="error-message">{errorMessages.lastName}</p>}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className={inputErrors.email ? 'error-input' : ''}
            />
             {errorMessages.email && <p className="error-message">{errorMessages.email}</p>}
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className={inputErrors.password ? 'error-input' : ''}
            />
            {errorMessages.password && <p className="error-message">{errorMessages.password}</p>}
            <FormBtn text="Register" />
          </form>

           
                        
                <div><p className='sign-up'>or signup with </p></div>
              
                <Icons />
                                    
                <div><p>Already have an account ? <Link to="/">Login</Link></p></div>

            </div>
    </div>
    {/*  child2 section ends here  */}

</div>
  )
}

export default Register