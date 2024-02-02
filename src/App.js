import './App.css';
import { Fragment } from 'react';
import {Login,Register,Home,Users, Warning} from './pages/index'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store';
function App() {
   
  

  return (
  
  <Provider store={store}>
    <Router>
    <Fragment>
      <Routes>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path='/users' element={<Users/>}/> 
        <Route exact path='/home' element={<Home/>}/>
        <Route exact path='/warning' element={<Warning />}/>
      </Routes>
    </Fragment>
  </Router>
  </Provider>
  
  );
}

export default App;
