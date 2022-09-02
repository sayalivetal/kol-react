import React, { useEffect, useState } from "react";
import { getAllBookmark } from "../../slices/api/simpleApi";
import { useSelector, useDispatch } from "react-redux";
import { imageUrl } from "../../common/apis";
import {
  kolDeleteBookmark,
  kolSelector,
} from "../../slices/KolListing/KolSlices";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const Bookmark = () => {
  const dispatch = useDispatch();
  const [bookmark, setBookmark] = useState([]);

  let token = localStorage.getItem("token");
  const bookmarkRender = useSelector(kolSelector);

  useEffect(() => {
    const callback = (data) => {
      setBookmark([...data]);
    };
    getAllBookmark(callback, token);
  }, [bookmarkRender]);



  const handleBookmark = (profileId) => {
    dispatch(kolDeleteBookmark({ profileId, token }));
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <div className="banner-container">
            <div className="col-lg-12 bookmark-bg"></div>
          </div>
          <div className="row my-3">
            {bookmark &&
              bookmark.map((item, index) => {
            
                return (
                  <div className="col-lg-3" style={{}}>
                    <div className="bookmark-card">
                      <div className="bookmark-thumb">
                        <Link to={`/details/${item.profile_id}`}>
                          {" "}
                          <img src={`${imageUrl}${item.avatar}`} alt="" />
                        </Link>
                      </div>
                      <div className="bookmark-delete">
                        <i
                          className="bi bi-trash3"
                          onClick={() => {
                            handleBookmark(item.kol_profile_id);
                          }}
                        ></i>
                      </div>
                      <div className="bookmark-info">
                        <Link className="bookmark-title" to={`/details/${item.profile_id}`}>
                          <h3 >{item.username}</h3>
                        </Link>

                        <p className="m-0">{item.tags}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
