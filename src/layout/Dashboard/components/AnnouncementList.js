import React, { useEffect, useState } from "react";

import {
  getKolAllAnnouncements,
  deleteAnnouncement,
} from "../../../slices/api/simpleApi";
// import Pagination from "../../../common/components/PaginationJSX";
import { Link, useNavigate } from "react-router-dom";
import { announceDelete } from "../../../slices/Dashboard/dashboard";
import { useDispatch } from "react-redux";
import Pagination from "react-js-pagination";
const AnnouncementList = () => {
  const dispatch = useDispatch();
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
    console.log(id);
    dispatch(announceDelete(id)).then((data) => {
      const callback = (data) => {
        setAnnouncements([...data]);
      };
      getKolAllAnnouncements(callback, token);
    });
  };
  const handlePageChange = (pageNumber) => {
    console.log(pageNumber);
  
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
                      <td>{item.image}</td>

                      <td>
                        <Link to={`/dashboard/announcement/${item.id}`}>Edit</Link>
                        <Link to={`/dashboard/announcement/view/${item.id}`}>
                          View
                        </Link>
                        <button onClick={() => handleDelete(item.id)}>
                          <i className="fa-regular fa-trash">Delete</i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </table>
            {announcements.length > 0 ? (
              <Pagination
                totalItemsCount={450}
                onChange={handlePageChange}
                activePage={page}
                // itemsCountPerPage={}
                pageRangeDisplayed={5}
              />
            ) : (
              <h1>No Posts to display</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AnnouncementList;
