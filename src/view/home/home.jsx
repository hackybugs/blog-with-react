import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import About from './About';

function Home2() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let apiUrl = process.env.REACT_APP_API_URL;
  const loginapiurl =apiUrl+'/api/login';
      function handelSubmit(e) {
        // setEmail({email:e.target.email.value});
        // setPassword({password:e.target.pswd.value});
        console.log(email,password);
        const params={email:email,password:password};
        // console.log(e.target.email.value, e.target.pswd.value, e);
        axios.post(loginapiurl,params,{
        }).then(function succcess(response){
          console.log(response);
          localStorage.setItem('jwt',response.data.data.token);
          localStorage.setItem('token_type',response.data.data.token_type);
          navigate("/about");
        }).catch((err)=>{
          console.log(err);
        })
        e.preventDefault();
      };

  return (
    <>
      <div className='container'>
        <form onSubmit={handelSubmit}>
          <div className="mb-3 mt-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input className="form-control" id="email" placeholder="Enter email" name="email"  value={email}
              onChange={e => setEmail(e.target.value)} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="pwd" className="form-label">Password:</label>
            <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd" value={password}
              onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="form-check mb-3">
            <label className="form-check-label">
              <input className="form-check-input" type="checkbox" name="remember" /> Remember me
            </label>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}
export default Home2