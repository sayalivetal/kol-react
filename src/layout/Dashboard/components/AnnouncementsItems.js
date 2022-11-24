import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { imageUrl } from "../../../common/apis";

const AnnouncementsItems=({ currentItems, handleDelete})=> {
 // console.log(currentItems);

  return (
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
      {currentItems &&
        currentItems.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.start_date}</td>
              <td>{item.end_date}</td>
              <td>{item.social_platform}</td>
              <td>{item.status}</td>
              <td>{item.image == null ? "No Image" : (<img className="announcment-thumb" src={`${imageUrl}${item.image}`} alt="Banner Thumb" />) }</td>
              <td>
                <Link className="btn btn-sm btn-success me-2" to={`/dashboard/announcement/view/${item.id}`} >View</Link>
                <Link className="btn btn-sm btn-primary me-2" to={`/dashboard/announcement/${item.id}`} >Edit</Link>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}> <i className="fa fa-trash"></i> Delete </button>
              </td>
            </tr>
          );
        })}
    </tbody>
  </table>
  );
}
export default AnnouncementsItems;
