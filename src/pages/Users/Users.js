import  './Users.css'
import { Navbar , Sidebar } from '../../components/index';
import { useState , useEffect } from 'react';
import { isValidEmail, emailExists, isEmailUnique ,getUsersFromLocalStorage, saveUsersToLocalStorage } from '../../pages/validationUtil';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Users = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [errorMessages, setErrorMessages] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    }); 



    useEffect(() => {
        // console.log('Users component mounted');
        // console.log('IsAuthenticated:', isAuthenticated);
    
        // // Redirect to /warning if not authenticated
        // if (!isAuthenticated) {
        //   console.log('Redirecting to /warning');
        //   navigate('/warning');
        // }
    
        // Load users from local storage
        const storedUsers = getUsersFromLocalStorage();
        setUsers(storedUsers);
      }, [isAuthenticated, navigate]);


    
    const [inputErrors, setInputErrors] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
      });

      const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        editIndex: '', 
     });
    

    

     // Toggle the sidebar
    const toggleSidebar = () => {
        setSidebarVisible((prevVisible) => !prevVisible);
      };

      //toggle user form
      const toggleUserForm = () => {
        var formContainer = document.getElementById("userFormContainer");
        var overlay = document.querySelector(".overlay");
  
        if (formContainer.style.display === "none") {
            formContainer.style.display = "block";
            overlay.style.display = "block";
        } else {
            formContainer.style.display = "none";
            overlay.style.display = "none";
            resetForm();
        }
    
    };

    //clear error message while typing
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
      
      // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // Reset the error message when the user types
        clearErrorMessage(name);
    };

   
    //display users
    const displayUsers = () => {
                // Update React state to trigger re-render
                // You can use map to create a new array of React elements

                return users.map((user, index) => (
                    <tr key={index}>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>
                            <div>
                                <button onClick={() => editUser(index)}  
                                style={{
                                    backgroundColor: '#4CAF50', /* Green */
                                    border: 'none',
                                    color: 'white',
                                    padding: '7px 20px',
                                    textAlign: 'center',
                                    textDecoration: 'none',
                                    display: 'inline-block',
                                    fontSize: '16px',
                                    margin: '4px 2px',
                                    cursor: 'pointer',
                                    borderRadius: '5px',
                                }}>Edit</button>
                                <button onClick={() => showDeleteConfirmation(index)}
                                style={{
                                    backgroundColor: '#FF0000', /* Red */
                                    border: 'none',
                                    color: 'white',
                                    padding: '7px 15px',
                                    textAlign: 'center',
                                    textDecoration: 'none',
                                    display: 'inline-block',
                                    fontSize: '16px',
                                    margin: '4px 2px',
                                    cursor: 'pointer',
                                    borderRadius: '5px',
                                }}
                                >Delete</button>
                            </div>
                        </td>
                    </tr>
                ));
            
            };

        //display error message   
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

        
        //add or update user
      const addOrUpdateUser = (event) => {
            
            event.preventDefault();
             clearErrorMessage();
        
        const { firstName, lastName, email, password, editIndex } = formData;
    
        const errors = [];
    
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
        } else if (emailExists(email, editIndex, users)) {
            errors.push("Email already exists. Please use a different email.");
            displayErrorMessage("email", "Email already exists. Please use a different email.");
           
        }else if (!isValidEmail(email)) {
            errors.push("Enter A Valid Email.");
            displayErrorMessage("email", "Enter A Valid Email.");
        }
    
        if (!password) {
            errors.push("Password is required.");
            displayErrorMessage("password", "Password is required.");
        } else if (password.length < 6) {
            errors.push("Password must be at least 6 characters long.");
            displayErrorMessage("password", "Password must be at least 6 characters long.");
        }
    
        if (errors.length > 0) {
            displayErrorMessage(errors);
            return;
        }
    
        // Update React state
        const updatedUsers = [...users];
        
            if (firstName && lastName && email && password) {
                
           
        if (editIndex !== '') {
            // Update existing user
            updatedUsers[editIndex] = { firstName, lastName, email, password };
        } else {
            // Check if email already exists before adding a new user
            if (isEmailUnique(email, editIndex, users)) {
                // Add new user
                const newUser = { firstName, lastName, email, password };
                updatedUsers.push(newUser);
            } else {
                // Display an error if the email already exists
                displayErrorMessage(['Email already exists. Please use a different email.']);
                return;
            }
        }
    
        // Save changes and update the user table
        saveUsersToLocalStorage(updatedUsers);
        setUsers(updatedUsers);
        toggleUserForm();
      
    
    }
   
           };

       //show delete confirmation    
      const showDeleteConfirmation = (index) => {
            var deleteFormContainer = document.getElementById('deleteFormContainer');
            var overlay = document.getElementById('overlay');
        
            document.getElementById('deleteIndex').value = index;
        
            // Make the delete form container and overlay visible
            deleteFormContainer.classList.add('active');
            overlay.classList.add('active');
        };

        //delete user
      const deleteUser = (index) => {
            const updatedUsers = [...users];
            updatedUsers.splice(index, 1);
            saveAndSetUsers(updatedUsers);
        };

        //confirm the delete
      const deleteConfirmed = () => {
        var deleteIndex = document.getElementById('deleteIndex').value;
        deleteUser(deleteIndex);
        toggleDeleteForm();
        };

        //toggle delete form
        const toggleDeleteForm = () => {
            var deleteFormContainer = document.getElementById('deleteFormContainer');
            var overlay = document.getElementById('overlay');
        
            deleteFormContainer.classList.remove('active');
            overlay.classList.remove('active');
        };

        const editUser = (index) => {
            const user = users[index];
            setFormData({ ...user, editIndex: index });
            toggleUserForm();
        };

       //reset form
        const resetForm = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            editIndex: '',
        });
       
        setErrorMessages({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        });

        setInputErrors((prevInputErrors) => ({
            ...prevInputErrors,
            firstName: false,
            lastName: false,
            email: false,
            password: false,
          }));

       };

       //cancel action
        const cancelAction = () => {
            resetForm();
            toggleUserForm();
            clearErrorMessage();
            toggleDeleteForm();

        };

        //save and set users
        const saveAndSetUsers = (updatedUsers) => {
            saveUsersToLocalStorage(updatedUsers);
            setUsers(updatedUsers);
        };

    
  return (
    <>
{/*  Navbar Section Starts Here ! */}
<Navbar sidebarVisible={sidebarVisible} toggleSidebar={toggleSidebar} />
{/*  Navbar Section Ends Here ! */}


{/*  SideBar Section Starts Here !  */}
<Sidebar  toggleSidebar={toggleSidebar}  sidebarVisible={sidebarVisible}/>
{/*  SideBar Section Ends Here !  */}


{/*  Content Section Starts Here !  */}
<div className="user-content">   
{/* <main> */}
    <div class="userPage">
        <h1>Users</h1>
      <div> <button className="addUserBtn" onClick={() => toggleUserForm()}>Add User</button></div> 
    </div>

    <table id="userTable">
        <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Password</th> 
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {displayUsers()}
        </tbody>
    </table>


    <div id="userFormContainer">
   

                <form id="userForm"  >
                <div className="form-group">
                        {/* <label htmlFor="firstName">First Name</label> */}
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder='First Name'
                            className={inputErrors.firstName ? 'error-input' : ''}
                            required
                        />
                        
                        {errorMessages.firstName && <div className="error-message-userForm">{errorMessages.firstName}</div>}
                        
                    </div>

                    <div className="form-group">
                        {/* <label htmlFor="lastName">Last Name</label> */}
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder='Last Name'
                                className={inputErrors.lastName ? 'error-input' : ''}
                                required
                            />
                             {errorMessages.lastName && <div className="error-message-userForm">{errorMessages.lastName}</div>}
                    </div>

                    <div className="form-group">
                            {/* <label htmlFor="email">Email</label> */}
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder='Email'
                                className={inputErrors.email ? 'error-input' : ''}
                                required
                            />
                                {errorMessages.email && <div className="error-message-userForm">{errorMessages.email}</div>}
                    </div>

                    <div className="form-group">
                            {/* <label htmlFor="password">Password</label> */}
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder='Password'
                                className={inputErrors.password ? 'error-input' : ''}
                                required
                            />
                             {errorMessages.password && <div className="error-message-userForm">{errorMessages.password}</div>}
                    </div>

                         <input
                            type="hidden"
                            id="editIndex"
                            name="editIndex"
                            value={formData.editIndex}
                        />
                        
                        <div className="form-btns">
                            <button
                                type="button"
                                className="confirm"
                                // disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.password}
                                onClick={(e) => addOrUpdateUser(e)}
                            >
                                Confirm
                            </button>
                            <button
                                type="button"
                                className="cancelButton"
                                onClick={cancelAction}
                            >
                                Cancel
                            </button>
                        </div>
                    
                          
                                            
                    </form>
                </div>

            <div id="deleteFormContainer">
                <form id="deleteForm">
                    <p className='delete-txt'>Are you sure you want to delete this user?</p>
            
                    <input type="hidden" id="deleteIndex"/> 
                    {/* <!-- Hidden field to store the index of the user to be deleted --> */}
            
                    <div class="form-btns">
                        <button type="button" class="confirm" onClick={deleteConfirmed}>Confirm</button>
                        <button type="button" class="cancelButton" onClick={toggleDeleteForm}>Cancel</button>
                    </div>
                </form>
            </div>
            
            
            


 <div class="overlay" id="overlay" onClick={cancelAction}></div>
 

    


{/* </main> */}
</div>

{/*  Content Section Ends Here !  */}

    </>
  )
  }

export default Users