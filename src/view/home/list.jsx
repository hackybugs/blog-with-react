import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
export default function Noteslist() {
    const navigate = useNavigate()
    const [content, setContent] = useState([]);
    const [pagination, setPagination] = useState([]);
    let apiUrl = process.env.REACT_APP_API_URL;
    const [deleteUpdate,setDeleteUpdate] =useState(false);
    function handleEdit(id) {
        navigate("/blog", { state: id })
    }
    async function deleteItem(e, id) {
        e.preventDefault();
        if(id!=null){
            let token = localStorage.getItem("jwt");
           try{
             const deleteApi=apiUrl+'/api/removeblog/' + id;
             const response =await axios.delete(deleteApi, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            console.log(response, 'response');
            if (response.data.status == "success") {
                setDeleteUpdate(!deleteUpdate)
                // setTitles(prevTitles => prevTitles.filter(item => item.id !== id));
            }
           }catch(error){
            console.log(error, 'error');
           }

        }
    }
    // const handlePageClick = async (event,page) => {

    //     console.log(
    //       `User requested page number ${page}`
    //     );
    //     try {
    //         const token = localStorage.getItem('jwt');
    //         const response = await axios.get(apiUrl+'/api/show-bloglist?'+page, {
    //             headers: {
    //                 Authorization: 'Bearer ' + token,
                    
    //             }
    //         });
    //         console.log(response);
    //         setContent(response.data.data.data);
    //         //  setPagination(response.data.data);
    //     }catch(error){
    //         console.log(error.response);
    //         console.error('Error:', error);
    //     }
    //     // setItemOffset(newOffset);
    //   };
    const fetchTitles = async (event,page) => {
        try {
            const token = localStorage.getItem('jwt');
            if(page==undefined){
                page = 1;
            }
            const response = await axios.get(apiUrl+`/api/show-bloglist?page=${page}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            console.log(
                      `User requested page number ${page}`
                    );
            console.log(response.data.data);
            setContent(response.data.data.data);
            setPagination(response.data.data);

        } catch (error) {
            console.log(error.response);
            console.error('Error:', error);
        }
    };
    useEffect(() => {
       

        fetchTitles();
    }, [deleteUpdate]);

    return (
        <>
            <table className="table table-striped ">
                <thead>
                    <th>Title</th>
                    <th>Note</th>
                    <th>Updated at</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    {content.map((item) => (


                        <tr key={item.id}>
                            <td >{item.title}</td>
                            <td>{item.Content}</td>
                            <td> {item.updated_at}</td>
                            <td><button className='btn-sm btn btn-warning' onClick={() => handleEdit(item.id)}>Edit</button><button className='btn btn-sm btn-danger' onClick={(e) => deleteItem(e, item.id)}>Delete</button></td>
                        </tr>


                    ))}
                </tbody>
            </table>
            <Pagination count={pagination.last_page}  onChange={fetchTitles} />
        </>
        
    );
}
