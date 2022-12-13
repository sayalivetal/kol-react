import React, { useState } from "react";
import { Link } from "react-router-dom";
import { imageUrl } from "../../../common/apis";
import ConfirmModal from "../../../common/components/ConfirmModal";

const AnnouncementsItems=({ currentItems, handleDelete})=> {
 // console.log(currentItems);

 const [modalHeading, setModalHeading] = useState("");
 const [showModal, setshowModal] = useState(false);
  const[itemId,setitemId] = useState("")

 const handleDeleteModal = (id) => {
  setitemId(id)
  setModalHeading("Confirmation box");
  setshowModal(!showModal);
 }

 const showCustomModal = () => {
  setshowModal(!showModal);
};


  return (
    <>
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
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteModal(item.id)}> <i className="fa fa-trash"></i> Delete </button>
              </td>
            </tr>
          );
        })}
    </tbody>
  </table>

    <ConfirmModal 
      modalName={modalHeading}
      showModalProp={showModal}
      closeModal={showCustomModal}
    >
      <div className="row">
        <div className="col-12 mb-3">
          <label className="form-label ">Are you sure to want to Delete to this Record</label>
        </div>
        <div className="col-12 mb-3">
          <button type="submit" className="btn theme-btn" 
            onClick={()=> {
            handleDelete(itemId)
            setshowModal(!showModal);
            }}>Confirm</button>
          <button type="submit" className="btn btn-default mx-3" onClick={showCustomModal}>Cancel</button>
        </div>
      </div>

    </ConfirmModal>

  </>
  );
}
export default AnnouncementsItems;
