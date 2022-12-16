import React, { useEffect, useState } from "react";
import {  getKolAllAnnouncements } from "../../../slices/api/simpleApi";
import { Link } from "react-router-dom";
import PaginatedItems from "./PaginatedItems";

const AnnouncementList = () => {
  const token = localStorage.getItem("token");
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const callback = (data) => {
      //console.log(data);
      setAnnouncements([...data]);
    };
    getKolAllAnnouncements(callback, token);
  }, []);

  console.log(announcements)

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="card-title h5 justify-content-between m-0 d-flex align-items-center">
            <span>Kol Announcements List</span>
            <Link className="btn theme-btn btn-sm" to={`../announcement/`}>Add Announcement</Link>
          </div>
        </div>
        <div className="card-body px-4">
          <div className="">
            {announcements?.length > 0 ? ( <PaginatedItems itemsPerPage={4}/>) : (<><h4>No Records Found</h4> </>  )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AnnouncementList;
