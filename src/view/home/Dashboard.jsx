import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledTooltip, Tooltip } from 'reactstrap';
import { FaStream } from "react-icons/fa";
export default function Dashboard(args) {

    const [modal, setModal] = useState(false);
    const [titles, setTitles] = useState([]);
    const [editPage, setEditPage] = useState({});
    const [blogId, setBlogId] = useState('')
    const [deleteUpdate, setDeleteUpdate] = useState(false);
    const [createNotest, setCreateNotest] = useState(false);
    let apiUrl = process.env.REACT_APP_API_URL;
    const toggles = (id) => {

        setBlogId(id)

        if (id !== null) {

            let token = localStorage.getItem('jwt');
            const getEdit = async (id) => {
                try {
                    const editapi = apiUrl+'/api/editblog/' + id;
                    const response = await axios.get(editapi, {
                        headers: {
                            Authorization: 'Bearer ' + token,
                        }
                    });
                    setEditPage(response.data);
                } catch (error) {
                    console.log(error, 'error');
                }

            }
            getEdit(id);
        }


        setModal(!modal)
    }
    const navigate = useNavigate();

    async function deleteItem(id) {

        if (id !== null) {
            let token = localStorage.getItem('jwt');
            try {
                const removeapi = apiUrl+'/api/removeblog/' + id;
                const response = await axios.delete(removeapi, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                });
                console.log(response, 'response');
                if (response.data.status == "success") {
                    setDeleteUpdate(!deleteUpdate)
                    // setTitles(prevTitles => prevTitles.filter(item => item.id !== id));
                }
            } catch (error) {
                console.log(error, 'error');
            }
        }
    }

    const token = localStorage.getItem('jwt');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    async function createNote() {
        console.log(title, description);
        try {
            let apiurl = apiUrl+'/api/blog';
            const Params = { description: description, title: title };
            const response = await axios.post(apiurl, Params, {
                headers: {
                    "Authorization": 'Bearer ' + token,
                    'Access-Control-Allow-Origin':'*'
                }
            });
            if (response.data.code == 200) {
                setCreateNotest(!createNotest);
                document.getElementById('newtitle').value = "";
                document.getElementById('newdescription').value = "";
                setDescription("");
                setTitle("");
            }
        } catch (error) {
            console.log(error.response);
            console.error('Error:', error);
        }
    }
    useEffect(() => {
        console.log("calleddd");
        const fetchTitles = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await axios.get(apiUrl+'/api/show-dashboardlist', {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                });
                console.log(response.data);
                setTitles(response.data);
            } catch (error) {
                console.log(error.response);
                console.error('Error:', error);
            }
        };
        fetchTitles();
    }, [modal, deleteUpdate, createNotest]);





    function handelSubmit(e) {
        e.preventDefault();
        const Params = { description: description, title: title };
        console.log(Params,"ParamsParams");
        if (blogId !== null) {
            console.log(blogId);
            const apiurl = apiUrl+'/api/updateblog/' + blogId;
            axios.patch(apiurl, Params, {
                headers: {
                    "Authorization": 'Bearer ' + token,
                }
            }).then((response) => {
                // localStorage.setItem('jwt', response.data.token);
                console.log(response)
                setModal(false);
                navigate("/dashboard");
                setDescription("")
                setTitle("")

            }).catch((error) => {
                console.log(error.response);
                console.error('Error:', error);
            });

        }

    }

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);
    return (
        <>
            <div className='container-fluid'>
                <div className='row m-1 justify-content-between'>
                    <div className='col-12'>
                        <div className='container m-3 p-4'>
                            <div className='row'>
                                <div className='col-4 m-2'></div>
                                <div className='col-5 text-center'>
                                    <label for='title'></label>
                                    <input type='text' placeholder='Enter Title' name="newtitle" id='newtitle' className='form-control m-2' onChange={e => setTitle(e.target.value)} />
                                    <textarea className='form-control m-2' name="newdescription" id='newdescription' onChange={e => setDescription(e.target.value)} placeholder='Enter Description' ></textarea>
                                </div>
                                <div className='col-4 m-2'></div>
                                <div className='col-5'>
                                    <button type='button' onClick={() => createNote()} className='btn btn-secondary m-2'>Create +</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {titles.map((item,index) => (
                        <>
                   
                            <div className='col-md-3 bg-light card' style={{ margin: 'inherit' }} key={item.id}>
                                <div className='row' >
                                    <div className='col-md-12 '  onClick={() => toggles(item.id)} >
                                        <div className=" " width={18 + 'rem'} >
                                            <span className='py-3 text-danger'>Updated at
                                                <i> {item.updated_at}</i>
                                            </span>
                                            <div className="card-body ">
                                                <div className="card-title ">{item.title} </div>
                                                <div className="card-text">{item.Content}</div>

                                            </div>


                                        </div>
                                    </div>
                                    <div className='col-md-12 p-0'>
                                        <footer className='flex-row-reverse d-flex'>
                                            <button className='btn btn-outline' onClick={() => deleteItem(item.id)}><FaStream /></button>
                                            {/* <div className="text-center">
                                                <div className='hkczvkjzxh'>
                                                    <div role='button' id="ScheduleUpdateTooltip" className='text-primary p-1'>
                                                    <FaStream />
                                                    </div>
                                                    <div className="text-center">
                                                        <UncontrolledTooltip placement="right" target="ScheduleUpdateTooltip" trigger="click" className="bg-light">
                                                            {/* <a href="javascript:void(0)" className='p-1 pop-editdata'>
                                                                <span>
                                                                    <i class="fa fa-pencil mr-2" aria-hidden="true"></i>Edit Shipment
                                                                </span>
                                                            </a> /}
                                                            <button onClick={() => deleteItem(item.id)}>Delete</button><br />
                            
                                                        </UncontrolledTooltip>
                                                    </div>
                                                </div>
                                            </div> */}
                                            {/* <ButtonDropdown toggle={() => { setOpen(!dropdownOpen) }}
                                                isOpen={dropdownOpen}>
                                                <DropdownToggle className="bg-outline" caret>
                                                    <FaStream />
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem header>Numeric Characters
                                                    </DropdownItem>
                                                    <DropdownItem>One</DropdownItem>
                                                    <DropdownItem>Two</DropdownItem>
                                                </DropdownMenu>
                                            </ButtonDropdown> */}
                                        </footer>
                                    </div>
                                </div>
                            </div>

                        </>
                    ))}
                </div>
            </div>
            <div>

                <Modal isOpen={modal} toggle={toggles} {...args}>
                    <ModalHeader toggle={toggles}>Edit Form</ModalHeader>
                    <ModalBody>
                        <form onSubmit={handelSubmit}>
                            <div className="mb-3 mt-3 col-md-12">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input className="form-control" id="title" placeholder="Enter title" onChange={e => setTitle(e.target.value)} name="title" defaultValue={editPage[0]?.title} />
                            </div>
                            <div className="mb-3 mt-3  col-md-12">
                                <label htmlFor="description" className="form-label">Note:</label>
                                <textarea className="form-control"
                                    id="description"
                                    name="description"
                                    onChange={e => setDescription(e.target.value)}
                                    defaultValue={editPage[0]?.Content || ''}
                                >
                                </textarea>
                            </div>
                            <div className='col-md-12'>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggles}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        </>
    );
}
