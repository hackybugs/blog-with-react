import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
let apibaseUrl = process.env.REACT_APP_API_URL;
let apiurl = apibaseUrl+'/api/blog';
export default function Blog() {
    const location = useLocation()
    const edit = location.state;
    const navigate = useNavigate();

    const [editPage, setEditPage] = useState({});
    useEffect(() => {
        if (edit !== null) {
            // console.log("sghybhanan",edit);
            let token = localStorage.getItem('jwt');
            // console.log(token);
            const getEdit = async (edit) => {
                const editapi = apibaseUrl+'/api/editblog/' + edit;
                // console.log("Sdfsdfjkldjfklsajfklsjflksadjfklsajfsklafjklsafjsklafjsaklfjkl");
                const response = await axios.get(editapi, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                        'Access-Control-Allow-Origin':'*'
                    }
                });
                setEditPage(response.data);
                // console.log(response.data);

            }
            getEdit(edit);
        }
    }, [edit]);

    const token = localStorage.getItem('jwt');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    function handelSubmit(e) {
        e.preventDefault();
        const Params = { description: description, title: title };
        if (edit !== null) {
            apiurl = apibaseUrl+'/api/updateblog/' + edit;
            axios.patch(apiurl, Params, {
                headers: {
                    "Authorization": 'Bearer ' + token,
                }
            }).then((response) => {
                // localStorage.setItem('jwt', response.data.token);
                navigate("/note");
            }).catch((error) => {
                console.log(error.response);
                console.error('Error:', error);
            });

        } else {
            axios.post(apiurl, Params, {
                headers: {
                    "Authorization": 'Bearer ' + token,
                }
            }).then((response) => {
                console.log(response.data);
                // localStorage.setItem('jwt', response.data.token);
                navigate("/note");
            }).catch((error) => {
                console.log(error.response);
                console.error('Error:', error);
            });

        }

    }
    return (
        <>
            <div className='container'>
                <div className='row mt-5 p-4'>
                    <div className='col-4'></div>
                    <div className='col-4'>
                        <form onSubmit={handelSubmit}>
                            <div className="mb-3 mt-3 col-md-12">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input className="form-control" id="title" placeholder="Enter title" onChange={e => setTitle(e.target.value)} name="title" defaultValue={editPage[0]?.title} />
                            </div>
                            <div className="mb-3 mt-3  col-md-12">
                                <label htmlFor="description" className="form-label">Email:</label>
                                <textarea className="form-control"
                                    id="description"
                                    name="description"
                                    onChange={e => setDescription(e.target.value)}
                                    defaultValue={editPage[0]?.Content || ''}
                                >
                                </textarea>
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
