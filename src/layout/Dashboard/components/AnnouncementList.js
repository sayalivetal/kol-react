import React, { useEffect, useState } from "react";

import {  getKolAllAnnouncements,  deleteAnnouncement, } from "../../../slices/api/simpleApi";
// import Pagination from "../../../common/components/PaginationJSX";
import { Link, useNavigate } from "react-router-dom";
import { announceDelete, dashboardSelector } from "../../../slices/Dashboard/dashboard";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "react-js-pagination";
import { imageUrl } from "../../../common/apis";


const AnnouncementList = () => {
  const dispatch = useDispatch();
  const { announcement} = useSelector(dashboardSelector);

  const token = localStorage.getItem("token");
  const [announcements, setAnnouncements] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const limit = 10;
  useEffect(() => {
    const callback = (data) => {
      setAnnouncements([...data]);
    };
    getKolAllAnnouncements(callback, token,page,10);
  }, []);

  const handleDelete = (id) => {
    // deleteAnnouncement(token , id);
 
    dispatch(announceDelete(id)).then((data) => {

      if(data.payload.statusCode == 200){
        const callback = (data) => {
          setAnnouncements([...data]);
        };
        getKolAllAnnouncements(callback, token,page,10);
      }
     
      // const callback = (data) => {
      //   setAnnouncements([...data]);
      // };
      // getKolAllAnnouncements(callback, token);
    });
  };
  const handlePageChange = (pageNumber) => {
  
  
    const callback = (data) => {
      setAnnouncements([...data]);
    };
    getKolAllAnnouncements(callback, token, page);
    setPage(pageNumber)
  };
  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="card-title h5 justify-content-between m-0 d-flex align-items-center">
            <span>Kol Announcements List</span> <Link className="btn theme-btn btn-sm" to={`../announcement/`}>Add Announcement</Link>
          </div>
        </div>
        <div className="card-body px-4" >
          
          <div className="">
            <table className="table table-bordered">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Social Platform</th>
                <th>Status</th>
                <th width="180">Banner Thumb</th>
                <th width="230">Action</th>
              </tr>
             </thead>
             <tbody>
              {announcements &&
                announcements.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td>{item.start_date}</td>
                      <td>{item.end_date}</td>
                      <td>{item.social_platform}</td>
                      <td>{item.status}</td>
                      <td><img className="announcment-thumb" src={`${imageUrl}${item.image}`} alt="avatar" /></td>

                      <td>
                        <Link className="btn btn-sm btn-success me-2" to={`/dashboard/announcement/view/${item.id}`}>View</Link>
                        <Link className="btn btn-sm btn-primary me-2" to={`/dashboard/announcement/${item.id}`}>Edit</Link>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>
                          <i className="fa fa-trash"></i> Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
                </tbody>
            </table>
            {announcements.length > 0 ? (
              <Pagination
                totalItemsCount={450}
                onChange={handlePageChange}
                activePage={page}
                // itemsCountPerPage={}
                pageRangeDisplayed={5}
                itemClass="page-item"
                linkClass="page-link"
                hideNavigation={true}
              />
            ) : (
              <h3>No Posts to display</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AnnouncementList;
