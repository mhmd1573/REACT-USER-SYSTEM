// reducers/authReducer.js

const initialState = {
  isAuthenticated: false,
  errorMessage: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      console.log('Reducer: User successfully logged in. Updating isAuthenticated.');
      return { ...state, isAuthenticated: true, errorMessage: '' };
    case 'LOGIN_FAILURE':
      return { ...state, isAuthenticated: false, errorMessage: action.payload };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, errorMessage: '' };
    default:
      return state;
  }
};

export default authReducer;
