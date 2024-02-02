// services/auth.js

export const login = async (email, password) => {
  // Simulating an asynchronous request to a server for authentication
  return new Promise((resolve) => {
    
    setTimeout(() => {
      // For simplicity, considering the login is successful if email and password are not empty
      const isAuthenticated = email !== '' && password !== '';
      resolve(isAuthenticated);
    }, 5000); // Simulating a delay of 1000 milliseconds (1 second) for the asynchronous operation
  });
};
