import React, { useEffect, useState } from "react";
import {getKolAllAnnouncements , deleteAnnouncement} from '../../../slices/api/simpleApi'
import Pagination from "../../../common/components/PaginationJSX";
import { Link , useNavigate } from "react-router-dom";

const AnnouncementList = () => {

    const token = localStorage.getItem("token");
    const [announcements , setAnnouncements]= useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const callback = (data) => {
            setAnnouncements([...data]);
        };
        getKolAllAnnouncements(callback, token);
    }, []);

    const handleDelete = (id) => {
        // deleteAnnouncement(token , id);
        // navigate('../../dashboard/announcement/list')
    }
    

    return (
        <>
            <div className="row col-12">
                <div className="col-6">
                    <h3 className="mt-4">Kol Announcements</h3>
                </div>
                <div className="col-6">
                    <Link to={`/dashboard/announcement/`}>Add Announcement</Link>
                </div>
            </div>
            <div className="dashboard-main-listing">
                <table>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Social Platform</th>
                        <th>Status</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                    {announcements && announcements.map( (item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.title}</td>
                                
                                    <td>{item.description}</td>
                                    <td>{item.start_date}</td>
                                    <td>{item.end_date}</td>
                                    <td>{item.social_platform}</td>
                                    <td>{item.status}</td>
                                    <td>{item.image}</td>
                                    
                                    <td>
                                        
                                        <Link to={`/dashboard/announcement/${item.id}`}>Edit</Link>
                                        <Link to={`/dashboard/announcement/view/${item.id}`}>View</Link>
                                        <button onClick={ handleDelete(item.id)} ><i className="fa-regular fa-trash">Delete</i></button>
                                        
                                    </td>
                                </tr>
                            )
                        }) 
                    }
                </table>
                {
                    announcements.length > 0 ? (
                    
                    <Pagination
                        // data={posts}
                        // RenderComponent={Post}
                        dataLength={announcements.length}
                        pageLimit={5}
                        dataLimit={5}
                    />
                    
                ) : (
                <h1>No Posts to display</h1>
                )}
            </div>    
        </>
    )
}

export default AnnouncementList;