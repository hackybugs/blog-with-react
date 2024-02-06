import './App.css';
// import Home from './Component/Home';
import ReactDOM from 'react-dom';
import { Link, Route, Routes, NavLink } from 'react-router-dom';
import Home2 from './view/home/home';
import Dashboard from './view/home/Dashboard';

import Register from './view/home/Register';
import About from './view/home/About';
import Blog from './view/home/Blog';
import Pokemon from './view/Pokemon';
import Noteslist from './view/home/list'
import PrivateRoute from './Component/PrivateRoute';
import { Children,useState } from 'react';
const x =
  <>
    <li className='nav-item'>
      <NavLink to="/register" className={({ isActive }) =>
        isActive ? "active nav-link" : "nav-link"
      } >Register</NavLink>
    </li>
  </>;
  // const button = document.createElement('button');
  // button.textContent = 'Click Me';
const App = () => {
  let Newpath = '';
  const [showButton, setShowButton] = useState(true);
  return (<>
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <NavLink to="/home" className={({ isActive }) =>
                isActive ? "active nav-link" : "nav-link"
              }  >Home</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to="/dashboard" className={({ isActive }) =>
                isActive ? "active nav-link" : "nav-link"
              }  >Dasboard</NavLink>
            </li>
            {localStorage.getItem("jwt") == undefined ? x : ''}
            <li className='nav-item'>
              <NavLink to="/about" className={({ isActive }) =>
                isActive ? "active nav-link" : "nav-link"
              } >About</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to="/blog" className={({ isActive }) =>
                isActive ? "active nav-link" : "nav-link"
              } >Blog</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to="/note" className={({ isActive }) =>
                isActive ? "active nav-link" : "nav-link"
              } >Notes</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to="/wonder" className={({isActive})=>isActive?"active nav-link":"nav-link"}>
                Pokemon
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    {/* <Route path='profile' element={<PrivateRoute Children={Profile} />} /> */}
    {localStorage.getItem('jwt') != undefined ? Newpath = Dashboard  : Newpath = Home2 }
    <Routes>
      <Route path="home" element={<Newpath />} />
      <Route path="dashboard" element={<PrivateRoute Children={Dashboard} />} />
      <Route path="register" element={<Register />} />
      <Route path="about" element={<PrivateRoute Children={About} />} />
      <Route path="blog" element={<PrivateRoute Children={Blog} />} />
      <Route path="note" element={<PrivateRoute Children={Noteslist} />} />
      <Route path="wonder" element={<Pokemon/>} />
    </Routes>
  </>
  )
};



export default App;
