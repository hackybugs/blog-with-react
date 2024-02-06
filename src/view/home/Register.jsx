import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Register() {
    const navigate = useNavigate();
    let apiUrl = process.env.REACT_APP_API_URL;
    const apiurl = apiUrl+'/api/register';
    const [token, setToken] = useState('');
    function handelSubmit(e) {

        e.preventDefault();

        const Params = { password: e.target.pswd.value, name: e.target.name.value, email: e.target.email.value };

        axios.post(apiurl, Params).then((response) => {
            localStorage.setItem('jwt', response.data.token);
            // navigate("/about");
        })
       .catch((error) => {
                console.log(error.response);
                console.error('Error:', error);
            });

    };

    return (
        <>

            <div className='container'>
                <div className='row mt-5 p-4'>
                    <div className='col-4'></div>
                    <div className='col-4'>
                        <form onSubmit={handelSubmit}>
                            <div className="mb-3 mt-3 col-md-12">
                                <label htmlFor="name" className="form-label">Name:</label>
                                <input className="form-control" id="name" placeholder="Enter name" name="name" />
                            </div>
                            <div className="mb-3 mt-3  col-md-12">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input className="form-control" id="email" placeholder="Enter email" name="email" />
                            </div>
                            <div className="mb-3  col-md-12" >
                                <label htmlFor="pwd" className="form-label">Password:</label>
                                <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd" />
                            </div>
                            <div className="form-check mb-3  col-md-12">
                                <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox" name="remember" /> Remember me
                                </label>
                            </div>
                            <div className=' col-md-12'>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>

    )
}

